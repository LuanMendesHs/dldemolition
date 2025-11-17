// Form Validation for Breathe Safe Website
// Enhanced validation with Australian phone number support

class FormValidator {
  constructor() {
    this.initializeValidation();
  }

  initializeValidation() {
    // Find all forms on the page
    const forms = document.querySelectorAll('form');
    forms.forEach(form => this.setupFormValidation(form));
  }

  setupFormValidation(form) {
    // Add real-time validation
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => this.clearErrors(input));
    });

    // Handle form submission
    form.addEventListener('submit', (e) => this.handleSubmit(e, form));
  }

  validateField(field) {
    const value = field.value.trim();
    const fieldType = field.type;
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = '';

    // Clear previous errors
    this.clearErrors(field);

    // Required field validation
    if (field.hasAttribute('required') && !value) {
      isValid = false;
      errorMessage = 'This field is required';
    }

    // Specific field validations
    if (value && isValid) {
      switch (fieldType) {
        case 'email':
          isValid = this.validateEmail(value);
          errorMessage = isValid ? '' : 'Please enter a valid email address';
          break;
        case 'tel':
          isValid = this.validatePhone(value);
          errorMessage = isValid ? '' : 'Please enter a valid Australian phone number';
          break;
      }

      // Name validation
      if (fieldName === 'name' || fieldName === 'fullName') {
        isValid = this.validateName(value);
        errorMessage = isValid ? '' : 'Please enter a valid full name (at least 2 words)';
      }

      // Service selection validation
      if (fieldName === 'service' && value === '') {
        isValid = false;
        errorMessage = 'Please select a service';
      }
    }

    if (!isValid) {
      this.showError(field, errorMessage);
    }

    return isValid;
  }

  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  validatePhone(phone) {
    // Australian phone number patterns
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
    
    // Mobile: 04xx xxx xxx or +61 4xx xxx xxx
    const mobileRegex = /^(\+61|0)?4\d{8}$/;
    
    // Landline: (0x) xxxx xxxx or +61 x xxxx xxxx
    const landlineRegex = /^(\+61|0)?[2-8]\d{8}$/;
    
    return mobileRegex.test(cleanPhone) || landlineRegex.test(cleanPhone);
  }

  validateName(name) {
    // Must have at least 2 words, each at least 2 characters
    const words = name.trim().split(/\s+/);
    return words.length >= 2 && words.every(word => word.length >= 2);
  }

  showError(field, message) {
    // Add error styling
    field.classList.add('border-red-500', 'bg-red-50');
    field.classList.remove('border-gray-600');

    // Create or update error message
    let errorElement = field.parentNode.querySelector('.error-message');
    if (!errorElement) {
      errorElement = document.createElement('div');
      errorElement.className = 'error-message text-red-500 text-sm mt-1';
      field.parentNode.appendChild(errorElement);
    }
    errorElement.textContent = message;
  }

  clearErrors(field) {
    // Remove error styling
    field.classList.remove('border-red-500', 'bg-red-50');
    field.classList.add('border-gray-600');

    // Remove error message
    const errorElement = field.parentNode.querySelector('.error-message');
    if (errorElement) {
      errorElement.remove();
    }
  }

  handleSubmit(e, form) {
    e.preventDefault();

    // Validate all fields
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    let isFormValid = true;

    inputs.forEach(input => {
      if (!this.validateField(input)) {
        isFormValid = false;
      }
    });

    // Check agreement checkbox if present
    const agreeCheckbox = form.querySelector('input[type="checkbox"][required]');
    if (agreeCheckbox && !agreeCheckbox.checked) {
      isFormValid = false;
      this.showError(agreeCheckbox, 'You must agree to be contacted');
    }

    if (!isFormValid) {
      // Scroll to first error
      const firstError = form.querySelector('.error-message');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // Form is valid, proceed with submission
    this.submitForm(form);
  }

  submitForm(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
    submitButton.disabled = true;

    // Format WhatsApp message
    const whatsappMessage = this.formatWhatsAppMessage(data);
    const whatsappUrl = `https://wa.me/61451612742?text=${encodeURIComponent(whatsappMessage)}`;

    // Simulate form processing delay
    setTimeout(() => {
      // Track conversion
      if (typeof gtag !== 'undefined') {
        gtag('event', 'form_submit', {
          event_category: 'engagement',
          event_label: 'Quote Request',
          value: 1
        });
      }

      // Redirect to WhatsApp
      window.open(whatsappUrl, '_blank');

      // Reset form
      form.reset();
      submitButton.innerHTML = originalText;
      submitButton.disabled = false;

      // Show success message
      this.showSuccessMessage(form);
    }, 1500);
  }

  formatWhatsAppMessage(data) {
    let message = "🏗️ *New Quote Request - Breathe Safe*\n\n";
    
    if (data.name || data.fullName) {
      message += `👤 *Name:* ${data.name || data.fullName}\n`;
    }
    
    if (data.phone) {
      message += `📞 *Phone:* ${data.phone}\n`;
    }
    
    if (data.email) {
      message += `📧 *Email:* ${data.email}\n`;
    }
    
    if (data.location || data.suburb) {
      message += `📍 *Location:* ${data.location || data.suburb}\n`;
    }
    
    if (data.service) {
      message += `🔧 *Service:* ${data.service}\n`;
    }
    
    if (data.description) {
      message += `📝 *Description:* ${data.description}\n`;
    }
    
    message += "\n✅ *Ready for free quote and site inspection!*";
    
    return message;
  }

  showSuccessMessage(form) {
    const successDiv = document.createElement('div');
    successDiv.className = 'fixed top-4 right-4 bg-green-600 text-white px-6 py-4 rounded-lg shadow-lg z-50 max-w-sm';
    successDiv.innerHTML = `
      <div class="flex items-center">
        <i class="fas fa-check-circle mr-3 text-xl"></i>
        <div>
          <h4 class="font-bold">Message Sent!</h4>
          <p class="text-sm opacity-90">We'll contact you within 24 hours</p>
        </div>
      </div>
    `;
    
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
      successDiv.remove();
    }, 5000);
  }

  // Phone number formatting
  formatPhoneNumber(input) {
    let value = input.value.replace(/\D/g, '');
    
    if (value.startsWith('61')) {
      value = '+61 ' + value.slice(2);
    } else if (value.startsWith('0')) {
      // Format as Australian number
      if (value.length === 10) {
        if (value.startsWith('04')) {
          // Mobile: 0412 345 678
          value = value.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');
        } else {
          // Landline: (02) 1234 5678
          value = value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2 $3');
        }
      }
    }
    
    input.value = value;
  }
}

// Auto-format phone numbers
document.addEventListener('DOMContentLoaded', () => {
  const phoneInputs = document.querySelectorAll('input[type="tel"]');
  phoneInputs.forEach(input => {
    input.addEventListener('input', () => {
      const validator = new FormValidator();
      validator.formatPhoneNumber(input);
    });
  });
});

// Initialize form validation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new FormValidator();
});

// Export for use in other scripts
window.FormValidator = FormValidator;

