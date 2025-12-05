// 1. Initialize AOS
// This must be done on document load for each page
document.addEventListener("DOMContentLoaded", () => {
  AOS.init({
    duration: 800,
    once: true,
    disable: "mobile",
  });

  // 3. Mobile Menu Toggle - Added to all pages
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", function () {
      mobileMenu.classList.toggle("hidden");
    });
  }

  // 4. Form Submission Mock - Only on booking.html
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      alertMessage(
        "Thank you for your submission! We will be in touch shortly.",
        "success"
      );
    });
  }

  // 5. Custom Alert/Message Box (Replacing `alert()`) - Utility function
  // This is defined globally for use across the site, primarily by forms.
  function alertMessage(msg, type) {
    const container = document.createElement("div");
    container.className = `fixed bottom-5 right-5 p-4 rounded-xl shadow-2xl z-[1000] text-white transition-all duration-500 transform translate-y-full opacity-0 ${
      type === "success" ? "bg-green-600" : "bg-red-600"
    }`;
    container.textContent = msg;
    document.body.appendChild(container);

    // Animate in
    setTimeout(() => {
      container.classList.remove("translate-y-full", "opacity-0");
      container.classList.add("translate-y-0", "opacity-100");
    }, 50);

    // Animate out and remove
    setTimeout(() => {
      container.classList.remove("translate-y-0", "opacity-100");
      container.classList.add("translate-y-full", "opacity-0");
      container.addEventListener("transitionend", () => container.remove());
    }, 4000);
  }

  // Attach the alertMessage function to the window object so it can be called if needed elsewhere
  window.alertMessage = alertMessage;
});

// 1. Initialize AOS
AOS.init({
  duration: 800,
  once: true,
  disable: "mobile",
});

// 2. Initialize Swiper for Hero Section
document.addEventListener("DOMContentLoaded", () => {
  const swiper = new Swiper(".swiper", {
    loop: true,
    autoplay: {
      delay: 5000, // Change slide every 5 seconds
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    speed: 1000,
  });

  // Start number animation after content loads
  initNumberAnimation();
});

// 3. Animated Number Counter Logic
function animateValue(obj, start, end, duration, suffix = "") {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);

    // Determine value
    let value = start + Math.floor(progress * (end - start));

    // Custom formatting logic
    let formattedValue;
    if (suffix === "M+") {
      formattedValue = "$" + value + "M+";
    } else if (suffix === "m") {
      formattedValue = value + "m";
    } else if (suffix === "%") {
      formattedValue = value + "%";
    } else if (suffix === "+") {
      formattedValue = value + "+";
    } else if (suffix === "x") {
      formattedValue = value + "x";
    } else {
      formattedValue = value + suffix;
    }

    obj.textContent = formattedValue;

    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

function initNumberAnimation() {
  const counters = document.querySelectorAll(".count-up");

  // Intersection Observer to trigger animation when visible
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target;
          // Avoid animating the same element twice
          if (target.dataset.animated) return;

          const finalValue = parseInt(target.getAttribute("data-target"));
          const suffix = target.getAttribute("data-suffix") || "";

          // Start the animation
          animateValue(target, 0, finalValue, 2000, suffix);
          target.dataset.animated = "true"; // Mark as animated

          // Stop observing after animation starts
          observer.unobserve(target);
        }
      });
    },
    {
      threshold: 0.5, // Trigger when 50% of the element is visible
    }
  );

  counters.forEach((counter) => {
    observer.observe(counter);
  });
}

// 4. Custom Alert/Message Box (Replacing `alert()`)
function alertMessage(msg, type) {
  const container = document.createElement("div");
  container.className = `fixed bottom-5 right-5 p-4 rounded-xl shadow-2xl z-[1000] text-white transition-all duration-500 transform translate-y-full opacity-0 ${
    type === "success" ? "bg-green-600" : "bg-red-600"
  }`;
  container.textContent = msg;
  document.body.appendChild(container);

  // Animate in
  setTimeout(() => {
    container.classList.remove("translate-y-full", "opacity-0");
    container.classList.add("translate-y-0", "opacity-100");
  }, 50);

  // Animate out and remove
  setTimeout(() => {
    container.classList.remove("translate-y-0", "opacity-100");
    container.classList.add("translate-y-full", "opacity-0");
    container.addEventListener("transitionend", () => container.remove());
  }, 4000);
}
