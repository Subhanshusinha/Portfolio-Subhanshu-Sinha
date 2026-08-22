/* ========================================
   INITIALIZATION & SMOOTH SCROLL (LENIS)
   ======================================== */
let lenis = null;
if (typeof Lenis !== 'undefined') {
  try {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });
    function raf(time) {
      if (lenis) lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  } catch (e) {
    console.warn("Lenis smooth scroll warning:", e);
  }
}

// Integrate GSAP with Lenis
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });

  if (lenis) {
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
  }
}

/* ========================================
   SCROLL PROGRESS BAR
   ======================================== */
const scrollProgress = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  if (scrollProgress) scrollProgress.style.width = progress + '%';
});

/* ========================================
   BACK TO TOP BUTTON
   ======================================== */
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
  if (backToTop) {
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }
});
if (backToTop) {
  backToTop.addEventListener('click', () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.5 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
}

/* ========================================
   DARK / LIGHT THEME TOGGLE
   ======================================== */
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
let isLight = false;

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    isLight = !isLight;
    document.body.classList.toggle('light-theme', isLight);
    themeIcon.className = isLight ? 'bi bi-moon-stars-fill' : 'bi bi-sun-fill';
  });
}

/* ========================================
   COUNTER ANIMATION ON STATS
   ======================================== */
const statNumbers = document.querySelectorAll('.stat-number');
if (statNumbers.length) {
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'));
        const suffix = el.getAttribute('data-suffix') || '+';
        let count = 0;
        const step = Math.ceil(target / 40);
        const interval = setInterval(() => {
          count += step;
          if (count >= target) {
            count = target;
            clearInterval(interval);
          }
          el.textContent = count + suffix;
        }, 40);
        countObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  statNumbers.forEach(el => countObserver.observe(el));
}

// Magnetic Button Effect
const magneticBtns = document.querySelectorAll('.magnetic-btn');
magneticBtns.forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const h = rect.width / 2;
    const v = rect.height / 2;
    const x = e.clientX - rect.left - h;
    const y = e.clientY - rect.top - v;
    
    if (typeof gsap !== 'undefined') {
      gsap.to(btn, {
        x: x * 0.4,
        y: y * 0.4,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  });

  btn.addEventListener('mouseleave', () => {
    if (typeof gsap !== 'undefined') {
      gsap.to(btn, { x: 0, y: 0, duration: 0.3, ease: "power2.out" });
    }
  });
});

/* ========================================
   PRELOADER & INITIAL ANIMATION
   ======================================== */
