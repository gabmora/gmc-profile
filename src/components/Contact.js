import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import emailjs from 'emailjs-com'; 
import './Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    appointmentType: '',
    description: '',
    selectedDate: null,
  });

  const [success, setSuccess] = useState(false);

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
      .sendForm('service_wq0fz1y', 'template_cn8n1gi', e.target, 'z01pUKhhurokO_4ff') //!!!!template_cn8n1gi
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
      })
      .catch((err) => {
        console.error('Failed to send the email:', err);
      });
  };
    const closeSuccessMessage = () => {
      setSuccess(false);
  };
  return (
    <div className='main'>
      <div className="text-container">
        <h1>Let's Talk!</h1>
      <p>This contact form will send a direct email to my personal email. I promise to respond within 24 hours. If you prefer I reach out to you over a phone call, please utilize the date and time field for a convient time I can reach out. If you're cool with an email, select the the time and date you send the message.</p>
    </div>
    <div className="BookingPage-container">
      <h2>CONTACT ME</h2>
      <form className="BookingPage-form" onSubmit={sendEmail}>
        <div>
          <label htmlFor="name"></label>
          <input
            type="text"
            id="name"
            name="name"
            className="BookingPage-input"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            required
            />
        </div>
        <div>
          <label htmlFor="email"></label>
          <input
            type="text"
            id="email"
            name="email"
            className="BookingPage-input"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            />
        </div>
        <div>
          <label htmlFor="phoneNumber"></label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            className="BookingPage-input"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Phone Number"
            required
            />
        </div>
        <div>
          <label htmlFor="appointmentType"></label>
          <select
            id="appointmentType"
            name="appointmentType"
            className="BookingPage-input"
            value={formData.appointmentType}
            onChange={handleChange}
            required
            >
            <option value="">Select an option</option>
            <option value="Notary Service">Notary Service</option>
            <option value="Web Dev Help">Web Dev Help</option>
          </select>
        </div>
        <div>
          <label htmlFor="selectedDate"></label>
          <DatePicker
            id="selectedDate"
            name="selectedDate"
            className="BookingPage-datepicker"
            selected={formData.selectedDate}
            onChange={handleDateChange}
            showTimeSelect
            timeFormat="HH:mm aa"
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="MMMM d, yyyy h:mm aa"
            placeholderText="Select a date and time"
            required
            />
        </div>
        <div>
          <label htmlFor="description"></label>
          <textarea
            id="description"
            name="description"
            className="BookingPage-input"
            value={formData.description}
            onChange={handleChange}
            placeholder="what's up?"
            required
            />
        </div>
        <button className="BookingPage-button" type="submit">
          SEND
        </button>
        </form>
        {success && (
          <div className="popup">
            <div className="popup-content">
              <span className="close" onClick={closeSuccessMessage}>
                &times;
              </span>
              <p>   Thanks for your message,    </p>
              <p>  I'll reach back to you shortly!   </p>
            </div>
          </div>
        )}

    </div>
    </div>
  );
}

export default Contact;