// Conteúdo único do site. As três propostas leem daqui:
// trocar um texto aqui muda em todas.

export const perfil = {
  nome: 'Felipe Pazetto',
  cargo: 'Coordenador de Sistemas · ERP & Dados',
  local: 'Jundiaí / SP',
  resumo:
    'Há 16 anos transformo processos de negócio em sistemas que funcionam. Hoje coordeno a área de sistemas de uma multinacional de embalagens. Antes disso, desenvolvi e sustentei ERPs (TOTVS Protheus e Microsoft Dynamics), otimizei bancos SQL Server e construí integrações e ferramentas fullstack.',
  anosExperiencia: 16,
  email: 'felipe@pazetto.net',
  linkedin: 'https://linkedin.com/in/pazetto',
  github: 'https://github.com/pazetto',
  idiomas: [
    { idioma: 'Português', codigo: 'pt_BR', nivel: 'Nativo' },
    { idioma: 'Inglês', codigo: 'en_US', nivel: 'Avançado (C1)' },
    { idioma: 'Espanhol', codigo: 'es_ES', nivel: 'Intermediário (B1)' },
  ],
  stack: [
    'Gestão de times de sistemas',
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
  destaques?: string[];
  tags: string[];
};

export const experiencias: Experiencia[] = [
  {
    inicio: '2026',
    fim: 'hoje',
    empresa: 'America Embalagens',
    cargo: 'Coordenador de Sistemas',
    resumo:
      'Coordeno a área de sistemas: equipe, fornecedores e a evolução do TOTVS Protheus, sempre alinhado às áreas de negócio.',
    destaques: [
      'Gestão da equipe de sistemas e das consultorias parceiras',
      'Roadmap do ERP e priorização de demandas com as áreas de negócio',
      'Acompanhamento de chamados, SLAs e indicadores da área',
      'Orçamento, contratos e licenças de sistemas',
      'Governança de acessos e apoio a auditorias',
      'Projetos de integração, automação e dados (BI)',
    ],
    tags: ['Gestão', 'Protheus', 'Governança', 'Projetos'],
  },
  {
    inicio: '2022',
    fim: '2026',
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
  link?: string;
  tags: string[];
};

export const portfolio: Projeto[] = [
  {
    titulo: 'Tuning de queries no Protheus',
    area: 'SQL Server',
    resumo:
      'Refatoração com CTE de uma consulta que levava 12 minutos. Com os mesmos dados, ela passou a rodar em 10 segundos, sem mexer em hardware.',
    metrica: { valor: '12 min → 10 s', rotulo: 'mesma consulta, mesmos dados' },
    link: '/blog/performance-sql',
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
      status: 'Em breve',
      stack: ['Firebase', 'Web'],
    },
    {
      nome: 'Portal de Seguros',
      url: 'https://seguros-746c6.web.app',
      descricao:
        'Portal para organizar apólices, clientes e renovações de seguros em um só lugar.',
      status: 'No ar',
      stack: ['Firebase', 'Web'],
    },
  ],
};

const meses = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
export function dataCurta(iso: string) {
  const [a, m, d] = iso.split('-');
  return `${d} ${meses[Number(m) - 1]} ${a}`;
}
