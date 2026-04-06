---
layout: default
title: "Utilizando Visão de Dados no Smartview com Consultas SQL"
parent: Blog
image: "/assets/smartview-sql.jpg"
description: "Neste artigo, aprenda como criar e utilizar Visões de Dados no TOTVS Smartview, uma ferramenta poderosa para visualizar e manipular dados SQL de forma responsiva e intuitiva."
tags: [SQL, Smartview, Protheus, ERP, Visão de Dados]
---

# Utilizando Visão de Dados no Smartview com Consultas SQL

<p style="font-size: 0.85em; color: #666;">
  <em>Por <strong>Felipe Pazetto</strong> | 6 de Abril de 2026</em>
</p>

Fala pessoal! Como prometi no post anterior sobre queries amigáveis no Protheus, hoje vou abordar um recurso bastante poderoso do **TOTVS Smartview**: as **Visões de Dados**.

Se você trabalha com ERP Protheus e precisa criar interfaces personalizadas para visualização de dados, relatórios operacionais ou dashboards de acompanhamento, as Visões de Dados são uma solução elegante e responsiva. Neste artigo vou mostrar como utilizá-las de forma eficaz.

---

## 🎯 O que é Visão de Dados?

Uma **Visão de Dados** é um recurso do Smartview que permite visualizar e manipular dados de forma responsiva e intuitiva. Basicamente, você constrói uma interface a partir de uma consulta SQL, e o Smartview oferece funcionalidades prontas como:

- ✅ Filtros simples e avançados
- ✅ Ordenação de colunas
- ✅ Agrupamento de dados
- ✅ Sumários e cálculos
- ✅ Pesquisa em tempo real
- ✅ Exportação para Excel
- ✅ Perfis de visualização customizados

Isso tudo sem você precisar escrever uma linha de código frontend!

---

## 🚀 Passo a Passo: Criando sua Primeira Visão de Dados

### 1. Acessando o Smartview

Abra o **TOTVS Smartview** e autentique-se com suas credenciais. Na tela inicial, procure pelo menu de criação de recursos.

### 2. Iniciando a Criação de uma Visão de Dados

No menu principal, navegue até:
```
Recursos → Visão de Dados → Nova Visão de Dados
```

Você verá a tela de criação com três etapas principais:
1. **Configuração** - Dados básicos da visão
2. **Design** - Layout e manipulação de dados
3. **Visualização** - Preview da visão finalizada

### 3. Configuração Inicial

Na primeira etapa, defina:

- **Nome**: Um identificador único para sua visão (ex: `VIS_PEDIDOS_ABERTOS`)
- **Descrição**: Qual é o objetivo desta visão
- **Objeto de Negócio**: Selecione a tabela ou view SQL que será a fonte de dados

Aqui você pode também adicionar **parâmetros** que permitirão filtrar dados dinamicamente.

### 4. Definindo a Consulta SQL

Este é o ponto crucial! Você precisa criar uma consulta SQL que retorne os dados desejados.

**Exemplo prático** - Consultando pedidos abertos com informações do cliente:

```sql
SELECT 
    C5_NUM AS [Pedido],
    C5_EMISSAO AS [Data Emissão],
    C5_CLIENTE AS [Código Cliente],
    A1_NOME AS [Nome Cliente],
    C5_LOJA AS [Loja],
    SUM(C6_VALOR) AS [Valor Total],
    C5_TIPO AS [Tipo Pedido],
    C5_STATUS AS [Status]
FROM 
    SC5010 (NOLOCK)
    INNER JOIN SC6010 (NOLOCK) ON C5_FILIAL = C6_FILIAL AND C5_NUM = C6_NUM
    INNER JOIN SA1010 (NOLOCK) ON C5_CLIENTE = A1_CODIGO AND C5_LOJA = A1_LOJA
WHERE 
    C5_FILIAL = '01'
    AND C5_BLQUANT <> 'S'
    AND SC5010.D_E_L_E_T_ = ''
    AND SC6010.D_E_L_E_T_ = ''
    AND SA1010.D_E_L_E_T_ = ''
GROUP BY 
    C5_NUM, C5_EMISSAO, C5_CLIENTE, A1_NOME, C5_LOJA, C5_TIPO, C5_STATUS
ORDER BY 
    C5_EMISSAO DESC
```

**Dica importante**: Sempre inclua `(NOLOCK)` nas suas consultas para evitar locks, especialmente em validações on-line. Isso melhora significantly a performance!

---

## 🎨 Etapa de Design

Após definir sua consulta, chegamos à etapa mais visual. No **Design**, você pode:

### Seletor de Colunas
Clique no ícone do seletor para escolher quais colunas deseja exibir (nem sempre você quer mostrar todas).

### Reordenação
Clique e arraste os cabeçalhos das colunas para reorganizá-las conforme desejado.

### Filtros Simples
Ao lado de cada título de coluna, você verá um ícone de funil. Clique para ativar filtros simples (seleção de valores).

### Filtros Avançados
Para filtros mais complexos, clique no botão de **Filtro Avançado** (canto inferior esquerdo). Isso abre um construtor visual onde você pode criar condições lógicas (E, OU, NÃO).

**Exemplo de filtro avançado**:
- (Status = 'Aberto' **OU** Status = 'Aguardando Confirmação') **E** Valor Total > 1000

### Agrupamento
Arraste um cabeçalho de coluna para a área **"Agrupar por esta coluna"** para criar agrupamentos hierárquicos.

