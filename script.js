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
  const form = document.querySelector("form");
  const captchaQuestion = document.getElementById("captcha-question");
  const captchaInput = document.getElementById("captcha");
  const errorText = document.getElementById("captcha-error");

  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  const correctAnswer = num1 + num2;

  captchaQuestion.textContent = `What is ${num1} + ${num2}?`;

  if (form && captchaInput && errorText) {
    form.addEventListener("submit", function (e) {
      if (parseInt(captchaInput.value.trim()) !== correctAnswer) {
        e.preventDefault();
        errorText.style.display = "block";
      } else {
        errorText.style.display = "none";
      }
    });
  }
});

/* === Developer Quotes Box === */
// HTML: <h4 id="dev-quote" class="quote-text"></h4>
document.addEventListener("DOMContentLoaded", () => {
  const quotes = [
    "Code is poetry. Every line tells a story.",
    "Crafting solutions. One bug at a time.",
    "Think logically. Code creatively.",
    "Secure. Scalable. Smart.",
    "Design. Develop. Deploy. Dominate.",
    "Clean code is a form of self-respect.",
    "In a world of variables, be a constant.",
    "Every pixel has a purpose.",
    "I don’t just build websites. I build experiences.",
    "The best way to predict the future is to code it."
  ];

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  const quoteElement = document.getElementById("dev-quote");
  if (quoteElement) {
    quoteElement.textContent = `"${randomQuote}"`;
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
    image: "images/project1.jpg",
    tech: ["HTML&CSS", "JavaScript", "Website"],
    link: "https://github.com/Subhanshusinha/Portfolio-Subhanshu-Sinha"
  },
  {
    title: "Image Steganography Tool",
    image: "images/Project2.jpg",
    tech: ["HTML&CSS", "JavaScript", "Canvas API", "Web Crypto API"],
    link: "https://github.com/Subhanshusinha/Image-Steganography-Tool"
  },
  {
    title: "Secure Verse",
    image: "images/project3.jpg",
    tech: ["JavaScript", "Cyber Security"],
    link: "https://github.com/Subhanshusinha/Secure-Verse"
  },
  {
    title: "FocusFlow – All-in-One Productivity Dashboard",
    image: "images/project4.jpg",
    link: "https://github.com/Subhanshusinha/FocusFlow-All-in-One-Productivity-Dashboard"
  }
];

// === Layout Logic ===
const pattern = [2, 2];
const container = document.getElementById("portfolio-container");
let index = 0;

while (index < projects.length) {
  for (let size of pattern) {
    const row = document.createElement("div");
    row.className = "row justify-content-evenly mb-4";

    for (let i = 0; i < size && index < projects.length; i++, index++) {
      const project = projects[index];

      const col = document.createElement("div");
      col.className = "col-md-4 col-10 mt-3";

      col.innerHTML = `
        <div class="card" data-aos="zoom-in">
          <img src="${project.image}" class="card-img-top" alt="${project.title}" />
          <div class="card-body">
            <h4 class="card-title">${project.title}</h4>
            ${project.tech.map(t => `<span class="badge">${t}</span>`).join("")}
            <br />
            <a href="${project.link}" target="_blank" class="read-more-btn">Read More</a>
          </div>
        </div>
      `;

      row.appendChild(col);
    }

    container.appendChild(row);
    if (index >= projects.length) break;
  }
}

// ✅ This is the KEY FIX:
if (typeof AOS !== 'undefined') {
  AOS.refresh();  // Re-initialize AOS after dynamic content is injected
}

