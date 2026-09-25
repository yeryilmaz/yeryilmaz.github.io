/**
 * Yusuf Eryilmaz - Portfolio Interactive Core
 * Vanilla JS, Zero dependencies, High-performance
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initMobileNav();
  initScrollEffects();
  initTypewriter();
  initMetricCounters();
  initProjectFilters();
  initInteractiveTerminal();
  initClipboardCopy();
  initResumeModal();
  initContactForm();
});

/* --------------------------------------------------------------------------
   THEME TOGGLE (Dark / Light Mode)
   -------------------------------------------------------------------------- */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  if (!themeToggleBtn) return;

  const savedTheme = localStorage.getItem('theme') || 
    (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  
  applyTheme(savedTheme);

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  });
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  if (themeToggleBtn) {
    themeToggleBtn.innerHTML = theme === 'dark' 
      ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`
      : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
    themeToggleBtn.setAttribute('title', theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
    themeToggleBtn.setAttribute('aria-label', theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
  }
}

/* --------------------------------------------------------------------------
   MOBILE NAVIGATION
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const menuBtn = document.getElementById('menu-toggle-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!menuBtn || !navMenu) return;

  menuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    const isOpen = navMenu.classList.contains('open');
    menuBtn.innerHTML = isOpen 
      ? `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
      : `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      menuBtn.innerHTML = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
    });
  });
}

/* --------------------------------------------------------------------------
   SCROLL EFFECTS, NAVBAR SPY & BACK-TO-TOP
   -------------------------------------------------------------------------- */
function initScrollEffects() {
  const header = document.querySelector('.site-header');
  const backToTopBtn = document.getElementById('back-to-top');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    // Header styling on scroll
    if (scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }

    // Back to top visibility
    if (scrollY > 500) {
      backToTopBtn?.classList.add('visible');
    } else {
      backToTopBtn?.classList.remove('visible');
    }

    // Scroll spy
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  backToTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* --------------------------------------------------------------------------
   TYPEWRITER EFFECT (Hero Section)
   -------------------------------------------------------------------------- */
function initTypewriter() {
  const textElement = document.getElementById('typewriter-text');
  if (!textElement) return;

  const roles = [
    "Full-Stack Software Developer",
    "Senior Full-Stack Engineer",
    "Real-Time AI & WebRTC Specialist",
    "Serverless AWS Cloud Architect",
    "React & React Native Expert"
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      textElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      textElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 110;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      typingSpeed = 2000; // Pause at completion
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 500;
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* --------------------------------------------------------------------------
   ANIMATED METRIC COUNTERS
   -------------------------------------------------------------------------- */
function initMetricCounters() {
  const counters = document.querySelectorAll('.metric-number');
  if (!counters.length) return;

  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        counters.forEach(counter => {
          const target = parseInt(counter.getAttribute('data-target') || '0', 10);
          let current = 0;
          const stepTime = 1800 / target;

          const timer = setInterval(() => {
            current += 1;
            counter.textContent = current;
            if (current >= target) {
              counter.textContent = target;
              clearInterval(timer);
            }
          }, Math.max(stepTime, 20));
        });
      }
    });
  }, { threshold: 0.3 });

  const metricsSection = document.querySelector('.metrics-section');
  if (metricsSection) {
    observer.observe(metricsSection);
  }
}

/* --------------------------------------------------------------------------
   PROJECT CATEGORY FILTERING
   -------------------------------------------------------------------------- */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter') || 'all';

      projectCards.forEach(card => {
        const categories = (card.getAttribute('data-category') || '').split(' ');
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 30);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   INTERACTIVE DEVELOPER TERMINAL
   -------------------------------------------------------------------------- */
function initInteractiveTerminal() {
  const terminalInput = document.getElementById('terminal-input');
  const terminalOutput = document.getElementById('terminal-output');
  const cmdBadges = document.querySelectorAll('.cmd-badge');

  if (!terminalInput || !terminalOutput) return;

  const commandHistory = [];
  let historyIndex = -1;

  const commands = {
    help: () => `
<span style="color: #38bdf8;">Available Commands:</span>
  <span style="color: #10b981;">whoami</span>        - Brief summary of Yusuf Eryilmaz
  <span style="color: #10b981;">skills</span>        - Key technical capabilities & competencies
  <span style="color: #10b981;">experience</span>    - Highlights from The Age of Light, MDF Commerce, The Minery
  <span style="color: #10b981;">aws</span>           - AWS cloud & serverless architecture stack
  <span style="color: #10b981;">education</span>     - Dual university engineering & math background
  <span style="color: #10b981;">contact</span>       - Direct contact channels (Email, Phone, LinkedIn)
  <span style="color: #10b981;">resume</span>        - Download Yusuf's Resume PDF
  <span style="color: #10b981;">clear</span>         - Clear the terminal screen
`,
    whoami: () => `
<span style="color: #38bdf8; font-weight: bold;">Yusuf Eryilmaz</span>
Senior Full-Stack Engineer & Architectural Design Lead (5+ Years Experience)
Based in Kitchener, ON, Canada.
Dual B.Sc. in Computer Engineering (Istanbul Technical Univ.) & Mathematics Education (Dokuz Eylul Univ.).
Specialized in real-time WebRTC AI streaming, serverless AWS architectures, and high-performance React/Node ecosystems.
`,
    skills: () => `
<span style="color: #a855f7; font-weight: bold;">[Frontend & Mobile]</span>: React.js, React Native, TypeScript, Redux, Next.js, WCAG 2.1
<span style="color: #38bdf8; font-weight: bold;">[AI & Streaming]</span>: LiveKit WebRTC, HeyGen Avatars, Google Gemini LLMs, Qdrant Vector Search
<span style="color: #f59e0b; font-weight: bold;">[Cloud & Serverless]</span>: AWS Lambda, CDK, DynamoDB, SQS, Cognito, S3, CloudFront, Docker
<span style="color: #10b981; font-weight: bold;">[Backend & Integrations]</span>: Node.js, Express, Python/Django, Java, Stripe, RevenueCat, OneSpan
`,
    experience: () => `
<span style="color: #38bdf8;">1. Architectural Design Lead @ The Age of Light Inc (2026 - Present)</span>
   - 60fps real-time AI avatar streaming with LiveKit WebRTC, Gemini LLMs & AWS CDK.
<span style="color: #38bdf8;">2. Software Developer @ MDF Commerce (2023 - 2026)</span>
   - Complete UI overhaul for Contract Lifecycle Management; 80% efficiency gain.
<span style="color: #38bdf8;">3. Software Developer @ The Minery Ltd (2022 - 2023)</span>
   - Nationwide employee tracking across all Honda & Acura dealerships in Canada.
`,
    aws: () => `
<span style="color: #f59e0b; font-weight: bold;">AWS Cloud Architecture Competencies:</span>
- <span style="color: #fff;">AWS CDK (TypeScript):</span> Infrastructure as Code, reproducible stacks
- <span style="color: #fff;">Serverless Compute:</span> AWS Lambda, API Gateway (REST & WebSockets)
- <span style="color: #fff;">Data & Messaging:</span> DynamoDB (Single-table design), Amazon SQS, S3
- <span style="color: #fff;">Security & Auth:</span> AWS Cognito User Pools, JWT, IAM least privilege
- <span style="color: #fff;">Edge Delivery:</span> CloudFront CDN, Route53, ACM SSL/TLS
`,
    education: () => `
<span style="color: #38bdf8; font-weight: bold;">Academic Pedigree:</span>
- <strong>B.Sc. in Computer Engineering</strong> - Istanbul Technical University (ITU)
- <strong>B.Sc. in Mathematics Education</strong> - Dokuz Eylul University
- <strong>Full Stack Engineering Certification</strong> - Clarusway
`,
    contact: () => `
<span style="color: #10b981;">Email:</span>    yusuferyilmaz1819@gmail.com
<span style="color: #10b981;">Phone:</span>    +1 (416) 836-1702
<span style="color: #10b981;">LinkedIn:</span> https://www.linkedin.com/in/yseryilmaz/
<span style="color: #10b981;">Location:</span> Kitchener, ON, Canada
`,
    resume: () => {
      const link = document.createElement('a');
      link.href = 'assets/Yusuf_Eryilmaz_Resume.pdf';
      link.download = 'Yusuf_Eryilmaz_Resume.pdf';
      link.click();
      return `<span style="color: #10b981;">[✓] Initiating download of Yusuf_Eryilmaz_Resume.pdf...</span>`;
    },
    clear: () => {
      terminalOutput.innerHTML = '';
      return null;
    }
  };

  function executeCommand(rawCmd) {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    commandHistory.push(rawCmd);
    historyIndex = commandHistory.length;

    // Append user input line
    const userLine = document.createElement('div');
    userLine.className = 'terminal-line';
    userLine.innerHTML = `<span style="color: var(--accent-cyan);">guest@yusuf-macbook:~$</span> ${escapeHTML(rawCmd)}`;
    terminalOutput.appendChild(userLine);

    if (commands[cmd]) {
      const result = commands[cmd]();
      if (result) {
        const resultLine = document.createElement('div');
        resultLine.className = 'terminal-line';
        resultLine.innerHTML = result;
        terminalOutput.appendChild(resultLine);
      }
    } else {
      const errorLine = document.createElement('div');
      errorLine.className = 'terminal-line';
      errorLine.innerHTML = `<span style="color: #ef4444;">zsh: command not found: ${escapeHTML(cmd)}</span>. Type <span style="color: #38bdf8;">help</span> to see available commands.`;
      terminalOutput.appendChild(errorLine);
    }

    terminalInput.value = '';
    const terminalBody = document.querySelector('.terminal-body');
    if (terminalBody) {
      terminalBody.scrollTop = terminalBody.scrollHeight;
    }
  }

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      executeCommand(terminalInput.value);
    } else if (e.key === 'ArrowUp') {
      if (historyIndex > 0) {
        historyIndex--;
        terminalInput.value = commandHistory[historyIndex];
      }
      e.preventDefault();
    } else if (e.key === 'ArrowDown') {
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        terminalInput.value = commandHistory[historyIndex];
      } else {
        historyIndex = commandHistory.length;
        terminalInput.value = '';
      }
      e.preventDefault();
    }
  });

  cmdBadges.forEach(badge => {
    badge.addEventListener('click', () => {
      const cmd = badge.getAttribute('data-cmd') || badge.textContent.trim();
      executeCommand(cmd);
      terminalInput.focus();
    });
  });
}

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}

/* --------------------------------------------------------------------------
   ONE-CLICK CLIPBOARD COPY WITH TOAST
   -------------------------------------------------------------------------- */
function initClipboardCopy() {
  const copyButtons = document.querySelectorAll('.copy-btn');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetText = btn.getAttribute('data-copy');
      if (!targetText) return;

      navigator.clipboard.writeText(targetText).then(() => {
        showToast(`Copied "${targetText}" to clipboard!`);
        const originalText = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(() => {
          btn.textContent = originalText;
        }, 2000);
      }).catch(() => {
        showToast('Failed to copy to clipboard.');
      });
    });
  });
}

function showToast(msg) {
  let toast = document.querySelector('.toast-notification');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-notification';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg> ${escapeHTML(msg)}`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

/* --------------------------------------------------------------------------
   RESUME PREVIEW MODAL
   -------------------------------------------------------------------------- */
function initResumeModal() {
  const modalOverlay = document.getElementById('resume-modal');
  const openBtns = document.querySelectorAll('.open-resume-modal-btn');
  const closeBtn = document.getElementById('close-resume-modal');

  if (!modalOverlay) return;

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeModal = () => {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  closeBtn?.addEventListener('click', closeModal);

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
}

/* --------------------------------------------------------------------------
   CONTACT FORM HANDLER
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contact-name')?.value.trim();
    const email = document.getElementById('contact-email')?.value.trim();
    const subject = document.getElementById('contact-subject')?.value.trim() || 'Inquiry from Portfolio';
    const message = document.getElementById('contact-message')?.value.trim();

    if (!name || !email || !message) {
      showToast('Please fill in all required fields.');
      return;
    }

    const mailtoUrl = `mailto:yusuferyilmaz1819@gmail.com?subject=${encodeURIComponent(subject + ' - ' + name)}&body=${encodeURIComponent(message + '\n\nSender Email: ' + email)}`;
    
    showToast('Opening email client to send your message...');
    setTimeout(() => {
      window.location.href = mailtoUrl;
    }, 500);
  });
}
