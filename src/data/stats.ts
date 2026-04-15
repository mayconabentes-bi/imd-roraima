export interface SecretariatStats {
  id: string;
  name: string;
  acronym: string;
  type: 'Direta' | 'Indireta';
  function: string;
  employees: number;
  budget2025: number;
  budget2026: number;
  pcaUrl: string;
  locations: string[];
  justificationForSecurity: string;
}

export const secretariatStats: SecretariatStats[] = [
  {
    id: 'setrabes',
    name: 'Secretaria de Estado do Trabalho e Bem-Estar Social',
    acronym: 'SETRABES',
    type: 'Direta',
    function: 'Políticas de assistência social, trabalho e renda.',
    employees: 1250,
    budget2025: 450000000,
    budget2026: 495000000,
    pcaUrl: 'https://selc.rr.gov.br',
    locations: ['Boa Vista (Sede)', 'Vila do Equador', 'Pacaraima'],
    justificationForSecurity: 'Atendimento a grandes fluxos de migrantes e distribuição de auxílios, gerando risco de aglomerações e necessidade de controle de acesso.'
  },
  {
    id: 'sesp',
    name: 'Secretaria de Estado da Segurança Pública',
    acronym: 'SESP-RR',
    type: 'Direta',
    function: 'Planejamento e execução de políticas de segurança.',
    employees: 3200,
    budget2025: 850000000,
    budget2026: 910000000,
    pcaUrl: 'https://transparencia.rr.gov.br',
    locations: ['Boa Vista (Centro de Comando)', 'Distritos Policiais no Interior'],
    justificationForSecurity: 'Guarda de bens apreendidos e armamentos, centro de inteligência e sensibilidade estratégica de dados.'
  },
  {
    id: 'seed',
    name: 'Secretaria de Estado da Educação e Desporto',
    acronym: 'SEED-RR',
    type: 'Direta',
    function: 'Gestão da rede estadual de ensino e desporto.',
    employees: 12000,
    budget2025: 1200000000,
    budget2026: 1280000000,
    pcaUrl: 'https://selc.rr.gov.br',
    locations: ['Boa Vista (Sede)', 'Escolas em todos os Municípios'],
    justificationForSecurity: 'Patrimônio tecnológico em escolas (labs) e segurança de alunos e servidores contra intrusões.'
  }
];

export interface IncidentData {
  id: string;
  type: 'Roubo' | 'Furto' | 'Vandalismo' | 'Invasão';
  location: string;
  date: string;
  impactScore: number; // 1-10
}

export const incidents: IncidentData[] = [
  { id: '1', type: 'Furto', location: 'SEED Sede', date: '2026-03-12', impactScore: 4 },
  { id: '2', type: 'Roubo', location: 'SETRABES Unidade Norte', date: '2026-04-05', impactScore: 8 },
  { id: '3', type: 'Vandalismo', location: 'Escola Central RR', date: '2026-02-15', impactScore: 6 }
];
