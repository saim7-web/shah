// script.js

document.addEventListener("DOMContentLoaded", function () {
  // Typed.js for the hero section text
  new Typed("#typed-text", {
    strings: ["AI & Robotics Engineer", "Python Developer", "Automation Expert"],
    typeSpeed: 60,
    backSpeed: 40,
    loop: true,
    showCursor: true,
    cursorChar: '|',
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // Like Button Functionality
  // Initialize like count from localStorage or default to 600
  let likeCount = parseInt(localStorage.getItem("likeCount")) || 600;
  // Check if the user has already liked
  let liked = localStorage.getItem("liked") === "true";

  const likeBtn = document.getElementById("likeBtn");
  const likeCountEl = document.getElementById("likeCount");

  // Update displayed like count
  likeCountEl.innerText = `${likeCount} Likes`;

  // Disable button and change text if already liked
  if (liked) {
    likeBtn.disabled = true;
    likeBtn.innerHTML = 'Liked <i class="fas fa-heart"></i>'; // Use innerHTML to retain icon
  }

  // Add click event listener to the like button
  likeBtn.addEventListener("click", function () {
    if (!liked) { // Only increment if not already liked
      likeCount++;
      localStorage.setItem("likeCount", likeCount); // Store updated count
      localStorage.setItem("liked", "true"); // Mark as liked

      likeCountEl.innerText = `${likeCount} Likes`; // Update displayed count
      likeBtn.disabled = true; // Disable button
      likeBtn.innerHTML = 'Liked <i class="fas fa-heart"></i>'; // Change button text

      // Optional: Add a subtle animation to the count
      likeCountEl.classList.add('animate');
      setTimeout(() => {
        likeCountEl.classList.remove('animate');
      }, 300); // Remove animation class after a short delay
    }
  });

  // Chatbot Functionality
  const chatbot = document.getElementById("chatbot");
  const chatbotHeader = document.querySelector(".chatbot-header");
  const chatInput = document.getElementById("chatInput");
  const chatbox = document.getElementById("chatbox");
  const chatbotToggleIcon = document.getElementById("chatbotToggleIcon");

  // Initial state: collapsed
  chatbot.classList.add("collapsed");

  // Toggle chatbot size on header click
  chatbotHeader.addEventListener("click", function() {
    if (chatbot.classList.contains("collapsed")) {
      chatbot.classList.remove("collapsed");
      chatbot.classList.add("expanded");
      chatbotToggleIcon.classList.remove("fa-chevron-down");
      chatbotToggleIcon.classList.add("fa-chevron-up");
      chatInput.focus(); // Focus input when expanded
    } else {
      chatbot.classList.remove("expanded");
      chatbot.classList.add("collapsed");
      chatbotToggleIcon.classList.remove("fa-chevron-up");
      chatbotToggleIcon.classList.add("fa-chevron-down");
    }
  });

  // Expand on input focus (if not already expanded)
  chatInput.addEventListener("focus", function() {
    if (chatbot.classList.contains("collapsed")) {
      chatbot.classList.remove("collapsed");
      chatbot.classList.add("expanded");
      chatbotToggleIcon.classList.remove("fa-chevron-down");
      chatbotToggleIcon.classList.add("fa-chevron-up");
    }
  });

  // Example: Collapse when clicking outside the chatbot (optional, more complex to implement robustly)
  // document.addEventListener("click", function(event) {
  //   if (!chatbot.contains(event.target) && chatbot.classList.contains("expanded")) {
  //     // Add a condition here if you want it to collapse only if no input is being typed
  //     // e.g., if chatInput.value === ''
  //     // chatbot.classList.remove("expanded");
  //     // chatbot.classList.add("collapsed");
  //     // chatbotToggleIcon.classList.remove("fa-chevron-up");
  //     // chatbotToggleIcon.classList.add("fa-chevron-down");
  //   }
  // });


  // Function to send chat messages
  window.sendChat = function() {
    const userText = chatInput.value.trim();
    if (userText) {
      // Add user message to chatbox
      chatbox.innerHTML += `<p class="user-message">You: ${userText}</p>`;
      
      // Simulate bot response (you can expand this with more complex logic)
      let botResponse = "I'm not sure how to respond to that, but Syed Saim Shah is an expert in AI & Robotics! How can I help you learn more about him?";
      
      const lowerUserText = userText.toLowerCase();

      if (lowerUserText.includes("skill") || lowerUserText.includes("expertise")) {
        botResponse = "Syed Saim Shah specializes in Python, C++, AI/ML, Robotics (ROS, Arduino), Computer Vision, and Web Development (Flask).";
      } else if (lowerUserText.includes("project") || lowerUserText.includes("work")) {
        botResponse = "He has worked on exciting projects like a Robotic Hand, a Mars Rover, an Automated Conveyor Belt, an Autonomous Car, and a Hexapod Spider Robot.";
      } else if (lowerUserText.includes("contact") || lowerUserText.includes("reach out")) {
        botResponse = "You can contact Syed Saim Shah via email at syedsaim1218@gmail.com or on WhatsApp at +92 347 7741401.";
      } else if (lowerUserText.includes("hello") || lowerUserText.includes("hi")) {
        botResponse = "Hello there! How can I assist you with Syed Saim Shah's portfolio?";
      } else if (lowerUserText.includes("ai") || lowerUserText.includes("artificial intelligence")) {
        botResponse = "Syed Saim Shah is an AI & Robotics Engineer. He has expertise in AI/ML algorithms, Deep Learning, Computer Vision, and NLP.";
      } else if (lowerUserText.includes("robotics") || lowerUserText.includes("robot")) {
        botResponse = "Robotics is one of Syed Saim Shah's core specializations, including ROS, Arduino, servo control, and building complex robotic platforms.";
      }
      
      // Add bot message after a small delay
      setTimeout(() => {
        chatbox.innerHTML += `<p class="bot-message">Bot: ${botResponse}</p>`;
        chatbox.scrollTop = chatbox.scrollHeight; // Scroll to bottom
      }, 500); // 0.5 second delay for bot response

      chatInput.value = ""; // Clear input
      chatbox.scrollTop = chatbox.scrollHeight; // Scroll to bottom
    }
  };

  // Allow sending messages with Enter key
  chatInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent new line in input
      sendChat();
    }
  });


  // Contact Form Validation (Frontend only)
  const contactForm = document.getElementById('contactForm');
  const contactName = document.getElementById('contactName');
  const contactEmail = document.getElementById('contactEmail');
  const contactMessage = document.getElementById('contactMessage');

  contactForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent default form submission

    let isValid = true;

    // Name validation
    if (contactName.value.trim() === '') {
      alert('Please enter your name.');
      contactName.focus();
      isValid = false;
    }

    // Email validation
    if (isValid) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format
      if (contactEmail.value.trim() === '') {
        alert('Please enter your email address.');
        contactEmail.focus();
        isValid = false;
      } else if (!emailPattern.test(contactEmail.value)) {
        alert('Please enter a valid email address (e.g., example@domain.com).');
        contactEmail.focus();
        isValid = false;
      } else if (!contactEmail.value.includes('.com') && !contactEmail.value.includes('.org') && !contactEmail.value.includes('.net') && !contactEmail.value.includes('.co') && !contactEmail.value.includes('.io')) { // Enhanced domain validation
        alert('Please enter a common top-level domain (e.g., .com, .org, .net).');
        contactEmail.focus();
        isValid = false;
      }
    }

    // Message validation
    if (isValid) {
      if (contactMessage.value.trim() === '') {
        alert('Please enter your message.');
        contactMessage.focus();
        isValid = false;
      } else if (contactMessage.value.trim().length < 10) {
        alert('Your message is too short. Please provide more details (minimum 10 characters).');
        contactMessage.focus();
        isValid = false;
      }
    }

    // If all validations pass
    if (isValid) {
      alert('Thank you for your message! This is a frontend-only form. To actually receive messages, you would need a backend service (e.g., Formspree, Netlify Forms, or a custom server).');
      contactForm.reset(); // Clear the form
    }
  });

});