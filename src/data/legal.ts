export interface LegalDoc {
  id: string;
  title: string;
  category: 'Constituição' | 'Lei 14.133' | 'Estatuto' | 'Secretaria' | 'Operação Acolhida' | 'Orçamento' | 'Engenharia';
  description: string;
  url: string;
  date: string;
  tags: string[];
}

export const legalDocs: LegalDoc[] = [
  {
    id: 'rr-const-1991',
    title: 'Constituição do Estado de Roraima',
    category: 'Constituição',
    description: 'Texto integral da Constituição Estadual atualizada.',
    url: 'https://www2.senado.leg.br/bdsf/handle/id/70439',
    date: '1991-12-31',
    tags: ['Fundamental', 'Estado', 'RR']
  },
  {
    id: 'rr-37424-e',
    title: 'Decreto Estadual nº 37.424-E (19/03/2025)',
    category: 'Lei 14.133',
    description: 'Regulamenta o Sistema de Registro de Preços (SRP) nos termos da Lei 14.133/2021.',
    url: 'https://transparencia.rr.gov.br',
    date: '2025-03-19',
    tags: ['Licitação', 'SRP', 'Engenharia']
  },
  {
    id: 'fed-estatuto-idoso',
    title: 'Estatuto do Idoso (Lei 10.741)',
    category: 'Estatuto',
    description: 'Dispõe sobre o Estatuto do Idoso e dá outras providências.',
    url: 'https://www.planalto.gov.br/ccivil_03/leis/2003/l10.741.htm',
    date: '2003-10-01',
    tags: ['Federal', 'Social']
  },
  {
    id: 'fed-eca',
    title: 'ECA (Lei 8.069)',
    category: 'Estatuto',
    description: 'Estatuto da Criança e do Adolescente.',
    url: 'https://www.planalto.gov.br/ccivil_03/leis/l8069.htm',
    date: '1990-07-13',
    tags: ['Federal', 'Social', 'Direitos']
  },
  {
    id: 'rr-setrabes-reorg',
    title: 'Lei nº 548 (Reorganização SETRABES)',
    category: 'Secretaria',
    description: 'Disciplina a reorganização e os cargos da Secretaria de Estado do Trabalho e Bem-Estar Social.',
    url: 'https://imprensaoficial.rr.gov.br/',
    date: '2006-06-23',
    tags: ['SETRABES', 'Estrutura']
  },
  {
    id: 'rr-sesp-sispds',
    title: 'Lei Estadual nº 1.357 (SISPDS)',
    category: 'Secretaria',
    description: 'Institui o Sistema de Segurança Pública e Defesa Social de Roraima.',
    url: 'https://transparencia.rr.gov.br',
    date: '2019-11-27',
    tags: ['SESP', 'SSP-RR', 'Segurança']
  },
  {
    id: 'rr-loa-2025',
    title: 'Lei Orçamentária Anual (LOA) 2025',
    category: 'Orçamento',
    description: 'Estima a receita e fixa a despesa do Estado para o exercício de 2025.',
    url: 'https://transparencia.rr.gov.br',
    date: '2025-01-01',
    tags: ['Orçamento', 'Planejamento']
  },
  {
    id: 'rr-doe-2026',
    title: 'Diário Oficial do Estado (Edições 2026)',
    category: 'Orçamento',
    description: 'Acesso direto às publicações oficiais de Roraima do ano vigente.',
    url: 'https://imprensaoficial.rr.gov.br',
    date: '2026-04-15',
    tags: ['DOE-RR', 'Oficial', 'Diário']
  },
  {
    id: 'pncp-rr-2026',
    title: 'Portal Nacional de Contratações (RR 2026)',
    category: 'Lei 14.133',
    description: 'Central de editais e licitações de Roraima sob a nova lei.',
    url: 'https://pncp.gov.br/app/editais?uf=RR&ano=2026',
    date: '2026-04-15',
    tags: ['PNCP', 'Licitações', '14.133']
  },
  {
    id: 'acolhida-leg-13684',
    title: 'Lei nº 13.684 (Operação Acolhida)',
    category: 'Operação Acolhida',
    description: 'Medidas de assistência emergencial para acolhimento de pessoas em situação de vulnerabilidade.',
    url: 'https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13684.htm',
    date: '2018-06-21',
    tags: ['Acolhida', 'Federal', 'Migração']
  },
  {
    id: 'selc-rr-editais',
    title: 'Portal de Editais SELC-RR',
    category: 'Lei 14.133',
    description: 'Repositório de editais e atas de registro de preços do Estado.',
    url: 'https://selc.rr.gov.br',
    date: '2026-04-15',
    tags: ['SELC', 'Editais', 'SRP']
  }
];
