import React, { useState, useEffect, useMemo } from 'react';
import { type Bidding, searchTenders } from '../services/pncpApi';
import { 
  Search, 
  Download, 
  ExternalLink, 
  Loader2, 
  Filter,
  Calendar,
  Landmark,
  AlertCircle,
  TrendingUp,
  Target,
  BarChart2
} from 'lucide-react';
import { 
  PieChart, Pie, Cell, 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid 
} from 'recharts';

export const TenderIntelligence: React.FC = () => {
  const [tenders, setTenders] = useState<Bidding[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<'Todos' | 'Licitação' | 'Ata de Registro de Preço'>('Todos');

  useEffect(() => {
    loadTenders();
  }, []);

  const loadTenders = async () => {
    setLoading(true);
    const data = await searchTenders('');
    setTenders(data);
    setLoading(false);
  };

  const handleSearch = async () => {
    setLoading(true);
    const data = await searchTenders(searchTerm);
    setTenders(data);
    setLoading(false);
  };

  // --------------------------------------------------------
  // DATA ANALYTICS: AGGREGATIONS & METRICS
  // --------------------------------------------------------
  const filteredTenders = useMemo(() => {
    return tenders.filter(t => activeFilter === 'Todos' || t.tipo === activeFilter);
  }, [tenders, activeFilter]);

  const kpis = useMemo(() => {
    const totalVolume = filteredTenders.reduce((acc, curr) => acc + (curr.valor || 0), 0);
    const totalOpps = filteredTenders.length;
    const avgTicket = totalOpps > 0 ? totalVolume / totalOpps : 0;
    return { totalVolume, totalOpps, avgTicket };
  }, [filteredTenders]);

  const pieData = useMemo(() => {
    const lict = filteredTenders.filter(t => t.tipo === 'Licitação').length;
    const arp = filteredTenders.filter(t => t.tipo === 'Ata de Registro de Preço').length;
    return [
      { name: 'Licitação', value: lict },
      { name: 'Ata Registro Preço', value: arp }
    ];
  }, [filteredTenders]);

  const COLORS = ['#3b82f6', '#10b981'];

  const barData = useMemo(() => {
    const organMap: Record<string, number> = {};
    filteredTenders.forEach(t => {
      const org = t.orgao.substring(0, 30) + (t.orgao.length > 30 ? '...' : '');
      organMap[org] = (organMap[org] || 0) + (t.valor || 0);
    });
    return Object.entries(organMap)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5); // Top 5
  }, [filteredTenders]);

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', notation: 'compact' }).format(val);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip glass-card" style={{ padding: '0.5rem', border: '1px solid var(--accent-cyan)' }}>
          <p className="label" style={{ fontSize: '0.8rem', color: 'var(--text-primary)' }}>{`${payload[0].name}`}</p>
          <p className="intro" style={{ fontSize: '0.9rem', color: 'var(--accent-cyan)', fontWeight: 'bold' }}>
            {formatCurrency(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="module-container">
      <header className="module-header">
        <div>
          <h1 className="gradient-text">Market Intelligence: Licitações & Atas</h1>
          <p className="subtitle">Data Analytics Avançado para compras públicas em Roraima.</p>
        </div>
        <div className="live-status">
          <div className="pulse-dot"></div>
          <span>API PNCP LIVE</span>
        </div>
      </header>

      {/* KPI OVERVIEW (EXPERT ANALYTICS) */}
      {!loading && tenders.length > 0 && (
        <div className="analytics-dashboard">
          <div className="kpi-row">
            <div className="glass-card stat-mini-card">
              <div className="stat-icon icon-cyan"><TrendingUp size={20} /></div>
              <div className="stat-content">
                <span className="stat-value">{formatCurrency(kpis.totalVolume)}</span>
                <span className="stat-label">Volume do Mercado (Amostra)</span>
              </div>
            </div>
            <div className="glass-card stat-mini-card">
              <div className="stat-icon icon-blue"><Target size={20} /></div>
              <div className="stat-content">
                <span className="stat-value">{kpis.totalOpps}</span>
                <span className="stat-label">Oportunidades Ativas</span>
              </div>
            </div>
            <div className="glass-card stat-mini-card">
              <div className="stat-icon icon-green"><BarChart2 size={20} /></div>
              <div className="stat-content">
                <span className="stat-value">{formatCurrency(kpis.avgTicket)}</span>
                <span className="stat-label">Ticket Médio por Edital</span>
              </div>
            </div>
          </div>

          <div className="charts-row">
            <div className="glass-card chart-container">
              <div className="card-header">
                <h3>Composição por Modalidade</h3>
              </div>
              <div className="chart-wrapper pie">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#111', borderColor: '#333' }} itemStyle={{ color: '#00f2ff' }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="pie-legend">
                  <div className="legend-item"><span className="dot" style={{background: COLORS[0]}}></span> Licitação: {pieData[0]?.value}</div>
                  <div className="legend-item"><span className="dot" style={{background: COLORS[1]}}></span> ARP: {pieData[1]?.value}</div>
                </div>
              </div>
            </div>

            <div className="glass-card chart-container span-2">
              <div className="card-header">
                <h3>Top 5 Órgãos Compradores (Valor Estimado)</h3>
              </div>
              <div className="chart-wrapper bar">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                    <XAxis type="number" tickFormatter={formatCurrency} stroke="var(--text-secondary)" fontSize={11} />
                    <YAxis type="category" dataKey="name" width={150} stroke="var(--text-secondary)" fontSize={11} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="value" fill="url(#colorCyan)" radius={[0, 4, 4, 0]} barSize={20} />
                    <defs>
                      <linearGradient id="colorCyan" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8}/>
                        <stop offset="100%" stopColor="#00f2ff" stopOpacity={0.8}/>
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SEARCH AND FILTER */}
      <div className="search-advanced glass-card">
        <div className="search-row">
          <div className="search-input-wrapper">
            <Search size={20} className="search-icon" />
            <input 
              type="text" 
              placeholder="Pesquisa Profunda (Objeto, Órgão)..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <button className="primary-btn" onClick={handleSearch} disabled={loading}>
            {loading ? <Loader2 size={18} className="animate-spin" /> : 'Rodar Scraping'}
          </button>
        </div>

        <div className="filter-row">
          <Filter size={18} className="text-cyan" />
          <div className="tabs mini">
            {['Todos', 'Licitação', 'Ata de Registro de Preço'].map(f => (
              <button 
                key={f}
                className={`tab-btn ${activeFilter === f ? 'active' : ''}`}
                onClick={() => setActiveFilter(f as any)}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="loading-state">
          <Loader2 size={48} className="animate-spin text-cyan" />
          <p>Extraindo e estruturando grandes volumes de dados...</p>
        </div>
      ) : (
        <div className="tender-results grid">
          {filteredTenders.length > 0 ? (
            filteredTenders.map((tender) => (
              <div key={tender.id} className="glass-card tender-card clickable" onClick={() => window.open(tender.link, '_blank')}>
                <div className="tender-badge-row">
                  <span className={`type-tag ${tender.tipo.toLowerCase().replace(/ /g, '-')}`}>
                    {tender.tipo === 'Ata de Registro de Preço' ? 'ARP' : 'LICITAÇÃO'}
                  </span>
                  <span className="tender-date">
                    <Calendar size={14} />
                    {new Date(tender.dataPublicacao).toLocaleDateString('pt-BR')}
                  </span>
                </div>

                <div className="tender-body">
                  <h3 className="tender-title" title={tender.objeto}>{tender.objeto}</h3>
                  <div className="tender-meta">
                    <div className="meta-item">
                      <Landmark size={14} />
                      <span title={tender.orgao}>{tender.orgao}</span>
                    </div>
                  </div>
                </div>

                <div className="tender-footer">
                  <div className="tender-price">
                    <span className="label">Valor Estimado</span>
                    <span className="value">{formatCurrency(tender.valor)}</span>
                  </div>
                  <div className="tender-actions">
                    <button className="icon-btn" title="Acessar PNCP">
                      <ExternalLink size={18} />
                    </button>
                    <button className="icon-btn download" title="Documentos / Anexos" onClick={(e) => { e.stopPropagation(); window.open(tender.link, '_blank'); }}>
                      <Download size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state glass-card">
              <AlertCircle size={48} className="text-warning" />
              <h3>Nenhum resultado processado</h3>
              <p>Tente ajustar os termos da busca para encontrar novas oportunidades.</p>
              <button className="secondary-btn" onClick={() => {setSearchTerm(''); loadTenders();}}>Limpar Inteligência</button>
            </div>
          )}
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        /* Data Analytics Dashboard Grid */
        .analytics-dashboard {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .kpi-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
        }

        .charts-row {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 1.5rem;
        }

        .chart-container {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          height: 300px;
        }

        .chart-container.span-2 {
          grid-column: span 1; /* Default for medium/small */
        }

        @media (min-width: 1024px) {
          .chart-container.span-2 { grid-column: span 1; }
        }

        .chart-wrapper {
          flex: 1;
          min-height: 0;
          position: relative;
        }

        .pie-legend {
          position: absolute;
          bottom: -10px;
          left: 0;
          right: 0;
          display: flex;
          justify-content: center;
          gap: 1rem;
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .legend-item { display: flex; align-items: center; gap: 0.3rem; }
        .dot { width: 8px; height: 8px; border-radius: 50%; }

        /* General UI styles from previous version + responsividade */
        .search-advanced {
          padding: 1.5rem;
          margin-bottom: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .search-row {
          display: flex;
          gap: 1rem;
        }

        .search-input-wrapper {
          flex: 1;
          background: rgba(255,255,255,0.05);
          border: 1px solid var(--border-glass);
          border-radius: 12px;
          display: flex;
          align-items: center;
          padding: 0 1.25rem;
          gap: 1rem;
        }

        .search-input-wrapper input {
          background: transparent;
          border: none;
          color: white;
          width: 100%;
          height: 50px;
          outline: none;
          font-size: 1rem;
        }

        .filter-row {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          flex-wrap: wrap; /* Allows tabs to wrap on mobile */
        }

        .tabs.mini {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .tabs.mini .tab-btn {
          padding: 0.4rem 1rem;
          font-size: 0.8rem;
          border-radius: 6px;
        }

        .tender-results {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 1.5rem;
        }

        .tender-card {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem; /* slightly tighter */
          border-left: 4px solid transparent;
          min-height: 250px;
        }

        .tender-badge-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .tender-body {
          flex: 1; /* Pushes footer down */
          display: flex;
          flex-direction: column;
        }

        .tender-title {
          font-size: 1rem;
          line-height: 1.4;
          height: auto;
          margin-bottom: 0.75rem;
        }

        .meta-item {
          display: flex;
          align-items: flex-start;
          gap: 0.6rem;
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        .meta-item span {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .tender-footer {
          margin-top: auto;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          padding-top: 1rem;
          border-top: 1px solid var(--border-glass);
        }

        @media (max-width: 1024px) {
          .charts-row { grid-template-columns: 1fr; }
        }

        @media (max-width: 768px) {
          .search-row { flex-direction: column; }
          .tender-results { grid-template-columns: 1fr; }
          .kpi-row { grid-template-columns: 1fr; }
          .module-container { padding: 1rem; }
        }
      `}} />
    </div>
  );
};
