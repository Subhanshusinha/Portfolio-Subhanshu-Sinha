/* ========================================
   PRELOADER ANIMATION
   ======================================== */
window.addEventListener('load', function () {
  const preloader = document.getElementById('preloader');

  setTimeout(() => {
    preloader.classList.add('hidden');

    // Remove immediately after hidden
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 0);

  }, 500); // exactly 1 second
});

/* ========================================
   SCROLL PROGRESS BAR
   ======================================== */
window.addEventListener('scroll', function () {
  const scrollProgress = document.getElementById('scroll-progress');
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrollPercentage = (scrollTop / scrollHeight) * 100;
  scrollProgress.style.width = scrollPercentage + '%';
});

/* ========================================
   CUSTOM CURSOR
   ======================================== */
document.addEventListener('DOMContentLoaded', function () {
  const cursor = document.querySelector('.custom-cursor');
  const cursorTrail = document.querySelector('.cursor-trail');

  // Update cursor position
  document.addEventListener('mousemove', function (e) {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';

    // Trail follows with delay
    setTimeout(() => {
      cursorTrail.style.left = e.clientX + 'px';
      cursorTrail.style.top = e.clientY + 'px';
      cursorTrail.style.transform = 'translate(-50%, -50%)';
    }, 50);
  });

  // Add hover effect on interactive elements
  const interactiveElements = document.querySelectorAll('a, button, .card, input, textarea');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });
});

// === Portfolio Filter Using jQuery ===
// Used when clicking filter buttons (if filter UI is present, currently not in your HTML)
$(document).ready(function () {
  $(".filter-item").click(function () {
    const value = $(this).attr("data-filter");
    if (value == "all") {
      $(".post").show("1000");
    } else {
      $(".post").not("." + value).hide("1000");
      $(".post").filter("." + value).show("1000");
    }
  });
});

/* === Sticky Navbar === */
// Used to make navbar stick to top and push content down when scrolled
document.addEventListener("DOMContentLoaded", function () {
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      document.getElementById("navbar-top").classList.add("fixed-top");
      const navbar_height = document.querySelector(".navbar").offsetHeight;
      document.body.style.paddingTop = navbar_height + "px";
    } else {
      document.getElementById("navbar-top").classList.remove("fixed-top");
      document.body.style.paddingTop = "0";
    }
  });
});

// =================================
/* Script to autoplay background music and toggle mute/unmute with a button
document.addEventListener("DOMContentLoaded", function () {
  const music = document.getElementById("bg-music");
  const toggleBtn = document.getElementById("music-toggle");

  if (!music || !toggleBtn) return;

  // Set initial volume
  music.volume = 0.2;

  // Autoplay fix for browsers (requires user interaction)
  document.body.addEventListener("click", () => {
    music.play().catch(() => {});
  }, { once: true });

  // Toggle mute/unmute when button is clicked
  toggleBtn.addEventListener("click", () => {
    if (music.muted) {
      music.muted = false;
      toggleBtn.textContent = "🔊 Mute";
    } else {
      music.muted = true;
      toggleBtn.textContent = "🔇 Unmute";
    }
  });
});   */



/* === Typing Animation (Home Section) === */
// HTML: <span id="typing-animation"></span>
const typingAnimationElement = document.getElementById("typing-animation");
const typingTexts = ["Cyber Security", "Full Stack Developer"];
let textIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < typingTexts[textIndex].length) {
    typingAnimationElement.textContent += typingTexts[textIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, 100);
  } else {
    setTimeout(erase, 1200);
  }
}

function erase() {
  if (charIndex > 0) {
    typingAnimationElement.textContent = typingAnimationElement.textContent.slice(0, -1);
    charIndex--;
    setTimeout(erase, 100);
  } else {
    textIndex = (textIndex + 1) % typingTexts.length;
    setTimeout(type, 300);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  setTimeout(type, 500);
});

/* ========================================
   PARTICLES.JS CONFIGURATION
   ======================================== */
if (document.getElementById('particles-js')) {
  particlesJS('particles-js', {
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: ['#ffffff', '#fca61f', '#6f34fe']
      },
      shape: {
        type: 'circle',
        stroke: {
          width: 0,
          color: '#000000'
        }
      },
      opacity: {
        value: 0.5,
        random: true,
        anim: {
          enable: true,
          speed: 1,
          opacity_min: 0.1,
          sync: false
        }
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: true,
          speed: 4,
          size_min: 0.3,
          sync: false
        }
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: '#ffffff',
        opacity: 0.4,
        width: 1
      },
      move: {
        enable: true,
        speed: 2,
        direction: 'none',
        random: false,
        straight: false,
        out_mode: 'out',
        bounce: false,
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200
        }
      }
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: {
          enable: true,
          mode: 'grab'
        },
        onclick: {
          enable: true,
          mode: 'push'
        },
        resize: true
      },
      modes: {
        grab: {
          distance: 140,
          line_linked: {
            opacity: 1
          }
        },
        push: {
          particles_nb: 4
        }
      }
    },
    retina_detect: true
  });
}


/* === Back to Top Button === */
// HTML: <button id="btn-back-to-top"><i class="bi bi-arrow-up"></i></button>
let mybutton = document.getElementById("btn-back-to-top");

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 20 ||
    document.documentElement.scrollTop > 20
  ) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

