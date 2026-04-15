import React from 'react';
import { Cpu, HardDrive, Phone, Flame, Calculator, Download } from 'lucide-react';

export const EngStandards: React.FC = () => {
  const categories = [
    { title: 'CFTV & Vigilância', icon: Cpu, items: ['NBR IEC 62676', 'Atos Anatel Certificação', 'Arquitetura de Vídeo IP'] },
    { title: 'Redes & Cabeamento', icon: HardDrive, items: ['NBR 14565 (Estruturado)', 'TIA/EIA 568', 'Normas de Infraestrutura Física'] },
    { title: 'Sistemas Incêndio', icon: Flame, items: ['NBR 17240', 'Sinalização de Emergência', 'Controle de Acesso em Rotas de Fuga'] },
    { title: 'Telefonia & PABX', icon: Phone, items: ['Regulamento Anatel', 'Sistemas IP PBX', 'Cabeamento de Voz'] },
  ];

  return (
    <div className="module-container">
      <header className="module-header">
        <div>
          <h1 className="gradient-text">Normas de Engenharia</h1>
          <p className="subtitle">Diretrizes técnicas ABNT e ANATEL para infraestrutura e segurança.</p>
        </div>
      </header>

      <div className="eng-grid">
        {categories.map((cat) => (
          <div key={cat.title} className="glass-card eng-card">
            <div className="eng-card-header">
              <div className="icon-box">
                <cat.icon size={24} />
              </div>
              <h3>{cat.title}</h3>
            </div>
            <ul className="eng-items">
              {cat.items.map(item => (
                <li key={item}>
                  <div className="bullet" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="glass-card calculator-card">
          <div className="calc-header">
            <Calculator size={24} color="var(--accent-cyan)" />
            <h3>Calculadora LDI / BDI</h3>
          </div>
          <p>Baseado nos Manuais do TCU e Acórdão 2622/2013.</p>
          <div className="calc-preview">
            <div className="calc-row"><span>Admin Central:</span> <span>4.50%</span></div>
            <div className="calc-row"><span>Riscos:</span> <span>1.00%</span></div>
            <div className="calc-row"><span>Lucro:</span> <span>7.00%</span></div>
            <div className="calc-row highlighted"><span>BDI Sugerido:</span> <span>22.40%</span></div>
          </div>
          <button className="command-button" style={{ width: '100%', marginTop: 'auto' }}>
            <Download size={18} />
            Baixar Planilha Modelo
          </button>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .eng-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        @media (max-width: 768px) {
          .eng-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 640px) {
          .module-container {
            padding: 1rem;
          }
          .calculator-card {
            padding: 1.5rem;
          }
        }

        .eng-card {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .eng-card-header {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .icon-box {
          background: rgba(0, 242, 255, 0.1);
          color: var(--accent-cyan);
          padding: 0.75rem;
          border-radius: 12px;
          border: 1px solid rgba(0, 242, 255, 0.2);
        }

        .eng-items {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .eng-items li {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .bullet {
          width: 6px;
          height: 6px;
          background: var(--accent-cyan);
          border-radius: 50%;
          box-shadow: 0 0 10px var(--accent-cyan);
        }

        .calculator-card {
          background: linear-gradient(135deg, rgba(30, 36, 51, 0.9), rgba(10, 11, 16, 0.9));
          padding: 2rem;
          grid-row: span 2;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          border-color: var(--accent-cyan);
        }

        .calc-header {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .calc-preview {
          background: rgba(0,0,0,0.3);
          padding: 1.5rem;
          border-radius: 8px;
          font-family: var(--font-mono);
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .calc-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .calc-row.highlighted {
          border-top: 1px solid var(--border-glass);
          padding-top: 0.75rem;
          color: var(--accent-cyan);
          font-weight: 700;
          font-size: 1rem;
        }
      `}} />
    </div>
  );
};
