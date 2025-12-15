// 1. Initialize AOS
AOS.init({
  duration: 800,
  once: true,
  disable: "mobile",
});

// Function to initialize Swiper
function initializeSwiper() {
  const swiper = new Swiper(".swiper", {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 30,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
}

// 2. Mobile Menu Toggle
document
  .getElementById("mobile-menu-button")
  .addEventListener("click", function () {
    const menu = document.getElementById("mobile-menu");
    const isExpanded = this.getAttribute("aria-expanded") === "true" || false;
    menu.classList.toggle("hidden");
    this.setAttribute("aria-expanded", !isExpanded);

    // Toggle icon
    const icon = this.querySelector("i");
    icon.classList.toggle("fa-bars");
    icon.classList.toggle("fa-times");
  });

// 3. Custom Alert/Message Box
function alertMessage(msg, type) {
  const container = document.createElement("div");
  container.className = `fixed bottom-5 right-5 p-4 rounded-xl shadow-2xl z-[1000] text-slate-900 transition-all duration-500 transform translate-y-full opacity-0 ${
    type === "success" ? "bg-amber-500" : "bg-red-500"
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

// Initialize Swiper on page load
document.addEventListener("DOMContentLoaded", initializeSwiper);
