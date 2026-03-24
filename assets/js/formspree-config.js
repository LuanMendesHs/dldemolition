/**
 * Formspree Configuration
 * DL Demolition Asbestos & Demolition Website
 * 
 * Setup Instructions:
 * 1. Create a free account at https://formspree.io
 * 2. Create a new form for your website
 * 3. Copy your form endpoint ID
 * 4. Replace 'YOUR_FORM_ID' below with your actual form ID
 * 5. Optional: Configure form settings in Formspree dashboard
 */

const FORMSPREE_CONFIG = {
  // Main contact form endpoint
  contactFormId: 'YOUR_FORM_ID',
  
  // Quote request form endpoint (can be same or different)
  quoteFormId: 'YOUR_FORM_ID',
  
  // Calculator form endpoint
  calculatorFormId: 'YOUR_FORM_ID',
  
  // Base URL for Formspree
  baseUrl: 'https://formspree.io/f/',
  
  // Form settings
  settings: {
    // Auto-response settings
    autoResponse: {
      enabled: true,
      subject: 'Thank you for contacting DL Demolition',
      message: `
        Thank you for reaching out to DL Demolition!
        
        We've received your inquiry and will get back to you within 24 hours.
        
        For urgent matters, please call us at (61) 451 612 742 or WhatsApp us.
        
        Best regards,
        DL Demolition Team
      `
    },
    
    // Notification settings
    notifications: {
      email: 'hello@dldemolition.com.au',
      subject: 'New inquiry from website'
    },
    
    // Spam protection
    spamProtection: {
      enabled: true,
      honeypot: true
    },
    
    // reCAPTCHA (optional)
    recaptcha: {
      enabled: false,
      siteKey: 'YOUR_RECAPTCHA_SITE_KEY'
    }
  }
};

/**
 * Get form endpoint URL
 */
function getFormEndpoint(formType = 'contact') {
  const formIds = {
    contact: FORMSPREE_CONFIG.contactFormId,
    quote: FORMSPREE_CONFIG.quoteFormId,
    calculator: FORMSPREE_CONFIG.calculatorFormId
  };
  
  const formId = formIds[formType] || FORMSPREE_CONFIG.contactFormId;
  return `${FORMSPREE_CONFIG.baseUrl}${formId}`;
}

/**
 * Initialize Formspree on all forms
 */
document.addEventListener('DOMContentLoaded', function() {
  const forms = document.querySelectorAll('form[data-formspree]');
  
  forms.forEach(form => {
    const formType = form.dataset.formspree || 'contact';
    const endpoint = getFormEndpoint(formType);
    
    // Set form action
    form.setAttribute('action', endpoint);
    form.setAttribute('method', 'POST');
    
    // Add honeypot field for spam protection
    if (FORMSPREE_CONFIG.settings.spamProtection.honeypot) {
      addHoneypotField(form);
    }
    
    // Add reCAPTCHA if enabled
    if (FORMSPREE_CONFIG.settings.recaptcha.enabled) {
      addRecaptcha(form);
    }
  });
});

/**
 * Add honeypot field for spam protection
 */
function addHoneypotField(form) {
  const honeypot = document.createElement('input');
  honeypot.type = 'text';
  honeypot.name = '_gotcha';
  honeypot.style.display = 'none';
  honeypot.tabIndex = -1;
  honeypot.autocomplete = 'off';
  
  form.appendChild(honeypot);
}

/**
 * Add reCAPTCHA to form
 */
function addRecaptcha(form) {
  // Load reCAPTCHA script
  if (!document.querySelector('script[src*="recaptcha"]')) {
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${FORMSPREE_CONFIG.settings.recaptcha.siteKey}`;
    document.head.appendChild(script);
  }
  
  // Add reCAPTCHA token to form submission
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    grecaptcha.ready(function() {
      grecaptcha.execute(FORMSPREE_CONFIG.settings.recaptcha.siteKey, {action: 'submit'})
        .then(function(token) {
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = 'g-recaptcha-response';
          input.value = token;
          form.appendChild(input);
          
          // Submit form
          form.submit();
        });
    });
  });
}

/**
 * Custom form submission with Formspree
 */
async function submitToFormspree(formData, formType = 'contact') {
  const endpoint = getFormEndpoint(formType);
  
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (response.ok) {
      return {
        success: true,
        message: 'Form submitted successfully'
      };
    } else {
      const data = await response.json();
      return {
        success: false,
        message: data.error || 'Form submission failed',
        errors: data.errors
      };
    }
  } catch (error) {
    return {
      success: false,
      message: 'Network error. Please try again.',
      error: error
    };
  }
}

// Export for use in other scripts
window.FormspreeConfig = FORMSPREE_CONFIG;
window.submitToFormspree = submitToFormspree;
window.getFormEndpoint = getFormEndpoint;

console.log('[Formspree] Configuration loaded');
