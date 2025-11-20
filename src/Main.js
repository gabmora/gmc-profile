import React, { useState, useEffect, useRef } from "react";
import './Main.css';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt, FaFilePdf, FaChevronDown, FaCloudSun, FaExternalLinkAlt, FaSun, FaMoon } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import emailjs from 'emailjs-com';
import getFormattedWeatherData from './components/weather_comps/services_weather/weatherService';

function Main(){
    const [scrolled, setScrolled] = useState(false);
    const [weather, setWeather] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        appointmentType: '',
        description: '',
        selectedDate: null,
    });
    const [success, setSuccess] = useState(false);
    const [theme, setTheme] = useState('dark');
    const [language, setLanguage] = useState('en');
    const [statsInView, setStatsInView] = useState(false);
    const statsRef = useRef(null);

    // Language translations
    const translations = {
        en: {
            nav: { about: 'About', experience: 'Experience', skills: 'Skills', projects: 'Projects', contact: 'Contact' },
            hero: {
                greeting: "Hi, I'm",
                title: 'Full-Stack Software Engineer',
                description: 'I build enterprise solutions that scale. 300K+ lines of production code deployed. 99.5% uptime. Expert in React, Node.js, C#, Python, and AWS.',
                cta: 'Get In Touch',
                resume: 'View Resume'
            },
            about: {
                title: 'About Me',
                text1: "I'm a Full-Stack Software Engineer with 4+ years of experience building enterprise systems across manufacturing, financial services, and e-commerce. I specialize in single-handedly architecting and deploying production applications serving multiple office locations.",
                text2: "My expertise spans the entire stack—from React frontends to Node.js/ASP.NET backends, SQL databases, and cloud infrastructure on AWS and Azure. I've reduced operational processing time by 70% and achieved 90% error reduction through automation.",
                stats: { years: 'Years Experience', code: 'Lines of Code', uptime: 'System Uptime', saved: 'Time Saved' }
            },
            contact: {
                title: 'Get In Touch',
                intro: "I'm currently open to new opportunities! Fill out the form below and I'll respond within 24 hours. You can also schedule a call by selecting a preferred date and time.",
                name: 'Your Name *',
                email: 'Your Email *',
                phone: 'Phone Number *',
                service: 'Select Service Type *',
                services: { dev: 'Software Development', notary: 'Notary Service', consulting: 'Consulting', other: 'Other' },
                date: 'Preferred Date & Time (optional)',
                message: 'Tell me about your project or inquiry *',
                submit: 'Send Message',
                success: "✓ Message sent successfully! I'll get back to you shortly.",
                info: 'Contact Information',
                notaryTitle: 'Notary Services',
                notaryDesc: 'Licensed Mobile Notary Public providing professional services including acknowledgements, affidavits, power of attorney, and business contracts. Remote and in-person appointments available.'
            }
        },
        fr: {
            nav: { about: 'À Propos', experience: 'Expérience', skills: 'Compétences', projects: 'Projets', contact: 'Contact' },
            hero: {
                greeting: 'Bonjour, je suis',
                title: 'Ingénieure Full-Stack',
                description: "Je crée des solutions d'entreprise évolutives. Plus de 300K lignes de code en production. 99,5% de disponibilité. Experte en React, Node.js, C#, Python et AWS.",
                cta: 'Me Contacter',
                resume: 'Voir CV'
            },
            about: {
                title: 'À Propos de Moi',
                text1: "Je suis une ingénieure logicielle Full-Stack avec plus de 4 ans d'expérience dans la création de systèmes d'entreprise pour la fabrication, les services financiers et le commerce électronique. Je me spécialise dans l'architecture et le déploiement d'applications de production desservant plusieurs sites.",
                text2: "Mon expertise couvre l'ensemble de la pile—des interfaces React aux backends Node.js/ASP.NET, bases de données SQL et infrastructure cloud sur AWS et Azure. J'ai réduit le temps de traitement opérationnel de 70% et obtenu une réduction de 90% des erreurs grâce à l'automatisation.",
                stats: { years: "Ans d'Expérience", code: 'Lignes de Code', uptime: 'Disponibilité', saved: 'Temps Gagné' }
            },
            contact: {
                title: 'Me Contacter',
                intro: "Je suis actuellement ouverte à de nouvelles opportunités! Remplissez le formulaire ci-dessous et je vous répondrai dans les 24 heures. Vous pouvez également planifier un appel en sélectionnant une date et une heure.",
                name: 'Votre Nom *',
                email: 'Votre Email *',
                phone: 'Numéro de Téléphone *',
                service: 'Sélectionner le Type de Service *',
                services: { dev: 'Développement Logiciel', notary: 'Service Notarial', consulting: 'Consultation', other: 'Autre' },
                date: 'Date et Heure Préférées (optionnel)',
                message: 'Parlez-moi de votre projet *',
                submit: 'Envoyer le Message',
                success: '✓ Message envoyé avec succès! Je vous répondrai bientôt.',
                info: 'Coordonnées',
                notaryTitle: 'Services Notariaux',
                notaryDesc: 'Notaire Public Mobile agréée offrant des services professionnels incluant reconnaissances, affidavits, procurations et contrats commerciaux. Rendez-vous à distance et en personne disponibles.'
            }
        }
    };

    const t = translations[language];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            // Fade-in animation trigger
            const sections = document.querySelectorAll('.fade-in-section');
            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                const isVisible = rect.top < window.innerHeight * 0.75;
                if (isVisible) {
                    section.classList.add('is-visible');
                }
            });

            // Stats counter trigger
            if (statsRef.current) {
                const rect = statsRef.current.getBoundingClientRect();
                const isVisible = rect.top < window.innerHeight * 0.75;
                if (isVisible && !statsInView) {
                    setStatsInView(true);
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Check on mount
        return () => window.removeEventListener('scroll', handleScroll);
    }, [statsInView]);

    useEffect(() => {
        const fetchWeather = async (lat, lon) => {
            try {
                const data = await getFormattedWeatherData({
                    lat,
                    lon,
                    units: 'imperial'
                });
                setWeather(data);
            } catch (error) {
                console.error("Error fetching weather data:", error);
                // Fallback to Hoboken if weather fetch fails
                try {
                    const fallbackData = await getFormattedWeatherData({
                        q: 'hoboken',
                        units: 'imperial'
                    });
                    setWeather(fallbackData);
                } catch (fallbackError) {
                    console.error("Fallback weather fetch failed:", fallbackError);
                }
            }
        };

        // Get user's location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    fetchWeather(latitude, longitude);
                },
                (error) => {
                    console.warn("Geolocation denied or unavailable:", error);
                    // Fallback to Hoboken coordinates if geolocation is denied
                    fetchWeather(40.7439, -74.0324);
                }
            );
        } else {
            // Browser doesn't support geolocation, use Hoboken as fallback
            console.warn("Geolocation not supported by this browser");
            fetchWeather(40.7439, -74.0324);
        }
    }, []);

    const scrollToSection = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    };

    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'fr' : 'en');
    };

    // Animated counter component
    const Counter = ({ end, duration = 2000, suffix = '' }) => {
        const [count, setCount] = useState(0);

        useEffect(() => {
            if (!statsInView) return;

            let startTime;
            const animate = (currentTime) => {
                if (!startTime) startTime = currentTime;
                const progress = Math.min((currentTime - startTime) / duration, 1);

                const value = Math.floor(progress * end);
                setCount(value);

                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            };

            requestAnimationFrame(animate);
        }, [statsInView, end, duration]);

        return <>{count}{suffix}</>;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleDateChange = (date) => {
        setFormData({
            ...formData,
            selectedDate: date,
        });
    };

    const sendEmail = (e) => {
        e.preventDefault();
        emailjs
            .sendForm('service_wq0fz1y', 'template_cn8n1gi', e.target, 'z01pUKhhurokO_4ff')
            .then((res) => {
                console.log('Email sent successfully:', res);
                setSuccess(true);
                setFormData({
                    name: '',
                    email: '',
                    phoneNumber: '',
                    appointmentType: '',
                    description: '',
                    selectedDate: null,
                });
                setTimeout(() => setSuccess(false), 5000);
            })
            .catch((err) => {
                console.error('Failed to send the email:', err);
            });
    };

    return(
        <div className="portfolio" data-theme={theme}>
            {/* Navigation */}
            <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
                <div className="nav-content">
                    <div className="nav-logo">GMC</div>
                    <div className="nav-links">
                        <a onClick={() => scrollToSection('about')}>{t.nav.about}</a>
                        <a onClick={() => scrollToSection('experience')}>{t.nav.experience}</a>
                        <a onClick={() => scrollToSection('skills')}>{t.nav.skills}</a>
                        <a onClick={() => scrollToSection('projects')}>{t.nav.projects}</a>
                        <a onClick={() => scrollToSection('contact')}>{t.nav.contact}</a>
                    </div>
                    <div className="nav-controls">
                        <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
                            {theme === 'dark' ? <FaSun /> : <FaMoon />}
                        </button>
                        <button onClick={toggleLanguage} className="lang-toggle">
                            {language === 'en' ? 'FR' : 'EN'}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="hero" id="home">
                {/* Weather Widget */}
                {weather && (
                    <div className="floating-weather">
                        <div className="weather-mini">
                            <FaCloudSun className="weather-mini-icon" />
                            <div className="weather-mini-info">
                                <div className="weather-mini-location">{weather.name}</div>
                                <div className="weather-mini-temp">{weather.temp.toFixed()}°F</div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="hero-content">
                    <div className="hero-text">
                        <h1 className="hero-title">
                            {t.hero.greeting} <span className="highlight">Gabriela Morales</span>
                        </h1>
                        <h2 className="hero-subtitle">{t.hero.title}</h2>
                        <p className="hero-description">
                            {t.hero.description}
                        </p>
                        <div className="hero-cta">
                            <button className="btn-primary" onClick={() => scrollToSection('contact')}>
                                {t.hero.cta}
                            </button>
                            <a href="/gabrielaMorales_cv.pdf" className="btn-secondary" target="_blank" rel="noopener noreferrer">
                                <FaFilePdf /> {t.hero.resume}
                            </a>
                        </div>
                        <div className="hero-social">
                            <a href="https://github.com/diniwigs" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
                            <a href="https://www.linkedin.com/in/gabriela-morales" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
                            <a href="mailto:gabrielamoralescg@gmail.com"><FaEnvelope /></a>
                        </div>
                    </div>
                </div>
                <div className="scroll-indicator" onClick={() => scrollToSection('about')}>
                    <FaChevronDown />
                </div>
            </section>

            {/* About Section */}
            <section className="section about-section fade-in-section" id="about">
                <div className="container">
                    <h2 className="section-title">{t.about.title}</h2>
                    <div className="about-content">
                        <div className="about-text">
                            <p>{t.about.text1}</p>
                            <p>{t.about.text2}</p>
                        </div>
                        <div className="about-stats" ref={statsRef}>
                            <div className="stat-box">
                                <div className="stat-number"><Counter end={4} suffix="+" /></div>
                                <div className="stat-label">{t.about.stats.years}</div>
                            </div>
                            <div className="stat-box">
                                <div className="stat-number"><Counter end={300} suffix="K+" /></div>
                                <div className="stat-label">{t.about.stats.code}</div>
                            </div>
                            <div className="stat-box">
                                <div className="stat-number"><Counter end={99} suffix=".5%" /></div>
                                <div className="stat-label">{t.about.stats.uptime}</div>
                            </div>
                            <div className="stat-box">
                                <div className="stat-number"><Counter end={70} suffix="%" /></div>
                                <div className="stat-label">{t.about.stats.saved}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Experience Section */}
            <section className="section experience-section fade-in-section" id="experience">
                <div className="container">
                    <h2 className="section-title">Experience</h2>
                    <div className="timeline">
                        <div className="timeline-item">
                            <div className="timeline-dot"></div>
                            <div className="timeline-content">
                                <div className="timeline-date">Nov 2024 - Present</div>
                                <h3>Full-Stack Software Engineer</h3>
                                <h4>DiNi Wigs</h4>
                                <p>
                                    Built enterprise manufacturing system serving multiple office locations with React frontend
                                    (53+ components), Node.js backend (77+ REST endpoints), and SQL Server database. Integrated
                                    QuickBooks API, Google Drive, and SMS services. Designed multi-cloud architecture on Railway,
                                    Cloudflare, and Azure maintaining 99.5% uptime.
                                </p>
                                <div className="tech-tags">
                                    <span>React</span>
                                    <span>Node.js</span>
                                    <span>SQL Server</span>
                                    <span>Azure</span>
                                    <span>QuickBooks API</span>
                                </div>
                            </div>
                        </div>

                        <div className="timeline-item">
                            <div className="timeline-dot"></div>
                            <div className="timeline-content">
                                <div className="timeline-date">May 2024 - Nov 2024</div>
                                <h3>Data Engineer</h3>
                                <h4>OscarSoles LLC</h4>
                                <p>
                                    Developed API integrations for GOAT, Shopify, and Poizon automating data pipelines with MySQL
                                    and implementing real-time inventory management. Built automated SKU tracking system and created
                                    SDKs for external API integrations.
                                </p>
                                <div className="tech-tags">
                                    <span>Python</span>
                                    <span>MySQL</span>
                                    <span>Shopify API</span>
                                    <span>SAP</span>
                                </div>
                            </div>
                        </div>

                        <div className="timeline-item">
                            <div className="timeline-dot"></div>
                            <div className="timeline-content">
                                <div className="timeline-date">May 2022 - Jan 2024</div>
                                <h3>Data Analyst & Python Developer</h3>
                                <h4>Capgemini (Consulting)</h4>
                                <p>
                                    Consulted for Fortune 500 clients including Bank of New York Mellon and Vanguard.
                                    Built data pipelines, Power BI reports, and AWS infrastructure. Led AWS environment
                                    configuration for enterprise security applications.
                                </p>
                                <div className="tech-tags">
                                    <span>Python</span>
                                    <span>AWS</span>
                                    <span>Power BI</span>
                                    <span>SQL</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Skills Section */}
            <section className="section skills-section fade-in-section" id="skills">
                <div className="container">
                    <h2 className="section-title">Skills & Technologies</h2>
                    <div className="skills-grid">
                        <div className="skill-card">
                            <h3>Frontend</h3>
                            <div className="skill-list">
                                <span>React.js</span>
                                <span>JavaScript (ES6+)</span>
                                <span>TypeScript</span>
                                <span>HTML5 & CSS3</span>
                                <span>ASP.NET Web Forms</span>
                                <span>React Hooks</span>
                                <span>Context API</span>
                            </div>
                        </div>

                        <div className="skill-card">
                            <h3>Backend</h3>
                            <div className="skill-list">
                                <span>Node.js</span>
                                <span>Express.js</span>
                                <span>ASP.NET</span>
                                <span>C#</span>
                                <span>Python</span>
                                <span>RESTful APIs</span>
                                <span>JWT Auth</span>
                            </div>
                        </div>

                        <div className="skill-card">
                            <h3>Database</h3>
                            <div className="skill-list">
                                <span>SQL Server</span>
                                <span>MySQL</span>
                                <span>MongoDB</span>
                                <span>Azure SQL</span>
                                <span>Query Optimization</span>
                            </div>
                        </div>

                        <div className="skill-card">
                            <h3>Cloud & DevOps</h3>
                            <div className="skill-list">
                                <span>AWS (Lambda, S3, EC2)</span>
                                <span>Azure</span>
                                <span>Railway</span>
                                <span>Cloudflare</span>
                                <span>IIS</span>
                            </div>
                        </div>

                        <div className="skill-card">
                            <h3>Data Engineering</h3>
                            <div className="skill-list">
                                <span>Python (Pandas)</span>
                                <span>ETL Pipelines</span>
                                <span>Power BI</span>
                                <span>Tableau</span>
                                <span>SAP Integration</span>
                            </div>
                        </div>

                        <div className="skill-card">
                            <h3>Tools & APIs</h3>
                            <div className="skill-list">
                                <span>Git</span>
                                <span>QuickBooks API</span>
                                <span>Shopify API</span>
                                <span>OAuth 2.0</span>
                                <span>Postman</span>
                            </div>
                        </div>
                    </div>

                    <div className="certifications">
                        <h3>Certifications</h3>
                        <div className="cert-list">
                            <div className="cert-item">
                                <span className="cert-badge">AWS</span>
                                <span>Solutions Architect - Associate</span>
                            </div>
                            <div className="cert-item">
                                <span className="cert-badge">AWS</span>
                                <span>Cloud Practitioner</span>
                            </div>
                            <div className="cert-item">
                                <span className="cert-badge">DAML</span>
                                <span>Fundamentals Certification</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Projects Section */}
            <section className="section projects-section fade-in-section" id="projects">
                <div className="container">
                    <h2 className="section-title">Featured Project</h2>
                    <div className="project-showcase">
                        <div className="project-card-large">
                            <div className="project-header">
                                <h3>DiNiTracker V2</h3>
                                <span className="project-tag">Enterprise Application</span>
                            </div>
                            <p className="project-description">
                                A comprehensive manufacturing and business management system serving multiple office locations
                                across US and Israeli markets. Single-handedly developed 300,000+ lines of custom code handling
                                complete order lifecycle, inventory tracking, CRM, and multi-region financial operations.
                            </p>
                            <div className="project-features">
                                <div className="feature-item">
                                    <h4>53+</h4>
                                    <span>React Components</span>
                                </div>
                                <div className="feature-item">
                                    <h4>77+</h4>
                                    <span>REST Endpoints</span>
                                </div>
                                <div className="feature-item">
                                    <h4>15+</h4>
                                    <span>Database Tables</span>
                                </div>
                                <div className="feature-item">
                                    <h4>99.5%</h4>
                                    <span>Uptime</span>
                                </div>
                            </div>
                            <div className="project-tech">
                                <span>React</span>
                                <span>Node.js</span>
                                <span>Express</span>
                                <span>SQL Server</span>
                                <span>Azure</span>
                                <span>Railway</span>
                                <span>Cloudflare</span>
                                <span>QuickBooks API</span>
                                <span>Google Drive API</span>
                            </div>
                            <div className="project-highlights">
                                <div className="highlight-item">
                                    <strong>70%</strong> reduction in operational processing time
                                </div>
                                <div className="highlight-item">
                                    <strong>90%</strong> error reduction through automation
                                </div>
                                <div className="highlight-item">
                                    Eliminated <strong>10+ hours weekly</strong> of manual financial entry
                                </div>
                            </div>
                            <div className="project-demo">
                                <a
                                    href="https://dinitracker-v2.pages.dev/login"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="demo-button"
                                >
                                    <FaExternalLinkAlt /> View Live Demo
                                </a>
                                <div className="demo-credentials">
                                    <span className="demo-label">Demo Credentials:</span>
                                    <span className="demo-cred">Username: <strong>noga</strong></span>
                                    <span className="demo-cred">Password: <strong>123</strong></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section with Form */}
            <section className="section contact-section fade-in-section" id="contact">
                <div className="container">
                    <h2 className="section-title">{t.contact.title}</h2>
                    <div className="contact-grid">
                        <div className="contact-form-container">
                            <p className="contact-intro">
                                {t.contact.intro}
                            </p>
                            <form className="contact-form" onSubmit={sendEmail}>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder={t.contact.name}
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder={t.contact.email}
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="tel"
                                        name="phoneNumber"
                                        placeholder={t.contact.phone}
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <select
                                        name="appointmentType"
                                        value={formData.appointmentType}
                                        onChange={handleChange}
                                        required
                                    >
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
                                    <textarea
                                        name="description"
                                        placeholder={t.contact.message}
                                        value={formData.description}
                                        onChange={handleChange}
                                        rows="5"
                                        required
                                    ></textarea>
                                </div>
                                <button type="submit" className="btn-submit">
                                    {t.contact.submit}
                                </button>
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
                                    <FaEnvelope className="contact-icon" />
                                    <a href="mailto:gabrielamoralescg@gmail.com">gabrielamoralescg@gmail.com</a>
                                </div>
                                <div className="contact-item">
                                    <FaPhone className="contact-icon" />
                                    <a href="tel:201-844-3508">201-844-3508</a>
                                </div>
                            </div>
                            <div className="contact-notary-box">
                                <h3>{t.contact.notaryTitle}</h3>
                                <p>
                                    {t.contact.notaryDesc}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="footer-content">
                    <p>&copy; 2025 Gabriela Morales. Built with React.</p>
                    <div className="footer-social">
                        <a href="https://github.com/diniwigs" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
                        <a href="https://www.linkedin.com/in/gabriela-morales" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Main;
