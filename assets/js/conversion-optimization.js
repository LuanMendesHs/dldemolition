// Conversion Optimization for Breathe Safe Website
// Advanced techniques to maximize lead generation and sales

class ConversionOptimizer {
  constructor() {
    this.init();
  }

  init() {
    this.setupExitIntent();
    this.setupScrollTracking();
    this.setupTimeBasedTriggers();
    this.setupUrgencyElements();
    this.setupSocialProof();
    this.setupChatbot();
    this.setupAnalytics();
    this.setupABTesting();
  }

  setupExitIntent() {
    let exitIntentShown = false;
    
    document.addEventListener('mouseleave', (e) => {
      if (e.clientY <= 0 && !exitIntentShown && window.innerWidth > 768) {
        this.showExitIntentPopup();
        exitIntentShown = true;
      }
    });

    // Mobile exit intent (back button)
    if ('onbeforeunload' in window) {
      window.addEventListener('beforeunload', (e) => {
        if (!exitIntentShown && this.shouldShowExitIntent()) {
          e.preventDefault();
          e.returnValue = '';
          this.showExitIntentPopup();
          exitIntentShown = true;
        }
      });
    }
  }

  shouldShowExitIntent() {
    const timeOnSite = Date.now() - this.startTime;
    const scrollDepth = this.getScrollDepth();
    
    // Show if user spent >30s and scrolled >50%
    return timeOnSite > 30000 && scrollDepth > 50;
  }

  showExitIntentPopup() {
    const popup = document.createElement('div');
    popup.className = 'exit-intent-popup fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4';
    popup.innerHTML = `
      <div class="bg-white rounded-2xl p-8 max-w-md w-full text-center relative animate-bounce-in">
        <button class="close-popup absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
        
        <div class="text-6xl mb-4">🚨</div>
        <h3 class="text-2xl font-bold text-gray-800 mb-4">Wait! Don't Leave Yet!</h3>
        <p class="text-gray-600 mb-6">Get your FREE quote in under 2 minutes. No obligation, no hidden fees.</p>
        
        <div class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div class="flex items-center justify-center mb-2">
            <span class="text-red-600 font-bold text-lg">⏰ LIMITED TIME:</span>
          </div>
          <p class="text-red-700 font-semibold">Free site inspection + 10% off your first service</p>
        </div>
        
        <div class="space-y-3">
          <a href="quote.html" class="block w-full bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-700 transition-colors">
            Get My Free Quote Now
          </a>
          <a href="https://wa.me/61451612742?text=Hi! I saw your special offer. Can I get a free quote?" 
             class="block w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition-colors">
            WhatsApp for Instant Quote
          </a>
        </div>
        
        <p class="text-xs text-gray-500 mt-4">✅ Licensed & Insured ✅ 24/7 Emergency Service ✅ Gold Coast to Sunshine Coast</p>
      </div>
    `;
    
    document.body.appendChild(popup);
    
    // Close handlers
    popup.querySelector('.close-popup').addEventListener('click', () => {
      popup.remove();
    });
    
    popup.addEventListener('click', (e) => {
      if (e.target === popup) {
        popup.remove();
      }
    });

    // Track exit intent
    this.trackEvent('exit_intent_shown', 'engagement');
  }

  setupScrollTracking() {
    this.startTime = Date.now();
    let scrollMilestones = [25, 50, 75, 90];
    let triggeredMilestones = [];

    window.addEventListener('scroll', () => {
      const scrollDepth = this.getScrollDepth();
      
      scrollMilestones.forEach(milestone => {
        if (scrollDepth >= milestone && !triggeredMilestones.includes(milestone)) {
          triggeredMilestones.push(milestone);
          this.handleScrollMilestone(milestone);
        }
      });
    });
  }

