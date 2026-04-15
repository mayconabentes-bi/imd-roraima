export interface MacroData {
  populationRR: number | null;
  selicRate: number | null;
  ipca12m: number | null;
}

export async function fetchMacroIndicators(): Promise<MacroData> {
  const result: MacroData = {
    populationRR: null,
    selicRate: null,
    ipca12m: null
  };

  try {
    // 1. IBGE: Projeção de População para Roraima (Código 14)
    const ibgeRes = await fetch('https://servicodados.ibge.gov.br/api/v1/projecoes/populacao/14');
    if (ibgeRes.ok) {
      const ibgeData = await ibgeRes.json();
      if (ibgeData?.projecao?.populacao) {
        result.populationRR = ibgeData.projecao.populacao;
      }
    }
  } catch (err) {
    console.error('Erro na API IBGE:', err);
  }

  try {
    // 2. BCB SGS 432: Taxa Selic (Meta) a.a.
    // Usando a API do Sistema Gerenciador de Séries Temporais do Banco Central
    const bcbSelicRes = await fetch('https://api.bcb.gov.br/dados/serie/bcdata.sgs.432/dados/ultimos/1?formato=json');
    if (bcbSelicRes.ok) {
      const selicData = await bcbSelicRes.json();
      if (selicData && selicData.length > 0) {
        result.selicRate = parseFloat(selicData[0].valor);
      }
    }
  } catch (err) {
    console.error('Erro na API BCB Selic:', err);
  }

  try {
    // 3. BCB SGS 13522: IPCA Acumulado 12 Meses
    const bcbIpcaRes = await fetch('https://api.bcb.gov.br/dados/serie/bcdata.sgs.13522/dados/ultimos/1?formato=json');
    if (bcbIpcaRes.ok) {
      const ipcaData = await bcbIpcaRes.json();
      if (ipcaData && ipcaData.length > 0) {
        result.ipca12m = parseFloat(ipcaData[0].valor);
      }
    }
  } catch (err) {
    console.error('Erro na API BCB IPCA:', err);
  }

  // Fallbacks if APIs are down (optional, but good for UX)
  if (!result.populationRR) result.populationRR = 636303; // Base projection as of 2024 if API fails
  if (!result.selicRate) result.selicRate = 10.75; // Approx baseline
  if (!result.ipca12m) result.ipca12m = 4.5; // Approx baseline

  return result;
}
