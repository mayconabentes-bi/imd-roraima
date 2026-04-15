import React, { useState } from 'react';
import { fiscalData } from '../data/finance';
import { 
  TrendingUp, 
  TrendingDown, 
  PieChart as PieChartIcon, 
  BarChart2, 
  Wallet,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

export const FinanceAnalytics: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState(2025);
  const data = fiscalData.find(d => d.year === selectedYear) || fiscalData[1];

  const totalBudget = data.totalRevenueForecast;
  const functionalData = [
    { name: 'Saúde', value: data.healthSpend, color: '#10b981' },
    { name: 'Educação', value: data.educationSpend, color: '#3b82f6' },
    { name: 'Segurança', value: data.securitySpend, color: '#ef4444' },
    { name: 'Outros', value: totalBudget - (data.healthSpend + data.educationSpend + data.securitySpend), color: '#6b7280' },
  ];

  const formatBRL = (val: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', notation: 'compact' }).format(val);

  return (
    <div className="module-container">
      <header className="module-header">
        <div>
          <h1 className="gradient-text">Inteligência Financeira</h1>
          <p className="subtitle">Análise orçamentária, fiscal e de transferências do Estado.</p>
        </div>
        <div className="year-selector tabs">
          {fiscalData.map(d => (
            <button 
              key={d.year}
              className={`tab-btn ${selectedYear === d.year ? 'active' : ''}`}
              onClick={() => setSelectedYear(d.year)}
            >
              {d.year}
            </button>
          ))}
        </div>
      </header>

      <div className="overview-stats">
        <div className="glass-card stat-mini-card">
          <div className="stat-icon icon-cyan">
            <Wallet size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{formatBRL(data.totalRevenueForecast)}</span>
            <span className="stat-label">Receita Prevista</span>
          </div>
          <ArrowUpRight className="indicator up" size={16} />
        </div>
        <div className="glass-card stat-mini-card">
          <div className="stat-icon icon-blue">
            <TrendingDown size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{formatBRL(data.totalExpenseForecast)}</span>
            <span className="stat-label">Despesa Fixada</span>
          </div>
          <ArrowDownRight className="indicator down" size={16} />
        </div>
        <div className="glass-card stat-mini-card">
          <div className="stat-icon icon-green">
            <TrendingUp size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{formatBRL(data.totalRevenueForecast - data.totalExpenseForecast >= 0 ? data.totalRevenueForecast - data.totalExpenseForecast : 0)}</span>
            <span className="stat-label">Equilíbrio Fiscal</span>
          </div>
        </div>
      </div>

      <div className="finance-grid">
        <div className="glass-card functional-distribution">
          <div className="card-header">
            <h3>Distribuição por Área (Função)</h3>
            <PieChartIcon size={18} color="var(--accent-cyan)" />
          </div>
          <div className="distribution-list">
            {functionalData.map(item => (
              <div key={item.name} className="dist-item">
                <div className="dist-meta">
                  <span className="dot" style={{ backgroundColor: item.color }} />
                  <span className="name">{item.name}</span>
                </div>
                <div className="dist-values">
                  <span className="val">{formatBRL(item.value)}</span>
                  <span className="pct">{((item.value / totalBudget) * 100).toFixed(1)}%</span>
                </div>
                <div className="progress-bg">
                  <div className="progress-fill" style={{ width: `${(item.value / totalBudget) * 100}%`, backgroundColor: item.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card revenue-sources">
          <div className="card-header">
            <h3>Principais Fontes de Receita</h3>
            <BarChart2 size={18} color="var(--accent-cyan)" />
          </div>
          <div className="sources-visual">
            <div className="source-bar-group">
              <label>FPE (Transferência Federal)</label>
              <div className="bar-wrapper">
                <div className="bar-label">{((data.transfers.fpe / data.totalRevenueForecast) * 100).toFixed(0)}%</div>
                <div className="bar-fill-source" style={{ width: `${(data.transfers.fpe / data.totalRevenueForecast) * 100}%` }} />
              </div>
            </div>
            <div className="source-bar-group">
              <label>ICMS (Arrecadação Própria)</label>
              <div className="bar-wrapper">
                <div className="bar-label">{((data.transfers.icms / data.totalRevenueForecast) * 100).toFixed(0)}%</div>
                <div className="bar-fill-source blue" style={{ width: `${(data.transfers.icms / data.totalRevenueForecast) * 100}%` }} />
              </div>
            </div>
            <div className="source-bar-group">
              <label>Outras Receitas</label>
              <div className="bar-wrapper">
                <div className="bar-label">{((data.transfers.others / data.totalRevenueForecast) * 100).toFixed(0)}%</div>
                <div className="bar-fill-source gray" style={{ width: `${(data.transfers.others / data.totalRevenueForecast) * 100}%` }} />
              </div>
            </div>
          </div>
          <div className="fiscal-note">
            <span className="icon">ℹ️</span>
            <p>Roraima mantém alta dependência de transferências federais (FPE), representando mais de 40% da composição orçamentária.</p>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .finance-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        .indicator { margin-left: auto; }
        .indicator.up { color: #10b981; }
        .indicator.down { color: #ef4444; }

        .distribution-list {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          margin-top: 1rem;
        }

        .dist-item {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .dist-meta {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
          font-size: 0.9rem;
        }

        .dot { width: 8px; height: 8px; border-radius: 50%; }

        .dist-values {
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .val { color: var(--text-primary); font-weight: 700; }

        .progress-bg {
          width: 100%;
          height: 6px;
          background: rgba(255,255,255,0.05);
          border-radius: 99px;
          overflow: hidden;
        }

        .progress-fill { height: 100%; border-radius: 99px; }

        .sources-visual {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          margin-top: 1.5rem;
        }

        .source-bar-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .source-bar-group label {
          font-size: 0.8rem;
          color: var(--text-secondary);
          font-weight: 600;
        }

        .bar-wrapper {
          position: relative;
          height: 24px;
          background: rgba(255,255,255,0.03);
          border-radius: 6px;
          overflow: hidden;
          border: 1px solid var(--border-glass);
        }

        .bar-fill-source {
          height: 100%;
          background: var(--accent-cyan);
          opacity: 0.6;
        }
        .bar-fill-source.blue { background: #3b82f6; }
        .bar-fill-source.gray { background: #6b7280; }

        .bar-label {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 0.75rem;
          font-family: var(--font-mono);
          font-weight: 700;
          color: var(--text-primary);
          z-index: 2;
        }

        .fiscal-note {
          margin-top: 2rem;
          display: flex;
          gap: 0.75rem;
          padding: 1rem;
          background: rgba(0, 242, 255, 0.05);
          border-radius: 8px;
          border-left: 3px solid var(--accent-cyan);
        }

        .fiscal-note p { font-size: 0.8rem; color: var(--text-secondary); line-height: 1.5; }

        @media (max-width: 1024px) {
          .finance-grid { grid-template-columns: 1fr; }
        }
      `}} />
    </div>
  );
};
