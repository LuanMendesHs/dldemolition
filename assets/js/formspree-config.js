// Formspree Configuration for DL Demolition
// Replace 'YOUR_FORM_ID' with actual Formspree form ID

const FORMSPREE_CONFIG = {
  endpoint: 'https://formspree.io/f/YOUR_FORM_ID', // Replace with actual form ID
  email: 'hello@dldemolition.com.au',
  phone: '+61451612742',
  whatsappUrl: 'https://wa.me/61451612742'
};

// Form submission handler
async function submitForm(formData, formType = 'quote') {
  try {
    // Show loading state
    showFormLoading(true);
    
    // Prepare form data
    const data = new FormData();
    
    // Add form fields
    Object.keys(formData).forEach(key => {
      data.append(key, formData[key]);
    });
    
    // Add form type and timestamp
    data.append('form_type', formType);
    data.append('submitted_at', new Date().toISOString());
    data.append('source_page', window.location.href);
    
    // Submit to Formspree
    const response = await fetch(FORMSPREE_CONFIG.endpoint, {
      method: 'POST',
      body: data,
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (response.ok) {
      // Success - redirect to WhatsApp with pre-filled message
      const message = createWhatsAppMessage(formData, formType);
      const whatsappUrl = `${FORMSPREE_CONFIG.whatsappUrl}?text=${encodeURIComponent(message)}`;
      
      // Show success message briefly
      showFormSuccess();
      
      // Redirect to WhatsApp after 2 seconds
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
        resetForm();
      }, 2000);
      
    } else {
      throw new Error('Form submission failed');
    }
    
  } catch (error) {
    console.error('Form submission error:', error);
    showFormError('Sorry, there was an error submitting your form. Please try calling us directly at ' + FORMSPREE_CONFIG.phone);
  } finally {
    showFormLoading(false);
  }
}

// Create WhatsApp message from form data
function createWhatsAppMessage(formData, formType) {
  let message = `Hello! I've submitted a ${formType} request through your website.\n\n`;
  
  if (formData.fullName) message += `Name: ${formData.fullName}\n`;
  if (formData.phone) message += `Phone: ${formData.phone}\n`;
  if (formData.email) message += `Email: ${formData.email}\n`;
  if (formData.location) message += `Location: ${formData.location}\n`;
  if (formData.service) message += `Service: ${formData.service}\n`;
  if (formData.projectDetails) message += `Details: ${formData.projectDetails}\n`;
  if (formData.urgency) message += `Urgency: ${formData.urgency}\n`;
  if (formData.propertyType) message += `Property Type: ${formData.propertyType}\n`;
  if (formData.estimatedArea) message += `Estimated Area: ${formData.estimatedArea}m²\n`;
  
  message += `\nPlease contact me to discuss my project. Thank you!`;
  
  return message;
}

// UI Helper Functions
function showFormLoading(show) {
  const submitBtn = document.querySelector('button[type="submit"]');
  if (submitBtn) {
    if (show) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="animate-spin">⏳</span> Sending...';
    } else {
      submitBtn.disabled = false;
      submitBtn.innerHTML = 'Get Free Quote';
    }
  }
}

function showFormSuccess() {
  const message = document.createElement('div');
  message.className = 'fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50';
  message.innerHTML = '✅ Form submitted! Redirecting to WhatsApp...';
  document.body.appendChild(message);
  
  setTimeout(() => {
    message.remove();
  }, 3000);
}

function showFormError(errorMessage) {
  const message = document.createElement('div');
  message.className = 'fixed top-4 right-4 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 max-w-md';
  message.innerHTML = `❌ ${errorMessage}`;
  document.body.appendChild(message);
  
  setTimeout(() => {
    message.remove();
  }, 5000);
}

function resetForm() {
  const forms = document.querySelectorAll('form');
  forms.forEach(form => form.reset());
}

// Initialize form handlers when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Quick Quote Form (index.html)
  const quoteForm = document.getElementById('quote-form');
  if (quoteForm) {
    quoteForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const formData = {
        fullName: document.getElementById('fullName')?.value,
        phone: document.getElementById('phone')?.value,
        email: document.getElementById('email')?.value,
        location: document.getElementById('location')?.value,
        service: document.getElementById('service')?.value,
        projectDetails: document.getElementById('projectDetails')?.value
      };
      
      await submitForm(formData, 'quick-quote');
    });
  }
  
  // Detailed Quote Form (quote.html)
  const detailedForm = document.getElementById('detailed-quote-form');
  if (detailedForm) {
    detailedForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const formData = {
        fullName: document.getElementById('fullName')?.value,
        phone: document.getElementById('phone')?.value,
        email: document.getElementById('email')?.value,
        location: document.getElementById('location')?.value,
        service: document.getElementById('service')?.value,
        urgency: document.getElementById('urgency')?.value,
        propertyType: document.getElementById('propertyType')?.value,
        estimatedArea: document.getElementById('estimatedArea')?.value,
        projectDetails: document.getElementById('projectDetails')?.value,
        preferredContact: document.getElementById('preferredContact')?.value,
        preferredTime: document.getElementById('preferredTime')?.value
      };
      
      await submitForm(formData, 'detailed-quote');
    });
  }
  
  // Calculator Form
  const calculatorForm = document.getElementById('calculator-form');
  if (calculatorForm) {
    calculatorForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      // Get selected services and their areas
      const selectedServices = [];
      const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
      
      checkboxes.forEach(checkbox => {
        const serviceDiv = checkbox.closest('.service-option');
        const areaInput = serviceDiv?.querySelector('input[type="number"]');
        
        if (areaInput && areaInput.value) {
          selectedServices.push({
            service: checkbox.value,
            area: areaInput.value
          });
        }
      });
      
      const formData = {
        fullName: document.getElementById('calc-name')?.value,
        phone: document.getElementById('calc-phone')?.value,
        email: document.getElementById('calc-email')?.value,
        location: document.getElementById('calc-location')?.value,
        services: selectedServices.map(s => `${s.service} (${s.area}m²)`).join(', '),
        urgency: document.getElementById('urgency')?.value,
        access: document.getElementById('access')?.value,
        locationFactor: document.getElementById('location-factor')?.value,
        estimatedTotal: document.getElementById('total-estimate')?.textContent
      };
      
      await submitForm(formData, 'calculator-quote');
    });
  }
});

