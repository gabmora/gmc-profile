import React, { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import './Main.css';
import {
    FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt,
    FaChevronDown, FaChevronLeft, FaChevronRight,
    FaImages, FaTimes, FaReact, FaNodeJs,
    FaPython, FaAws, FaDatabase, FaGitAlt, FaExternalLinkAlt
} from 'react-icons/fa';
import {
    SiExpress, SiMysql, SiTypescript,
    SiAzuredevops, SiPowerbi,
    SiShopify, SiQuickbooks, SiCloudflare, SiRailway,
    SiGoogledrive, SiSupabase, SiOpenai, SiStripe, SiTwilio, SiExpo
} from 'react-icons/si';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import emailjs from 'emailjs-com';
import Typed from 'typed.js';

function Main() {
    const [scrolled, setScrolled] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        appointmentType: '',
        description: '',
        selectedDate: null,
    });
    const [success, setSuccess] = useState(false);
    const [language, setLanguage] = useState('en');
    const [statsInView, setStatsInView] = useState(false);
    const [diniScreenIndex, setDiniScreenIndex] = useState(0);
    const [showDiniGallery, setShowDiniGallery] = useState(false);
    const statsRef = useRef(null);
    const typedRef = useRef(null);

    const diniScreenshots = [
        { src: '/dini-screens/dini-12.png', label: 'Work Order Form' },
        { src: '/dini-screens/dini-1.png', label: 'Work Order Form - Saved Cards' },
        { src: '/dini-screens/dini-2.png', label: 'Production Report' },
        { src: '/dini-screens/dini-3.png', label: 'Customer Profile' },
        { src: '/dini-screens/dini-4.png', label: 'Payment Form - Saved Cards' },
        { src: '/dini-screens/dini-6.png', label: 'Inventory Management' },
        { src: '/dini-screens/dini-9.png', label: 'Analytics Dashboard' },
        { src: '/dini-screens/dini-7.png', label: 'Calendar View - Day' },
        { src: '/dini-screens/dini-11.png', label: 'Calendar View - Week' },
        { src: '/dini-screens/dini-10.png', label: 'Calendar View - Month' },
        { src: '/dini-screens/dini-8.png', label: 'Appointment Management and Waitlist' },
        { src: '/dini-screens/dini-5.png', label: 'Message Thread' },
        { src: '/dini-screens/dini-13.png', label: 'Customer Invoice View - Secure Payment Processing' },
    ];

    const translations = {
        en: {
            nav: { about: 'Studio', services: 'Services', experience: 'Track Record', projects: 'Work', process: 'Process', contact: 'Start a Project' },
            hero: {
                kicker: 'Accepting new engagements',
                byline: 'Gabriela Morales — Principal Engineer',
                cta: 'Start a Project',
                resume: 'View CV'
            },
            about: {
                title: 'The Studio',
                text1: "Studio Caballero builds custom enterprise software and AI products. Full-stack, from architecture decisions and API design to production deployment and cloud infrastructure. Clients get direct access to the engineer building their system.",
                text2: "Past engagements span manufacturing, financial services, and e-commerce. Systems built here run at 99.5% uptime, cut operational time by 70%, and push 90% fewer errors than the manual processes they replaced.",
                stats: { years: 'Years in Production', code: 'Lines Shipped', uptime: 'System Uptime', saved: 'Ops Time Cut' }
            },
            contact: {
                title: 'Start a Project',
                intro: "Describe what you're building. Studio Caballero responds within 24 hours. Pick a date and time below to schedule a call instead.",
                name: 'Your Name *',
                email: 'Your Email *',
                phone: 'Phone *',
                service: 'Engagement Type *',
                services: { dev: 'Custom Software Build', notary: 'Notary Service', consulting: 'Technical Consulting', other: 'Other' },
                date: 'Preferred Call Time (optional)',
                message: 'What are you building? *',
                submit: 'Send',
                success: "Sent. You'll hear back within 24 hours.",
                info: 'Contact',
                notaryTitle: 'Notary Services',
                notaryDesc: 'Licensed Mobile Notary Public — NNA Certified. Acknowledgements, affidavits, power of attorney, business contracts, and more. Remote and in-person appointments in the Hoboken/NJ area.'
            },
            serviceItems: [
                { name: 'Custom Software Builds', desc: 'Full-stack enterprise systems built from scratch. React frontends, Node.js or ASP.NET backends, SQL databases, cloud infrastructure. Architected for scale and handed off with documentation.' },
                { name: 'AI SaaS Products', desc: 'Multi-tenant AI platforms with voice agents, LLM integrations, and automated workflows. From product architecture through deployment on Railway, Supabase, or your preferred stack.' },
                { name: 'Data Engineering', desc: 'API integrations, automated pipelines, and real-time inventory and reporting systems. Python, MySQL, and custom SDKs for platforms like Shopify, QuickBooks, and GOAT.' }
            ],
            status: {
                label: 'Current Status',
                statusKey: 'Status', statusVal: 'Accepting engagements',
                locationKey: 'Location', locationVal: 'Hoboken, NJ (EST)',
                responseKey: 'Response', responseVal: 'Within 24 hrs',
                engagementKey: 'Engagement', engagementVal: 'Fixed-scope projects',
                openToKey: 'Open to', openToVal: 'Custom builds · AI SaaS · Consulting · Notary',
                foundedKey: 'Founded', foundedVal: '2024 — Hoboken, NJ'
            },
            processSteps: [
                { title: 'Scope', desc: 'A discovery call to understand your system, define deliverables, agree on architecture, and set a fixed timeline and price. No open-ended retainers.' },
                { title: 'Build', desc: 'Weekly check-ins, staged delivery, and full access to the repository at every step. You see the work as it happens.' },
                { title: 'Ship', desc: 'Production deployment, full handoff documentation, and 30 days of post-launch support. You own everything.' }
            ],
            trackRecord: [
                {
                    dateTop: 'Nov 2024', dateBottom: 'Present',
                    client: 'DiNi Wigs',
                    project: 'Enterprise Work Order & Payment Platform',
                    desc: 'Studio Caballero architected and shipped a full enterprise system serving multiple US and Israeli office locations. 53 React components, 77 REST endpoints, PCI-compliant Clover payment integration with 8 terminals across 3 locations, card-on-file with tokenization, SMS-to-payment links, and QuickBooks and Google Drive sync. Multi-cloud infrastructure at 99.5% uptime. Operational processing time cut by 70%.'
                },
                {
                    dateTop: '2025', dateBottom: 'Present',
                    client: 'HVAC AI Platform',
                    project: 'Multi-Tenant AI SaaS — CRM, Dispatch & Voice AI',
                    desc: 'Built a multi-tenant SaaS platform for HVAC service companies combining a full field-service CRM with three AI agents. A VAPI voice AI receptionist handles 24/7 inbound customer calls — caller recognition, context injection, real-time job scheduling, and emergency escalation. A GPT-4 Vision copilot assists field technicians on mobile with equipment photo analysis, fault diagnosis, and manual search. A third automated agent segments dormant customers and drives re-engagement via personalized SMS and email campaigns. Full dispatch system includes technician GPS tracking and smart proximity-based routing.'
                },
                {
                    dateTop: 'May 2024', dateBottom: 'Nov 2024',
                    client: 'OscarSoles LLC',
                    project: 'Data Pipeline & Inventory Automation',
                    desc: 'Built API integrations connecting GOAT, Shopify, and Poizon into a unified MySQL pipeline. Automated SKU tracking, real-time inventory sync, and custom SDKs for each external platform.'
                },
                {
                    dateTop: 'May 2022', dateBottom: 'Jan 2024',
                    client: 'Capgemini',
                    project: 'Enterprise Consulting — BNY Mellon, Vanguard',
                    desc: 'Embedded at Fortune 500 clients building data pipelines, Power BI reporting, and AWS infrastructure. Led cloud environment configuration for enterprise security applications at Bank of New York Mellon and Vanguard.'
                }
            ]
        },
        fr: {
            nav: { about: 'Studio', services: 'Services', experience: 'Historique', projects: 'Travaux', process: 'Comment ça marche', contact: 'Démarrer' },
            hero: {
                kicker: 'Disponible pour de nouveaux engagements',
                byline: 'Gabriela Morales — Ingénieure Principale',
                cta: 'Démarrer un projet',
                resume: 'Voir CV'
            },
            about: {
                title: 'Le Studio',
                text1: "Studio Caballero conçoit des logiciels d'entreprise sur mesure et des produits IA. Un ingénieur principal couvre l'ensemble de la stack: architecture, conception d'API, déploiement en production et infrastructure.",
                text2: "Les engagements passés couvrent la fabrication, les services financiers et l'e-commerce. Les systèmes livrés tournent à 99,5% de disponibilité, réduisent le temps opérationnel de 70% et génèrent 90% moins d'erreurs.",
                stats: { years: 'Ans en Production', code: 'Lignes Livrées', uptime: 'Disponibilité', saved: 'Réduction Ops' }
            },
            contact: {
                title: 'Démarrer un Projet',
                intro: "Décrivez ce que vous construisez. Studio Caballero répond sous 24 heures.",
                name: 'Votre Nom *',
                email: 'Votre Email *',
                phone: 'Téléphone *',
                service: "Type d'Engagement *",
                services: { dev: 'Développement Sur Mesure', notary: 'Service Notarial', consulting: 'Conseil Technique', other: 'Autre' },
                date: 'Heure de Rappel Préférée (optionnel)',
                message: 'Que construisez-vous? *',
                submit: 'Envoyer',
                success: 'Envoyé. Réponse sous 24 heures.',
                info: 'Contact',
                notaryTitle: 'Services Notariaux',
                notaryDesc: 'Notaire Public Mobile agréée — Certifiée NNA. Reconnaissances, affidavits, procurations et contrats. Rendez-vous à distance et en personne dans la région Hoboken/NJ.'
            },
            serviceItems: [
                { name: 'Développement Sur Mesure', desc: "Systèmes d'entreprise full-stack construits de A à Z. Frontends React, backends Node.js ou ASP.NET, bases de données SQL, infrastructure cloud. Conçus pour la montée en charge et livrés avec documentation." },
                { name: 'Produits IA SaaS', desc: "Plateformes IA multi-tenant avec agents vocaux, intégrations LLM et workflows automatisés. De l'architecture produit jusqu'au déploiement sur Railway, Supabase ou votre stack préféré." },
                { name: 'Ingénierie des Données', desc: "Intégrations API, pipelines automatisés et systèmes d'inventaire et de reporting en temps réel. Python, MySQL et SDKs personnalisés pour des plateformes comme Shopify, QuickBooks et GOAT." }
            ],
            status: {
                label: 'Statut Actuel',
                statusKey: 'Statut', statusVal: 'Disponible pour engagement',
                locationKey: 'Localisation', locationVal: 'Hoboken, NJ (EST)',
                responseKey: 'Réponse', responseVal: 'Sous 24 heures',
                engagementKey: 'Engagement', engagementVal: 'Projets à périmètre fixe',
                openToKey: 'Ouvert à', openToVal: 'Dev. sur mesure · IA SaaS · Conseil · Notaire',
                foundedKey: 'Fondé', foundedVal: '2024 — Hoboken, NJ'
            },
            processSteps: [
                { title: 'Cadrage', desc: "Un appel de découverte pour comprendre votre système, définir les livrables, arrêter l'architecture et fixer un calendrier et un prix. Pas de retainer ouvert." },
                { title: 'Construction', desc: "Points hebdomadaires, livraison par étapes et accès complet au dépôt à chaque étape. Vous voyez le travail au fur et à mesure." },
                { title: 'Lancement', desc: "Déploiement en production, documentation de passation complète et 30 jours de support post-lancement. Vous possédez tout." }
            ],
            trackRecord: [
                {
                    dateTop: 'Nov 2024', dateBottom: 'Présent',
                    client: 'DiNi Wigs',
                    project: 'Plateforme Entreprise de Gestion et Paiement',
                    desc: "Studio Caballero a conçu et livré un système d'entreprise complet desservant plusieurs sites aux États-Unis et en Israël. 53 composants React, 77 endpoints REST, intégration paiement Clover conforme PCI avec 8 terminaux sur 3 sites, carte enregistrée avec tokenisation, liens SMS-vers-paiement, et synchronisation QuickBooks et Google Drive. Infrastructure multi-cloud à 99,5% de disponibilité. Temps de traitement opérationnel réduit de 70%."
                },
                {
                    dateTop: '2025', dateBottom: 'Présent',
                    client: 'Plateforme IA HVAC',
                    project: 'SaaS Multi-tenant — CRM, Dispatch & IA Vocale',
                    desc: "Plateforme SaaS multi-tenant pour les entreprises de climatisation et chauffage, combinant un CRM complet avec trois agents IA. Un agent vocal VAPI gère les appels entrants 24h/24 — reconnaissance du client, injection de contexte, planification en temps réel et escalade d'urgence. Un copilote GPT-4 Vision assiste les techniciens sur mobile pour l'analyse de photos d'équipements, le diagnostic de pannes et la recherche de manuels. Un troisième agent automatise la rétention client via des campagnes SMS et e-mail personnalisées. Système de dispatch complet avec suivi GPS des techniciens et routage par proximité."
                },
                {
                    dateTop: 'Mai 2024', dateBottom: 'Nov 2024',
                    client: 'OscarSoles LLC',
                    project: 'Pipeline de Données & Automatisation des Stocks',
                    desc: "Construction d'intégrations API connectant GOAT, Shopify et Poizon dans un pipeline MySQL unifié. Automatisation du suivi SKU, synchronisation des stocks en temps réel et SDKs personnalisés pour chaque plateforme externe."
                },
                {
                    dateTop: 'Mai 2022', dateBottom: 'Jan 2024',
                    client: 'Capgemini',
                    project: 'Conseil Entreprise — BNY Mellon, Vanguard',
                    desc: "Intégré chez des clients Fortune 500 pour construire des pipelines de données, des rapports Power BI et une infrastructure AWS. Direction de la configuration des environnements cloud pour des applications de sécurité d'entreprise chez Bank of New York Mellon et Vanguard."
                }
            ]
        }
    };

    const t = translations[language];

    useEffect(() => {
        let hasTriggeredStats = false;
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
            document.querySelectorAll('.fade-in-section').forEach(section => {
                const rect = section.getBoundingClientRect();
                if (rect.top < window.innerHeight * 0.8) {
                    section.classList.add('is-visible');
                }
            });
            if (statsRef.current && !hasTriggeredStats) {
                const rect = statsRef.current.getBoundingClientRect();
                if (rect.top < window.innerHeight * 0.8) {
                    hasTriggeredStats = true;
                    setStatsInView(true);
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!showDiniGallery) return;
            if (e.key === 'ArrowLeft') setDiniScreenIndex(p => p === 0 ? diniScreenshots.length - 1 : p - 1);
            else if (e.key === 'ArrowRight') setDiniScreenIndex(p => p === diniScreenshots.length - 1 ? 0 : p + 1);
            else if (e.key === 'Escape') setShowDiniGallery(false);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [showDiniGallery, diniScreenshots.length]);

    useEffect(() => {
        if (!typedRef.current) return;
        const typed = new Typed(typedRef.current, {
            strings: ['Full-Stack Software Engineer', 'AI SaaS Architect', 'React Developer', 'Node.js Expert', 'Cloud Architect', 'Data Engineer'],
            typeSpeed: 60,
            backSpeed: 40,
            loop: true
        });
        return () => typed.destroy();
    }, []);

    const scrollToSection = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    const toggleLanguage = () => setLanguage(l => l === 'en' ? 'fr' : 'en');

    const Counter = ({ end, duration = 2000, suffix = '' }) => {
        const [count, setCount] = useState(0);
        useEffect(() => {
            if (!statsInView) return;
            let startTime;
            const animate = (t) => {
                if (!startTime) startTime = t;
                const progress = Math.min((t - startTime) / duration, 1);
                setCount(Math.floor(progress * end));
                if (progress < 1) requestAnimationFrame(animate);
            };
            requestAnimationFrame(animate);
        }, [statsInView, end, duration]);
        return <>{count}{suffix}</>;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(f => ({ ...f, [name]: value }));
    };
    const handleDateChange = (date) => setFormData(f => ({ ...f, selectedDate: date }));
    const sendEmail = (e) => {
        e.preventDefault();
        emailjs.sendForm('service_wq0fz1y', 'template_cn8n1gi', e.target, 'z01pUKhhurokO_4ff')
            .then(() => {
                setSuccess(true);
                setFormData({ name: '', email: '', phoneNumber: '', appointmentType: '', description: '', selectedDate: null });
                setTimeout(() => setSuccess(false), 5000);
            })
            .catch(err => console.error('Email failed:', err));
    };

    return (
        <div className="portfolio">
            {/* Nav */}
            <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
                <div className="nav-logo">Studio Caballero</div>
                <div className="nav-links">
                    <button onClick={() => scrollToSection('about')}>{t.nav.about}</button>
                    <button onClick={() => scrollToSection('services')}>{t.nav.services}</button>
                    <button onClick={() => scrollToSection('experience')}>{t.nav.experience}</button>
                    <button onClick={() => scrollToSection('projects')}>{t.nav.projects}</button>
                    <button onClick={() => scrollToSection('process')}>{t.nav.process}</button>
                    <button onClick={() => scrollToSection('contact')}>{t.nav.contact}</button>
                </div>
                <div className="nav-controls">
                    <button onClick={toggleLanguage} className="lang-toggle">
                        {language === 'en' ? 'FR' : 'EN'}
                    </button>
                </div>
            </nav>

            {/* Hero */}
            <section className="hero" id="home">
                <div className="hero-content">
                    <div className="hero-kicker">
                        <span className="kicker-dot" />
                        {t.hero.kicker}
                    </div>
                    <h1 className="hero-wordmark">
                        <span className="wm-studio">Studio</span>
                        <span className="wm-caballero">Caballero</span>
                    </h1>
                    <div className="hero-sub-row">
                        <Link to="/cv" className="hero-byline">{t.hero.byline}</Link>
                        <div className="hero-typed-line"><span ref={typedRef} /></div>
                    </div>
                    <div className="hero-cta">
                        <button className="btn-primary" onClick={() => scrollToSection('contact')}>
                            {t.hero.cta}
                        </button>
                        <button className="btn-secondary" onClick={() => scrollToSection('projects')}>
                            View the Work
                        </button>
                    </div>
                </div>
                <div className="scroll-indicator" onClick={() => scrollToSection('about')} aria-hidden="true">
                    <FaChevronDown />
                </div>
            </section>

            {/* Client strip */}
            <div className="client-strip">
                <div className="client-strip-inner">
                    <span className="client-strip-label">Clients</span>
                    <div className="client-names">
                        <span className="client-name">Capgemini</span>
                        <span className="client-name">BNY Mellon</span>
                        <span className="client-name">Vanguard</span>
                        <span className="client-name">DiNi Wigs</span>
                        <span className="client-name">OscarSoles</span>
                    </div>
                </div>
            </div>

            {/* Services */}
            <section className="section fade-in-section" id="services">
                <div className="container">
                    <h2 className="section-title">{t.nav.services}</h2>
                    <hr className="section-rule" />
                    <div className="services-list">
                        {t.serviceItems.map((item, i) => (
                            <div className="service-item" key={i}>
                                <span className="service-num">{String(i + 1).padStart(2, '0')}</span>
                                <div className="service-body">
                                    <div className="service-name">{item.name}</div>
                                    <p className="service-desc">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Studio */}
            <section className="section about-section fade-in-section" id="about">
                <div className="container">
                    <h2 className="section-title">{t.nav.about}</h2>
                    <hr className="section-rule" />

                    <div className="studio-layout">
                        <div className="studio-text">
                            <p>{t.about.text1}</p>
                            <p>{t.about.text2}</p>
                            <div className="studio-stats" ref={statsRef}>
                                <div className="stat-item">
                                    <span className="stat-number"><Counter end={4} suffix="+" /></span>
                                    <span className="stat-label">{t.about.stats.years}</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-number"><Counter end={300} suffix="K+" /></span>
                                    <span className="stat-label">{t.about.stats.code}</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-number"><Counter end={99} suffix=".5%" /></span>
                                    <span className="stat-label">{t.about.stats.uptime}</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-number"><Counter end={70} suffix="%" /></span>
                                    <span className="stat-label">{t.about.stats.saved}</span>
                                </div>
                            </div>
                        </div>
                        <div className="status-card">
                            <div className="status-card-label">{t.status.label}</div>
                            <div className="status-rows">
                                <div className="status-row">
                                    <span className="status-key">{t.status.statusKey}</span>
                                    <span className="status-val status-val--active">
                                        <span className="status-dot" />
                                        {t.status.statusVal}
                                    </span>
                                </div>
                                <div className="status-row">
                                    <span className="status-key">{t.status.locationKey}</span>
                                    <span className="status-val">{t.status.locationVal}</span>
                                </div>
                                <div className="status-row">
                                    <span className="status-key">{t.status.responseKey}</span>
                                    <span className="status-val">{t.status.responseVal}</span>
                                </div>
                                <div className="status-row">
                                    <span className="status-key">{t.status.engagementKey}</span>
                                    <span className="status-val">{t.status.engagementVal}</span>
                                </div>
                                <div className="status-row">
                                    <span className="status-key">{t.status.openToKey}</span>
                                    <span className="status-val">{t.status.openToVal}</span>
                                </div>
                                <div className="status-row">
                                    <span className="status-key">{t.status.foundedKey}</span>
                                    <span className="status-val">{t.status.foundedVal}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stack + Certs */}
                    <div className="studio-stack">
                        <div className="studio-stack-grid">
                            <div className="studio-stack-group">
                                <div className="stack-group-label"><FaReact /> Frontend</div>
                                <div className="stack-tags">
                                    <span className="stack-tag">React.js</span>
                                    <span className="stack-tag">React Native</span>
                                    <span className="stack-tag">TypeScript</span>
                                    <span className="stack-tag">Expo</span>
                                    <span className="stack-tag">Tailwind CSS</span>
                                </div>
                            </div>
                            <div className="studio-stack-group">
                                <div className="stack-group-label"><FaNodeJs /> Backend</div>
                                <div className="stack-tags">
                                    <span className="stack-tag">Node.js</span>
                                    <span className="stack-tag">Express.js</span>
                                    <span className="stack-tag">C# / ASP.NET</span>
                                    <span className="stack-tag">Python</span>
                                    <span className="stack-tag">REST &amp; JWT</span>
                                </div>
                            </div>
                            <div className="studio-stack-group">
                                <div className="stack-group-label"><FaDatabase /> Data &amp; Cloud</div>
                                <div className="stack-tags">
                                    <span className="stack-tag">SQL Server</span>
                                    <span className="stack-tag">MySQL</span>
                                    <span className="stack-tag">Supabase</span>
                                    <span className="stack-tag">AWS</span>
                                    <span className="stack-tag">Azure</span>
                                    <span className="stack-tag">Railway</span>
                                </div>
                            </div>
                            <div className="studio-stack-group">
                                <div className="stack-group-label"><FaGitAlt /> Integrations</div>
                                <div className="stack-tags">
                                    <span className="stack-tag">OpenAI GPT-4</span>
                                    <span className="stack-tag">VAPI Voice AI</span>
                                    <span className="stack-tag">Stripe</span>
                                    <span className="stack-tag">Twilio</span>
                                    <span className="stack-tag">QuickBooks</span>
                                    <span className="stack-tag">Shopify</span>
                                </div>
                            </div>
                        </div>
                        <div className="certs-label">Certifications</div>
                        <div className="cert-list">
                            <div className="cert-item">
                                <span className="cert-badge">AWS</span>
                                <span>Solutions Architect — Associate</span>
                            </div>
                            <div className="cert-item">
                                <span className="cert-badge">AWS</span>
                                <span>Cloud Practitioner</span>
                            </div>
                            <div className="cert-item">
                                <span className="cert-badge">DAML</span>
                                <span>Fundamentals Certification</span>
                            </div>
                            <div className="cert-item">
                                <span className="cert-badge">NNA</span>
                                <span>Certified Notary Signing Agent</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Track Record */}
            <section className="section experience-section fade-in-section" id="experience">
                <div className="container">
                    <h2 className="section-title">{t.nav.experience}</h2>
                    <hr className="section-rule" />
                    <div className="timeline">
                        <div className="timeline-item">
                            <div className="timeline-date">{t.trackRecord[0].dateTop}<br />{t.trackRecord[0].dateBottom}</div>
                            <div className="timeline-content">
                                <h3>{t.trackRecord[0].client}</h3>
                                <h4>{t.trackRecord[0].project}</h4>
                                <p>{t.trackRecord[0].desc}</p>
                                <div className="tech-tags">
                                    <span><FaReact className="tech-icon" />React</span>
                                    <span><FaNodeJs className="tech-icon" />Node.js</span>
                                    <span><FaDatabase className="tech-icon" />SQL Server</span>
                                    <span><SiAzuredevops className="tech-icon" />Azure</span>
                                    <span><SiQuickbooks className="tech-icon" />QuickBooks API</span>
                                    <span>Clover API</span>
                                </div>
                            </div>
                        </div>

                        <div className="timeline-item">
                            <div className="timeline-date">{t.trackRecord[1].dateTop}<br />{t.trackRecord[1].dateBottom}</div>
                            <div className="timeline-content">
                                <h3>{t.trackRecord[1].client}</h3>
                                <h4>{t.trackRecord[1].project}</h4>
                                <p>{t.trackRecord[1].desc}</p>
                                <div className="tech-tags">
                                    <span><FaReact className="tech-icon" />React 19</span>
                                    <span><SiTypescript className="tech-icon" />TypeScript</span>
                                    <span><SiExpo className="tech-icon" />Expo</span>
                                    <span><FaNodeJs className="tech-icon" />Node.js</span>
                                    <span><SiSupabase className="tech-icon" />Supabase</span>
                                    <span><SiOpenai className="tech-icon" />OpenAI GPT-4</span>
                                    <span>VAPI Voice AI</span>
                                    <span><SiStripe className="tech-icon" />Stripe</span>
                                    <span><SiTwilio className="tech-icon" />Twilio</span>
                                </div>
                            </div>
                        </div>

                        <div className="timeline-item">
                            <div className="timeline-date">{t.trackRecord[2].dateTop}<br />{t.trackRecord[2].dateBottom}</div>
                            <div className="timeline-content">
                                <h3>{t.trackRecord[2].client}</h3>
                                <h4>{t.trackRecord[2].project}</h4>
                                <p>{t.trackRecord[2].desc}</p>
                                <div className="tech-tags">
                                    <span><FaPython className="tech-icon" />Python</span>
                                    <span><SiMysql className="tech-icon" />MySQL</span>
                                    <span><SiShopify className="tech-icon" />Shopify API</span>
                                    <span>SAP</span>
                                </div>
                            </div>
                        </div>

                        <div className="timeline-item">
                            <div className="timeline-date">{t.trackRecord[3].dateTop}<br />{t.trackRecord[3].dateBottom}</div>
                            <div className="timeline-content">
                                <h3>{t.trackRecord[3].client}</h3>
                                <h4>{t.trackRecord[3].project}</h4>
                                <p>{t.trackRecord[3].desc}</p>
                                <div className="tech-tags">
                                    <span><FaPython className="tech-icon" />Python</span>
                                    <span><FaAws className="tech-icon" />AWS</span>
                                    <span><SiPowerbi className="tech-icon" />Power BI</span>
                                    <span><FaDatabase className="tech-icon" />SQL</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Credentials */}
            {/* <section className="section education-section fade-in-section" id="education">
                <div className="container">
                    <h2 className="section-title">{t.nav.education}</h2>
                    <hr className="section-rule" />
                    <div className="education-row">
                        <div className="education-year">Dec 2021</div>
                        <div className="education-content">
                            <h3>B.S. Computer Science and Technology</h3>
                            <h4>University of South Carolina</h4>
                        </div>
                    </div>
                </div>
            </section> */}

            {/* Process */}
            <section className="section fade-in-section" id="process">
                <div className="container">
                    <h2 className="section-title">{t.nav.process}</h2>
                    <hr className="section-rule" />
                    <div className="process-steps">
                        {t.processSteps.map((step, i) => (
                            <div className="process-step" key={i}>
                                <div className="process-step-num">{String(i + 1).padStart(2, '0')}</div>
                                <div className="process-step-title">{step.title}</div>
                                <p className="process-step-desc">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Projects */}
            <section className="section projects-section fade-in-section" id="projects">
                <div className="container">
                    <h2 className="section-title">Software Products</h2>
                    <hr className="section-rule" />
                    <div className="projects-stack">

                        {/* DiNiTracker V2 */}
                        <div className="project-block">
                            <div className="project-meta">
                                <span className="project-name">DiNiTracker V2</span>
                                <span className="project-type">Client Project</span>
                            </div>
                            <p className="project-description">
                                Custom-built enterprise system for DiNi Wigs, a wig repair and customization business.
                                Single-handedly architected and deployed a full work order management and payment processing platform
                                serving multiple office locations across US and Israeli markets.
                            </p>
                            <div className="project-numbers">
                                <div className="project-number-item">
                                    <span className="project-number-value">53+</span>
                                    <span className="project-number-label">React Components</span>
                                </div>
                                <div className="project-number-item">
                                    <span className="project-number-value">77+</span>
                                    <span className="project-number-label">REST Endpoints</span>
                                </div>
                                <div className="project-number-item">
                                    <span className="project-number-value">8</span>
                                    <span className="project-number-label">Payment Terminals</span>
                                </div>
                                <div className="project-number-item">
                                    <span className="project-number-value">70%</span>
                                    <span className="project-number-label">Ops Time Reduced</span>
                                </div>
                            </div>
                            <div className="project-tech">
                                <span><FaReact className="tech-icon" />React</span>
                                <span><FaNodeJs className="tech-icon" />Node.js</span>
                                <span><SiExpress className="tech-icon" />Express</span>
                                <span><FaDatabase className="tech-icon" />SQL Server</span>
                                <span><SiAzuredevops className="tech-icon" />Azure</span>
                                <span><SiRailway className="tech-icon" />Railway</span>
                                <span><SiCloudflare className="tech-icon" />Cloudflare</span>
                                <span><SiQuickbooks className="tech-icon" />QuickBooks API</span>
                                <span><SiGoogledrive className="tech-icon" />Google Drive API</span>
                                <span>Clover API</span>
                            </div>
                            <div className="project-highlights">
                                <div className="highlight-item"><strong>Clover Payment Integration:</strong> PCI DSS-compliant with card tokenization via PAKMS, multi-pay token support, and 8 terminals across 3 locations — submitted to Clover App Store</div>
                                <div className="highlight-item"><strong>Save Card Feature:</strong> Secure card-on-file system with duplicate detection, default card management, and complete audit trails with charge history</div>
                                <div className="highlight-item"><strong>SMS Payment Links:</strong> Text-to-payment system with JWT-based stateless architecture, auto tax calculation, and mobile-responsive payment pages</div>
                            </div>
                            <div className="project-actions">
                                <button className="demo-button" onClick={() => setShowDiniGallery(true)}>
                                    <FaImages /> View Screenshots
                                </button>
                            </div>
                        </div>

                        {/* HVAC AI Platform */}
                        <div className="project-block">
                            <div className="project-meta">
                                <span className="project-name">HVAC AI Platform</span>
                                <span className="project-type">SaaS Product</span>
                            </div>
                            <p className="project-description">
                                Multi-tenant SaaS platform for HVAC service companies combining a full CRM with three AI-powered agents.
                                Monorepo with a React 19 web dashboard for dispatchers, an Expo React Native mobile app for field technicians,
                                and VAPI voice AI for 24/7 automated call handling — all backed by Supabase with Row-Level Security for data isolation per company.
                            </p>
                            <div className="project-numbers">
                                <div className="project-number-item">
                                    <span className="project-number-value">3</span>
                                    <span className="project-number-label">AI Agents</span>
                                </div>
                                <div className="project-number-item">
                                    <span className="project-number-value">24/7</span>
                                    <span className="project-number-label">Voice Reception</span>
                                </div>
                                <div className="project-number-item">
                                    <span className="project-number-value">4</span>
                                    <span className="project-number-label">Apps in Monorepo</span>
                                </div>
                            </div>
                            <div className="project-tech">
                                <span><FaReact className="tech-icon" />React 19</span>
                                <span><SiTypescript className="tech-icon" />TypeScript</span>
                                <span><SiExpo className="tech-icon" />Expo</span>
                                <span><FaReact className="tech-icon" />React Native</span>
                                <span><FaNodeJs className="tech-icon" />Node.js</span>
                                <span><SiExpress className="tech-icon" />Express 5</span>
                                <span><SiSupabase className="tech-icon" />Supabase</span>
                                <span><SiOpenai className="tech-icon" />OpenAI GPT-4</span>
                                <span>VAPI Voice AI</span>
                                <span><SiStripe className="tech-icon" />Stripe</span>
                                <span><SiTwilio className="tech-icon" />Twilio</span>
                                <span><SiRailway className="tech-icon" />Railway</span>
                            </div>
                            <div className="project-highlights">
                                <div className="highlight-item"><strong>Dispatcher Agent:</strong> Voice AI receptionist via VAPI — caller recognition, customer context injection, real-time scheduling, emergency escalation to on-call technician</div>
                                <div className="highlight-item"><strong>Copilot Agent:</strong> Mobile AI assistant for field technicians — GPT-4 Vision for equipment photo analysis, troubleshooting suggestions, and manual search</div>
                                <div className="highlight-item"><strong>Reactivator Agent:</strong> Automated customer retention — dormant customer segmentation, personalized SMS/email campaigns, and per-campaign revenue tracking</div>
                                <div className="highlight-item"><strong>Full CRM + Dispatch:</strong> Customers, properties, HVAC systems, jobs, technician GPS tracking, smart dispatch by proximity (Haversine), quote builder with Stripe payments</div>
                            </div>
                            <div className="project-actions">
                                <button onClick={() => scrollToSection('contact')} className="demo-button">
                                    <FaEnvelope /> Request Demo
                                </button>
                            </div>
                        </div>

                        {/* DiNi Wigs Customer Site */}
                        <div className="project-block">
                            <div className="project-meta">
                                <span className="project-name">DiNi Wigs — Customer Site</span>
                                <span className="project-type">Client Project</span>
                            </div>
                            <p className="project-description">
                                Customer-facing e-commerce site for DiNi Wigs. Mobile-first, integrated with Shopify for inventory and checkout,
                                serving US and Israeli markets. Designed and built end-to-end.
                            </p>
                            <div className="project-tech">
                                <span><SiShopify className="tech-icon" />Shopify</span>
                                <span><FaReact className="tech-icon" />React</span>
                                <span>Mobile-first</span>
                                <span>Cloudflare Pages</span>
                            </div>
                            <div className="project-actions">
                                <a
                                    href="https://dinisite.pages.dev"
                                    className="demo-button"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <FaExternalLinkAlt /> Visit Site
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Contact */}
            <section className="section contact-section fade-in-section" id="contact">
                <div className="container">
                    <h2 className="section-title">{t.contact.title}</h2>
                    <hr className="section-rule" />
                    <div className="contact-grid">
                        <div className="contact-form-container">
                            <p className="contact-intro">{t.contact.intro}</p>
                            <form className="contact-form" onSubmit={sendEmail}>
                                <div className="form-group">
                                    <input type="text" name="name" placeholder={t.contact.name} value={formData.name} onChange={handleChange} required />
                                </div>
                                <div className="form-group">
                                    <input type="email" name="email" placeholder={t.contact.email} value={formData.email} onChange={handleChange} required />
                                </div>
                                <div className="form-group">
                                    <input type="tel" name="phoneNumber" placeholder={t.contact.phone} value={formData.phoneNumber} onChange={handleChange} required />
                                </div>
                                <div className="form-group">
                                    <select name="appointmentType" value={formData.appointmentType} onChange={handleChange} required>
                                        <option value="">{t.contact.service}</option>
                                        <option value="Web Dev Help">{t.contact.services.dev}</option>
                                        <option value="Notary Service">{t.contact.services.notary}</option>
                                        <option value="Consulting">{t.contact.services.consulting}</option>
                                        <option value="Other">{t.contact.services.other}</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <DatePicker
                                        selected={formData.selectedDate}
                                        onChange={handleDateChange}
                                        showTimeSelect
                                        timeFormat="HH:mm"
                                        timeIntervals={15}
                                        timeCaption="Time"
                                        dateFormat="MMMM d, yyyy h:mm aa"
                                        placeholderText={t.contact.date}
                                        className="date-picker"
                                    />
                                </div>
                                <div className="form-group">
                                    <textarea name="description" placeholder={t.contact.message} value={formData.description} onChange={handleChange} rows="5" required />
                                </div>
                                <button type="submit" className="btn-submit">{t.contact.submit}</button>
                            </form>
                            {success && (
                                <div className="success-message">
                                    <p>{t.contact.success}</p>
                                </div>
                            )}
                        </div>
                        <div className="contact-sidebar">
                            <div className="contact-info-box">
                                <h3>{t.contact.info}</h3>
                                <div className="contact-item">
                                    <FaMapMarkerAlt className="contact-icon" />
                                    <span>Hoboken, NJ 07030</span>
                                </div>
                                <div className="contact-item">
                                    <FaPhone className="contact-icon" />
                                    <a href="tel:201-844-3508">201-844-3508</a>
                                </div>
                            </div>
                            <hr className="notary-divider" />
                            <div className="contact-notary-box">
                                <h3>
                                    {t.contact.notaryTitle}
                                    <a href="http://www.notarypublicbackgroundcheck.com/verify.asp?vid=9A7B836FE66770588CEF7942DDB857C113294" target="_blank" rel="noopener noreferrer">
                                        <img src="http://www.notarypublicbackgroundcheck.com/images/npbc-ctv-l.gif" alt="Verify Notary Background Check" style={{ height: '28px', display: 'block', marginTop: '0.5rem' }} />
                                    </a>
                                </h3>
                                <p>{t.contact.notaryDesc}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Screenshot Gallery Modal */}
            {showDiniGallery && (
                <div className="gallery-modal-overlay" onClick={() => setShowDiniGallery(false)}>
                    <div className="gallery-modal" onClick={e => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setShowDiniGallery(false)} aria-label="Close gallery">
                            <FaTimes />
                        </button>
                        <div className="modal-gallery">
                            <button
                                className="gallery-nav gallery-prev"
                                aria-label="Previous"
                                onClick={() => setDiniScreenIndex(p => p === 0 ? diniScreenshots.length - 1 : p - 1)}
                            >
                                <FaChevronLeft />
                            </button>
                            <div className="modal-screenshot-container">
                                <img
                                    src={diniScreenshots[diniScreenIndex].src}
                                    alt={diniScreenshots[diniScreenIndex].label}
                                    className="modal-screenshot-image"
                                />
                                <div className="modal-screenshot-label">
                                    <FaImages />
                                    {diniScreenshots[diniScreenIndex].label}
                                    <span className="screenshot-counter">{diniScreenIndex + 1} / {diniScreenshots.length}</span>
                                </div>
                            </div>
                            <button
                                className="gallery-nav gallery-next"
                                aria-label="Next"
                                onClick={() => setDiniScreenIndex(p => p === diniScreenshots.length - 1 ? 0 : p + 1)}
                            >
                                <FaChevronRight />
                            </button>
                        </div>
                        <div className="modal-screenshot-dots">
                            {diniScreenshots.map((_, idx) => (
                                <button
                                    key={idx}
                                    className={`screenshot-dot ${idx === diniScreenIndex ? 'active' : ''}`}
                                    onClick={() => setDiniScreenIndex(idx)}
                                    aria-label={`Screenshot ${idx + 1}`}
                                />
                            ))}
                        </div>
                        <div className="keyboard-hint">Arrow keys to navigate · ESC to close</div>
                    </div>
                </div>
            )}

            {/* Footer */}
            <footer className="footer">
                <div className="footer-content">
                    <p>&copy; 2026 Studio Caballero</p>
                    <div className="footer-social">
                        <a href="https://github.com/diniwigs" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FaGithub /></a>
                        <a href="https://www.linkedin.com/in/gabriela-morales-19bb21202/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Main;