function startPreloaderSequence() {
  if (window.preloaderInitialized) return;
  window.preloaderInitialized = true;

  if (typeof gsap !== 'undefined') {
    gsap.set('.navbar', { y: -100, opacity: 0 });

    const welcomeMsg = document.getElementById('preloader-welcome');
    const nmapContainer = document.getElementById('nmap-scan-container');
    const nmapOutput = document.getElementById('nmap-output');

    if (nmapContainer && nmapOutput && welcomeMsg) {
      nmapContainer.style.display = 'flex';
      welcomeMsg.style.display = 'none';

      const nmapLines = [
        "Starting Nmap 7.93 ( https://nmap.org ) at " + new Date().toISOString().split('T')[0] + " 10:00 UTC",
        "NSE: Loaded 155 scripts for scanning.",
        "Initiating Ping Scan...",
        "Scanning target (192.168.1.100) [4 ports]",
        "Completed Ping Scan at 10:00, 0.05s elapsed (1 total hosts)",
        "Initiating SYN Stealth Scan...",
        "Discovered open port 22/tcp on 192.168.1.100",
        "Discovered open port 80/tcp on 192.168.1.100",
        "Discovered open port 443/tcp on 192.168.1.100",
        "Completed SYN Stealth Scan at 10:00, 1.20s elapsed (1000 total ports)",
        "Initiating Service scan...",
        "Scanning 3 services on target",
        "Completed Service scan at 10:01, 6.00s elapsed (3 services on 1 host)",
        "Nmap scan report for target (192.168.1.100)",
        "Host is up (0.015s latency).",
        "Not shown: 997 closed tcp ports (reset)",
        "PORT    STATE SERVICE  VERSION",
        "22/tcp  open  ssh      OpenSSH 8.9p1",
        "80/tcp  open  http     nginx 1.18.0",
        "443/tcp open  ssl/http nginx 1.18.0",
        "Target breached. Establishing secure connection...",
        "ACCESS GRANTED."
      ];

      let lineIndex = 0;
      function typeLine() {
        if (lineIndex < nmapLines.length) {
          const p = document.createElement('p');
          p.textContent = nmapLines[lineIndex];
          if (nmapLines[lineIndex].includes("Discovered open port")) {
            p.classList.add("c-green");
          } else if (nmapLines[lineIndex].includes("ACCESS GRANTED")) {
            p.classList.add("c-cyan");
            p.style.fontWeight = "bold";
          } else if (nmapLines[lineIndex].includes("Target breached")) {
            p.classList.add("c-purple");
          }
          nmapOutput.appendChild(p);
          nmapOutput.scrollTop = nmapOutput.scrollHeight;
          lineIndex++;
          setTimeout(typeLine, Math.random() * 80 + 30);
        } else {
          setTimeout(() => {
            gsap.to(nmapContainer, { opacity: 0, duration: 0.5, onComplete: () => {
              nmapContainer.style.display = 'none';
              showWelcomeCard();
            }});
          }, 600);
        }
      }
      
      setTimeout(typeLine, 300);

      function showWelcomeCard() {
        welcomeMsg.style.display = 'block';
        gsap.from(welcomeMsg, { scale: 0.8, opacity: 0, y: 20, duration: 0.7, ease: "back.out(1.7)" });

        setTimeout(() => {
          gsap.to('.preloader', { yPercent: -100, duration: 0.8, ease: "power4.inOut" });
          const tl = gsap.timeline();
          tl.to('.navbar', { y: 0, opacity: 1, duration: 0.6 })
            .from('.badge-wrapper', { y: 20, opacity: 0, duration: 0.5 }, "-=0.2")
            .from('.hero-title', { y: 30, opacity: 0, duration: 0.6 })
            .from('.hero-subtitle', { opacity: 0, duration: 0.5 })
            .from('.hero-desc', { y: 20, opacity: 0, duration: 0.5 }, "-=0.2")
            .from('.hero-btns', { y: 20, opacity: 0, duration: 0.5 })
            .from('.hero-img', { scale: 0.8, opacity: 0, duration: 0.8, ease: "back.out(1.7)" }, "-=1")
            .from('.floating-badge', { scale: 0, opacity: 0, stagger: 0.2, duration: 0.5, ease: "back.out(2)" }, "-=0.5");
        }, 2000);
      }
    } else if (welcomeMsg) {
      welcomeMsg.style.display = 'block';
      gsap.from(welcomeMsg, { scale: 0.8, opacity: 0, y: 20, duration: 0.7, ease: "back.out(1.7)" });

      setTimeout(() => {
        gsap.to('.preloader', { yPercent: -100, duration: 0.8, ease: "power4.inOut" });
        const tl = gsap.timeline();
        tl.to('.navbar', { y: 0, opacity: 1, duration: 0.6 })
          .from('.badge-wrapper', { y: 20, opacity: 0, duration: 0.5 }, "-=0.2")
          .from('.hero-title', { y: 30, opacity: 0, duration: 0.6 })
          .from('.hero-subtitle', { opacity: 0, duration: 0.5 })
          .from('.hero-desc', { y: 20, opacity: 0, duration: 0.5 }, "-=0.2")
          .from('.hero-btns', { y: 20, opacity: 0, duration: 0.5 })
          .from('.hero-img', { scale: 0.8, opacity: 0, duration: 0.8, ease: "back.out(1.7)" }, "-=1")
          .from('.floating-badge', { scale: 0, opacity: 0, stagger: 0.2, duration: 0.5, ease: "back.out(2)" }, "-=0.5");
      }, 2000);
    } else {
      gsap.to('.preloader', { yPercent: -100, duration: 0.8, ease: "power4.inOut" });
      gsap.to('.navbar', { y: 0, opacity: 1, duration: 0.8 });
    }
  } else {
    const preloader = document.querySelector('.preloader');
    if (preloader) preloader.style.display = 'none';
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startPreloaderSequence);
} else {
  startPreloaderSequence();
}
window.addEventListener('load', startPreloaderSequence);

