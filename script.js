/* ==============================
PAGE NAVIGATION
============================== */

function showPage(pageId) {
  const pages = document.querySelectorAll(".page");
  const targetPage = document.getElementById(pageId);

  if (!targetPage) {
    return;
  }

  pages.forEach((page) => page.classList.remove("active"));
  targetPage.classList.add("active");

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.toggle("active", link.dataset.page === pageId);
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ==============================
CONTACT BOX TOGGLE
============================== */

function toggleContact() {
  const box = document.getElementById("contactBox");

  if (!box) {
    return;
  }

  box.style.display = box.style.display === "block" ? "none" : "block";
}

/* ==============================
IMAGE MODAL VIEWER
============================== */

const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImg");
const caption = document.getElementById("modalCaption");
const closeBtn = document.getElementById("closeModal");

function closeImageModal() {
  if (!modal) {
    return;
  }

  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
}

if (modal && modalImg && caption) {
  document
    .querySelectorAll(".photo-card img, .pcb-gallery img, .hardware-card img, .test-card img")
    .forEach((img) => {
      img.addEventListener("click", function () {
        modal.style.display = "block";
        modal.setAttribute("aria-hidden", "false");
        modalImg.src = this.src;
        modalImg.alt = this.alt || "Expanded image preview";

        const captionEl = this.nextElementSibling;
        caption.innerText = captionEl ? captionEl.innerText : "";
      });
    });

  modal.addEventListener("click", (event) => {
    if (event.target === modal || event.target === closeBtn) {
      closeImageModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.style.display === "block") {
      closeImageModal();
    }
  });
}

if (closeBtn) {
  closeBtn.addEventListener("click", closeImageModal);
}

/* Add fallback alt text to improve accessibility. */
document.querySelectorAll("img").forEach((img) => {
  if (!img.alt || img.alt.trim() === "") {
    const captionEl = img.nextElementSibling;
    img.alt = captionEl ? captionEl.innerText.trim() : "Portfolio image";
  }
});

/* ==============================
DOCUMENT VIEWER SYSTEM
============================== */

let previousPage = "";

function openDoc(filePath) {
  const activePage = document.querySelector(".page.active");

  if (activePage) {
    previousPage = activePage.id;
  }

  const frame = document.getElementById("pdfFrame");

  if (frame) {
    frame.src = encodeURI(filePath);
  }

  showPage("docViewer");
}

/* ==============================
BACK FROM DOCUMENT VIEWER
============================== */

function goBackFromDoc() {
  if (previousPage) {
    showPage(previousPage);
  } else {
    showPage("docs");
  }
}

/* ==============================
SCROLL REVEAL ANIMATIONS
============================== */

const revealTargets = document.querySelectorAll(
  ".hero-text, .profile, .about-image, .about-text, .section-title, .timeline-item, .card, .photo-card, .pcb-card, .doc-card, .skill-card, .overview-card, .highlight-card, .industrial-card, .industrial-section, .test-card, .review-card, .project-card-large"
);

revealTargets.forEach((el, index) => {
  el.classList.add("reveal");
  el.style.setProperty("--reveal-order", String(index % 8));
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealTargets.forEach((el) => observer.observe(el));
} else {
  revealTargets.forEach((el) => el.classList.add("show"));
}
