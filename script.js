document.addEventListener('DOMContentLoaded', () => {
  // Smooth Animations on Scroll
  const animatedElements = document.querySelectorAll('.fade-in, .slide-in');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // Improve performance by unobserving
        }
      });
    },
    { threshold: 0.2 }
  );

  animatedElements.forEach((el) => observer.observe(el));

  // Contact Form Submission (WhatsApp + Email)
  const contactForm = document.getElementById('contact-form');
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;
    let documentInput = document.getElementById("document").files[0];

    let fileUrl = documentInput ? await uploadFile(documentInput) : null;

    // Construct WhatsApp message
    let whatsappMessage = `Hello,\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`;
    if (fileUrl) whatsappMessage += `\nDocument: ${fileUrl}`;

    // Send message via WhatsApp
    let phoneNumber = "+254742396488"; // Replace with actual WhatsApp number
    let encodedMessage = encodeURIComponent(whatsappMessage);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");

    // Send message via Email (EmailJS)
    emailjs.sendForm('YOUR_EMAILJS_SERVICE_ID', 'YOUR_EMAILJS_TEMPLATE_ID', e.target)
      .then(() => showToast('✔ Thank you! We will contact you soon.', 'success'))
      .catch((error) => {
        showToast('❌ Oops! Something went wrong.', 'error');
        console.error(error);
      });

    contactForm.reset();
  });

  // File Upload Function (Replace with backend URL)
  async function uploadFile(file) {
    let formData = new FormData();
    formData.append("file", file);

    try {
      let response = await fetch("upload.php", { // Replace with actual backend endpoint
        method: "POST",
        body: formData
      });

      let result = await response.json();
      return result.fileUrl; // Expected response: { fileUrl: "https://yourserver.com/path/to/file.pdf" }
    } catch (error) {
      console.error("Error uploading file:", error);
      showToast('❌ File upload failed.', 'error');
      return null;
    }
  }

  // Highlight Active Navigation Link on Scroll
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('nav ul li a');

  const highlightNav = () => {
    let scrollPos = window.scrollY;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href').includes(section.id)) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', debounce(highlightNav, 100));

  // Smooth Review Carousel Scroll
  const reviewCarousel = document.querySelector('.review-carousel');
  let reviewInterval = setInterval(scrollReviews, 5000);

  function scrollReviews() {
    reviewCarousel.scrollBy({ left: 300, behavior: 'smooth' });
  }

  document.querySelector('.next-review').addEventListener('click', () => {
    clearInterval(reviewInterval);
    scrollReviews();
  });

  document.querySelector('.prev-review').addEventListener('click', () => {
    clearInterval(reviewInterval);
    reviewCarousel.scrollBy({ left: -300, behavior: 'smooth' });
  });

  // Parallax Effect on Hero Section
  document.addEventListener('mousemove', (e) => {
    const hero = document.querySelector('.hero');
    if (hero) {
      let moveX = (e.clientX / window.innerWidth - 0.5) * 20;
      let moveY = (e.clientY / window.innerHeight - 0.5) * 20;
      hero.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
  });

  // Utility Functions
  function showToast(message, type) {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('fade-out');
      setTimeout(() => toast.remove(), 500);
    }, 3000);
  }

  function debounce(func, delay) {
    let timer;
    return function () {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, arguments), delay);
    };
  }
});

    const scrollContainer = document.getElementById('scrollContainer');
    const scrollLeftButton = document.getElementById('scrollLeft');
    const scrollRightButton = document.getElementById('scrollRight');

    scrollLeftButton.addEventListener('click', () => {
        scrollContainer.scrollBy({ left: -300, behavior: 'smooth' });
    });

    scrollRightButton.addEventListener('click', () => {
        scrollContainer.scrollBy({ left: 300, behavior: 'smooth' });
    });

    // Auto scroll every 3 seconds
    setInterval(() => {
        scrollContainer.scrollBy({ left: 300, behavior: 'smooth' });
    }, 3000);
