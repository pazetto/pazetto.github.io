// Conteúdo único do site. As três propostas leem daqui:
// trocar um texto aqui muda em todas.

export const perfil = {
  nome: 'Felipe Pazetto',
  cargo: 'Analista de Sistemas Sênior · ERP & Dados',
  local: 'Jundiaí / SP',
  resumo:
    'Há 14 anos transformo processos de negócio em sistemas que funcionam. Desenvolvo e sustento ERPs (TOTVS Protheus e Microsoft Dynamics), otimizo bancos SQL Server e construo integrações e ferramentas fullstack.',
  anosExperiencia: 14,
  email: 'felipe@pazetto.net',
  linkedin: 'https://linkedin.com/in/pazetto',
  github: 'https://github.com/pazetto',
  idiomas: [
    { idioma: 'Português', codigo: 'pt_BR', nivel: 'Nativo' },
    { idioma: 'Inglês', codigo: 'en_US', nivel: 'Avançado (C1)' },
    { idioma: 'Espanhol', codigo: 'es_ES', nivel: 'Intermediário (B1)' },
  ],
  stack: [
    'TOTVS Protheus',
    'AdvPL / TLPP',
    'SQL Server',
    'Dynamics 365 F&O',
    'Power BI',
    'Integrações / APIs',
    'JIRA',
    'Gestão de projetos (PMI)',
  ],
};

export type Experiencia = {
  inicio: string;
  fim: string;
  empresa: string;
  cargo: string;
  resumo: string;
  tags: string[];
};

export const experiencias: Experiencia[] = [
  {
    inicio: '2022',
    fim: 'hoje',
    empresa: 'Fedrigoni Group',
    cargo: 'Analista de Sistemas Sênior',
    resumo:
      'Melhorias no TOTVS Protheus, atendimento a usuários do Brasil e da América Latina e levantamento de requisitos para levar o ERP a novas unidades, como o Chile.',
    tags: ['Protheus', 'AdvPL', 'LatAm', 'JIRA'],
  },
  {
    inicio: '2021',
    fim: '2022',
    empresa: 'Alltech',
    cargo: 'ERP Functional Analyst',
    resumo:
      'Sustentação do Dynamics AX 2012 e Dynamics 365 F&O para usuários globais, com reporte à diretoria global de TI. Treinamentos, gestão de consultoria e projetos LatAm.',
    tags: ['Dynamics 365', 'AX 2012', 'Global'],
  },
  {
    inicio: '2015',
    fim: '2021',
    empresa: 'Fini Brasil',
    cargo: 'Analista de Projetos · Analista de Sistemas Sênior',
    resumo:
      'Responsável pelo Protheus e pelo SQL Server da companhia, com mais de 10 sistemas integrados ao ERP. Depois passou a gerir projetos de TI, com custos, cronograma e relatórios para a diretoria.',
    tags: ['Protheus', 'SQL Server', 'Projetos'],
  },
  {
    inicio: '2011',
    fim: '2015',
    empresa: 'Suzuki Motos do Brasil',
    cargo: 'Analista de Sistemas',
    resumo:
      'Suporte ao Protheus para 200 usuários, relatórios e manutenção de SQL Server. Integração do ERP com o sistema das concessionárias (PHP e PostgreSQL).',
    tags: ['Protheus', 'SQL Server', 'PHP'],
  },
  {
    inicio: '2010',
    fim: '2012',
    empresa: 'Início em infraestrutura',
    cargo: 'Suporte e infraestrutura de TI',
    resumo:
      'Cybershop e Belmont Trading: Active Directory, VMware ESXi, redes e hardware de servidores.',
    tags: ['Infra', 'VMware', 'AD'],
  },
];

export const formacao = [
  { ano: '2020', titulo: 'Pós-graduação em Gestão de Projetos (práticas PMI)' },
  { ano: '2013', titulo: 'Tecnologia em Redes de Computadores · UniAnhanguera' },
  { ano: '2011', titulo: 'Técnico em Informática · SENAC São Paulo' },
];

