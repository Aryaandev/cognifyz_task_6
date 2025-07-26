document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("colorBtn");
  const resetBtn = document.getElementById("resetBtn");
  const colorName = document.getElementById("colorName");
  const colors = ["#f4f4f4", "#e0f7fa", "#ffe0b2", "#f8bbd0", "#dcedc8", "#c5cae9"];
  const colorLabels = [
    "Default (Light Gray)",
    "Cool Blue (#e0f7fa)",
    "Warm Orange (#ffe0b2)",
    "Soft Pink (#f8bbd0)",
    "Fresh Green (#dcedc8)",
    "Calm Indigo (#c5cae9)"
  ];
  let index = 0;
  const clickSound = new Audio("click.mp3");

  button.addEventListener("click", () => {
    clickSound.play();
    document.body.style.backgroundColor = colors[index];
    colorName.textContent = `Current Color: ${colorLabels[index]}`;
    index = (index + 1) % colors.length;
  });

  resetBtn.addEventListener("click", () => {
    document.body.style.backgroundColor = "";
    colorName.textContent = "";
  });

  // API Fetch
  const loadingMsg = document.getElementById("api-loading");
  fetch("https://jsonplaceholder.typicode.com/posts?_limit=6")
    .then(response => response.json())
    .then(data => {
      const postsContainer = document.getElementById("posts-container");
      loadingMsg.style.display = "none";
      if (!postsContainer) return;
      data.forEach(post => {
        const card = document.createElement("div");
        card.classList.add("post-card");
        card.innerHTML = `<h3>${post.title}</h3><p>${post.body}</p>`;
        postsContainer.appendChild(card);
      });
    })
    .catch(error => {
      loadingMsg.textContent = "Failed to load posts.";
      console.error("Error fetching posts:", error);
    });

  // Contact Form Validation
  const form = document.getElementById("contactForm");
  const status = document.getElementById("form-status");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let isValid = true;
    status.textContent = "";

    const fields = [
      { id: "name", message: "Please enter your name" },
      { id: "email", message: "Please enter a valid email" },
      { id: "message", message: "Please enter your message" }
    ];

    fields.forEach(field => {
      const input = document.getElementById(field.id);
      const error = input.nextElementSibling;
      error.textContent = "";
      error.style.display = "none";

      if (!input.value.trim()) {
        error.textContent = field.message;
        error.style.display = "block";
        isValid = false;
      } else if (field.id === "email" && !/\S+@\S+\.\S+/.test(input.value)) {
        error.textContent = "Invalid email format";
        error.style.display = "block";
        isValid = false;
      }
    });

    if (isValid) {
      status.textContent = "Form submitted successfully!";
      status.style.color = "green";
      form.reset();
    } else {
      status.textContent = "Please fix the errors above.";
      status.style.color = "red";
    }
  });

  // Newsletter Form Handler
  const newsletterForm = document.querySelector("#newsletter form");
  const newsletterStatus = document.getElementById("newsletter-status");

  newsletterForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const emailInput = newsletterForm.querySelector("input[type='email']");
    const email = emailInput.value.trim();

    if (!/\S+@\S+\.\S+/.test(email)) {
      newsletterStatus.textContent = "Please enter a valid email address.";
      newsletterStatus.style.color = "red";
      return;
    }

    newsletterStatus.textContent = "Subscribed successfully!";
    newsletterStatus.style.color = "green";
    newsletterForm.reset();
  });

  // Focus on Name Field
  document.getElementById("name")?.focus();

  // Display Current Time
  const clock = document.getElementById("live-clock");
  if (clock) {
    setInterval(() => {
      const now = new Date();
      clock.textContent = now.toLocaleTimeString();
    }, 1000);
  }

  // Greeting Based on Time
  const greeting = document.getElementById("greeting");
  if (greeting) {
    const hour = new Date().getHours();
    greeting.textContent =
      hour < 12 ? "Good Morning ☀️" : hour < 18 ? "Good Afternoon 🌤️" : "Good Evening 🌙";
  }
});
