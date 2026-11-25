import { useEffect, useMemo, useState, type FC, type FormEvent, type MouseEvent } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronDown } from 'lucide-react';
import type { ServiceRecord } from '../api/types';
import api from '../api/client';
import { useService, useServices } from '../features/services/useServices';
import { SERVICE_EDITORIAL } from '../features/services/serviceEditorial';
import { serviceCategory } from '../features/services/serviceCategories';
import { formatCurrency, parseDocuments } from '../utils/formatters';
import { useLenis } from '../motion/core/lenis/LenisProvider';
import { useReducedMotion } from '../motion/core/variants/useReducedMotion';

type Section = { id: string; label: string };

export const ServiceDetailPage: FC = () => {
  const { id = '' } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: service, isLoading, isError } = useService(id);
  const { data: services = [] } = useServices();
  const { scrollTo } = useLenis();
  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState('overview');

  const sections = useMemo<Section[]>(() => {
    if (!service) return [];
    const editorial = SERVICE_EDITORIAL[service.id];
    const items: Section[] = [{ id: 'overview', label: 'Overview' }];
    if (editorial?.benefits.length) items.push({ id: 'benefits', label: 'Benefits' });
    if (editorial?.eligibility.length) items.push({ id: 'eligibility', label: 'Eligibility' });
    if (parseDocuments(service.required_documents).length) items.push({ id: 'documents', label: 'Documents' });
    if (editorial?.process.length) items.push({ id: 'process', label: 'Process' });
    if (service.service_price || service.govt_fees || service.total_amt) items.push({ id: 'pricing', label: 'Fees' });
    if (editorial?.faqs.length) items.push({ id: 'faqs', label: 'FAQs' });
    return items;
  }, [service]);

  useEffect(() => {
    if (!sections.length || typeof IntersectionObserver === 'undefined') return;
    const nodes = sections.map(({ id: sectionId }) => document.getElementById(sectionId)).filter((node): node is HTMLElement => Boolean(node));
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(visible.target.id);
    }, { rootMargin: '-150px 0px -62% 0px', threshold: [0, 0.1, 0.35, 0.65] });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [sections]);

  if (isLoading) return <main className="service-detail-state" role="status"><span className="service-spinner" />Loading service details…</main>;
  if (isError || !service) return <main className="service-detail-state"><h1>Service not found</h1><p>This service is not available in the current catalogue.</p><button type="button" onClick={() => navigate('/services')}>Back to all services</button></main>;

  const editorial = SERVICE_EDITORIAL[service.id];
  const documents = parseDocuments(service.required_documents);
  const related = services.filter((item) => item.id !== service.id && serviceCategory(item.service_name) === serviceCategory(service.service_name)).slice(0, 3);
  const professionalFee = Number(service.service_price);
  const governmentFee = Number(service.govt_fees);
  const total = Number(service.total_amt);
  const hasProfessionalFee = Number.isFinite(professionalFee) && service.service_price.trim() !== '';
  const hasGovernmentFee = Number.isFinite(governmentFee) && service.govt_fees.trim() !== '';
  const hasTotal = Number.isFinite(total) && service.total_amt.trim() !== '';
  const scrollToSection = (event: MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (!target) return;
    event.preventDefault();
    scrollTo(target, { offset: -140, duration: reducedMotion ? 0 : 0.65, immediate: reducedMotion });
    setActive(sectionId);
  };

  return <div className="service-detail-page">
    <nav className="service-section-nav" aria-label="On this page">
      <div className="service-section-nav__inner">{sections.map((section) => <a key={section.id} href={`#${section.id}`} className={active === section.id ? 'is-active' : ''} aria-current={active === section.id ? 'location' : undefined} onClick={(event) => scrollToSection(event, section.id)}>{section.label}</a>)}</div>
    </nav>
    <div className="service-detail-layout">
      <main className="service-detail-main">
        <Link to="/services" className="service-back"><ArrowLeft size={17} /> All services</Link>
        <section id="overview" className="service-detail-hero">
          <p className="eyebrow">{serviceCategory(service.service_name)}</p>
          <h1>{service.service_name}</h1>
          <p>{editorial?.overview || `Review the available information for ${service.service_name} and confirm the scope with our team before applying.`}</p>
          <Link className="service-primary-cta" to={`/login?serviceId=${service.id}`}>Apply for this service <ArrowUpRight size={17} /></Link>
          <Link className="service-secondary-cta" to={`/contact?service=${encodeURIComponent(service.service_name)}`}>Ask a question <ArrowRight size={17} /></Link>
        </section>

        {editorial?.benefits.length ? <section id="benefits" className="service-detail-section"><p className="eyebrow">WHAT TO EXPECT</p><h2>How this service can help</h2><ul className="service-check-list">{editorial.benefits.map((item) => <li key={item}><Check size={17} />{item}</li>)}</ul></section> : null}
        {editorial?.eligibility.length ? <section id="eligibility" className="service-detail-section"><p className="eyebrow">BEFORE YOU BEGIN</p><h2>Eligibility and fit</h2><ul>{editorial.eligibility.map((item) => <li key={item}>{item}</li>)}</ul><p className="service-editorial-note">Service guidance draft — confirm current requirements and scope with a qualified adviser.</p></section> : null}
        {documents.length ? <section id="documents" className="service-detail-section"><p className="eyebrow">PREPARATION</p><h2>Documents listed for this service</h2><p className="service-section-intro">These items come from the current service catalogue. The final list depends on your circumstances and confirmed scope.</p><ul className="service-check-list">{documents.map((item) => <li key={item}><Check size={17} />{item}</li>)}</ul></section> : null}
        {editorial?.process.length ? <section id="process" className="service-detail-section"><p className="eyebrow">NEXT STEPS</p><h2>A clear path forward</h2><ol className="service-step-list">{editorial.process.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, '0')}</span><p>{item}</p></li>)}</ol><p className="service-editorial-note">Typical assistance outline — the actual process is confirmed before engagement.</p></section> : null}
        {(hasProfessionalFee || hasGovernmentFee || hasTotal) && <section id="pricing" className="service-detail-section"><p className="eyebrow">PRICING</p><h2>Fees shown in the catalogue</h2><div className="service-pricing">
          {hasProfessionalFee && <div><span>Professional fee</span><strong>{formatCurrency(professionalFee)}</strong></div>}
          {hasGovernmentFee && <div><span>Government fees</span><strong>{formatCurrency(governmentFee)}</strong></div>}
          {hasTotal && <div className="service-pricing__total"><span>Listed total</span><strong>{formatCurrency(total)}</strong></div>}
        </div><p className="service-section-intro">Catalogue prices are indicative of the current listing. Confirm final charges and any applicable statutory amounts before applying.</p></section>}
        {editorial?.faqs.length ? <section id="faqs" className="service-detail-section"><p className="eyebrow">COMMON QUESTIONS</p><h2>Frequently asked questions</h2><div className="service-faqs">{editorial.faqs.map(({ question, answer }) => <details key={question}><summary>{question}<ChevronDown size={18} /></summary><p>{answer}</p></details>)}</div></section> : null}
        {related.length > 0 && <section className="service-detail-section service-related"><p className="eyebrow">EXPLORE MORE</p><h2>Related services</h2><div>{related.map((item: ServiceRecord) => <Link key={item.id} to={`/services/${item.id}`}><span>{item.service_name}</span><ArrowUpRight size={17} /></Link>)}</div></section>}
      </main>
      <aside className="service-assistance" aria-labelledby="assistance-title">
        <AssistanceForm service={service} />
      </aside>
    </div>
  </div>;
};