/* ========================================
   TYPEWRITER EFFECT
   ======================================== */
const typingTexts = ["Cyber Security Enthusiast", "Secure Backend Developer", "Problem Solver"];
let textIndex = 0;
let charIndex = 0;
const typeWriterElement = document.getElementById("typewriter");

function type() {
  if (charIndex < typingTexts[textIndex].length) {
    typeWriterElement.textContent += typingTexts[textIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, 100);
  } else {
    setTimeout(erase, 2000);
  }
}

function erase() {
  if (charIndex > 0) {
    typeWriterElement.textContent = typeWriterElement.textContent.slice(0, -1);
    charIndex--;
    setTimeout(erase, 50);
  } else {
    textIndex = (textIndex + 1) % typingTexts.length;
    setTimeout(type, 300);
  }
}
setTimeout(type, 3000); // Start after preloader

/* ========================================
   SKILLS DATA & RENDER
   ======================================== */
const skillsData = [
  {
    category: "Programming",
    tags: ["Python Scripting", "JavaScript"]
  },
  {
    category: "Cybersecurity",
    tags: ["SOC", "SIEM", "Digital Forensics", "Kali Linux", "Wireshark"]
  },
  {
    category: "Backend Development",
    tags: ["Node.js", "Express.js", "EJS", "MongoDB"]
  },
  {
    category: "CS Fundamentals & Others",
    tags: ["Computer Networking", "SQL", "Git"]
  }
];

const skillsContainer = document.getElementById("skills-container");

if (skillsContainer) {
  skillsData.forEach(skillSet => {
    const categoryDiv = document.createElement("div");
    categoryDiv.className = "skill-category";
    
    categoryDiv.innerHTML = `
      <h5>${skillSet.category}</h5>
      <div class="tags">
        ${skillSet.tags.map(tag => `<span class="tech-tag">${tag}</span>`).join('')}
      </div>
    `;
    
    skillsContainer.appendChild(categoryDiv);
  });
}

/* ========================================
   PORTFOLIO DATA & RENDER
   ======================================== */
const projects = [
  {
    title: "ShieldHub - Protection In One Hub",
    image: "images/Project2.png",
    tech: ["Node.js", "Express.js", "MongoDB", "Cybersecurity"],
    desc: "A centralized cybersecurity hub providing threat monitoring, real-time alerts, and security management tools in one unified dashboard.",
    link: "https://github.com/Subhanshusinha/ShieldHub-Protection-In-One-Hub"
  },
  {
    title: "SecureBox - File Integrity Checker",
    image: "images/Project3.png",
    tech: ["Node.js", "Crypto Module", "Cybersecurity"],
    desc: "Verifies file integrity using cryptographic hashing. Detects unauthorized modifications and ensures data hasn't been tampered with.",
    link: "https://github.com/Subhanshusinha/Secure-Box-File-Integrity-Checker.git"
  },
  {
    title: "Image Steganography Tool",
    image: "images/Project4.png",
    tech: ["JavaScript", "Node.js", "Crypto"],
    desc: "Hides secret messages inside images using steganography techniques. Encrypts and decrypts hidden data without visible changes to the image.",
    link: "https://github.com/Subhanshusinha/Image-Steganography-Tool"
  },
  {
    title: "FocusFlow - Productivity Dashboard",
    image: "images/Project5.png",
    tech: ["HTML & CSS", "JavaScript", "Bootstrap"],
    desc: "An all-in-one productivity dashboard with tasks, timers, notes, and habit tracking to keep you focused and organized every day.",
    link: "https://github.com/Subhanshusinha/FocusFlow-All-in-One-Productivity-Dashboard"
  }
];

const portfolioGrid = document.getElementById("portfolio-grid");

