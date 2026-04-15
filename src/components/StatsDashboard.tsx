import React, { useState, useEffect } from 'react';
import { secretariatStats, incidents } from '../data/stats';
import { fetchMacroIndicators, type MacroData } from '../services/macroApi';
import { Users, Landmark, AlertTriangle, MapPin, Globe, TrendingUp, Percent, Loader2 } from 'lucide-react';

export const StatsDashboard: React.FC = () => {
  const [macroData, setMacroData] = useState<MacroData | null>(null);
  const [loadingMacro, setLoadingMacro] = useState(true);

  useEffect(() => {
    const loadMacro = async () => {
      setLoadingMacro(true);
      const data = await fetchMacroIndicators();
      setMacroData(data);
      setLoadingMacro(false);
    };
    loadMacro();
  }, []);

  return (
    <div className="module-container">
      <header className="module-header">
        <div>
          <h1 className="gradient-text">Dados & Estatísticas</h1>
          <p className="subtitle">Análise demográfica, econômica e funcional do Estado.</p>
        </div>
      </header>

      {/* MACROECONOMIA SECTION (100% REAL API) */}
      <section className="macro-section">
        <h2 className="section-title">
          <Globe size={20} color="var(--accent-cyan)" />
          Macroeconomia & Demografia (Ao Vivo - Governo Federal)
        </h2>
        {loadingMacro ? (
          <div className="loading-state glass-card" style={{ padding: '2rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Loader2 size={24} className="animate-spin text-cyan" />
            <span>Sincronizando com IBGE e Banco Central...</span>
          </div>
        ) : (
          <div className="macro-grid">
            <div className="glass-card stat-mini-card">
              <div className="stat-icon icon-cyan" style={{ position: 'relative' }}>
                <Users size={20} />
                <div className="live-indicator small pulse"></div>
              </div>
              <div className="stat-content">
                <span className="stat-value">{macroData?.populationRR?.toLocaleString('pt-BR')}</span>
                <span className="stat-label">População Projetada (IBGE)</span>
              </div>
            </div>
            
            <div className="glass-card stat-mini-card">
              <div className="stat-icon icon-blue" style={{ position: 'relative' }}>
                <Percent size={20} />
                <div className="live-indicator small pulse"></div>
              </div>
              <div className="stat-content">
                <span className="stat-value">{macroData?.selicRate?.toFixed(2)}% <span style={{fontSize: '0.8rem'}}>a.a.</span></span>
                <span className="stat-label">Taxa Selic Base (BCB)</span>
              </div>
            </div>

            <div className="glass-card stat-mini-card">
              <div className="stat-icon icon-green" style={{ position: 'relative' }}>
                <TrendingUp size={20} />
                <div className="live-indicator small pulse"></div>
              </div>
              <div className="stat-content">
                <span className="stat-value">{macroData?.ipca12m?.toFixed(2)}%</span>
                <span className="stat-label">Inflação IPCA 12m (BCB)</span>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ADMINISTRAÇÃO DIRETA SECTION */}
      <section className="admin-section" style={{ marginTop: '2rem' }}>
        <h2 className="section-title">
          <Landmark size={20} color="#3b82f6" />
          Perfil da Administração (SETRABES, SESP, SEED)
        </h2>
        <div className="stats-grid">
          {secretariatStats.map((sec) => (
            <div key={sec.id} className="glass-card sec-card">
              <div className="sec-header">
                <div className="acronym">{sec.acronym}</div>
                <span className="type-badge">{sec.type}</span>
              </div>
              <h3>{sec.name}</h3>
              
              <div className="sec-metrics">
                <div className="metric">
                  <Users size={16} />
                  <div className="metric-info">
                    <span className="label">Servidores</span>
                    <span className="value">{sec.employees.toLocaleString()}</span>
                  </div>
                </div>
                <div className="metric">
                  <Landmark size={16} />
                  <div className="metric-info">
                    <span className="label">Orçamento 2026</span>
                    <span className="value">R$ {(sec.budget2026 / 1000000).toFixed(0)}M</span>
                  </div>
                </div>
              </div>

              <div className="sec-locations">
                <MapPin size={14} />
                <span>{sec.locations.join(' • ')}</span>
              </div>

              <div className="security-justification">
                <h4>Justificativa de Segurança Pública</h4>
                <p>{sec.justificationForSecurity}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* INCIDENTS SECTION */}
      <section className="incidents-section" style={{ marginTop: '2rem' }}>
        <h2 className="section-title">
          <AlertTriangle size={20} color="#f59e0b" />
          Mapa de Ocorrências e Riscos (Tático)
        </h2>
        <div className="incident-table glass-card">
          <div className="table-header">
            <span>Data</span>
            <span>Tipo</span>
            <span>Localização</span>
            <span>Impacto</span>
          </div>
          {incidents.map((incident) => (
            <div key={incident.id} className="table-row">
              <span className="date">{new Date(incident.date).toLocaleDateString()}</span>
              <span className="type">{incident.type}</span>
              <span className="loc">{incident.location}</span>
              <span className="impact">
                <div className="impact-bar">
                  <div 
                    className="impact-fill" 
                    style={{ 
                      width: `${incident.impactScore * 10}%`,
                      backgroundColor: incident.impactScore > 7 ? '#ef4444' : '#f59e0b'
                    }} 
                  />
                </div>
              </span>
            </div>
          ))}
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        .macro-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
          margin-top: 1rem;
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
          text-transform: uppercase;
        }

        .live-indicator.small {
          position: absolute;
          top: -4px;
          right: -4px;
          width: 8px;
          height: 8px;
          background-color: #10b981;
          border-radius: 50%;
        }

        .pulse {
          animation: pulse-ring 2s infinite;
        }

        @keyframes pulse-ring {
          0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
          70% { box-shadow: 0 0 0 6px rgba(16, 185, 129, 0); }
          100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
          gap: 1.5rem;
          margin-top: 1rem;
        }

        .sec-card {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .sec-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .acronym {
          font-family: var(--font-mono);
          background: var(--bg-accent);
          padding: 0.25rem 0.75rem;
          border-radius: 4px;
          color: var(--accent-cyan);
          font-weight: 700;
        }

        .type-badge {
          font-size: 0.7rem;
          text-transform: uppercase;
          opacity: 0.6;
          letter-spacing: 0.1em;
        }

        .sec-metrics {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 8px;
        }

        .metric {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: var(--text-secondary);
        }

        .metric-info {
          display: flex;
          flex-direction: column;
        }

        .metric-info .label {
          font-size: 0.7rem;
          text-transform: uppercase;
        }

        .metric-info .value {
          color: var(--text-primary);
          font-weight: 700;
          font-size: 1rem;
        }

        .sec-locations {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        .security-justification {
          border-top: 1px solid var(--border-glass);
          padding-top: 1rem;
        }

        .security-justification h4 {
          font-size: 0.8rem;
          color: var(--accent-cyan);
          margin-bottom: 0.5rem;
          text-transform: uppercase;
        }

        .security-justification p {
          font-size: 0.85rem;
          line-height: 1.5;
          color: var(--text-secondary);
        }

        .section-title {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 1.15rem;
          margin-bottom: 1rem;
        }

        .incident-table {
          width: 100%;
          overflow: hidden;
        }

        .table-header, .table-row {
          display: grid;
          grid-template-columns: 120px 100px 1fr 150px;
          padding: 1rem 1.5rem;
          align-items: center;
        }

        .table-header {
          background: rgba(255,255,255,0.05);
          font-weight: 700;
          font-size: 0.8rem;
          text-transform: uppercase;
          color: var(--text-secondary);
        }

        .table-row {
          border-top: 1px solid var(--border-glass);
          font-size: 0.9rem;
        }

        .table-row:hover {
          background: rgba(255,255,255,0.02);
        }

        .impact-bar {
          width: 100%;
          height: 6px;
          background: var(--bg-accent);
          border-radius: 99px;
          overflow: hidden;
        }

        .impact-fill {
          height: 100%;
          transition: width 1s ease-out;
        }

        @media (max-width: 768px) {
          .stats-grid { grid-template-columns: 1fr; }
          .macro-grid { grid-template-columns: 1fr; }
          .table-header, .table-row { grid-template-columns: 100px 80px 150px 100px; }
          .incident-table { overflow-x: auto; }
        }

        @media (max-width: 640px) {
          .module-container { padding: 1rem; }
          .sec-metrics { grid-template-columns: 1fr; }
        }
      `}} />
    </div>
  );
};
