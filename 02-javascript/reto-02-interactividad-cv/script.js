// 1. Datos que se inyectarán en tu CV
const projects = [
    { title: "Landing Personal", tech: ["HTML", "CSS"], year: 2024, url: "#" },
    { title: "CV Interactivo", tech: ["JavaScript", "DOM"], year: 2025, url: "#" }
];

// 2. Renderizado de proyectos (ahora admite enlaces y atributo data)
function renderProjects(containerId, items = projects) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = "";
    items.forEach((item) => {
        const card = document.createElement("article");
        card.className = "project-card";
        card.dataset.url = item.url || "";
        card.innerHTML = `
            <h3 class="project-title">${item.title}</h3>
            <p><strong>Tecnologías:</strong> ${item.tech.join(", ")}</p>
            <p><strong>Año:</strong> ${item.year}</p>
        `;
        container.appendChild(card);
    });
}

// 3. Toggle tema y persistencia
function toggleTheme() {
    const body = document.body;
    const nextTheme = body.dataset.theme === "dark" ? "light" : "dark";
    body.dataset.theme = nextTheme;
    localStorage.setItem("preferred-theme", nextTheme);
}

// 4. Inicializar tema guardado o preferencia del sistema
function initTheme() {
    const saved = localStorage.getItem("preferred-theme");
    if (saved) {
        document.body.dataset.theme = saved;
        return;
    }
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.body.dataset.theme = prefersDark ? "dark" : "light";
}

// 5. Utilidades de filtrado/búsqueda (si existen elementos en el DOM)
function getUniqueTechs(items = projects) {
    const set = new Set();
    items.forEach(p => p.tech.forEach(t => set.add(t)));
    return Array.from(set).sort();
}

function filterProjects(query = "", tech = "") {
    const q = query.trim().toLowerCase();
    return projects.filter(p => {
        const matchesQuery = !q || p.title.toLowerCase().includes(q) || p.tech.join(" ").toLowerCase().includes(q);
        const matchesTech = !tech || p.tech.includes(tech);
        return matchesQuery && matchesTech;
    });
}

function initFilters(containerId) {
    const search = document.getElementById("search-projects");
    const select = document.getElementById("filter-tech");

    if (select) {
        select.innerHTML = `<option value="">Todas</option>` + getUniqueTechs().map(t => `<option value="${t}">${t}</option>`).join("");
        select.addEventListener("change", () => {
            renderProjects(containerId, filterProjects(search ? search.value : "", select.value));
        });
    }

    if (search) {
        search.addEventListener("input", () => {
            renderProjects(containerId, filterProjects(search.value, select ? select.value : ""));
        });
    }
}

// 6. Handler para abrir proyecto al hacer click en la tarjeta
function initProjectClicks(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.addEventListener("click", (e) => {
        const card = e.target.closest(".project-card");
        if (!card) return;
        const url = card.dataset.url;
        if (url) window.open(url, "_blank", "noopener");
    });
}

// 7. Inicialización al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    const containerId = "projects-container";
    initTheme();
    renderProjects(containerId);
    initFilters(containerId);
    initProjectClicks(containerId);

    const themeButton = document.getElementById("toggle-theme");
    if (themeButton) themeButton.addEventListener("click", toggleTheme);
});