function AssistanceForm({ service }: { service: ServiceRecord }) {
  const [status, setStatus] = useState<{ kind: 'success' | 'error'; message: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus(null);
    setSubmitting(true);
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    try {
      const response = await api.submitContact({
        country: 'India', state: '', name: String(form.get('name') || '').trim(), phone: String(form.get('phone') || '').trim(),
        email: String(form.get('email') || '').trim().toLowerCase(), subject: `Assistance request: ${service.service_name}`,
        message: `Service requested: ${service.service_name}\n\n${String(form.get('message') || '').trim() || 'Please contact me about this service.'}`,
      });
      if (response.status === 'success') {
        setStatus({ kind: 'success', message: response.message || 'Your request was received. Our team will be in touch.' });
        formElement.reset();
      } else setStatus({ kind: 'error', message: response.message || 'We could not send your request. Please try again or use the contact page.' });
    } catch {
      setStatus({ kind: 'error', message: 'We could not send your request. Please try again or use the contact page.' });
    } finally { setSubmitting(false); }
  };
  return <div className="service-assistance__card">
    <p className="eyebrow">PERSONAL ASSISTANCE</p><h2 id="assistance-title">Talk to our team</h2>
    <p>Share a few details and our team can follow up about this service.</p>
    <div className="service-assistance__service"><span>Selected service</span><strong>{service.service_name}</strong></div>
    {status && <p className={`service-assistance__message is-${status.kind}`} role={status.kind === 'error' ? 'alert' : 'status'}>{status.message}</p>}
    <form onSubmit={submit}>
      <label>Your name<input name="name" autoComplete="name" required /></label>
      <label>Mobile number<input name="phone" type="tel" autoComplete="tel" inputMode="tel" required /></label>
      <label>Email address<input name="email" type="email" autoComplete="email" required /></label>
      <label>How can we help? <span className="optional">Optional</span><textarea name="message" rows={3} /></label>
      <button type="submit" disabled={submitting}>{submitting ? 'Sending request…' : 'Request assistance'} <ArrowRight size={16} /></button>
    </form>
    <p className="service-assistance__privacy">Your request is sent through our contact enquiry service.</p>
    <Link className="service-assistance__contact" to={`/contact?service=${encodeURIComponent(service.service_name)}`}>Prefer the contact page? <ArrowUpRight size={15} /></Link>
  </div>;
}

export default ServiceDetailPage;
