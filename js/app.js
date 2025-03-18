AOS.init();

const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

menuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});


function toggleDropdown() {
  const dropdown = document.getElementById("dropdown-perhiasan");
  const arrow = document.getElementById("arrow");
  dropdown.classList.toggle("hidden");
  arrow.classList.toggle("rotate-90");
}

function toggleNestedDropdown() {
  const nestedDropdown = document.getElementById("nested-dropdown");
  const nestedArrow = document.getElementById("nested-arrow");
  nestedDropdown.classList.toggle("hidden");
  nestedArrow.classList.toggle("rotate-90");
}


function animateStats() {
  const counters = document.querySelectorAll('.stat-number');

  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    const duration = 2000; // Durasi animasi dalam ms
    const interval = 10;   // Kecepatan update angka
    const increment = target / (duration / interval);

    let current = 0;

    const updateCounter = () => {
      current += increment;
      if (current < target) {
        counter.innerText = Math.ceil(current);
        setTimeout(updateCounter, interval);
      } else {
        counter.innerText = target;
      }
    };

    updateCounter();
  });
}

// Panggil animasi saat halaman selesai dimuat
window.onload = animateStats;



var animation = lottie.loadAnimation({
  container: document.getElementById("lottie-container"),
  renderer: "svg",
  loop: true,
  autoplay: true,
  path: "img/loading.json"
});

window.addEventListener("load", function () {
  setTimeout(() => {
    document.getElementById("preloader").style.display = "none";
  }, 1000); // Delay agar terlihat smooth
});
