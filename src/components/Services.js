import React from 'react';
// import notaryImage from './png-clipart-notary-public-national-notary-association-signing-agent-affidavit-financial-institution.png';
import gmcNotary from './GMC MOBLIE NOTARY PUBLIC.png';
import './Services.css';


function Services(){
    const pdfFilePath = process.env.PUBLIC_URL + '/GMC MOBLIE NOTARY PUBLIC.pdf';
return(
      <div>
        <img className="full-screen-image" src={gmcNotary} alt='Notary PNG' />
      </div>
    // <div>
    //     <h2 className="title">GMC Mobile Notary Public - NNA Certified</h2>
    //     <section>
    //         <h1 className="service-list">List of Services</h1>
    //         <h3 className="service-list">
    //             <li>Deeds</li>
    //             <li>Aknowledgements</li>
    //             <li>Affidavit/Depositions</li>
    //             <li>Certified Copies</li>
    //             <li>Title Transfer</li>
    //             <li>1-9 Forms</li>
    //             <li>VIN Verification</li>
    //             <li>Power of Attorney/Wills</li>
    //             <li>Parent/Spousal Consent</li>
    //             <li>Consent for minor to travel abroad</li>
    //             <li>Estate Plan/Living Trust</li>
    //             <li>Unclaimed Property</li>
    //             <li>Business Contracts</li>
    //             <li>Patent Assignments</li>
    //             <li>Pension Verification</li>
    //             <li>Personal Firearm Applications</li>
    //             <li>International Adoption documents</li>
    //             <h5>***all services availble remotely***</h5>
    //         </h3>
    //     </section>
    // </div>
    
    );
}

export default Services; 