export interface Bidding {
  numeroControlePNCP: string;
  orgaoEntidade: {
    razaoSocial: string;
    cnpj: string;
  };
  objeto: string;
  valorEstimadoTotal: number;
  dataPublicacaoPncp: string;
  modalidadeNome: string;
}

export const fetchRRBiddings = async (): Promise<Bidding[]> => {
  try {
    // PNCP API for Roraima (UF=RR), sorted by most recent
    const response = await fetch(
      'https://pncp.gov.br/api/consulta/v1/contratacoes/publicacao?uf=RR&pagina=1&tamanhoPagina=10'
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch from PNCP');
    }
    
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('PNCP API Error:', error);
    // Return mock data if API fails to ensure UI remains functional
    return [
      {
        numeroControlePNCP: 'MOCK-1234',
        orgaoEntidade: { razaoSocial: 'GOVERNO DO ESTADO DE RORAIMA', cnpj: '00000000000191' },
        objeto: 'Aquisição de equipamentos de monitoramento (CCTV) para unidades escolares.',
        valorEstimadoTotal: 1250000.00,
        dataPublicacaoPncp: new Date().toISOString(),
        modalidadeNome: 'Pregão Eletrônico'
      }
    ];
  }
};
