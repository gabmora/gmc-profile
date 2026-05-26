import React from 'react';
import './CV.css';
import {
    FaGithub, FaLinkedin, FaEnvelope, FaMapMarkerAlt, FaExternalLinkAlt
} from 'react-icons/fa';

function CV() {
    return (
        <div className="cv-page">

            <header className="cv-header">
                <div className="cv-name-row">
                    <img src="/Untitled design.png" alt="Gabriela Morales" className="cv-photo" />
                    <div>
                        <h1 className="cv-name">Gabriela Morales</h1>
                        <p className="cv-title">Full-Stack Software Engineer &middot; Founder, Studio Caballero</p>
                    </div>
                </div>
                <a
                    href="/gabrielamorales_cv.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cv-print-btn"
                >
                    Download CV
                </a>
            </header>

            <div className="cv-contact-strip">
                <a href="mailto:gabrielamoralescg@gmail.com">
                    <FaEnvelope /> gabrielamoralescg@gmail.com
                </a>
                <a href="https://github.com/diniwigs" target="_blank" rel="noopener noreferrer">
                    <FaGithub /> github.com/diniwigs
                </a>
                <a href="https://www.linkedin.com/in/gabriela-morales-19bb21202/" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin /> LinkedIn
                </a>
                <span><FaMapMarkerAlt /> Hoboken, NJ (EST)</span>
                <a href="https://gmcaballero.com" target="_blank" rel="noopener noreferrer">
                    <FaExternalLinkAlt /> gmcaballero.com
                </a>
            </div>

            <div className="cv-body">

                {/* Summary */}
                <section className="cv-section">
                    <h2 className="cv-section-title">Summary</h2>
                    <p className="cv-summary">
                        Full-stack engineer with 4+ years building production systems for enterprise clients. I founded Studio Caballero in 2024 to deliver custom software, AI SaaS products, and data engineering engagements on a fixed-scope basis. Past clients include Capgemini, BNY Mellon, Vanguard, and DiNi Wigs. Systems I've shipped run at 99.5% uptime and have cut client operational time by 70%.
                    </p>
                </section>

                {/* Skills */}
                <section className="cv-section">
                    <h2 className="cv-section-title">Technical Skills</h2>
                    <div className="cv-skills-grid">
                        <div className="cv-skill-group">
                            <div className="cv-skill-label">Frontend</div>
                            <div className="cv-skill-tags">React.js · React Native · TypeScript · Expo · Tailwind CSS</div>
                        </div>
                        <div className="cv-skill-group">
                            <div className="cv-skill-label">Backend</div>
                            <div className="cv-skill-tags">Node.js · Express.js · C# / ASP.NET · Python · REST · JWT</div>
                        </div>
                        <div className="cv-skill-group">
                            <div className="cv-skill-label">Data &amp; Cloud</div>
                            <div className="cv-skill-tags">SQL Server · MySQL · Supabase · AWS · Azure · Railway</div>
                        </div>
                        <div className="cv-skill-group">
                            <div className="cv-skill-label">Integrations</div>
                            <div className="cv-skill-tags">OpenAI GPT-4 · VAPI Voice AI · Stripe · Twilio · QuickBooks · Shopify · Clover</div>
                        </div>
                    </div>
                </section>

                {/* Experience */}
                <section className="cv-section">
                    <h2 className="cv-section-title">Experience</h2>
                    <div className="cv-timeline">

                        <div className="cv-item">
                            <div className="cv-item-meta">
                                <div className="cv-item-period">Nov 2024 — Present</div>
                                <div className="cv-item-org">Studio Caballero</div>
                                <div className="cv-item-role">Founder &amp; Principal Engineer</div>
                                <div className="cv-item-location">Hoboken, NJ</div>
                            </div>
                            <div className="cv-item-body">
                                <p>Independent software studio delivering fixed-scope enterprise builds and AI SaaS products. I own the full engagement: architecture, development, deployment, and handoff.</p>
                                <ul className="cv-bullets">
                                    <li>
                                        <strong>DiNi Wigs</strong> — architected and shipped a full enterprise work order and payment platform serving US and Israeli office locations. 53 React components, 77 REST endpoints, PCI-compliant Clover integration with 8 payment terminals across 3 locations, card-on-file tokenization, SMS-to-payment links, QuickBooks and Google Drive sync. Multi-cloud infrastructure at 99.5% uptime. Operational processing time cut 70%.
                                    </li>
                                    <li>
                                        <strong>OscarSoles LLC</strong> — built API integrations connecting GOAT, Shopify, and Poizon into a unified MySQL pipeline with automated SKU tracking, real-time inventory sync, and custom SDKs for each external platform.
                                    </li>
                                </ul>
                                <div className="cv-tech">React · Node.js · C# · ASP.NET · SQL Server · MySQL · Azure · AWS · Python · Shopify API · QuickBooks API · Clover API</div>
                            </div>
                        </div>

                        <div className="cv-item">
                            <div className="cv-item-meta">
                                <div className="cv-item-period">2025 — Present</div>
                                <div className="cv-item-org">HVAC AI Platform</div>
                                <div className="cv-item-role">Architect &amp; Engineer</div>
                                <div className="cv-item-location">Studio Caballero</div>
                            </div>
                            <div className="cv-item-body">
                                <p>Multi-tenant SaaS platform for HVAC service companies — full field-service CRM with three purpose-built AI agents, a React 19 web dashboard, and an Expo React Native mobile app for field technicians.</p>
                                <ul className="cv-bullets">
                                    <li><strong>Dispatcher Agent</strong> — VAPI voice AI handles 24/7 inbound customer calls: caller recognition, customer context injection, real-time job scheduling, and emergency escalation to on-call technicians. Replaces a full-time dispatcher role.</li>
                                    <li><strong>Copilot Agent</strong> — GPT-4 Vision assistant on the mobile app. Technicians photograph equipment and receive instant fault diagnosis, troubleshooting steps, and manual lookups in the field.</li>
                                    <li><strong>Reactivator Agent</strong> — Automated re-engagement: segments dormant customers, generates personalized SMS and email campaigns via Twilio, tracks revenue per campaign in Stripe.</li>
                                    <li><strong>Dispatch &amp; CRM</strong> — Technician GPS tracking, smart proximity-based routing (Haversine), full customer/property/job history, quote builder with Stripe payments.</li>
                                </ul>
                                <div className="cv-tech">React 19 · TypeScript · React Native · Expo · Node.js · Express 5 · Supabase · OpenAI GPT-4 · VAPI Voice AI · Stripe · Twilio · Railway</div>
                            </div>
                        </div>

                        <div className="cv-item">
                            <div className="cv-item-meta">
                                <div className="cv-item-period">May 2022 — Jan 2024</div>
                                <div className="cv-item-org">Capgemini</div>
                                <div className="cv-item-role">Technology Analyst</div>
                                <div className="cv-item-location">Remote</div>
                            </div>
                            <div className="cv-item-body">
                                <p>Embedded consultant at Fortune 500 financial services clients. Delivered data infrastructure, cloud configuration, and reporting systems under strict enterprise security requirements.</p>
                                <ul className="cv-bullets">
                                    <li>
                                        <strong>BNY Mellon</strong> — led cloud environment configuration and AWS infrastructure setup for enterprise-grade security applications.
                                    </li>
                                    <li>
                                        <strong>Vanguard</strong> — built automated data pipelines and Power BI reporting systems for operational analytics teams.
                                    </li>
                                </ul>
                                <div className="cv-tech">Python · AWS · Azure · Power BI · SQL · Git</div>
                            </div>
                        </div>

                    </div>
                </section>

                {/* Education */}
                <section className="cv-section">
                    <h2 className="cv-section-title">Education</h2>
                    <div className="cv-item">
                        <div className="cv-item-meta">
                            <div className="cv-item-period">Dec 2021</div>
                            <div className="cv-item-org">University of South Carolina</div>
                        </div>
                        <div className="cv-item-body">
                            <div className="cv-item-role">B.S. Computer Science and Technology</div>
                        </div>
                    </div>
                </section>

                {/* Certifications */}
                <section className="cv-section">
                    <h2 className="cv-section-title">Certifications</h2>
                    <div className="cv-cert-list">
                        <div className="cv-cert">
                            <span className="cv-cert-badge">AWS</span>
                            Solutions Architect — Associate
                        </div>
                        <div className="cv-cert">
                            <span className="cv-cert-badge">AWS</span>
                            Cloud Practitioner
                        </div>
                        <div className="cv-cert">
                            <span className="cv-cert-badge">DAML</span>
                            Fundamentals — Digital Asset Modeling Language (distributed ledger smart contracts)
                        </div>
                        <div className="cv-cert">
                            <span className="cv-cert-badge">NNA</span>
                            Certified Notary Signing Agent
                        </div>
                    </div>
                </section>

            </div>

            <footer className="cv-footer">
                <a href="/" className="cv-back">&#8592; Studio Caballero</a>
                <span className="cv-footer-name">Gabriela Morales &middot; gmcaballero.com &middot; 2026</span>
            </footer>

        </div>
    );
}

export default CV;
