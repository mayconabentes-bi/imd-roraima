export interface FiscalYear {
  year: number;
  totalRevenueForecast: number;
  totalRevenueRealized: number;
  totalExpenseForecast: number;
  totalExpenseRealized: number;
  healthSpend: number;
  educationSpend: number;
  securitySpend: number;
  transfers: {
    fpe: number;
    icms: number;
    others: number;
  };
}

export const fiscalData: FiscalYear[] = [
  {
    year: 2024,
    totalRevenueForecast: 7100000000,
    totalRevenueRealized: 7350000000,
    totalExpenseForecast: 7100000000,
    totalExpenseRealized: 7280000000,
    healthSpend: 1150000000,
    educationSpend: 520000000,
    securitySpend: 480000000,
    transfers: {
      fpe: 3200000000,
      icms: 1800000000,
      others: 2350000000
    }
  },
  {
    year: 2025,
    totalRevenueForecast: 8810000000,
    totalRevenueRealized: 4200000000, // Partial / Estimated
    totalExpenseForecast: 8810000000,
    totalExpenseRealized: 3950000000, // Partial
    healthSpend: 1300000000,
    educationSpend: 590600000,
    securitySpend: 520000000,
    transfers: {
      fpe: 3800000000,
      icms: 2100000000,
      others: 2910000000
    }
  },
  {
    year: 2026,
    totalRevenueForecast: 9920000000,
    totalRevenueRealized: 0,
    totalExpenseForecast: 9920000000,
    totalExpenseRealized: 0,
    healthSpend: 1450000000,
    educationSpend: 650000000,
    securitySpend: 580000000,
    transfers: {
      fpe: 4200000000,
      icms: 2400000000,
      others: 3320000000
    }
  }
];

export const dataSources = [
  {
    name: 'Portal da Transparência RR - Receitas',
    type: 'REST API / Swagger',
    url: 'https://api2.transparencia.rr.gov.br/transparencia/swagger-ui/',
    description: 'Dados oficiais de arrecadação do Poder Executivo.'
  },
  {
    name: 'Portal Nacional de Contratações Públicas (PNCP)',
    type: 'REST API',
    url: 'https://pncp.gov.br/api/pncp',
    description: 'Monitoramento real-time de licitações e contratos.'
  },
  {
    name: 'Siconfi - Tesouro Nacional',
    type: 'Relatórios RREO/RGF',
    url: 'https://siconfi.tesouro.gov.br/',
    description: 'Consolidado de execução orçamentária e responsabilidade fiscal.'
  },
  {
    name: 'Diário Oficial de Roraima (DOE-RR)',
    type: 'Parsing / Scraping',
    url: 'https://imprensaoficial.rr.gov.br/',
    description: 'Publicações de leis, decretos e portarias de criação.'
  },
  {
    name: 'ALE-RR Transparência',
    type: 'PDF Scraping',
    url: 'https://transparencia.rr.leg.br/',
    description: 'Relatórios de tramitação de LDO e LOA.'
  },
  {
    name: 'IBGE (Relógio da População)',
    type: 'REST API',
    url: 'https://servicodados.ibge.gov.br/api/docs/projecoes',
    description: 'Projeção populacional em tempo real para Roraima.'
  },
  {
    name: 'Banco Central do Brasil (SGS)',
    type: 'REST API',
    url: 'https://www3.bcb.gov.br/sgspub/',
    description: 'Sistema Gerenciador de Séries Temporais (SELIC, IPCA).'
  }
];