export const certificacoes = [
  { ano: '2026', titulo: 'Microsoft DP-600 · Fabric Analytics Engineer (em preparação)' },
  { ano: '2019', titulo: 'Desenvolvimento Full Stack · Alura' },
  { ano: '2017', titulo: 'Agile Scrum Foundation' },
];

export type Projeto = {
  titulo: string;
  area: string;
  resumo: string;
  metrica?: { valor: string; rotulo: string };
  tags: string[];
};

export const portfolio: Projeto[] = [
  {
    titulo: 'Tuning de queries no Protheus',
    area: 'SQL Server',
    resumo:
      'Refatoração com CTE de uma consulta que levava 12 minutos, sem mexer em hardware.',
    metrica: { valor: '12 min', rotulo: 'tempo original da consulta' },
    tags: ['SQL Server', 'CTE', 'Performance'],
  },
  {
    titulo: 'Ecossistema de integrações',
    area: 'Integração',
    resumo:
      'Middlewares que sincronizam o ERP com plataformas externas: pedidos, cadastros e financeiro.',
    metrica: { valor: '10+', rotulo: 'sistemas integrados ao ERP' },
    tags: ['APIs', 'Protheus', 'Middleware'],
  },
  {
    titulo: 'Customizações AdvPL / TLPP',
    area: 'ERP',
    resumo:
      'Rotinas, pontos de entrada e telas MVC que adaptam o Protheus ao processo real da empresa.',
    tags: ['AdvPL', 'TLPP', 'MVC'],
  },
  {
    titulo: 'Rollout do ERP na América Latina',
    area: 'Projetos',
    resumo:
      'Levantamento de requisitos fiscais e operacionais para implantar o ERP em novas unidades da região.',
    tags: ['LatAm', 'Chile', 'Requisitos'],
  },
];

export const mellon = {
  nome: 'Mellon',
  slogan: 'Apps pequenos que resolvem problemas reais.',
  apps: [
    {
      nome: 'Sorteador',
      url: 'https://sorteador.pazetto.net',
      descricao:
        'Monta times equilibrados para o futebol da semana em segundos, sem discussão na hora da pelada.',
      status: 'No ar',
      stack: ['Firebase', 'Web'],
    },
    {
      nome: 'Portal de Seguros',
      url: 'https://seguros.pazetto.net',
      descricao:
        'Portal para organizar apólices, clientes e renovações de seguros em um só lugar.',
      status: 'No ar',
      stack: ['Firebase', 'Web'],
    },
  ],
};

export type Post = {
  titulo: string;
  data: string; // AAAA-MM-DD
  resumo: string;
  tags: string[];
  minutos: number;
};

export const posts: Post[] = [
  {
    titulo: 'Minha jornada rumo à certificação DP-600',
    data: '2026-06-19',
    resumo:
      'O que estou revisando, meu planejamento e o objetivo de conquistar a certificação até o fim do mês.',
    tags: ['Power BI', 'Microsoft', 'Certificação'],
    minutos: 6,
  },
  {
    titulo: 'Deixando suas queries com nomes amigáveis mais rapidamente',
    data: '2026-03-18',
    resumo:
      'Uma forma prática de dar nomes legíveis às colunas quando escrevo SQL para o Protheus e para o SmartView.',
    tags: ['SQL', 'Protheus', 'SmartView'],
    minutos: 4,
  },
  {
    titulo: 'Clássico uso de CTE na melhora de queries longas',
    data: '2026-03-13',
    resumo:
      'Um caso real: uma consulta que demorava 12 minutos e como a CTE mudou esse cenário.',
    tags: ['SQL', 'Protheus', 'Dados'],
    minutos: 5,
  },
  {
    titulo: 'Estreia do blog e do site',
    data: '2026-03-12',
    resumo: 'Por que decidi criar um espaço que fosse 100% a minha cara.',
    tags: ['Pessoal'],
    minutos: 2,
  },
];

const meses = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
export function dataCurta(iso: string) {
  const [a, m, d] = iso.split('-');
  return `${d} ${meses[Number(m) - 1]} ${a}`;
}
