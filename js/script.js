// ===============================
// الأكواد الخاصة بالصفحات العامة
// الرئيسية - النبذة - تواصل معنا - الخصوصية - الحماية
// ===============================

(function() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const contactForm = document.getElementById('contactForm');

  document.addEventListener('DOMContentLoaded', function() {
    initHamburgerMenu();
    initContactForm();
  });

  // --------------------------
  // Hamburger Menu
  // --------------------------
  function initHamburgerMenu() {
    if (hamburger && navLinks) {
      hamburger.addEventListener('click', function() {
        const expanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !expanded);
        navLinks.classList.toggle('show');
      });

      document.addEventListener('click', function(event) {
        if (!hamburger.contains(event.target) && !navLinks.contains(event.target)) {
          hamburger.setAttribute('aria-expanded', 'false');
          navLinks.classList.remove('show');
        }
      });

      document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
          hamburger.setAttribute('aria-expanded', 'false');
          navLinks.classList.remove('show');
        }
      });
    }
  }

  // --------------------------
  // Contact Form Validation
  // --------------------------
  function initContactForm() {
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        document.querySelectorAll('.error-message').forEach(el => el.remove());
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        let isValid = true;

        if (!name) { showError('name', 'الرجاء إدخال الاسم'); isValid = false; }
        if (!email) { showError('email', 'الرجاء إدخال البريد الإلكتروني'); isValid = false; }
        else if (!isValidEmail(email)) { showError('email', 'البريد الإلكتروني غير صالح'); isValid = false; }
        if (!subject) { showError('subject', 'الرجاء إدخال الموضوع'); isValid = false; }
        if (!message) { showError('message', 'الرجاء إدخال الرسالة'); isValid = false; }

        if (isValid) {
          const resultDiv = document.getElementById('contactResult');
          resultDiv.innerHTML = '<p class="success-message">تم إرسال الرسالة بنجاح!</p>';
          contactForm.reset();
          setTimeout(() => { resultDiv.innerHTML = ''; }, 5000);
        }
      });
    }

    function showError(fieldId, message) {
      const field = document.getElementById(fieldId);
      const error = document.createElement('p');
      error.className = 'error-message';
      error.textContent = message;
      field.parentNode.insertBefore(error, field.nextSibling);
      field.setAttribute('aria-invalid', 'true');
    }

    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
  }

})();