**Exemplo**: Agrupar pedidos por Cliente → Tipo de Pedido

### Sumários
Configure cálculos automáticos em grupos. Você pode adicionar:
- **Contagem** de registros
- **Soma** de valores numéricos
- **Média, Min, Max** também disponíveis

---

## 📊 Visualização e Exploração

A aba de **Visualização** é onde seus usuários realmente trabalham com os dados. Lá eles podem:

### Pesquisa em Tempo Real
Digitam valores nos campos de busca (sob cada coluna) para filtrar rapidamente.

### Ordenação
Clicam com botão direito no cabeçalho de uma coluna para ordenar ascendente/descendente. É possível ordenar por múltiplas colunas respeitando a sequência.

### Exportar para Excel
Um botão disponível permite exportar toda a visualização (com seus filtros aplicados) para um arquivo Excel.

### Perfis de Visualização
Os usuários podem salvar layouts customizados (ordenação, filtros, colunas visíveis) e reutilizá-los posteriormente.

---

## 💡 Dicas Práticas

### 💾 Formatação de Dados
No Design, você pode configurar formatação de campos:
- **Datas**: Converter de YYYYMMDD para DD/MM/YYYY
- **Números**: Aplicar formato monetário (R$), percentuais, casas decimais
- **Textos**: Converter para MAIÚSCULAS ou minúsculas

### ⚡ Performance
Sempre otimize suas consultas SQL:
- Use índices apropriados
- Filtre no WHERE ao máximo
- Evite cartesian products (JOINs sem condições adequadas)
- Use `(NOLOCK)` quando não precisar de transações
- Considere limitar o tamanho dos dados retornados (veja documentação para `SMART_VIEW_GETDATALIMIT_KB`)

### 🔐 Permissões
Visões de Dados podem ser compartilhadas com outros usuários. O criador define quem tem permissão para visualizar ou editar.

### 📌 Parâmetros Dinâmicos
Se sua consulta usar parâmetros (ex: `@dataInicio`, `@dataFim`), o Smartview oferecerá campos para o usuário preencher antes de visualizar os dados.

---

## 🎬 Caso Real: Acompanhamento de Pedidos

Vou deixar aqui um exemplo mais completo que você pode adaptar:

```sql
DECLARE @FilialFiltro VARCHAR(2) = '01'
DECLARE @DataInicio VARCHAR(8) = CONVERT(VARCHAR(8), DATEADD(DAY, -30, GETDATE()), 112)
DECLARE @DataFim VARCHAR(8) = CONVERT(VARCHAR(8), GETDATE(), 112)

SELECT 
    C5_NUM AS [Número do Pedido],
    CONVERT(VARCHAR(10), CONVERT(DATE, C5_EMISSAO, 101), 103) AS [Data Emissão],
    C5_CLIENTE + '-' + C5_LOJA AS [Cliente/Loja],
    A1_NOME AS [Nome Cliente],
    C5_TIPO AS [Tipo],
    CASE 
        WHEN C5_BLQUANT = 'S' THEN 'Bloqueado'
        WHEN C5_STATUS = 'A' THEN 'Liberado'
        WHEN C5_STATUS = 'C' THEN 'Cancelado'
        ELSE C5_STATUS
    END AS [Status],
    FORMAT(SUM(C6_VALOR), 'C2', 'pt-BR') AS [Total],
    U1_NOME AS [Responsável]
FROM 
    SC5010 (NOLOCK)
    LEFT JOIN SC6010 (NOLOCK) ON C5_FILIAL = C6_FILIAL 
                                AND C5_NUM = C6_NUM 
                                AND SC6010.D_E_L_E_T_ = ''
    LEFT JOIN SA1010 (NOLOCK) ON C5_CLIENTE = A1_CODIGO 
                                AND C5_LOJA = A1_LOJA 
                                AND SA1010.D_E_L_E_T_ = ''
    LEFT JOIN SU5010 (NOLOCK) ON C5_USUARIO = U1_LOGIN 
                                AND SU5010.D_E_L_E_T_ = ''
WHERE 
    C5_FILIAL = @FilialFiltro
    AND C5_EMISSAO BETWEEN @DataInicio AND @DataFim
    AND SC5010.D_E_L_E_T_ = ''
GROUP BY 
    C5_NUM, C5_EMISSAO, C5_CLIENTE, C5_LOJA, A1_NOME, C5_TIPO, C5_BLQUANT, C5_STATUS, C5_USUARIO, U1_NOME
ORDER BY 
    C5_EMISSAO DESC, C5_NUM DESC
```

Salve essa Visão de Dados com nome `VIS_ACOMPANHAMENTO_PEDIDOS` e compartilhe com seu time de vendas!

---

## 📚 Recursos Adicionais

Para mais detalhes sobre Visão de Dados, acesse a documentação oficial do TOTVS:
[TOTVS Documentação - Visão de Dados](https://tdn.totvs.com/pages/releaseview.action?pageId=684018378)

---

## ✨ Conclusão

As **Visões de Dados** do Smartview são uma ferramenta extremamente poderosa para criar interfaces de dados sem precisar de desenvolvimento frontend complexo. Combine com boas práticas de SQL e você terá relatórios responsivos, performáticos e fáceis de manter.

No próximo post vou abordar técnicas avançadas como criação de cálculos customizados e integração com Dashboards do Smartview. Fica antenado! 👀

Até mais!

---

{% include comentarios.html %}
