---
layout: default
title: "Tratando nomes de campos do SQL no Protheus"
parent: Blog
image: "/assets/sql-server.jpg"
description: "Fala pessoal, aqui vinha um problema antigo que eu resolvi buscar alguma solução mais prática quando desenvolvo queries no SQL para o Protheus (ou serve para ERPs similares)"
tags: [sql, protheus, smartview]
---
# Deixando suas queries com nomes amigáveis mais rapidamente
<p style="font-size: 0.85em; color: #666;">
  <em>Por <strong>Felipe Pazetto</strong> | 18 de Março de 2026</em>
</p>

Fala pessoal, faz tempo que eu me incomodava quando eu desenvolvia queries no Protheus diretamente no SQL Server Management Studio, e tinha que ficar dando AS (apelidos) para os nomes das queries.
Exemplo clássico:

```sql
SELECT C5_NUM AS Pedido, C5_CLIENTE AS Cliente, C5_LOJA AS Loja FROM SC5010 
WHERE D_E_L_E_T_='' 
AND C5_FILIAL='01'
```

Isso é um exemplo bem simplório, mas em SELECTs gigantes onde há 30, 40 campos ficar dando AS e o nome amigável é chato pra caramba. No Protheus você pode definir isso de outras formas, mas quando fazemos alguma VIEW com consulta direta isso vira um pesadelo.

Sendo assim resolvi simplificar a forma como fazer isso, passando de uma vez só todos os campos da tabela e ele buscando no meu Dicionário de Dados (SX3) o nome do campo.
A query também trata quando ele vem formato de data do Protheus (YYYYMMDD) e converte como DD/MM/YYYY, numérico para o formato de separadores brasileiro (, para decimais e . para milhar)

Além disso, adiciona caso tenha cálculos entre os campos, visto que isso não vai existir no dicionário de dados do sistema (SX3).
Como estou trazendo vários relatórios de sistemas terceiros para dentro do Smartview, construo lá uma Visão de Dados e jogo a query pura, agilizando muito o tempo de desenvolvimento.

Exemplo abaixo:

```sql
DECLARE @Query NVARCHAR(MAX);
DECLARE @Colunas NVARCHAR(MAX);

SELECT @Colunas = COALESCE(@Colunas + ', ', '') + 
    CASE 
        WHEN X3_TIPO = 'D' THEN 
            'FORMAT(CAST(NULLIF(' + TRIM(X3_CAMPO) + ', ''        '') AS DATE), ''dd/MM/yyyy'') AS [' + TRIM(X3_TITULO) + ']'
        WHEN X3_TIPO = 'N' THEN 
            'FORMAT(' + TRIM(X3_CAMPO) + ', ''N2'', ''pt-BR'') AS [' + TRIM(X3_TITULO) + ']'
        ELSE 
            TRIM(X3_CAMPO) + ' AS [' + TRIM(X3_TITULO) + ']'
    END
FROM SX3010  -- aqui mora a parte mais importante que são mapear os campos da query
WHERE X3_CAMPO IN ('C6_NUM', 'C5_EMISSAO', 'C6_ITEM','B1_TIPO','C6_PRODUTO', 'C6_DESCRI', 'C6_BLQ', 'C6_CLI', 'C6_LOJA', 'C5_USUARIO')
      AND D_E_L_E_T_ = '';
-- Quando há campos de cálculo, senão comentar
SET @Colunas = @Colunas + ', FORMAT(C6_QTDVEN * C6_PRCVEN, ''N2'', ''pt-BR'') AS [Valor Total]';

-- Montagem da Query 
SET @Query = '
SELECT ' + @Colunas + '
FROM SC6010 (NOLOCK)
     INNER JOIN SC5010 (NOLOCK) ON C6_NUM = C5_NUM AND SC6010.D_E_L_E_T_= SC5010.D_E_L_E_T_
     INNER JOIN SB1010 (NOLOCK) ON C6_FILIAL = B1_FILIAL AND C6_PRODUTO = B1_COD AND SC6010.D_E_L_E_T_ = SB1010.D_E_L_E_T_
WHERE SC6010.D_E_L_E_T_ <> ''*''
    AND C6_FILIAL = ''01'' 
    AND C6_CLI IN (''000001'', ''000002'')
    AND C6_BLQ <> ''R'' 
    AND B1_TIPO = ''SA''
ORDER BY C6_NUM, C6_ITEM';

EXEC sp_executesql @Query;

```

É isso, vou tentar postar dia-a-dia mais casos de melhorias e trazer qualquer coisa que eu possa ajudar para resolver problemas similares.
Até mais!

---
**Tags:** #sql #protheus #smartview
---
{% include comentarios.html %}
