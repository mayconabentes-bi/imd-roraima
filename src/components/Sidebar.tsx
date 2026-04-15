import React from 'react';
import { 
  Shield, 
  Gavel, 
  BarChart3, 
  Settings, 
  Cpu,
  Home
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Overview', icon: Home },
    { id: 'legal', label: 'Jurídico', icon: Gavel },
    { id: 'stats', label: 'Dados & Estatísticas', icon: BarChart3 },
    { id: 'eng', label: 'Engenharia', icon: Cpu },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <Shield className="logo-icon" />
        <span className="logo-text">Inteligência de Mercado Semper - RR</span>
      </div>
      
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="nav-item">
          <Settings size={20} />
          <span>Configurações</span>
        </button>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .sidebar {
          width: 260px;
          background: var(--bg-secondary);
          border-right: 1px solid var(--border-glass);
          display: flex;
          flex-direction: column;
          padding: 1.5rem;
          height: 100vh;
          position: sticky;
          top: 0;
        }

        .sidebar-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 2.5rem;
          padding: 0 0.5rem;
        }

        .logo-icon {
          color: var(--accent-cyan);
        }

        .logo-text {
          font-weight: 800;
          font-size: 1.1rem;
          letter-spacing: 0.05em;
          color: var(--text-primary);
        }

        .sidebar-nav {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          color: var(--text-secondary);
          background: transparent;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
          width: 100%;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .nav-item:hover {
          background: var(--bg-accent);
          color: var(--text-primary);
        }

        .nav-item.active {
          background: linear-gradient(90deg, var(--bg-accent), transparent);
          color: var(--accent-cyan);
          border-left: 2px solid var(--accent-cyan);
        }

        .sidebar-footer {
          margin-top: auto;
          border-top: 1px solid var(--border-glass);
          padding-top: 1.5rem;
        }
      `}} />
    </aside>
  );
};
