/**
 * Form Validation and Submission Handler
 * DL Demolition Asbestos & Demolition Website
 */

(function() {
  'use strict';

  // Configuration
  const CONFIG = {
    formspreeEndpoint: 'https://formspree.io/f/YOUR_FORM_ID', // Replace with actual Formspree ID
    phoneRegex: /^(\+?61|0)[2-478](?:[ -]?[0-9]){8}$/,
    emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    postcodeRegex: /^[0-9]{4}$/
  };

  // Initialize form validation on page load
  document.addEventListener('DOMContentLoaded', function() {
    initializeForms();
    setupPhoneFormatting();
    setupRealTimeValidation();
  });

  /**
   * Initialize all forms on the page
   */
  function initializeForms() {
    const forms = document.querySelectorAll('form[data-validate]');
    
    forms.forEach(form => {
      form.addEventListener('submit', handleFormSubmit);
      
      // Add loading state styles
      if (!document.getElementById('form-loading-styles')) {
        addLoadingStyles();
      }
    });
  }

  /**
   * Handle form submission
   */
  async function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitButton = form.querySelector('button[type="submit"]');
    
    // Clear previous errors
    clearErrors(form);
    
    // Validate form
    if (!validateForm(form)) {
      showNotification('Please correct the errors in the form', 'error');
      return;
    }
    
    // Show loading state
    setLoadingState(submitButton, true);
    
    try {
      const formData = new FormData(form);
      const response = await submitForm(formData, form);
      
      if (response.ok) {
        showNotification('Thank you! We\'ll contact you within 24 hours.', 'success');
        form.reset();
        
        // Track conversion (if analytics is set up)
        trackConversion('form_submission', form.id || 'quote_form');
        
        // Redirect to thank you page (optional)
        setTimeout(() => {
          // window.location.href = '/thank-you.html';
        }, 2000);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      showNotification('Something went wrong. Please call us at (61) 451 612 742', 'error');
    } finally {
      setLoadingState(submitButton, false);
    }
  }

  /**
   * Validate entire form
   */
  function validateForm(form) {
    let isValid = true;
    const fields = form.querySelectorAll('input[required], textarea[required], select[required]');
    
    fields.forEach(field => {
      if (!validateField(field)) {
        isValid = false;
      }
    });
    
    return isValid;
  }

  /**
   * Validate individual field
   */
  function validateField(field) {
    const value = field.value.trim();
    const fieldType = field.type;
    const fieldName = field.name;
    
    // Check if required field is empty
    if (field.hasAttribute('required') && !value) {
      showError(field, 'This field is required');
      return false;
    }
    
    // Validate based on field type
    switch (fieldType) {
      case 'email':
        if (value && !CONFIG.emailRegex.test(value)) {
          showError(field, 'Please enter a valid email address');
          return false;
        }
        break;
        
      case 'tel':
        if (value && !CONFIG.phoneRegex.test(value.replace(/\s/g, ''))) {
          showError(field, 'Please enter a valid Australian phone number');
          return false;
        }
        break;
        
      case 'text':
        if (fieldName === 'postcode' && value && !CONFIG.postcodeRegex.test(value)) {
          showError(field, 'Please enter a valid 4-digit postcode');
          return false;
        }
        
        if (fieldName === 'name' && value && value.length < 2) {
          showError(field, 'Name must be at least 2 characters');
          return false;
        }
        break;
        
      case 'textarea':
        if (value && value.length < 10) {
          showError(field, 'Please provide more details (at least 10 characters)');
          return false;
        }
        break;
    }
    
    return true;
  }

  /**
   * Show error message for field
   */
  function showError(field, message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    
    field.classList.add('error');
    field.parentNode.appendChild(errorElement);
    
    // Scroll to first error
    if (!document.querySelector('.field-error:first-of-type')) {
      field.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  /**
   * Clear all errors in form
   */
  function clearErrors(form) {
    const errorElements = form.querySelectorAll('.field-error');
    const errorFields = form.querySelectorAll('.error');
    
    errorElements.forEach(el => el.remove());
    errorFields.forEach(field => field.classList.remove('error'));
  }

  /**
   * Submit form data
   */
  async function submitForm(formData, form) {
    const endpoint = form.getAttribute('action') || CONFIG.formspreeEndpoint;
    
    return fetch(endpoint, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });
  }

  /**
   * Set loading state for submit button
   */
  function setLoadingState(button, isLoading) {
    if (isLoading) {
      button.disabled = true;
      button.dataset.originalText = button.textContent;
      button.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
      button.classList.add('loading');
    } else {
      button.disabled = false;
      button.textContent = button.dataset.originalText;
      button.classList.remove('loading');
    }
  }

  /**
   * Show notification message
   */
  function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'} mr-2"></i>
        <span>${message}</span>
      </div>
      <button class="notification-close" onclick="this.parentElement.remove()">
        <i class="fas fa-times"></i>
      </button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      notification.classList.add('fade-out');
      setTimeout(() => notification.remove(), 300);
    }, 5000);
  }

  /**
   * Setup phone number formatting
   */
  function setupPhoneFormatting() {
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    
    phoneInputs.forEach(input => {
      input.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        // Format as Australian phone number
        if (value.length > 0) {
          if (value.startsWith('61')) {
            value = '+' + value;
          } else if (value.startsWith('0')) {
            // Format: 0412 345 678
            if (value.length > 4) {
              value = value.slice(0, 4) + ' ' + value.slice(4);
            }
            if (value.length > 8) {
              value = value.slice(0, 8) + ' ' + value.slice(8, 11);
            }
          }
        }
        
        e.target.value = value;
      });
    });
  }

  /**
   * Setup real-time validation
   */
  function setupRealTimeValidation() {
    const inputs = document.querySelectorAll('input[required], textarea[required], select[required]');
    
    inputs.forEach(input => {
      input.addEventListener('blur', function() {
        // Clear previous error for this field
        const existingError = input.parentNode.querySelector('.field-error');
        if (existingError) {
          existingError.remove();
        }
        input.classList.remove('error');
        
        // Validate on blur
        validateField(input);
      });
      
      input.addEventListener('input', function() {
        // Remove error state while typing
        if (input.classList.contains('error')) {
          input.classList.remove('error');
          const existingError = input.parentNode.querySelector('.field-error');
          if (existingError) {
            existingError.remove();
          }
        }
      });
    });
  }

  /**
   * Track conversion for analytics
   */
  function trackConversion(eventName, formId) {
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
      gtag('event', eventName, {
        'form_id': formId,
        'event_category': 'engagement',
        'event_label': 'Form Submission'
      });
    }
    
    // Facebook Pixel
    if (typeof fbq !== 'undefined') {
      fbq('track', 'Lead', {
        content_name: formId
      });
    }
    
    // Console log for debugging
    console.log('Conversion tracked:', eventName, formId);
  }

  /**
   * Add loading styles dynamically
   */
  function addLoadingStyles() {
    const style = document.createElement('style');
    style.id = 'form-loading-styles';
    style.textContent = `
      .field-error {
        color: #ff4444;
        font-size: 0.875rem;
        margin-top: 0.25rem;
        display: block;
      }
      
      input.error,
      textarea.error,
      select.error {
        border-color: #ff4444 !important;
        background-color: rgba(255, 68, 68, 0.1) !important;
      }
      
      .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        color: #0c0c0c;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        z-index: 9999;
        animation: slideInRight 0.3s ease;
        max-width: 400px;
      }
      
      .notification-success {
        background: #25D366;
        color: white;
      }
      
      .notification-error {
        background: #ff4444;
        color: white;
      }
      
      .notification-content {
        display: flex;
        align-items: center;
      }
      
      .notification-close {
        background: none;
        border: none;
        color: inherit;
        cursor: pointer;
        padding: 0.25rem;
        opacity: 0.8;
        transition: opacity 0.3s;
      }
      
      .notification-close:hover {
        opacity: 1;
      }
      
      .notification.fade-out {
        animation: slideOutRight 0.3s ease forwards;
      }
      
      @keyframes slideInRight {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      
      @keyframes slideOutRight {
        from {
          transform: translateX(0);
          opacity: 1;
        }
        to {
          transform: translateX(100%);
          opacity: 0;
        }
      }
      
      button.loading {
        opacity: 0.7;
        cursor: not-allowed;
      }
      
      @media (max-width: 768px) {
        .notification {
          top: 10px;
          right: 10px;
          left: 10px;
          max-width: none;
        }
      }
    `;
    
    document.head.appendChild(style);
  }

  // Export functions for external use
  window.FormValidator = {
    validateForm,
    validateField,
    showNotification
  };

})();
