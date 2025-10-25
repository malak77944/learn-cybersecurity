// IIFE to avoid global scope pollution
(function() {
  // DOM elements
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const contactForm = document.getElementById('contactForm');
  const signupForm = document.getElementById('signupForm');
  const signinForm = document.getElementById('signinForm');
  const quizForm = document.getElementById('quizForm');
  const submitQuizBtn = document.getElementById('submitQuiz');
  const quizModal = document.getElementById('quizModal');
  const closeModalBtn = document.querySelector('.close-modal');
  const retryQuizBtn = document.getElementById('retryQuiz');
  
  // Initialize all components when DOM is ready
  document.addEventListener('DOMContentLoaded', function() {
    initHamburgerMenu();
    initFormValidation();
    initQuiz();
    initModal();
  });
  
  // Hamburger menu functionality
  function initHamburgerMenu() {
    if (hamburger && navLinks) {
      hamburger.addEventListener('click', function() {
        const expanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !expanded);
        navLinks.classList.toggle('show');
      });

      // Close menu when clicking outside
      document.addEventListener('click', function(event) {
        if (!hamburger.contains(event.target) && !navLinks.contains(event.target)) {
          hamburger.setAttribute('aria-expanded', 'false');
          navLinks.classList.remove('show');
        }
      });

      // Close menu when pressing Escape
      document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
          hamburger.setAttribute('aria-expanded', 'false');
          navLinks.classList.remove('show');
        }
      });
    }
  }
  
  // Form validation
  function initFormValidation() {
    // Contact form validation
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Clear previous errors
        document.querySelectorAll('.error-message').forEach(el => el.remove());
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        let isValid = true;
        
        // Validate name
        if (!name) {
          showError('name', 'الرجاء إدخال الاسم');
          isValid = false;
        }
        
        // Validate email
        if (!email) {
          showError('email', 'الرجاء إدخال البريد الإلكتروني');
          isValid = false;
        } else if (!isValidEmail(email)) {
          showError('email', 'البريد الإلكتروني غير صالح');
          isValid = false;
        }
        
        // Validate subject
        if (!subject) {
          showError('subject', 'الرجاء إدخال الموضوع');
          isValid = false;
        }
        
        // Validate message
        if (!message) {
          showError('message', 'الرجاء إدخال الرسالة');
          isValid = false;
        }
        
        if (isValid) {
          // Show success message
          const resultDiv = document.getElementById('contactResult');
          resultDiv.innerHTML = '<p class="success-message">تم إرسال الرسالة بنجاح!</p>';
          contactForm.reset();
          
          // Remove success message after 5 seconds
          setTimeout(() => {
            resultDiv.innerHTML = '';
          }, 5000);
        }
      });
    }
    
    // Signup form validation
    if (signupForm) {
      signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Clear previous errors
        document.querySelectorAll('.error-message').forEach(el => el.remove());
        
        const username = document.getElementById('username').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const confirmPassword = document.getElementById('confirmPassword').value.trim();
        const terms = document.getElementById('terms').checked;
        
        let isValid = true;
        
        // Validate username
        if (!username) {
          showError('username', 'الرجاء إدخال اسم المستخدم');
          isValid = false;
        }
        
        // Validate email
        if (!email) {
          showError('email', 'الرجاء إدخال البريد الإلكتروني');
          isValid = false;
        } else if (!isValidEmail(email)) {
          showError('email', 'البريد الإلكتروني غير صالح');
          isValid = false;
        }
        
        // Validate password
        if (!password) {
          showError('password', 'الرجاء إدخال كلمة المرور');
          isValid = false;
        } else if (password.length < 8) {
          showError('password', 'كلمة المرور يجب أن تكون 8 أحرف على الأقل');
          isValid = false;
        }
        
        // Validate confirm password
        if (!confirmPassword) {
          showError('confirmPassword', 'الرجاء تأكيد كلمة المرور');
          isValid = false;
        } else if (password !== confirmPassword) {
          showError('confirmPassword', 'كلمتا المرور غير متطابقتين');
          isValid = false;
        }
        
        // Validate terms
        if (!terms) {
          showError('terms', 'يجب الموافقة على الشروط والأحكام');
          isValid = false;
        }
        
        if (isValid) {
          // Show success message
          const resultDiv = document.getElementById('signupResult');
          resultDiv.innerHTML = '<p class="success-message">تم إنشاء الحساب بنجاح!</p>';
          signupForm.reset();
          
          // Remove success message after 5 seconds
          setTimeout(() => {
            resultDiv.innerHTML = '';
          }, 5000);
        }
      });
      
      // Password strength indicator
      const passwordInput = document.getElementById('password');
      const strengthBar = document.querySelector('.strength-bar');
      
      if (passwordInput && strengthBar) {
        passwordInput.addEventListener('input', function() {
          const password = this.value;
          let strength = 0;
          
          if (password.length >= 8) strength++;
          if (password.match(/[a-z]+/)) strength++;
          if (password.match(/[A-Z]+/)) strength++;
          if (password.match(/[0-9]+/)) strength++;
          if (password.match(/[$@#&!]+/)) strength++;
          
          // Update strength bar
          strengthBar.style.width = `${strength * 20}%`;
          
          // Update color based on strength
          if (strength <= 2) {
            strengthBar.style.backgroundColor = '#ff6b6b';
          } else if (strength <= 3) {
            strengthBar.style.backgroundColor = '#ffd93d';
          } else {
            strengthBar.style.backgroundColor = '#48bb78';
          }
        });
      }
    }
    
    // Signin form validation
    if (signinForm) {
      signinForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Clear previous errors
        document.querySelectorAll('.error-message').forEach(el => el.remove());
        
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        
        let isValid = true;
        
        // Validate email
        if (!email) {
          showError('email', 'الرجاء إدخال البريد الإلكتروني');
          isValid = false;
        } else if (!isValidEmail(email)) {
          showError('email', 'البريد الإلكتروني غير صالح');
          isValid = false;
        }
        
        // Validate password
        if (!password) {
          showError('password', 'الرجاء إدخال كلمة المرور');
          isValid = false;
        }
        
        if (isValid) {
          // Show success message
          const resultDiv = document.getElementById('signinResult');
          resultDiv.innerHTML = '<p class="success-message">تم تسجيل الدخول بنجاح!</p>';
          signinForm.reset();
          
          // Remove success message after 5 seconds
          setTimeout(() => {
            resultDiv.innerHTML = '';
          }, 5000);
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
  
  // Quiz functionality
  function initQuiz() {
    if (submitQuizBtn && quizForm) {
      submitQuizBtn.addEventListener('click', function() {
        // Clear previous results
        document.querySelectorAll('.correct-answer, .incorrect-answer').forEach(el => {
          el.classList.remove('correct-answer', 'incorrect-answer');
        });
        
        // Calculate score
        let score = 0;
        const totalQuestions = 5;
        
        // Check answers
        if (document.querySelector('input[name="q1"]:checked')?.value === 'a') score++;
        if (document.querySelector('input[name="q2"]:checked')?.value === 'b') score++;
        if (document.querySelector('input[name="q3"]:checked')?.value === 'c') score++;
        if (document.querySelector('input[name="q4"]:checked')?.value === 'b') score++;
        if (document.querySelector('input[name="q5"]:checked')?.value === 'a') score++;
        
        // Show correct/incorrect answers
        for (let i = 1; i <= totalQuestions; i++) {
          const selectedOption = document.querySelector(`input[name="q${i}"]:checked`);
          if (selectedOption) {
            const isCorrect = checkAnswer(i, selectedOption.value);
            selectedOption.nextElementSibling.classList.add(isCorrect ? 'correct-answer' : 'incorrect-answer');
          }
          
          // Show correct answer if not selected
          const correctValue = getCorrectAnswer(i);
          const correctOption = document.querySelector(`input[name="q${i}"][value="${correctValue}"]`);
          if (correctOption && !correctOption.nextElementSibling.classList.contains('correct-answer')) {
            correctOption.nextElementSibling.classList.add('correct-answer');
          }
        }
        
        // Disable all options
        document.querySelectorAll('input[type="radio"]').forEach(input => {
          input.disabled = true;
        });
        
        // Show modal with results
        showQuizResults(score, totalQuestions);
      });
    }
    
    function checkAnswer(questionNumber, selectedValue) {
      const correctAnswers = {
        1: 'a',
        2: 'b',
        3: 'c',
        4: 'b',
        5: 'a'
      };
      
      return correctAnswers[questionNumber] === selectedValue;
    }
    
    function getCorrectAnswer(questionNumber) {
      const correctAnswers = {
        1: 'a',
        2: 'b',
        3: 'c',
        4: 'b',
        5: 'a'
      };
      
      return correctAnswers[questionNumber];
    }
    
    function showQuizResults(score, total) {
      const percentage = Math.round((score / total) * 100);
      let feedback = '';
      
      if (percentage >= 80) {
        feedback = "ممتاز! لديك معرفة ممتازة بالأمن السيبراني. استمر في التعلم!";
      } else if (percentage >= 60) {
        feedback = "جيد جدًا! لديك معرفة جيدة بالأمن السيبراني. يمكنك تحسينها أكثر.";
      } else if (percentage >= 40) {
        feedback = "متوسط. ننصحك بمراجعة أقسام المخاطر والحماية لتحسين معرفتك.";
      } else {
        feedback = "تحتاج إلى المزيد من التعلم. ننصحك ببدء من الأساسيات في قسم المخاطر.";
      }
      
      document.getElementById('quizScore').textContent = `نتيجتك: ${score}/${total} (${percentage}%)`;
      document.getElementById('quizFeedback').textContent = feedback;
      
      quizModal.classList.add('show');
      document.body.style.overflow = 'hidden';
    }
  }
  
  // Modal functionality
  function initModal() {
    if (closeModalBtn) {
      closeModalBtn.addEventListener('click', closeModal);
    }
    
    if (retryQuizBtn) {
      retryQuizBtn.addEventListener('click', function() {
        closeModal();
        resetQuiz();
      });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
      if (event.target === quizModal) {
        closeModal();
      }
    });
    
    function closeModal() {
      quizModal.classList.remove('show');
      document.body.style.overflow = '';
    }
    
    function resetQuiz() {
      // Clear all selections
      document.querySelectorAll('input[type="radio"]').forEach(input => {
        input.checked = false;
        input.disabled = false;
      });
      
      // Clear result styles
      document.querySelectorAll('.correct-answer, .incorrect-answer').forEach(el => {
        el.classList.remove('correct-answer', 'incorrect-answer');
      });
    }
  }
})();