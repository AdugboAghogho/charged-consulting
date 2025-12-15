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
