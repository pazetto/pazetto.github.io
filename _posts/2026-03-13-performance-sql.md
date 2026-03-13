---
layout: default
title: "Clássico uso de CTE na melhora de queries longas"
parent: Blog
tags: sql protheus tunning
---
# Clássico uso de CTE na melhora de queries longas
<p style="font-size: 0.85em; color: #666;">
  <em>Por <strong>Felipe Pazetto</strong> | 13 de Março de 2026</em>
</p>

Fala pessoal, primeiro post de fato do blog, hoje venho trazer um caso real na empresa onde trabalho onde empreguei o uso de CTE numa consulta pré-existente de uma query que demorava incríveis 12 MINUTOS (!!!) e hoje, com os mesmos dados, executa em 10 segundos.

A query é muito extensa, vou focar onde houve a grande melhoria.
Basicamente, ele exporta dados para geração do NWC (Net Working Capital), que nada mais é do que o Capital de Giro.

O maior gargalo era meu cadastro de Produtos (SB1). Para cada registro na SB1, ele fazia consultas na Saldo em Poder de Terceiros (SB6) e Movimentos Internos (SD3)

```sql
WITH   NWC
AS     (SELECT   CONVERT (VARCHAR (10), DATEADD(DD, -DAY(DATEADD(M, 1, '20260205')), DATEADD(M, 1, '20260205')), 103) AS dDATE,
                 'ARCONVERT BRA' AS 'ENTITY',
                 CASE WHEN B1_TIPO = 'EM' THEN 'RAW MATERIAL' WHEN B1_TIPO IN ('MP', 'MD', 'DD', 'SV') THEN 'RAW MATERIAL' WHEN B1_TIPO IN ('PA', 'PR') THEN 'FINISHED GOODS' WHEN B1_TIPO = 'SA' THEN 'WIP' ELSE B1_TIPO END AS 'NATURE',
                 B1_COD AS 'PN',
                 B1_DESC AS 'DESCRIPTION',
                 SAH.AH_CODERP AS UM,
                 (SUM(ROUND(ISNULL(B9_MES.B9_QINI, 0), 7)) + (SELECT ROUND(ISNULL(SUM(IIF (F4_PODER3 = 'R', B6_QUANT, B6_QUANT * -1)), 0), 7)
                                                              FROM   SB6100 AS SB6 WITH (NOLOCK)
                                                                     INNER JOIN
                                                                     SF4100 AS SF4 WITH (NOLOCK)
                                                                     ON (SF4.F4_FILIAL = ''
                                                                         AND SF4.F4_CODIGO = SB6.B6_TES
                                                                         AND SF4.D_E_L_E_T_ = ' ')
                                                              WHERE  SB6.B6_FILIAL = '05'
                                                                     AND ((SB6.B6_TPCF = 'C')
                                                                          OR (SB6.B6_TPCF = 'F'))
                                                                     AND SB6.B6_DTDIGIT <= CONVERT (VARCHAR (8), DATEADD(DD, -DAY(DATEADD(M, 1, '20260205')), DATEADD(M, 1, '20260205')), 112)
                                                                     AND B6_PRODUTO = B1_COD
                                                                     AND SB6.B6_TIPO = 'E'
                                                                     AND SB6.B6_QUANT <> 0
                                                                     AND SB6.D_E_L_E_T_ = ' ')) AS 'QUANTITY',
                 SAH2.AH_CODERP AS UM2,
                 (SUM(ROUND(ISNULL(IIF (B1_UM <> B1_SEGUM
                                        AND B1_SEGUM = 'M2'
                                        AND B9_QISEGUM > 0, B9_MES.B9_QISEGUM, B9_MES.B9_QINI), 0), 7)) + (SELECT ROUND(ISNULL(SUM(IIF (F4_PODER3 = 'R', IIF (B6_UM <> B6_SEGUM
                                                                                                                                                              AND B6_SEGUM = 'M2'
                                                                                                                                                              AND B6_QTSEGUM > 0, B6_QTSEGUM, B6_QUANT), IIF (B6_UM <> B6_SEGUM
                                                                                                                                                                                                              AND B6_SEGUM = 'M2'
                                                                                                                                                                                                              AND B6_QTSEGUM > 0, B6_QTSEGUM, B6_QUANT) * -1)), 0), 7)
                                                                                                           FROM   SB6100 AS SB6 WITH (NOLOCK)
                                                                                                                  INNER JOIN
                                                                                                                  SF4100 AS SF4 WITH (NOLOCK)
                                                                                                                  ON (SF4.F4_FILIAL = ''
                                                                                                                      AND SF4.F4_CODIGO = SB6.B6_TES
                                                                                                                      AND SF4.D_E_L_E_T_ = ' ')
                                                                                                           WHERE  SB6.B6_FILIAL = '05'
                                                                                                                  AND ((SB6.B6_TPCF = 'C')
                                                                                                                       OR (SB6.B6_TPCF = 'F'))
                                                                                                                  AND SB6.B6_DTDIGIT <= CONVERT (VARCHAR (8), DATEADD(DD, -DAY(DATEADD(M, 1, '20260205')), DATEADD(M, 1, '20260205')), 112)
                                                                                                                  AND B6_PRODUTO = B1_COD
                                                                                                                  AND SB6.B6_TIPO = 'E'
                                                                                                                  AND SB6.B6_QUANT <> 0
                                                                                                                  AND SB6.D_E_L_E_T_ = ' ')) AS 'QUANTITY2',
                 (SUM(ROUND(ISNULL(B9_MES.B9_VINI1, 0), 7)) + (SELECT ISNULL(SUM(ROUND(IIF (F4_PODER3 = 'R', B6_CUSTO1, B6_CUSTO1 * -1), 7)), 0)
                                                               FROM   SB6100 AS SB6 WITH (NOLOCK)
                                                                      INNER JOIN
                                                                      SF4100 AS SF4 WITH (NOLOCK)
                                                                      ON (SF4.F4_FILIAL = ''
                                                                          AND SF4.F4_CODIGO = SB6.B6_TES
                                                                          AND SF4.D_E_L_E_T_ = ' ')
                                                               WHERE  SB6.B6_FILIAL = '05'
                                                                      AND ((SB6.B6_TPCF = 'C')
                                                                           OR (SB6.B6_TPCF = 'F'))
                                                                      AND SB6.B6_DTDIGIT <= CONVERT (VARCHAR (8), DATEADD(DD, -DAY(DATEADD(M, 1, '20260205')), DATEADD(M, 1, '20260205')), 112)
                                                                      AND B6_PRODUTO = B1_COD
                                                                      AND SB6.B6_TIPO = 'E'
                                                                      AND SB6.B6_QUANT <> 0
                                                                      AND SB6.D_E_L_E_T_ = ' ')) AS Total_Value,
```