if (portfolioGrid) {
  projects.forEach(project => {
    const col = document.createElement("div");
    col.className = "col-md-4 mb-4 portfolio-item-gsap";

    col.innerHTML = `
      <div class="flip-card">
        <div class="flip-card-inner">

          <!-- FRONT: image + project name only -->
          <div class="flip-card-front">
            <div class="flip-img-wrap">
              <img src="${project.image}" alt="${project.title}">
              <div class="flip-img-overlay"></div>
            </div>
            <div class="flip-front-info">
              <h3 class="flip-title">${project.title}</h3>
              <p class="flip-hint"><i class="bi bi-arrow-repeat me-1"></i>Hover to flip</p>
            </div>
          </div>

          <!-- BACK: description + skills + GitHub -->
          <div class="flip-card-back">
            <div class="flip-back-content">
              <div class="flip-back-icon"><i class="bi bi-code-slash"></i></div>
              <h3 class="flip-back-title">${project.title}</h3>
              <p class="flip-back-desc">${project.desc}</p>
              <div class="flip-back-tags">
                ${project.tech.map(t => `<span class="tech-pill">${t}</span>`).join('')}
              </div>
              <a href="${project.link}" target="_blank" class="btn-primary-glow flip-btn">
                <i class="bi bi-github me-2"></i> View on GitHub
              </a>
            </div>
          </div>

        </div>
      </div>
    `;
    portfolioGrid.appendChild(col);
  });
}

/* ========================================
   SPOTLIGHT / TORCH EFFECT ON PROJECT GRID
   ======================================== */
const spotlightGrid = document.getElementById("portfolio-grid");
if (spotlightGrid) {
  spotlightGrid.addEventListener("mousemove", (e) => {
    const rect = spotlightGrid.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    spotlightGrid.style.setProperty("--sx", x + "px");
    spotlightGrid.style.setProperty("--sy", y + "px");
    spotlightGrid.classList.add("spotlight-active");
  });
  spotlightGrid.addEventListener("mouseleave", () => {
    spotlightGrid.classList.remove("spotlight-active");
  });
}

/* ========================================
   GLOWING SKILL TAG COLORS ON HOVER
   ======================================== */
const glowColors = [
  "#fca61f", "#6f34fe", "#00d4ff", "#ff4d6d", "#00e676", "#ff9800"
];
document.addEventListener("DOMContentLoaded", () => {
  const tags = document.querySelectorAll('.tech-tag');
  tags.forEach((tag, i) => {
    const color = glowColors[i % glowColors.length];
    tag.addEventListener('mouseenter', () => {
      tag.style.boxShadow = `0 0 14px ${color}`;
      tag.style.borderColor = color;
      tag.style.color = color;
    });
    tag.addEventListener('mouseleave', () => {
      tag.style.boxShadow = '';
      tag.style.borderColor = '';
      tag.style.color = '';
    });
  });
});

/* ========================================
   EXPERIENCE DATA & RENDER
   ======================================== */
// const experiences = [
//   {
//     role: "Technical Writer & Content Specialist", // Assumed role based on description
//     company: "Testshine Co., Ltd.",
//     location: "Shanghai, China (Remote)",
//     duration: "Present", // Or a specific date if provided
//     description: [
//       "Developed and maintained technical documentation for laboratory testing instruments, including product brochures, specifications, and user-focused technical materials.",
//       "Conducted in-depth research and analysis of testing equipment, industry standards, and product specifications to produce accurate technical documentation.",
//       "Collaborated with engineering, design, and web development teams to prepare product documentation, MDX content, and website materials for digital publication.",
//       "Supported website development by creating structured technical content, optimizing documentation, and managing product information for online deployment."
//     ]
//   }
//   // To add more experience, just copy the block above, paste below, and change details!
// ];

const experienceGrid = document.getElementById("experience-grid");

if (experienceGrid) {
  experiences.forEach((exp, index) => {
    const col = document.createElement("div");
    col.className = "col-12 mb-4 timeline-item-gsap";
    
    col.innerHTML = `
      <div class="glass-card experience-card">
        <div class="exp-header d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-3">
          <div>
            <h3 class="exp-role text-white mb-1">${exp.role}</h3>
            <h5 class="exp-company gradient-text mb-0">${exp.company} <span class="text-muted fs-6 ms-2"><i class="bi bi-geo-alt"></i> ${exp.location}</span></h5>
          </div>
          <div class="exp-duration mt-2 mt-md-0">
            <span class="custom-badge"><i class="bi bi-calendar3 me-2"></i>${exp.duration}</span>
          </div>
        </div>
        <ul class="exp-list text-muted">
          ${exp.description.map(desc => `<li><i class="bi bi-check2-circle text-primary me-2"></i>${desc}</li>`).join('')}
        </ul>
      </div>
    `;
    experienceGrid.appendChild(col);
  });
}

