// Direct Email & WhatsApp Inquiry Handler
document.addEventListener('DOMContentLoaded', () => {
  const inquiryForm = document.getElementById('home-inquiry-form');
  const successBanner = document.getElementById('inquiry-success');

  if (inquiryForm) {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('inq-name').value.trim();
      const phone = document.getElementById('inq-phone').value.trim();
      const email = document.getElementById('inq-email').value.trim();
      const occasion = document.getElementById('inq-occasion').value;
      const date = document.getElementById('inq-date').value || 'Flexible';
      const guests = document.getElementById('inq-guests').value.trim() || 'Not specified';
      const venue = document.getElementById('inq-venue').value.trim() || 'Nashik / Maharashtra';
      const message = document.getElementById('inq-message').value.trim() || 'No additional notes provided';

      // 1. Prepare formatted email content
      const subject = encodeURIComponent(`New Event Inquiry from ${name} - ${occasion}`);
      const body = encodeURIComponent(
`Hello Eternity Events Team,

A new event planning inquiry has been submitted through the website:

• Client Name: ${name}
• Phone / WhatsApp: ${phone}
• Email Address: ${email}
• Event Occasion: ${occasion}
• Tentative Date: ${date}
• Approximate Guests: ${guests}
• Preferred Venue / City: ${venue}

• Vision & Special Requests:
${message}

--------------------------------------------------
Recipient Emails: Contact@eternityevents.in & eternityevent7@gmail.com
Submission Timestamp: ${new Date().toLocaleString()}
`
      );

      // Construct mailto link with primary + CC destination
      const mailtoUrl = `mailto:Contact@eternityevents.in?cc=eternityevent7@gmail.com&subject=${subject}&body=${body}`;

      // 2. Trigger mail dispatch
      window.open(mailtoUrl, '_blank');

      // 3. Show high-luxury success confirmation on UI
      if (successBanner) {
        successBanner.classList.remove('hidden');
        successBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      // Also trigger optional WhatsApp copy for user convenience
      const waText = encodeURIComponent(
        `Hi Eternity Events,\n\nI just submitted a booking inquiry on your website:\n• Name: ${name}\n• Occasion: ${occasion}\n• Date: ${date}\n• Venue: ${venue}\n\nPlease check your email (Contact@eternityevents.in) for details!`
      );
      
      setTimeout(() => {
        const waPrompt = confirm("Inquiry sent to email! Would you also like to send a quick copy to our WhatsApp for instant response?");
        if (waPrompt) {
          window.open(`https://wa.me/917030644067?text=${waText}`, '_blank');
        }
      }, 800);

      inquiryForm.reset();
    });
  }
});