mybutton.addEventListener("click", function () {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});

/* === Contact Section CAPTCHA === */
// HTML: #captcha-question, #captcha, #captcha-error inside contact form

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const captchaQuestion = document.getElementById("captcha-question");
  const captchaInput = document.getElementById("captcha");
  const errorText = document.getElementById("captcha-error");

  // Generate numbers
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  const correctAnswer = num1 + num2;

  // Show question
  captchaQuestion.textContent = `What is ${num1} + ${num2}?`;

  // Validate on submit
  form.addEventListener("submit", function (e) {
    if (parseInt(captchaInput.value.trim()) !== correctAnswer) {
      e.preventDefault();
      errorText.style.display = "block";
    } else {
      errorText.style.display = "none";
    }
  });
});


/* === Developer Quotes Box (Rotating) === */
document.addEventListener("DOMContentLoaded", () => {
  const quotes = [
    "Security is not a feature, it’s a mindset.",
    "Protect first. Build smart. Scale securely.",
    "Cybersecurity starts where trust ends.",
    "Every secure system begins with clean code.",
    "Think like an attacker. Defend like an engineer.",
    "Strong security is built, not assumed.",
    "Secure code today prevents breaches tomorrow.",
    "Behind every secure system is disciplined logic.",
    "Building systems that are secure by design.",
    "Code with purpose. Defend with precision."
  ];

  const quoteElement = document.getElementById("dev-quote");

  if (quoteElement) {
    let index = 0;

    // Initial Quote
    quoteElement.textContent = `"${quotes[0]}"`;
    // Add visible class after a short delay to trigger initial animation if needed, or immediately
    requestAnimationFrame(() => quoteElement.classList.add('visible'));

    // Rotate with beautiful animation
    setInterval(() => {
      // Exit animation
      quoteElement.classList.remove('visible');
      quoteElement.classList.add('hidden');

      setTimeout(() => {
        index = (index + 1) % quotes.length;
        quoteElement.textContent = `"${quotes[index]}"`;

        // precise timing to reset position without animation if needed, 
        // but here we want smooth entry from bottom
        quoteElement.classList.remove('hidden');
        quoteElement.classList.add('visible');
      }, 800); // Matches CSS transition duration
    }, 4000); // More time to read
  }
});

// ===========================================

//  Portfolio Section Starts 
/* === Scroll to Top on Page Reload === */
window.onload = () => {
  window.scrollTo(0, 0); // Scroll to top on reload
};

// === Project Data ===
const projects = [
  {
    title: "Portfolio Website",
    image: "images/project1.png",
    tech: ["HTML&CSS", "JavaScript", "Website"],
    link: "https://github.com/Subhanshusinha/Portfolio-Subhanshu-Sinha"
  },
  {
    title: "ShieldHub - Protection In One Hub",
    image: "images/Project2.png",
    tech: ["Node.js", "Express.js", "Ejs","MongoDB","Cyber security", "Digital Forensics"],
    link: "https://github.com/Subhanshusinha/Secure-Box-File-Integrity-Checker.git"
  },
  {
    title: "SecureBox - File Integrity Checker Web App",
    image: "images/Project3.png",
    tech: ["Bootstrap", "Node.js", "Express.js", "Cyber security", "Crypto module (for SHA-256)"],
    link: "https://github.com/Subhanshusinha/Secure-Box-File-Integrity-Checker.git"
  },
  {
    title: "Image Steganography Tool",
    image: "images/Project4.jpg",
    tech: ["HTML&CSS", "JavaScript", "Node.js & Express.js", "Crypto"],
    link: "https://github.com/Subhanshusinha/Image-Steganography-Tool"
  },
  {
    title: "FocusFlow - All-in-One Productivity Dashboard",
    image: "images/project5.png",
    tech: ["HTML&CSS", "JavaScript", "Bootstrap"],
    link: "https://github.com/Subhanshusinha/FocusFlow-All-in-One-Productivity-Dashboard"
  }
];

// === Layout Logic (CSS Grid) ===
document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("portfolio-container");

  if (container) {
    container.className = "projects-grid"; // Enable Grid

    projects.forEach((project, index) => {
      const card = document.createElement("article");
      card.className = "project-card";
      card.setAttribute("data-aos", "fade-up");
      card.setAttribute("data-aos-delay", index * 100); // Stagger animations

      card.innerHTML = `
        <div class="project-img-wrapper">
          <img src="${project.image}" alt="${project.title}" loading="lazy" />
        </div>
        <div class="project-info">
          <div class="project-meta">
            ${project.tech.map(t => `<span class="tech-pill">${t}</span>`).join("")}
          </div>
          <h3 class="project-title">${project.title}</h3>
          <a href="${project.link}" target="_blank" class="btn-view-project">
            View Project <i class="bi bi-arrow-right-short"></i>
          </a>
        </div>
      `;

      container.appendChild(card);
    });

    // Refresh AOS after adding elements
    if (typeof AOS !== 'undefined') {
      setTimeout(() => AOS.refresh(), 500); // Small delay to ensure rendering
    }
  } else {
    console.error("Portfolio container not found!");
  }
});



