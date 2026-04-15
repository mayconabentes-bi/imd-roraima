import React from 'react';
import { 
  Shield, 
  Gavel, 
  BarChart3, 
  Settings, 
  Cpu,
  Home,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isCollapsed: boolean;
  toggleSidebar: () => void;
  isMobileOpen: boolean;
  closeMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  activeTab, 
  setActiveTab, 
  isCollapsed, 
  toggleSidebar,
  isMobileOpen,
  closeMobile
}) => {
  const menuItems = [
    { id: 'dashboard', label: 'Overview', icon: Home },
    { id: 'legal', label: 'Jurídico', icon: Gavel },
    { id: 'stats', label: 'Dados & Estatísticas', icon: BarChart3 },
    { id: 'eng', label: 'Engenharia', icon: Cpu },
  ];

  const sidebarVariants = {
    expanded: { width: 260 },
    collapsed: { width: 80 },
    mobileOpen: { x: 0, width: 260 },
    mobileClosed: { x: '-100%', width: 260 }
  };

  const isMobile = window.innerWidth < 768;

  const content = (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''} ${isMobile ? 'mobile' : ''}`}>
      <div className="sidebar-header">
        <div className="logo-section">
          <Shield className="logo-icon" />
          <AnimatePresence>
            {!isCollapsed && (
              <motion.span 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="logo-text"
              >
                IM Semper
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        
        {!isMobile && (
          <button className="collapse-toggle" onClick={toggleSidebar}>
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        )}
        
        {isMobile && (
          <button className="collapse-toggle" onClick={closeMobile}>
            <X size={20} />
          </button>
        )}
      </div>
      
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
            title={isCollapsed ? item.label : ''}
          >
            <item.icon size={20} className="nav-icon" />
            <AnimatePresence>
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="nav-item">
          <Settings size={20} className="nav-icon" />
          {!isCollapsed && <span>Configurações</span>}
        </button>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .sidebar {
          background: var(--bg-secondary);
          border-right: 1px solid var(--border-glass);
          display: flex;
          flex-direction: column;
          padding: 1.25rem 1rem;
          height: 100vh;
          position: sticky;
          top: 0;
          transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 1000;
          overflow: hidden;
        }

        .sidebar.mobile {
          position: fixed;
          left: 0;
          transform: translateX(-100%);
          transition: transform 0.3s ease;
        }

        .sidebar.mobile-open {
          transform: translateX(0);
        }

        .sidebar-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 2.5rem;
          padding: 0 0.5rem;
          min-height: 40px;
        }

        .logo-section {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          overflow: hidden;
        }

        .logo-icon {
          color: var(--accent-cyan);
          flex-shrink: 0;
        }

        .logo-text {
          font-weight: 800;
          font-size: 1rem;
          letter-spacing: 0.05em;
          color: var(--text-primary);
          white-space: nowrap;
        }

        .collapse-toggle {
          background: var(--bg-accent);
          border: 1px solid var(--border-glass);
          color: var(--text-secondary);
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }

        .collapse-toggle:hover {
          color: var(--accent-cyan);
          border-color: var(--accent-cyan);
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
          gap: 1rem;
          padding: 0.75rem;
          border-radius: 8px;
          color: var(--text-secondary);
          background: transparent;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
          width: 100%;
          font-size: 0.9rem;
          font-weight: 500;
          overflow: hidden;
          white-space: nowrap;
        }

        .nav-icon {
          flex-shrink: 0;
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

        .sidebar.collapsed {
          padding: 1.25rem 0.75rem;
        }

        .sidebar.collapsed .sidebar-header {
          justify-content: center;
        }

        .sidebar.collapsed .logo-section {
          gap: 0;
        }

        .sidebar-footer {
          margin-top: auto;
          border-top: 1px solid var(--border-glass);
          padding-top: 1.5rem;
        }
      `}} />
    </aside>
  );

  return (
    <motion.div
      initial={isMobile ? "mobileClosed" : "expanded"}
      animate={isMobile ? (isMobileOpen ? "mobileOpen" : "mobileClosed") : (isCollapsed ? "collapsed" : "expanded")}
      variants={sidebarVariants}
      style={{ position: isMobile ? 'fixed' : 'relative', zIndex: 1001 }}
    >
      {content}
      {isMobile && isMobileOpen && (
        <div className="sidebar-overlay" onClick={closeMobile} />
      )}
      <style dangerouslySetInnerHTML={{ __html: `
        .sidebar-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(4px);
          z-index: 1000;
        }
      `}} />
    </motion.div>
  );
};
