// ===============================
// 1. PROJEKT FILTER
// ===============================

const filter = document.getElementById("categoryFilter");

if (filter) {
  filter.addEventListener("change", () => {
    const selected = filter.value;
    const projects = document.querySelectorAll(".project");

    projects.forEach(project => {
      if (selected === "all" || project.classList.contains(selected)) {
        project.classList.remove("hidden");
      } else {
        project.classList.add("hidden");
      }
    });
  });
}

// ===============================
// 2. NEWSLETTER VALIDIERUNG
// ===============================

const newsletterForm = document.querySelector(".newsletter-form");

if (newsletterForm) {
  newsletterForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = this.querySelector("input").value;

    if (email.includes("@") && email.includes(".")) {
      alert("Danke für deine Anmeldung zum Newsletter!");
      this.reset();
    } else {
      alert("Bitte gib eine gültige E-Mail-Adresse ein.");
    }
  });
}

// ===============================
// 3. KONTAKTFORMULAR VALIDIERUNG
// ===============================

const contactForm =
  document.getElementById("contactForm") ||
  document.querySelector("form:not(.newsletter-form)");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const inputs = this.querySelectorAll("input, textarea, select");
    let valid = true;

    inputs.forEach(input => {
      if (input.value.trim() === "") {
        valid = false;
      }
    });

    if (valid) {
      alert("Nachricht erfolgreich gesendet!");
      this.reset();
    } else {
      alert("Bitte alle Felder ausfüllen.");
    }
  });
}

// ===============================
// 4. SMOOTH SCROLL NAVIGATION
// ===============================

const navLinks = document.querySelectorAll("nav a");

navLinks.forEach(link => {
  link.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (!href) return;

    const hashIndex = href.indexOf("#");

    // If link is an intra-page anchor, smooth-scroll and update URL via history
    if (hashIndex !== -1) {
      const targetId = href.substring(hashIndex);
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // update URL without jumping
        history.pushState(null, '', targetId);
        setActiveNav();
      }
    }
    // For external/page links, allow normal navigation — active state will be set on DOMContentLoaded of target page
  });
});

// ===============================
// 5. ACTIVE NAV (FIXED + STABLE)
// ===============================

function setActiveNav() {
  const links = document.querySelectorAll("nav a");
  const currentPage = window.location.pathname.split("/").pop();

  links.forEach(link => link.classList.remove("active"));

  // match link href to current page (if present)
  links.forEach(link => {
    const href = link.getAttribute("href");
    if (!href) return;
    if (href === currentPage || href === `./${currentPage}`) {
      link.classList.add("active");
    }
  });
}

document.addEventListener("DOMContentLoaded", setActiveNav);

// Keep active nav in sync with history navigation (back/forward)
window.addEventListener('popstate', setActiveNav);
window.addEventListener('hashchange', setActiveNav);

// ===============================
// 6. TABS SYSTEM (FIXED)
// ===============================

function openTab(tabId, event) {
  const contents = document.querySelectorAll(".tab-content");
  const buttons = document.querySelectorAll(".tab-btn");

  contents.forEach(c => c.classList.remove("active"));
  buttons.forEach(b => b.classList.remove("active"));

  const activeContent = document.getElementById(tabId);
  if (activeContent) activeContent.classList.add("active");

  if (event && event.currentTarget) {
    event.currentTarget.classList.add("active");
  }
}

// Event delegation for tab buttons (single place to toggle active)
document.addEventListener("click", function (e) {
  const btn = e.target.closest && e.target.closest('.tab-btn');
  if (!btn) return;
  const tabId = btn.getAttribute('data-tab') || btn.getAttribute('data-target') || btn.dataset.target;
  if (tabId) {
    openTab(tabId, e);
  }
});

// ===============================
// 7. CHART (SAFE)
// ===============================

const ctx = document.getElementById("matchChart");

if (ctx && typeof Chart !== "undefined") {
  new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Serie 1", "Serie 2", "Serie 3", "Serie 4", "Serie 5"],
      datasets: [
        {
          label: "Trefferleistung",
          data: [92, 88, 85, 83, 80],
          borderColor: "#3b82f6",
          tension: 0.4
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          labels: { color: "#e2e8f0" }
        }
      },
      scales: {
        x: {
          ticks: { color: "#e2e8f0" }
        },
        y: {
          ticks: { color: "#e2e8f0" }
        }
      }
    }
  });
}