Eu segreguei para ele calcular o dia apenas uma vez e não em toda execução da sub-query, e também para fazer separadamente de cada tabela uma única vez e não multiplicando pelo todo:

```sql
WITH 
CTE_Dates AS (
    SELECT 
        CONVERT(VARCHAR(8), DATEADD(DD, -DAY(DATEADD(M, 1, '20260205')), DATEADD(M, 1, '20260205')), 112) AS TargetDateStr,
        CONVERT(VARCHAR(10), DATEADD(DD, -DAY(DATEADD(M, 1, '20260205')), DATEADD(M, 1, '20260205')), 103) AS TargetDateDmy
),

CTE_SB6 AS (
    SELECT 
        SB6.B6_PRODUTO,
        ROUND(ISNULL(SUM(IIF(F4_PODER3 = 'R', B6_QUANT, B6_QUANT * -1)), 0), 7) AS Qty_B6,
        ROUND(ISNULL(SUM(IIF(F4_PODER3 = 'R', 
            IIF(B6_UM <> B6_SEGUM AND B6_SEGUM = 'M2' AND B6_QTSEGUM > 0, B6_QTSEGUM, B6_QUANT), 
            IIF(B6_UM <> B6_SEGUM AND B6_SEGUM = 'M2' AND B6_QTSEGUM > 0, B6_QTSEGUM, B6_QUANT) * -1
        )), 0), 7) AS Qty2_B6,
        ISNULL(SUM(ROUND(IIF(F4_PODER3 = 'R', B6_CUSTO1, B6_CUSTO1 * -1), 7)), 0) AS Value_B6
    FROM SB6100 AS SB6 WITH (NOLOCK)
    INNER JOIN SF4100 AS SF4 WITH (NOLOCK) 
        ON SF4.F4_FILIAL = '' AND SF4.F4_CODIGO = SB6.B6_TES AND SF4.D_E_L_E_T_ = ' '
    CROSS JOIN CTE_Dates
    WHERE SB6.B6_FILIAL = '05'
      AND SB6.B6_TPCF IN ('C', 'F')
      AND SB6.B6_DTDIGIT <= CTE_Dates.TargetDateStr
      AND SB6.B6_TIPO = 'E'
      AND SB6.B6_QUANT <> 0
      AND SB6.D_E_L_E_T_ = ' '
    GROUP BY SB6.B6_PRODUTO
),
CTE_SD3 AS (
    SELECT 
        D3_COD,
        SUM(IIF(D3_TM < 500, D3_QUANT * -1, D3_QUANT)) AS LTM_CONSU,
        SUM(IIF(D3_TM < 500, 
            IIF(D3_UM <> D3_SEGUM AND D3_SEGUM = 'M2' AND D3_QTSEGUM > 0, D3_QTSEGUM, D3_QUANT) * -1, 
            IIF(D3_UM <> D3_SEGUM AND D3_SEGUM = 'M2' AND D3_QTSEGUM > 0, D3_QTSEGUM, D3_QUANT)
        )) AS LTM_CONSU2,
        MAX(IIF(D3_UM <> 'HR' AND D3_TM >= 500, D3_EMISSAO, '')) AS MaxEmissao
    FROM SD3100 AS D3 WITH (NOLOCK)
    WHERE D3.D_E_L_E_T_ = ''
      AND D3_FILIAL = '05'
      AND D3_EMISSAO >= '20250301'
      AND D3_EMISSAO <= '20260228'
      AND D3_CF IN ('RE0', 'RE1')
      AND D3_OP <> ''
    GROUP BY D3_COD
),
```

Só com essa simples mudança, já reduziu drasticamente o tempo de execução do job e CPU (que durante a execução da query anterior ficava em 100%).

É isso, vou tentar postar dia-a-dia mais casos de melhorias e trazer qualquer coisa que eu possa ajudar para resolver problemas similares.
Até mais!