  getScrollDepth() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    return Math.round((scrollTop / docHeight) * 100);
  }

  handleScrollMilestone(milestone) {
    this.trackEvent(`scroll_${milestone}`, 'engagement');
    
    if (milestone === 50) {
      this.showScrollBasedOffer();
    }
    
    if (milestone === 90) {
      this.showBottomCTA();
    }
  }

  showScrollBasedOffer() {
    if (document.querySelector('.scroll-offer')) return;

    const offer = document.createElement('div');
    offer.className = 'scroll-offer fixed top-4 right-4 bg-red-600 text-white p-4 rounded-lg shadow-lg z-40 max-w-sm animate-slide-in';
    offer.innerHTML = `
      <div class="flex items-start">
        <div class="flex-1">
          <div class="font-bold text-sm">🎯 Still Reading?</div>
          <div class="text-xs opacity-90 mb-2">You're serious about this project!</div>
          <a href="tel:+61451612742" class="inline-block bg-white text-red-600 px-3 py-1 rounded text-sm font-bold hover:bg-gray-100">
            Call Now for Priority Service
          </a>
        </div>
        <button class="close-offer text-white opacity-75 ml-2">&times;</button>
      </div>
    `;
    
    document.body.appendChild(offer);
    
    offer.querySelector('.close-offer').addEventListener('click', () => {
      offer.remove();
    });
    
    setTimeout(() => {
      if (offer.parentNode) offer.remove();
    }, 8000);
  }

  showBottomCTA() {
    if (document.querySelector('.bottom-cta')) return;

    const cta = document.createElement('div');
    cta.className = 'bottom-cta fixed bottom-20 left-4 right-4 bg-gradient-to-r from-red-600 to-red-700 text-white p-4 rounded-lg shadow-lg z-40 md:left-auto md:right-4 md:max-w-sm animate-slide-up';
    cta.innerHTML = `
      <div class="text-center">
        <div class="font-bold mb-2">Ready to Get Started?</div>
        <div class="text-sm opacity-90 mb-3">Join 100+ satisfied customers</div>
        <div class="flex space-x-2">
          <a href="quote.html" class="flex-1 bg-white text-red-600 py-2 px-3 rounded font-bold text-sm text-center hover:bg-gray-100">
            Free Quote
          </a>
          <a href="https://wa.me/61451612742" class="flex-1 bg-green-600 py-2 px-3 rounded font-bold text-sm text-center hover:bg-green-700">
            WhatsApp
          </a>
        </div>
      </div>
    `;
    
    document.body.appendChild(cta);
    
    setTimeout(() => {
      if (cta.parentNode) cta.remove();
    }, 10000);
  }

  setupTimeBasedTriggers() {
    // Show urgency after 2 minutes
    setTimeout(() => {
      this.showUrgencyNotification();
    }, 120000);

    // Show special offer after 5 minutes
    setTimeout(() => {
      this.showTimeBasedOffer();
    }, 300000);
  }

  showUrgencyNotification() {
    if (document.querySelector('.urgency-notification')) return;

    const notification = document.createElement('div');
    notification.className = 'urgency-notification fixed top-20 right-4 bg-orange-600 text-white p-4 rounded-lg shadow-lg z-40 max-w-sm animate-pulse';
    notification.innerHTML = `
      <div class="flex items-center">
        <div class="text-2xl mr-3">⚡</div>
        <div>
          <div class="font-bold text-sm">High Demand Alert</div>
          <div class="text-xs opacity-90">3 quotes requested in your area today</div>
        </div>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      if (notification.parentNode) notification.remove();
    }, 6000);
  }

  showTimeBasedOffer() {
    if (document.querySelector('.time-offer')) return;

    const offer = document.createElement('div');
    offer.className = 'time-offer fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4';
    offer.innerHTML = `
      <div class="bg-white rounded-2xl p-8 max-w-md w-full text-center relative">
        <button class="close-time-offer absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
        
        <div class="text-4xl mb-4">⏰</div>
        <h3 class="text-xl font-bold text-gray-800 mb-4">You've Been Here 5 Minutes...</h3>
        <p class="text-gray-600 mb-6">That shows you're serious! Here's an exclusive offer:</p>
        
        <div class="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <div class="text-green-800 font-bold text-lg mb-2">🎁 EXCLUSIVE OFFER</div>
          <p class="text-green-700">Free safety assessment + priority booking</p>
          <p class="text-green-600 text-sm">Valid for next 24 hours only</p>
        </div>
        
        <a href="https://wa.me/61451612742?text=Hi! I'd like to claim the exclusive offer I saw on your website." 
           class="block w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition-colors">
          Claim This Offer Now
        </a>
      </div>
    `;
    
    document.body.appendChild(offer);
    
    offer.querySelector('.close-time-offer').addEventListener('click', () => {
      offer.remove();
    });
  }

  setupUrgencyElements() {
    // Add urgency indicators
    this.addUrgencyCounters();
    this.addLimitedTimeOffers();
    this.addSocialProofNumbers();
  }

  addUrgencyCounters() {
    const urgencyElements = document.querySelectorAll('.add-urgency');
    urgencyElements.forEach(element => {
      const counter = document.createElement('div');
      counter.className = 'urgency-counter text-red-600 font-bold text-sm';
      counter.innerHTML = '⏰ Response within 2 hours guaranteed';
      element.appendChild(counter);
    });
  }

  addLimitedTimeOffers() {
    const offers = document.querySelectorAll('.add-offer');
    offers.forEach(element => {
      const offer = document.createElement('div');
      offer.className = 'limited-offer bg-red-100 border border-red-300 rounded-lg p-3 mt-4';
      offer.innerHTML = `
        <div class="text-red-800 font-bold text-sm">🔥 LIMITED TIME</div>
        <div class="text-red-700 text-sm">Free site inspection + 10% off first service</div>
      `;
      element.appendChild(offer);
    });
  }

  addSocialProofNumbers() {
    const proofElements = document.querySelectorAll('.add-social-proof');
    proofElements.forEach(element => {
      const proof = document.createElement('div');
      proof.className = 'social-proof flex items-center text-sm text-gray-600 mt-2';
      proof.innerHTML = `
        <span class="text-green-600 mr-2">✅</span>
        <span>Trusted by 100+ Gold Coast families</span>
      `;
      element.appendChild(proof);
    });
  }

  setupSocialProof() {
    this.showRecentActivity();
    this.addTrustBadges();
  }

  showRecentActivity() {
    const activities = [
      'John from Surfers Paradise just requested a quote',
      'Sarah from Broadbeach booked an inspection',
      'Mike from Burleigh Heads confirmed a demolition job',
      'Lisa from Coolangatta scheduled asbestos removal',
      'David from Robina got a free assessment'
    ];

    let activityIndex = 0;
    
    setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance every interval
        this.showActivityNotification(activities[activityIndex]);
        activityIndex = (activityIndex + 1) % activities.length;
      }
    }, 45000); // Every 45 seconds
  }

  showActivityNotification(activity) {
    if (document.querySelector('.activity-notification')) return;

    const notification = document.createElement('div');
    notification.className = 'activity-notification fixed bottom-32 left-4 bg-blue-600 text-white p-3 rounded-lg shadow-lg z-40 max-w-xs animate-slide-in';
    notification.innerHTML = `
      <div class="flex items-center text-sm">
        <div class="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
        <div>${activity}</div>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      if (notification.parentNode) notification.remove();
    }, 4000);
  }

  addTrustBadges() {
    const trustContainer = document.querySelector('.trust-badges');
    if (trustContainer) {
      trustContainer.innerHTML += `
        <div class="flex items-center space-x-4 text-sm text-gray-600 mt-4">
          <div class="flex items-center">
            <span class="text-green-600 mr-1">🛡️</span>
            <span>Fully Insured</span>
          </div>
          <div class="flex items-center">
            <span class="text-blue-600 mr-1">⭐</span>
            <span>4.8/5 Rating</span>
          </div>
          <div class="flex items-center">
            <span class="text-purple-600 mr-1">🏆</span>
            <span>EPA Licensed</span>
          </div>
        </div>
      `;
    }
  }

  setupChatbot() {
    // Enhanced chatbot with conversion focus
    this.initializeChatbot();
  }

  initializeChatbot() {
    const chatbotContainer = document.createElement('div');
    chatbotContainer.id = 'conversion-chatbot';
    chatbotContainer.className = 'fixed bottom-4 right-4 z-50';
    
    chatbotContainer.innerHTML = `
      <div class="chatbot-trigger bg-red-600 text-white w-14 h-14 rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:bg-red-700 transition-colors">
        <i class="fas fa-comments text-xl"></i>
      </div>
      
      <div class="chatbot-window hidden bg-white rounded-lg shadow-xl w-80 h-96 flex flex-col">
        <div class="chatbot-header bg-red-600 text-white p-4 rounded-t-lg">
          <div class="flex items-center justify-between">
            <div>
              <div class="font-bold">Breathe Safe Assistant</div>
              <div class="text-sm opacity-90">Get instant answers</div>
            </div>
            <button class="close-chatbot text-white hover:text-gray-200">
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
        
        <div class="chatbot-messages flex-1 p-4 overflow-y-auto">
          <div class="bot-message mb-4">
            <div class="bg-gray-100 rounded-lg p-3 text-sm">
              G'day! I'm here to help with your asbestos removal and demolition needs. What can I help you with today?
            </div>
            <div class="quick-options mt-2 space-y-1">
              <button class="quick-option block w-full text-left bg-red-50 hover:bg-red-100 p-2 rounded text-sm text-red-700">
                💰 Get Pricing Info
              </button>
              <button class="quick-option block w-full text-left bg-red-50 hover:bg-red-100 p-2 rounded text-sm text-red-700">
                🚨 Emergency Service
              </button>
              <button class="quick-option block w-full text-left bg-red-50 hover:bg-red-100 p-2 rounded text-sm text-red-700">
                📋 Licensing Info
              </button>
              <button class="quick-option block w-full text-left bg-red-50 hover:bg-red-100 p-2 rounded text-sm text-red-700">
                📞 Free Quote
              </button>
            </div>
          </div>
        </div>
        
        <div class="chatbot-input p-4 border-t">
          <div class="flex space-x-2">
            <input type="text" placeholder="Type your message..." class="flex-1 border rounded-lg px-3 py-2 text-sm">
            <button class="send-message bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
              <i class="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>
    `;
    
    document.body.appendChild(chatbotContainer);
    
    this.setupChatbotEvents(chatbotContainer);
  }

  setupChatbotEvents(container) {
    const trigger = container.querySelector('.chatbot-trigger');
    const window = container.querySelector('.chatbot-window');
    const closeBtn = container.querySelector('.close-chatbot');
    const quickOptions = container.querySelectorAll('.quick-option');
    
    trigger.addEventListener('click', () => {
      window.classList.toggle('hidden');
      this.trackEvent('chatbot_opened', 'engagement');
    });
    
    closeBtn.addEventListener('click', () => {
      window.classList.add('hidden');
    });
    
    quickOptions.forEach(option => {
      option.addEventListener('click', () => {
        this.handleQuickOption(option.textContent.trim());
      });
    });
  }

  handleQuickOption(option) {
    const responses = {
      '💰 Get Pricing Info': 'Our pricing is competitive and transparent. For asbestos removal, we charge $55-95/m² depending on location and complexity. Would you like a free, no-obligation quote for your specific project?',
      '🚨 Emergency Service': 'We offer 24/7 emergency response across Gold Coast to Sunshine Coast. Our team can be on-site within 2 hours for urgent situations. What\'s your emergency?',
      '📋 Licensing Info': 'We\'re fully licensed for asbestos removal (EPA compliant), insured with $20M public liability, and certified for all demolition work. Safety is our top priority. Ready to get started?',
      '📞 Free Quote': 'Excellent! I can connect you with our team for a free quote. We guarantee response within 24 hours. Would you prefer a call or WhatsApp message?'
    };
    
    const response = responses[option];
    if (response) {
      this.addChatMessage(response, 'bot');
      this.showConversionOptions();
    }
  }

  addChatMessage(message, sender) {
    const messagesContainer = document.querySelector('.chatbot-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `${sender}-message mb-4`;
    
    if (sender === 'bot') {
      messageDiv.innerHTML = `
        <div class="bg-gray-100 rounded-lg p-3 text-sm">${message}</div>
      `;
    } else {
      messageDiv.innerHTML = `
        <div class="bg-red-600 text-white rounded-lg p-3 text-sm ml-8">${message}</div>
      `;
    }
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  showConversionOptions() {
    const messagesContainer = document.querySelector('.chatbot-messages');
    const optionsDiv = document.createElement('div');
    optionsDiv.className = 'conversion-options mt-4 space-y-2';
    optionsDiv.innerHTML = `
      <div class="text-xs text-gray-500 mb-2">Choose your preferred contact method:</div>
      <a href="tel:+61451612742" class="block bg-red-600 text-white p-2 rounded text-center text-sm font-bold hover:bg-red-700">
        📞 Call Now: (61) 451 612 742
      </a>
      <a href="https://wa.me/61451612742?text=Hi! I used your chatbot and need a quote for my project." 
         class="block bg-green-600 text-white p-2 rounded text-center text-sm font-bold hover:bg-green-700">
        💬 WhatsApp Message
      </a>
      <a href="quote.html" class="block bg-blue-600 text-white p-2 rounded text-center text-sm font-bold hover:bg-blue-700">
        📋 Online Quote Form
      </a>
    `;
    
    messagesContainer.appendChild(optionsDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  setupAnalytics() {
    // Track conversion events
    this.trackPageView();
    this.setupConversionTracking();
  }

  trackPageView() {
    if (typeof gtag !== 'undefined') {
      gtag('config', 'GA_MEASUREMENT_ID', {
        page_title: document.title,
        page_location: window.location.href
      });
    }
  }

  setupConversionTracking() {
    // Track phone clicks
    document.querySelectorAll('a[href^="tel:"]').forEach(link => {
      link.addEventListener('click', () => {
        this.trackEvent('phone_click', 'conversion', 'Phone Call');
      });
    });

    // Track WhatsApp clicks
    document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
      link.addEventListener('click', () => {
        this.trackEvent('whatsapp_click', 'conversion', 'WhatsApp');
      });
    });

    // Track form submissions
    document.querySelectorAll('form').forEach(form => {
      form.addEventListener('submit', () => {
        this.trackEvent('form_submit', 'conversion', 'Quote Request');
      });
    });

    // Track calculator usage
    const calculateBtn = document.querySelector('#calculate-btn');
    if (calculateBtn) {
      calculateBtn.addEventListener('click', () => {
        this.trackEvent('calculator_used', 'engagement', 'Price Calculator');
      });
    }
  }

  trackEvent(action, category, label = '', value = 1) {
    if (typeof gtag !== 'undefined') {
      gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value
      });
    }
    
    // Also track to console for debugging
    console.log(`Event tracked: ${action} | ${category} | ${label}`);
  }

  setupABTesting() {
    // Simple A/B testing for headlines and CTAs
    this.runHeadlineTest();
    this.runCTATest();
  }

  runHeadlineTest() {
    const headlines = [
      'Professional Asbestos Removal & Demolition',
      'Safe, Fast & Licensed Asbestos Removal',
      'Gold Coast\'s #1 Asbestos Removal Experts'
    ];
    
    const variant = Math.floor(Math.random() * headlines.length);
    const headlineElement = document.querySelector('h1');
    
    if (headlineElement && headlines[variant]) {
      headlineElement.textContent = headlines[variant];
      this.trackEvent('ab_test_headline', 'experiment', `variant_${variant}`);
    }
  }

  runCTATest() {
    const ctaTexts = [
      'Get Free Quote',
      'Request Free Quote',
      'Get My Quote Now',
      'Free Quote Today'
    ];
    
    const variant = Math.floor(Math.random() * ctaTexts.length);
    const ctaButtons = document.querySelectorAll('.cta-button');
    
    ctaButtons.forEach(button => {
      if (ctaTexts[variant]) {
        button.textContent = ctaTexts[variant];
      }
    });
    
    this.trackEvent('ab_test_cta', 'experiment', `variant_${variant}`);
  }
}

// Initialize conversion optimization
document.addEventListener('DOMContentLoaded', () => {
  new ConversionOptimizer();
});

// Export for use in other scripts
window.ConversionOptimizer = ConversionOptimizer;

