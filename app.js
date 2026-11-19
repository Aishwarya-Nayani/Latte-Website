const menuCards = [...document.querySelectorAll(".menu-card")];
const filterButtons = [...document.querySelectorAll(".filter-button")];
const searchInput = document.querySelector("#menu-search");
const menuCount = document.querySelector(".menu-count");
const noResults = document.querySelector(".no-results");

let activeFilter = "all";

function updateMenu() {
    const query = searchInput.value.trim().toLocaleLowerCase();
    let visibleCount = 0;

    menuCards.forEach((card) => {
        const matchesFilter = activeFilter === "all" || card.dataset.category === activeFilter;
        const matchesSearch = card.textContent.toLocaleLowerCase().includes(query);
        const isVisible = matchesFilter && matchesSearch;

        card.hidden = !isVisible;
        if (isVisible) visibleCount += 1;
    });

    menuCount.textContent = `${visibleCount} ${visibleCount === 1 ? "drink" : "drinks"}`;
    noResults.hidden = visibleCount !== 0;
}

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        activeFilter = button.dataset.filter;
        filterButtons.forEach((filterButton) => {
            const isActive = filterButton === button;
            filterButton.classList.toggle("is-active", isActive);
            filterButton.setAttribute("aria-pressed", String(isActive));
        });
        updateMenu();
    });
});

searchInput.addEventListener("input", updateMenu);
updateMenu();

const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

function closeNavigation() {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    siteNav.classList.remove("is-open");
}

menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") !== "true";
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    siteNav.classList.toggle("is-open", isOpen);
});

siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeNavigation);
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeNavigation();
});

document.querySelector("#current-year").textContent = String(new Date().getFullYear());

const revealSections = document.querySelectorAll("main > .section-pad");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if ("IntersectionObserver" in window && !reduceMotion) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealSections.forEach((section) => {
        section.classList.add("section-reveal");
        revealObserver.observe(section);
    });
}

const contactForm = document.querySelector(".contact-form");
const formStatus = document.querySelector(".form-status");

contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.querySelector("#name").value.trim();
    formStatus.textContent = `Thanks, ${name}! This demo form isn't connected to an inbox yet.`;
    contactForm.reset();
});
