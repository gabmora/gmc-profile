import React, { useState, useEffect, useRef } from "react";
import './Main.css';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt, FaFilePdf, FaChevronDown, FaCloudSun, FaExternalLinkAlt, FaSun, FaMoon, FaReact, FaNodeJs, FaPython, FaAws, FaDatabase, FaDocker, FaGitAlt } from 'react-icons/fa';
import { SiExpress, SiMysql, SiMongodb, SiTypescript, SiJavascript, SiHtml5, SiCss3, SiCsharp, SiDotnet, SiAzuredevops, SiPowerbi, SiPostman, SiShopify, SiQuickbooks, SiCloudflare, SiRailway, SiGoogledrive, SiSupabase, SiOpenai, SiTailwindcss, SiGooglemaps } from 'react-icons/si';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import emailjs from 'emailjs-com';
import getFormattedWeatherData from './components/weather_comps/services_weather/weatherService';
import Typed from 'typed.js';

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
    const typedRef = useRef(null);

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
        let hasTriggeredStats = false;
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
            if (statsRef.current && !hasTriggeredStats) {
                const rect = statsRef.current.getBoundingClientRect();
                const isVisible = rect.top < window.innerHeight * 0.75;
                if (isVisible) {
                    hasTriggeredStats = true;
                    setStatsInView(true);
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Check on mount
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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

    // Typed.js initialization
    useEffect(() => {
        if (typedRef.current) {
            const typed = new Typed(typedRef.current, {
                strings: [
                    'Full-Stack Software Engineer',
                    'React Developer',
                    'Node.js Expert',
                    'Cloud Architect',
                    'Data Engineer'
                ],
                typeSpeed: 60,
                backSpeed: 40,
                loop: true
            });

            return () => {
                typed.destroy();
            };
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
                        <button onClick={() => scrollToSection('about')}>{t.nav.about}</button>
                        <button onClick={() => scrollToSection('experience')}>{t.nav.experience}</button>
                        <button onClick={() => scrollToSection('skills')}>{t.nav.skills}</button>
                        <button onClick={() => scrollToSection('projects')}>{t.nav.projects}</button>
                        <button onClick={() => scrollToSection('contact')}>{t.nav.contact}</button>
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
                        <h2 className="hero-subtitle">
                            <span ref={typedRef}></span>
                        </h2>
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
                            {/* <a href="mailto:gabrielamoralescg@gmail.com"><FaEnvelope /></a> */}
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
                                    <span><FaReact className="tech-icon" /> React</span>
                                    <span><FaNodeJs className="tech-icon" /> Node.js</span>
                                    <span><FaDatabase className="tech-icon" /> SQL Server</span>
                                    <span><SiAzuredevops className="tech-icon" /> Azure</span>
                                    <span><SiQuickbooks className="tech-icon" /> QuickBooks API</span>
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
                                    <span><FaPython className="tech-icon" /> Python</span>
                                    <span><SiMysql className="tech-icon" /> MySQL</span>
                                    <span><SiShopify className="tech-icon" /> Shopify API</span>
                                    <span><FaDatabase className="tech-icon" /> SAP</span>
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
                                    <span><FaPython className="tech-icon" /> Python</span>
                                    <span><FaAws className="tech-icon" /> AWS</span>
                                    <span><SiPowerbi className="tech-icon" /> Power BI</span>
                                    <span><FaDatabase className="tech-icon" /> SQL</span>
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
                    <div className="skills-grid-bars">
                        <div className="skill-category">
                            <h3><FaReact className="category-icon" /> Frontend Development</h3>
                            <div className="skill-bars">
                                <div className="skill-bar-item">
                                    <div className="skill-info">
                                        <span className="skill-name"><FaReact className="skill-icon" /> React.js</span>
                                        <span className="skill-percentage">95%</span>
                                    </div>
                                    <div className="skill-bar-bg">
                                        <div className="skill-bar-fill" style={{'--skill-level': '95%'}}></div>
                                    </div>
                                </div>
                                <div className="skill-bar-item">
                                    <div className="skill-info">
                                        <span className="skill-name"><SiJavascript className="skill-icon" /> JavaScript (ES6+)</span>
                                        <span className="skill-percentage">92%</span>
                                    </div>
                                    <div className="skill-bar-bg">
                                        <div className="skill-bar-fill" style={{'--skill-level': '92%'}}></div>
                                    </div>
                                </div>
                                <div className="skill-bar-item">
                                    <div className="skill-info">
                                        <span className="skill-name"><SiTypescript className="skill-icon" /> TypeScript</span>
                                        <span className="skill-percentage">85%</span>
                                    </div>
                                    <div className="skill-bar-bg">
                                        <div className="skill-bar-fill" style={{'--skill-level': '85%'}}></div>
                                    </div>
                                </div>
                                <div className="skill-bar-item">
                                    <div className="skill-info">
                                        <span className="skill-name"><SiHtml5 className="skill-icon" /> HTML5 & CSS3</span>
                                        <span className="skill-percentage">90%</span>
                                    </div>
                                    <div className="skill-bar-bg">
                                        <div className="skill-bar-fill" style={{'--skill-level': '90%'}}></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="skill-category">
                            <h3><FaNodeJs className="category-icon" /> Backend Development</h3>
                            <div className="skill-bars">
                                <div className="skill-bar-item">
                                    <div className="skill-info">
                                        <span className="skill-name"><FaNodeJs className="skill-icon" /> Node.js</span>
                                        <span className="skill-percentage">93%</span>
                                    </div>
                                    <div className="skill-bar-bg">
                                        <div className="skill-bar-fill" style={{'--skill-level': '93%'}}></div>
                                    </div>
                                </div>
                                <div className="skill-bar-item">
                                    <div className="skill-info">
                                        <span className="skill-name"><SiExpress className="skill-icon" /> Express.js</span>
                                        <span className="skill-percentage">90%</span>
                                    </div>
                                    <div className="skill-bar-bg">
                                        <div className="skill-bar-fill" style={{'--skill-level': '90%'}}></div>
                                    </div>
                                </div>
                                <div className="skill-bar-item">
                                    <div className="skill-info">
                                        <span className="skill-name"><SiCsharp className="skill-icon" /> C# / ASP.NET</span>
                                        <span className="skill-percentage">88%</span>
                                    </div>
                                    <div className="skill-bar-bg">
                                        <div className="skill-bar-fill" style={{'--skill-level': '88%'}}></div>
                                    </div>
                                </div>
                                <div className="skill-bar-item">
                                    <div className="skill-info">
                                        <span className="skill-name"><FaPython className="skill-icon" /> Python</span>
                                        <span className="skill-percentage">87%</span>
                                    </div>
                                    <div className="skill-bar-bg">
                                        <div className="skill-bar-fill" style={{'--skill-level': '87%'}}></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="skill-category">
                            <h3><FaDatabase className="category-icon" /> Database & Cloud</h3>
                            <div className="skill-bars">
                                <div className="skill-bar-item">
                                    <div className="skill-info">
                                        <span className="skill-name"><FaDatabase className="skill-icon" /> SQL Server</span>
                                        <span className="skill-percentage">91%</span>
                                    </div>
                                    <div className="skill-bar-bg">
                                        <div className="skill-bar-fill" style={{'--skill-level': '91%'}}></div>
                                    </div>
                                </div>
                                <div className="skill-bar-item">
                                    <div className="skill-info">
                                        <span className="skill-name"><FaAws className="skill-icon" /> AWS</span>
                                        <span className="skill-percentage">86%</span>
                                    </div>
                                    <div className="skill-bar-bg">
                                        <div className="skill-bar-fill" style={{'--skill-level': '86%'}}></div>
                                    </div>
                                </div>
                                <div className="skill-bar-item">
                                    <div className="skill-info">
                                        <span className="skill-name"><SiAzuredevops className="skill-icon" /> Azure</span>
                                        <span className="skill-percentage">84%</span>
                                    </div>
                                    <div className="skill-bar-bg">
                                        <div className="skill-bar-fill" style={{'--skill-level': '84%'}}></div>
                                    </div>
                                </div>
                                <div className="skill-bar-item">
                                    <div className="skill-info">
                                        <span className="skill-name"><SiMysql className="skill-icon" /> MySQL</span>
                                        <span className="skill-percentage">88%</span>
                                    </div>
                                    <div className="skill-bar-bg">
                                        <div className="skill-bar-fill" style={{'--skill-level': '88%'}}></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="skill-category">
                            <h3><FaGitAlt className="category-icon" /> Tools & APIs</h3>
                            <div className="skill-bars">
                                <div className="skill-bar-item">
                                    <div className="skill-info">
                                        <span className="skill-name"><FaGitAlt className="skill-icon" /> Git</span>
                                        <span className="skill-percentage">89%</span>
                                    </div>
                                    <div className="skill-bar-bg">
                                        <div className="skill-bar-fill" style={{'--skill-level': '89%'}}></div>
                                    </div>
                                </div>
                                <div className="skill-bar-item">
                                    <div className="skill-info">
                                        <span className="skill-name"><SiQuickbooks className="skill-icon" /> QuickBooks API</span>
                                        <span className="skill-percentage">85%</span>
                                    </div>
                                    <div className="skill-bar-bg">
                                        <div className="skill-bar-fill" style={{'--skill-level': '85%'}}></div>
                                    </div>
                                </div>
                                <div className="skill-bar-item">
                                    <div className="skill-info">
                                        <span className="skill-name"><SiShopify className="skill-icon" /> Shopify API</span>
                                        <span className="skill-percentage">82%</span>
                                    </div>
                                    <div className="skill-bar-bg">
                                        <div className="skill-bar-fill" style={{'--skill-level': '82%'}}></div>
                                    </div>
                                </div>
                                <div className="skill-bar-item">
                                    <div className="skill-info">
                                        <span className="skill-name"><SiPowerbi className="skill-icon" /> Power BI</span>
                                        <span className="skill-percentage">80%</span>
                                    </div>
                                    <div className="skill-bar-bg">
                                        <div className="skill-bar-fill" style={{'--skill-level': '80%'}}></div>
                                    </div>
                                </div>
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
                    <h2 className="section-title">Featured Projects</h2>
                    <div className="projects-grid">
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
                                {/* <div className="feature-item">
                                    <h4>15+</h4>
                                    <span>Database Tables</span>
                                </div> */}
                                <div className="feature-item">
                                    <h4>99.5%</h4>
                                    <span>Uptime</span>
                                </div>
                            </div>
                            <div className="project-tech">
                                <span><FaReact className="tech-icon" /> React</span>
                                <span><FaNodeJs className="tech-icon" /> Node.js</span>
                                <span><SiExpress className="tech-icon" /> Express</span>
                                <span><FaDatabase className="tech-icon" /> SQL Server</span>
                                <span><SiAzuredevops className="tech-icon" /> Azure</span>
                                <span><SiRailway className="tech-icon" /> Railway</span>
                                <span><SiCloudflare className="tech-icon" /> Cloudflare</span>
                                <span><SiQuickbooks className="tech-icon" /> QuickBooks API</span>
                                <span><SiGoogledrive className="tech-icon" /> Google Drive API</span>
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

                        {/* Cooling Kings Project */}
                        <div className="project-card-large">
                            <div className="project-header">
                                <h3>K&E HVAC Platform</h3>
                                <span className="project-tag">Full-Stack SaaS</span>
                            </div>
                            <p className="project-description">
                                A comprehensive HVAC service management platform featuring AI-powered customer support,
                                real-time scheduling, and geographic work order visualization. Combines customer-facing
                                website with GPT-4 chatbot for lead generation and enterprise admin dashboard for complete
                                business operations including appointment booking, customer management, and technician dispatch.
                            </p>
                            <div className="project-features">
                                <div className="feature-item">
                                    <h4>25+</h4>
                                    <span>React Components</span>
                                </div>
                                {/* <div className="feature-item">
                                    <h4>3,748</h4>
                                    <span>Lines of Code</span>
                                </div> */}
                                <div className="feature-item">
                                    <h4>5</h4>
                                    <span>Service Modules</span>
                                </div>
                                <div className="feature-item">
                                    <h4>AI</h4>
                                    <span>Powered Chat</span>
                                </div>
                            </div>
                            <div className="project-tech">
                                <span><FaReact className="tech-icon" /> React 18</span>
                                <span><SiSupabase className="tech-icon" /> Supabase</span>
                                <span><SiOpenai className="tech-icon" /> OpenAI GPT-4</span>
                                <span><SiGooglemaps className="tech-icon" /> Google Maps</span>
                                <span><SiTailwindcss className="tech-icon" /> Tailwind CSS</span>
                                <span><FaAws className="tech-icon" /> AWS Amplify</span>
                            </div>
                            <div className="project-highlights">
                                <div className="highlight-item">
                                    <strong>AI-Powered</strong> intelligent lead generation and customer support
                                </div>
                                <div className="highlight-item">
                                    <strong>Real-Time</strong> calendar scheduling with FullCalendar integration
                                </div>
                                <div className="highlight-item">
                                    <strong>Geographic</strong> map-based work order visualization and dispatch
                                </div>
                            </div>
                            <div className="project-demo">
                                <a
                                    href="https://github.com/gabmora/coolingkings"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="demo-button"
                                >
                                    <FaGithub /> View on GitHub
                                </a>
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
                                {/* <div className="contact-item">
                                    <FaEnvelope className="contact-icon" />
                                    <a href="mailto:gabrielamoralescg@gmail.com">gabrielamoralescg@gmail.com</a>
                                </div> */}
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