/* ========================================
   CERTIFICATIONS DATA & RENDER
   ======================================== */
const certifications = [
  {
    title: "AWS Certified Solutions Architect – Associate",
    issuer: "Amazon Web Services",
    icon: "bi bi-cloud-check",
    link: "#" // Replace '#' with actual certificate link
  },
  {
    title: "AWS Certified Developer – Associate",
    issuer: "Amazon Web Services",
    icon: "bi bi-code-slash",
    link: "#" // Replace '#' with actual certificate link
  },
  {
    title: "TryHackMe SOC Level 1",
    issuer: "TryHackMe (Hands-on SOC Training)",
    icon: "bi bi-shield-lock",
    link: "" // Leave empty if no link
  }
  // To add more certifications, just copy the block above and change details!
];

const certGrid = document.getElementById("certifications-grid");

if (certGrid) {
  certifications.forEach((cert, index) => {
    const col = document.createElement("div");
    col.className = "col-md-6 col-lg-4 mb-4 cert-item-gsap";
    
    col.innerHTML = `
      <div class="glass-card cert-card text-center d-flex flex-column h-100">
        <div class="cert-icon mb-3 mx-auto">
          <i class="${cert.icon}"></i>
        </div>
        <h4 class="cert-title mb-2 text-white">${cert.title}</h4>
        <p class="cert-issuer text-muted small mb-4">${cert.issuer}</p>
        ${cert.link ? `<a href="${cert.link}" target="_blank" class="btn-outline-glow magnetic-btn mt-auto mx-auto py-2 px-4" style="font-size: 0.85rem;">View Certificate</a>` : `<span class="mt-auto text-muted small">Completed</span>`}
      </div>
    `;
    certGrid.appendChild(col);
  });
}

/* ========================================
   SCROLL ANIMATIONS (GSAP ScrollTrigger)
   ======================================== */
// Navbar blur effect on scroll
window.addEventListener("scroll", () => {
  const nav = document.querySelector(".custom-nav");
  if (window.scrollY > 50) {
    nav.style.background = "rgba(10, 10, 15, 0.9)";
    nav.style.boxShadow = "0 4px 30px rgba(0,0,0,0.5)";
  } else {
    nav.style.background = "rgba(10, 10, 15, 0.7)";
    nav.style.boxShadow = "none";
  }
});

