import React, { useState, useEffect, useRef } from 'react';
import { ServerlessUnit, UnitComment, UnitFile, getUnitComments, getUnitFilesSummary, addUnitComment, addUnitFile, getUnitFileBase64 } from '../services/neonDb';
import { X, Upload, MessageSquare, AlertTriangle, ShieldCheck, Info, FileText, Image as ImageIcon, Download, Loader2 } from 'lucide-react';

interface UnitModalProps {
  unit: ServerlessUnit;
  onClose: () => void;
}

export const UnitModal: React.FC<UnitModalProps> = ({ unit, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'files' | 'comments'>('overview');
  
  // Comments State
  const [comments, setComments] = useState<UnitComment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [criticality, setCriticality] = useState<'Normal' | 'Atenção' | 'Urgente'>('Normal');
  const [loadingComments, setLoadingComments] = useState(false);

  // Files State
  const [files, setFiles] = useState<UnitFile[]>([]);
  const [loadingFiles, setLoadingFiles] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (activeTab === 'comments') loadComments();
    if (activeTab === 'files') loadFiles();
  }, [activeTab]);

  const loadComments = async () => {
    setLoadingComments(true);
    const data = await getUnitComments(unit.id);
    setComments(data);
    setLoadingComments(false);
  };

  const loadFiles = async () => {
    setLoadingFiles(true);
    const data = await getUnitFilesSummary(unit.id);
    setFiles(data);
    setLoadingFiles(false);
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment || !authorName) return;
    const ok = await addUnitComment(unit.id, authorName, newComment, criticality);
    if (ok) {
      setNewComment('');
      loadComments();
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    
    // File size safety (Limit to ~3MB to prevent base64 DB overload on free tiers)
    if (file.size > 3 * 1024 * 1024) {
      alert('Arquivo excede o limite de 3MB. Utilize outro método de compressão.');
      return;
    }

    setUploading(true);
    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64 = event.target?.result as string;
      const ok = await addUnitFile(unit.id, file.name, file.type, base64);
      if (ok) {
        loadFiles();
      }
      setUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const downloadFile = async (fileId: number, fileName: string) => {
    const base64 = await getUnitFileBase64(fileId);
    if (!base64) return;
    
    const a = document.createElement('a');
    a.href = base64;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content glass-card">
        <button className="close-btn" onClick={onClose}><X size={24} /></button>
        
        <div className="modal-header">
          <span className={`category-badge ${unit.category.toLowerCase().replace(' ', '-')}`}>
            {unit.category}
          </span>
          <h2>{unit.name}</h2>
          <p className="unit-id">ID Operacional: {unit.id}</p>
        </div>

        <div className="modal-tabs">
          <button className={`tab ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
            Visão Geral
          </button>
          <button className={`tab ${activeTab === 'files' ? 'active' : ''}`} onClick={() => setActiveTab('files')}>
            Arquivos & Mídia ({files.length}/50)
          </button>
          <button className={`tab ${activeTab === 'comments' ? 'active' : ''}`} onClick={() => setActiveTab('comments')}>
            Intelligence Log ({comments.length}/10)
          </button>
        </div>

        <div className="modal-body">
          {activeTab === 'overview' && (
            <div className="overview-tab">
              <div className="info-block">
                <h4><Info size={18}/> Função Principal</h4>
                <p>{unit.function_desc}</p>
              </div>
              <div className="info-block">
                <h4><ShieldCheck size={18}/> Público Atendido</h4>
                <p>{unit.public_served}</p>
              </div>
              <div className="risk-block">
                <h4><AlertTriangle size={18}/> Perfil de Risco</h4>
                <p>{unit.risk_profile}</p>
              </div>
            </div>
          )}

          {activeTab === 'files' && (
            <div className="files-tab">
              <div className="upload-zone" onClick={() => fileInputRef.current?.click()}>
                {uploading ? (
                  <Loader2 className="animate-spin text-cyan" size={32} />
                ) : (
                  <>
                    <Upload size={32} className="text-cyan mb-2" />
                    <p>Clique para enviar imagem, PDF ou Documentos</p>
                    <span className="text-xs text-secondary mt-1">Limiite: 3MB / Arquivo (Base64)</span>
                  </>
                )}
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  style={{ display: 'none' }} 
                  onChange={handleFileUpload} 
                  accept="image/*,.pdf,.csv,.xlsx"
                />
              </div>

              {loadingFiles ? <p>Carregando arquivos...</p> : (
                <div className="file-list">
                  {files.map(f => (
                    <div key={f.id} className="file-item">
                      <div className="file-info">
                        {f.file_type.includes('image') ? <ImageIcon size={20} className="text-blue" /> : <FileText size={20} className="text-cyan" />}
                        <span className="file-name" title={f.file_name}>{f.file_name}</span>
                      </div>
                      <button className="download-btn" onClick={() => downloadFile(f.id, f.file_name)}>
                        <Download size={16} /> Baixar
                      </button>
                    </div>
                  ))}
                  {files.length === 0 && <p className="text-secondary text-sm">Nenhum arquivo armazenado nesta unidade.</p>}
                </div>
              )}
            </div>
          )}

          {activeTab === 'comments' && (
            <div className="comments-tab">
              <form onSubmit={handleAddComment} className="comment-form">
                <div className="form-row">
                  <input 
                    type="text" 
                    placeholder="Seu Nome / Matrícula" 
                    value={authorName} 
                    onChange={e => setAuthorName(e.target.value)} 
                    required 
                  />
                  <select value={criticality} onChange={(e: any) => setCriticality(e.target.value)}>
                    <option value="Normal">Normal</option>
                    <option value="Atenção">Atenção</option>
                    <option value="Urgente">Urgente</option>
                  </select>
                </div>
                <textarea 
                  placeholder="Relatório ou Observação de Inteligência..." 
                  value={newComment}
                  onChange={e => setNewComment(e.target.value)}
                  rows={3}
                  required
                />
                <button type="submit" className="submit-comment-btn" disabled={comments.length >= 10}>
                  <MessageSquare size={16} />
                  Adicionar Log
                </button>
              </form>

              <div className="comments-list">
                {loadingComments ? <p>Carregando logs...</p> : (
                  comments.map(c => (
                    <div key={c.id} className={`comment-card level-${c.level.toLowerCase().replace('ç', 'c').replace('ã', 'a')}`}>
                      <div className="comment-header">
                        <strong>{c.author}</strong>
                        <span className="comment-level">{c.level}</span>
                      </div>
                      <p className="comment-body">{c.content}</p>
                      <span className="comment-date">{new Date(c.created_at).toLocaleString('pt-BR')}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .modal-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.8); backdrop-filter: blur(5px);
          display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 1rem;
        }
        .modal-content {
          background: #0f1115; width: 100%; max-width: 700px; max-height: 90vh;
          border-radius: 16px; display: flex; flex-direction: column; position: relative;
          box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5); overflow: hidden;
        }
        .close-btn {
          position: absolute; top: 1rem; right: 1rem; background: transparent; border: none;
          color: var(--text-secondary); cursor: pointer; transition: 0.2s;
        }
        .close-btn:hover { color: white; transform: rotate(90deg); }
        .modal-header { padding: 2rem 2rem 1rem; border-bottom: 1px solid var(--border-glass); }
        .modal-header h2 { margin: 0.5rem 0 0.2rem; font-size: 1.5rem; color: #fff; }
        .modal-tabs { display: flex; background: rgba(255,255,255,0.02); border-bottom: 1px solid var(--border-glass); }
        .tab {
          flex: 1; padding: 1rem; background: transparent; border: none; color: var(--text-secondary);
          font-weight: 600; cursor: pointer; transition: 0.2s; border-bottom: 2px solid transparent;
        }
        .tab.active { color: var(--accent-cyan); border-bottom-color: var(--accent-cyan); background: rgba(0,242,255,0.05); }
        .modal-body { padding: 2rem; overflow-y: auto; flex: 1; }
        
        .overview-tab .info-block { margin-bottom: 1.5rem; }
        .overview-tab h4 { display: flex; align-items: center; gap: 0.5rem; color: var(--text-secondary); margin-bottom: 0.5rem; }
        .risk-block { background: rgba(239, 68, 68, 0.05); border: 1px solid rgba(239, 68, 68, 0.1); padding: 1rem; border-radius: 8px; }
        .risk-block h4 { color: #ef4444; }

        .upload-zone {
          border: 2px dashed var(--border-glass); border-radius: 12px; padding: 2.5rem;
          text-align: center; cursor: pointer; transition: 0.2s; margin-bottom: 1.5rem;
          display: flex; flex-direction: column; align-items: center;
        }
        .upload-zone:hover { border-color: var(--accent-cyan); background: rgba(0,242,255,0.02); }
        
        .file-list { display: flex; flex-direction: column; gap: 0.75rem; }
        .file-item { display: flex; justify-content: space-between; align-items: center; padding: 0.75rem; background: rgba(255,255,255,0.03); border-radius: 8px; }
        .file-info { display: flex; align-items: center; gap: 0.75rem; overflow: hidden; }
        .file-name { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 300px; font-size: 0.9rem; }
        .download-btn { display: flex; align-items: center; gap: 0.4rem; padding: 0.4rem 0.8rem; border-radius: 4px; border: none; background: #3b82f6; color: white; cursor: pointer; font-size: 0.8rem; font-weight: 600; }
        
        .comment-form { display: flex; flex-direction: column; gap: 1rem; margin-bottom: 2rem; }
        .form-row { display: flex; gap: 1rem; }
        .comment-form input, .comment-form textarea, .comment-form select {
          padding: 0.75rem; border-radius: 8px; border: 1px solid var(--border-glass);
          background: rgba(0,0,0,0.2); color: white; font-family: inherit; width: 100%;
        }
        .submit-comment-btn { padding: 0.75rem; background: var(--accent-cyan); color: black; font-weight: 700; border: none; border-radius: 8px; cursor: pointer; display: flex; justify-content: center; gap: 0.5rem; }
        .submit-comment-btn:disabled { background: var(--border-glass); cursor: not-allowed; }
        
        .comments-list { display: flex; flex-direction: column; gap: 1rem; }
        .comment-card { padding: 1rem; border-radius: 8px; border-left: 3px solid var(--border-glass); background: rgba(255,255,255,0.02); }
        .comment-card.level-normal { border-left-color: #3b82f6; }
        .comment-card.level-atencao { border-left-color: #f59e0b; }
        .comment-card.level-urgente { border-left-color: #ef4444; background: rgba(239, 68, 68, 0.05); }
        .comment-header { display: flex; justify-content: space-between; margin-bottom: 0.5rem; }
        .comment-level { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 700; opacity: 0.8; }
        .comment-body { font-size: 0.9rem; margin-bottom: 0.5rem; line-height: 1.4; color: var(--text-primary); }
        .comment-date { font-size: 0.7rem; color: var(--text-secondary); }
      `}}/>
    </div>
  );
};
