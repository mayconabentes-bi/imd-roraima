import React from 'react';
import { 
  Activity, 
  Database, 
  ShieldCheck, 
  Terminal,
  Cpu
} from 'lucide-react';
import { legalDocs } from '../data/legal';
import { secretariatStats, incidents } from '../data/stats';

import { BiddingFeed } from './BiddingFeed';

export const Overview: React.FC = () => {
  const stats = [
    { label: 'Documentos Legais', value: legalDocs.length, icon: Database, color: '#3b82f6' },
    { label: 'Órgãos Monitorados', value: secretariatStats.length, icon: ShieldCheck, color: '#10b981' },
    { label: 'Incidentes Registrados', value: incidents.length, icon: Activity, color: '#f59e0b' },
    { label: 'Normativas Técnicas', value: 12, icon: Cpu, color: '#00f2ff' },
  ];

  return (
    <div className="module-container">
      <header className="module-header">
        <div>
          <h1 className="gradient-text">Command Center</h1>
          <p className="subtitle">Visão geral da Inteligência de Mercado - Estado de Roraima.</p>
        </div>
      </header>

      <div className="overview-stats">
        {stats.map((s) => (
          <div key={s.label} className="glass-card stat-mini-card">
            <div className="stat-icon" style={{ backgroundColor: `${s.color}20`, color: s.color }}>
              <s.icon size={20} />
            </div>
            <div className="stat-content">
              <span className="stat-value">{s.value}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="overview-grid">
        <div className="glass-card main-chart-placeholder">
          <div className="card-header">
            <h3>Consolidado Orçamentário 2025 vs 2026</h3>
            <Terminal size={18} color="var(--accent-cyan)" />
          </div>
          <div className="mock-chart">
            {secretariatStats.map(sec => (
              <div key={sec.id} className="chart-bar-group">
                <div className="bar-label">
                  <div className="sec-label-meta">
                    <span className="acronym-tag">{sec.acronym}</span>
                    <button className="pca-link" onClick={() => window.open(sec.pcaUrl, '_blank')}>PCA 2026</button>
                  </div>
                  <div className="budget-values">
                    <span className="v25">R$ {(sec.budget2025 / 1000000).toFixed(0)}M (25)</span>
                    <span className="v26">R$ {(sec.budget2026 / 1000000).toFixed(0)}M (26)</span>
                  </div>
                </div>
                <div className="bar-bg">
                  <div 
                    className="bar-fill" 
                    style={{ width: `${(sec.budget2026 / 1300000000) * 100}%` }} 
                  />
                  <div 
                    className="bar-fill secondary" 
                    style={{ width: `${(sec.budget2025 / 1300000000) * 100}%` }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <BiddingFeed />
      </div>

      <div className="overview-grid">
        <div className="glass-card action-hub" style={{ gridColumn: 'span 2' }}>
          <div className="card-header">
            <h3>Portais de Acesso Rápido</h3>
          </div>
          <div className="action-list">
            <button className="action-btn" onClick={() => window.open('https://imprensaoficial.rr.gov.br', '_blank')}>
              <Terminal size={18} />
              <span>Diário Oficial (DOE-RR 2026)</span>
            </button>
            <button className="action-btn" onClick={() => window.open('https://pncp.gov.br/app/editais?uf=RR&ano=2026', '_blank')}>
              <Database size={18} />
              <span>PNCP - Licitações Roraima</span>
            </button>
            <button className="action-btn" onClick={() => window.open('https://selc.rr.gov.br', '_blank')}>
              <ShieldCheck size={18} />
              <span>SELC-RR - Editais e Atas</span>
            </button>
            <button className="action-btn" onClick={() => window.open('https://sei.rr.gov.br', '_blank')}>
              <Activity size={18} />
              <span>SEI-RR - Consulta Pública</span>
            </button>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .overview-stats {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 1.5rem;
        }

        .stat-mini-card {
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }

        .stat-icon {
          padding: 0.75rem;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stat-content {
          display: flex;
          flex-direction: column;
        }

        .stat-value {
          font-size: 1.5rem;
          font-weight: 800;
          font-family: var(--font-mono);
          line-height: 1;
        }

        .stat-label {
          font-size: 0.8rem;
          color: var(--text-secondary);
          margin-top: 0.25rem;
        }

        .overview-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 1.5rem;
        }

        @media (max-width: 1024px) {
          .overview-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 640px) {
          .overview-stats {
            grid-template-columns: 1fr;
          }
          .module-container {
            padding: 1rem;
          }
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .main-chart-placeholder, .action-hub {
          padding: 2rem;
        }

        .mock-chart {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .chart-bar-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .bar-label {
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .bar-bg {
          height: 8px;
          background: var(--bg-accent);
          border-radius: 99px;
          overflow: hidden;
        }

        .bar-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--accent-blue), var(--accent-cyan));
          border-radius: 99px;
          box-shadow: 0 0 15px rgba(0, 242, 255, 0.3);
          position: relative;
          z-index: 2;
        }

        .bar-fill.secondary {
          position: absolute;
          top: 0;
          left: 0;
          background: rgba(255, 255, 255, 0.1);
          box-shadow: none;
          z-index: 1;
        }

        .sec-label-meta {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .acronym-tag {
          font-weight: 700;
          color: var(--text-primary);
        }

        .pca-link {
          font-size: 0.7rem;
          background: rgba(0, 242, 255, 0.1);
          color: var(--accent-cyan);
          border: 1px solid rgba(0, 242, 255, 0.2);
          padding: 0.1rem 0.4rem;
          border-radius: 4px;
          cursor: pointer;
        }

        .budget-values {
          display: flex;
          gap: 1rem;
          font-family: var(--font-mono);
          font-size: 0.75rem;
        }

        .v25 { color: var(--text-secondary); }
        .v26 { color: var(--accent-cyan); font-weight: 700; }

        .action-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .action-btn {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: var(--bg-accent);
          border: 1px solid var(--border-glass);
          border-radius: 8px;
          color: var(--text-primary);
          cursor: pointer;
          transition: all 0.2s;
          font-size: 0.9rem;
          text-align: left;
        }

        .action-btn:hover {
          border-color: var(--accent-cyan);
          background: rgba(0, 242, 255, 0.05);
          transform: translateX(4px);
        }
      `}} />
    </div>
  );
};