// Section Titles Reveal
gsap.utils.toArray('.section-header').forEach(header => {
  gsap.from(header, {
    scrollTrigger: {
      trigger: header,
      start: "top 80%",
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out"
  });
});

// Expertise Cards Stagger
gsap.from(".expertise-card-wrap", {
  scrollTrigger: {
    trigger: "#expertise",
    start: "top 70%",
  },
  y: 50,
  opacity: 0,
  stagger: 0.2,
  duration: 0.8,
  ease: "back.out(1.5)"
});

// Skills Section Reveal
gsap.from(".skills-text", {
  scrollTrigger: {
    trigger: "#skills",
    start: "top 75%",
  },
  x: -50,
  opacity: 0,
  duration: 0.8
});

gsap.from(".glass-panel", {
  scrollTrigger: {
    trigger: "#skills",
    start: "top 75%",
  },
  x: 50,
  opacity: 0,
  duration: 0.8
});

// Portfolio Items Reveal
gsap.from(".portfolio-item-gsap", {
  scrollTrigger: {
    trigger: "#projects",
    start: "top 70%",
  },
  y: 50,
  opacity: 0,
  stagger: 0.2,
  duration: 0.8
});

// Experience Items Reveal
gsap.from(".timeline-item-gsap", {
  scrollTrigger: {
    trigger: "#experience",
    start: "top 75%",
  },
  y: 30,
  opacity: 0,
  stagger: 0.2,
  duration: 0.8
});

// Certification Items Reveal
gsap.from(".cert-item-gsap", {
  scrollTrigger: {
    trigger: "#certifications",
    start: "top 75%",
  },
  y: 30,
  scale: 0.95,
  opacity: 0,
  stagger: 0.15,
  duration: 0.7
});

/* ========================================
   CAPTCHA & CONTACT FORM
   ======================================== */
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const captchaQuestion = document.getElementById("captcha-question");
  const captchaInput = document.getElementById("captcha");
  const errorText = document.getElementById("captcha-error");
  const submitBtn = form ? form.querySelector('button[type="submit"]') : null;

  let num1 = Math.floor(Math.random() * 10) + 1;
  let num2 = Math.floor(Math.random() * 10) + 1;
  let correctAnswer = num1 + num2;

  function refreshCaptcha() {
    num1 = Math.floor(Math.random() * 10) + 1;
    num2 = Math.floor(Math.random() * 10) + 1;
    correctAnswer = num1 + num2;
    if (captchaQuestion) {
      captchaQuestion.textContent = `${num1} + ${num2} = ?`;
    }
    if (captchaInput) {
      captchaInput.value = '';
    }
  }

  if (captchaQuestion) {
    refreshCaptcha();
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      if (parseInt(captchaInput.value.trim()) !== correctAnswer) {
        errorText.classList.remove("d-none");
        errorText.textContent = "Incorrect answer. Try again.";
        errorText.classList.replace("text-success", "text-danger");
        
        // Shake animation for error
        gsap.to(captchaInput, { x: 10, duration: 0.1, yoyo: true, repeat: 3 });
        return;
      }

      errorText.classList.add("d-none");
      
      // Update button state
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.innerHTML = 'Sending... <i class="bi bi-hourglass-split ms-2"></i>';
      submitBtn.disabled = true;

      // Prepare form data
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      // Check if access key is still default
      if (data.access_key === "YOUR_ACCESS_KEY_HERE") {
        errorText.classList.remove("d-none");
        errorText.classList.replace("text-success", "text-danger");
        errorText.innerHTML = "<strong>Error:</strong> You need to add your Web3Forms Access Key in index.html!";
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
        return;
      }

      // Submit via AJAX to Web3Forms
      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(async (response) => {
        let json = await response.json();
        if (response.status == 200) {
          // Trigger Delivery Animation
          const overlay = document.getElementById("delivery-overlay");
          overlay.classList.remove("d-none");
          
          const tl = gsap.timeline({ onComplete: () => {
            setTimeout(() => {
              gsap.to(overlay, { opacity: 0, duration: 0.5, onComplete: () => {
                overlay.classList.add("d-none");
                overlay.style.opacity = 1;
                // Form reset
                errorText.classList.remove("d-none");
                errorText.classList.replace("text-danger", "text-success");
                errorText.textContent = "Message sent successfully!";
                form.reset();
                refreshCaptcha();
              }});
            }, 2500); // Show success message for 2.5 seconds
          }});

          // Initial positions
          // Box starts high up in center
          gsap.set(".delivery-box", { y: -150, opacity: 0, scale: 1, xPercent: -50, x: 0 });
          // Boy starts off left, flipped to face RIGHT (scaleX: -1)
          gsap.set(".delivery-boy", { x: -600, opacity: 1, scaleX: -1 });
          gsap.set(".delivery-text-container", { opacity: 0, y: 20, scale: 0.8 });

          // Animation sequence
          tl.to(".delivery-box", { y: 20, opacity: 1, duration: 0.6, ease: "bounce.out" }) // box drops
            .to(".delivery-boy", { x: 130, duration: 0.8, ease: "power2.inOut" }, "-=0.2") // boy rides in (facing right), stops with back under box
            .to(".delivery-box", { y: 140, scale: 0.5, duration: 0.4, ease: "power1.in" }) // box drops onto the back of the bike
            .to(".delivery-boy", { x: window.innerWidth, duration: 1.2, ease: "power2.in" }, "+=0.2") // boy rides away forward
            .to(".delivery-box", { x: window.innerWidth - 130, duration: 1.2, ease: "power2.in" }, "<") // box rides away WITH the boy!
            .to(".delivery-text-container", { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.7)" }, "-=0.5"); // success text pops up

        } else {
          console.log(response);
          errorText.classList.remove("d-none");
          errorText.classList.replace("text-success", "text-danger");
          errorText.textContent = json.message ? json.message : "Submission failed.";
        }
      })
      .catch(error => {
        console.error(error);
        errorText.classList.remove("d-none");
        errorText.classList.replace("text-success", "text-danger");
        errorText.textContent = "An error occurred. Please try again later.";
      })
      .finally(() => {
        // Restore button state
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
      });
    });
  }
});
