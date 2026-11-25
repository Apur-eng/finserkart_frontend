import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import { selectPromotedServices } from './promotedServices';
import { servicePresentation } from './servicePresentation';
import type { ServiceRecord } from '../../api/types';
export function ServicePromotions({ services }: { services: ServiceRecord[] }) {
 const slides=selectPromotedServices(services); const [selected,setSelected]=useState(0); const pointer=useRef<{x:number;y:number}|null>(null);
 if(!slides.length)return null; const active=selected%slides.length; const {service,Icon}=slides[active]; const {description}=servicePresentation(service.service_name);
 const move=(delta:number)=>setSelected((active+delta+slides.length)%slides.length);
 return <section className={`service-spotlight spotlight-${active}`} aria-label="Featured services" aria-roledescription="carousel"
 onPointerDown={event=>{pointer.current={x:event.clientX,y:event.clientY};}} onPointerCancel={()=>{pointer.current=null;}} onPointerUp={event=>{const start=pointer.current;pointer.current=null;if(start&&Math.abs(event.clientX-start.x)>60&&Math.abs(event.clientY-start.y)<40)move(event.clientX<start.x?1:-1);}}
 onKeyDown={event=>{if(event.altKey||event.ctrlKey||event.metaKey)return;if(event.key==='ArrowRight'){event.preventDefault();move(1);}if(event.key==='ArrowLeft'){event.preventDefault();move(-1);}if(event.key==='Home'){event.preventDefault();setSelected(0);}if(event.key==='End'){event.preventDefault();setSelected(slides.length-1);}}}>
 <div className="spotlight-body"><div aria-live="polite" aria-atomic="true"><p className="eyebrow">SERVICE SPOTLIGHT &middot; {active+1} / {slides.length}</p><h2>{service.service_name}</h2><p>{description}</p><Link className="button button-secondary" to={`/services/${service.id}`}>View {service.service_name}<ArrowUpRight size={17}/></Link></div><div className="spotlight-art" aria-hidden="true"><div className="spotlight-sheet"><Icon size={54} strokeWidth={1.3}/><span/><span/><span/><div><Check size={16}/>A clear next step</div></div></div></div>
 {slides.length>1&&<div className="slider-controls"><button className="slider-arrow" onClick={()=>move(-1)}><ArrowLeft size={19}/><span className="sr-only">Previous service</span></button><div className="slider-dots" aria-label="Choose featured service">{slides.map(({service:item},index)=><button key={item.id} aria-label={`Show ${item.service_name}`} aria-pressed={active===index} onClick={()=>setSelected(index)}><span className="sr-only">{index+1}</span><span aria-hidden="true"/></button>)}</div><button className="slider-arrow" onClick={()=>move(1)}><span className="sr-only">Next service</span><ArrowRight size={19}/></button></div>}
 </section>;
}
