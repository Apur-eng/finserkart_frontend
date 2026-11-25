import { Check, FileText, FolderOpen, LayoutDashboard, Receipt, Users } from 'lucide-react';
export function PlatformPreview({ expanded = false }: { expanded?: boolean }) {
 return <div className={`platform-preview ${expanded ? 'preview-expanded' : ''}`} aria-label="Illustrative customer application preview">
  <div className="preview-top"><span className="preview-wordmark">finservkart.</span><span className="example-label">FICTIONAL EXAMPLE</span></div>
  <div className="preview-workspace">{expanded && <div className="preview-sidebar" aria-hidden="true"><span><LayoutDashboard size={16}/>Overview</span><span><FileText size={16}/>Applications</span><span><FolderOpen size={16}/>Documents</span><span><Receipt size={16}/>Payment records</span></div>}
  <div className="preview-main"><div className="preview-title"><div><small>YOUR APPLICATION</small><h3>GST Registration</h3><span className="preview-id">Example Business &middot; DEMO-001</span></div><span className="status-tag status-info">Under review</span></div>
  <ol className="preview-timeline">{['Application submitted','Documents received','Under review','Completed'].map((step,i)=><li key={step} className={i<2?'step-complete':i===2?'step-current':''}><span>{i<2?<Check size={13}/>:i+1}</span><div>{step}<small>{['Request created','Files added to application','Professional review','Deliverables available'][i]}</small></div></li>)}</ol>
  <div className="preview-document"><FileText size={22}/><div><strong>Application documents</strong><small>All your files, organised in one place</small></div><Check size={17}/></div>
  </div></div><p className="preview-caption">Illustrative interface. No live customer information.</p>
 </div>;
}
export function PartnerIllustration({ network = false }: { network?: boolean }) {
 return <div className={`partner-illustration ${network?'network-illustration':''}`} aria-label={network?'Illustration of a franchise and its agent network':'Illustration of agent customer and application management'}>
 <p className="illustration-label">ONE CONNECTED PLATFORM</p><div className="network-hub">{network?<Users size={28}/>:<LayoutDashboard size={28}/>}<strong>{network?'Your franchise':'Your agent workspace'}</strong></div>
 <div className="network-branches">{(network?['Agent network','Customers','Applications']:['Customers','Applications','Commission status']).map((label,i)=><div key={label}><span className="network-node">{i===0?<Users size={21}/>:i===1?<FileText size={21}/>:<Receipt size={21}/>}</span><span>{label}</span></div>)}</div><small>Workspace illustration</small>
 </div>;
}
