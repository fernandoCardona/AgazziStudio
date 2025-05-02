// Archivo de eventos de Analytics
document.addEventListener('DOMContentLoaded', function() {
  // Seguimiento de tiempo en secciones
  const sections = document.querySelectorAll('section[id]');
  let sectionVisibleSince = {};
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const sectionId = entry.target.id;
      
      if (entry.isIntersecting) {
        // Sección visible
        sectionVisibleSince[sectionId] = Date.now();
      } else if (sectionVisibleSince[sectionId]) {
        // Sección ya no visible, calcular tiempo
        const timeSpent = Math.round((Date.now() - sectionVisibleSince[sectionId]) / 1000);
        
        if (timeSpent > 2) { // Solo registrar si pasaron más de 2 segundos
          if (typeof gtag === 'function') {
            gtag('event', 'time_in_section', {
              'event_category': 'engagement',
              'event_label': sectionId,
              'value': timeSpent
            });
          }
        }
        
        delete sectionVisibleSince[sectionId];
      }
    });
  }, { threshold: 0.5 });
  
  sections.forEach(section => {
    observer.observe(section);
  });
  
  // Implementación de seguimiento de scroll
  let scrollDepths = [25, 50, 75, 100];
  let scrollDepthTriggered = new Set();
  
  window.addEventListener('scroll', function() {
    const scrollPercentage = Math.round((window.scrollY + window.innerHeight) / document.body.scrollHeight * 100);
    
    scrollDepths.forEach(depth => {
      if (scrollPercentage >= depth && !scrollDepthTriggered.has(depth)) {
        scrollDepthTriggered.add(depth);
        if (typeof gtag === 'function') {
          gtag('event', 'scroll_depth', {
            'event_category': 'engagement',
            'event_label': `Scroll ${depth}%`,
            'value': depth
          });
        }
      }
    });
  });
  
  // Detección y seguimiento de tipo de dispositivo
  function detectDeviceType() {
    const userAgent = navigator.userAgent;
    let deviceType = 'desktop';
    
    if (/Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
      deviceType = 'mobile';
      
      if (/iPad|Tablet|PlayBook/i.test(userAgent) || 
          (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) {
        deviceType = 'tablet';
      }
    }
    
    // Enviar evento de tipo de dispositivo
    if (typeof gtag === 'function') {
      gtag('event', 'device_type', {
        'event_category': 'user_info',
        'event_label': deviceType,
        'non_interaction': true
      });
    }
    
    return deviceType;
  }
  
  // Ejecutar detección de dispositivo
  const deviceType = detectDeviceType();
  
  // Seguimiento de clics en elementos importantes
  function setupClickTracking() {
    // Seguimiento de clics en enlaces
    document.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function(e) {
        const linkText = this.textContent || 'sin texto';
        const linkHref = this.getAttribute('href') || 'sin href';
        const linkTarget = this.getAttribute('target') || 'mismo tab';
        
        if (typeof gtag === 'function') {
          gtag('event', 'link_click', {
            'event_category': 'engagement',
            'event_label': linkText,
            'link_url': linkHref,
            'link_target': linkTarget,
            'device_type': deviceType
          });
        }
      });
    });
    
    // Seguimiento de clics en botones
    document.querySelectorAll('button').forEach(button => {
      button.addEventListener('click', function(e) {
        const buttonText = this.textContent || 'sin texto';
        const buttonId = this.id || 'sin id';
        const buttonClass = this.className || 'sin clase';
        
        if (typeof gtag === 'function') {
          gtag('event', 'button_click', {
            'event_category': 'engagement',
            'event_label': buttonText,
            'button_id': buttonId,
            'button_class': buttonClass,
            'device_type': deviceType
          });
        }
      });
    });
    
    // Seguimiento de clics en elementos con clase 'cta' (llamadas a la acción)
    document.querySelectorAll('.cta').forEach(cta => {
      cta.addEventListener('click', function(e) {
        const ctaText = this.textContent || 'sin texto';
        const ctaId = this.id || 'sin id';
        
        if (typeof gtag === 'function') {
          gtag('event', 'cta_click', {
            'event_category': 'conversion',
            'event_label': ctaText,
            'cta_id': ctaId,
            'device_type': deviceType
          });
        }
      });
    });
  }
  
  // Iniciar seguimiento de clics
  setupClickTracking();
});