/**
 * BLOQUE 02 - JAVASCRIPT
 * CV Interactivo - Verónica Alvarado
 */

// 1. DATOS: Arreglo de objetos con tus proyectos
const projects = [
    {
        title: "Reto 01: CV Personal",
        tech: ["HTML5", "CSS3"],
        year: 2026,
        desc: "Estructura semántica y diseño profesional."
    },
    {
        title: "Reto 02: Interactividad JS",
        tech: ["JavaScript", "DOM"],
        year: 2026,
        desc: "Manipulación de elementos y eventos en tiempo real."
    }
];

// 2. FUNCIÓN: Renderizar (dibujar) proyectos en el HTML
function renderProjects(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = ""; // Limpiamos el contenedor

    projects.forEach(project => {
        const article = document.createElement("article");
        article.className = "item"; // Usamos la clase que ya tienes en tu CSS
        article.innerHTML = `
            <h3>${project.title}</h3>
            <p><strong>Tecnologías:</strong> ${project.tech.join(", ")} | <strong>Año:</strong> ${project.year}</p>
            <p>${project.desc}</p>
        `;
        container.appendChild(article);
    });
}

// 3. FUNCIÓN: Modo Oscuro / Claro
function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute("data-theme");
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    
    body.setAttribute("data-theme", nextTheme);
    localStorage.setItem("theme", nextTheme); // Guarda tu preferencia
}

// 4. FUNCIÓN: Validación de Formulario
function setupForm() {
    const form = document.getElementById("contact-form");
    const status = document.querySelector(".form-status");

    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault(); // Evita que la página se recargue
        
        const name = form.querySelector("[name='name']").value;
        const message = form.querySelector("[name='message']").value;

        if (name.length < 2 || message.length < 10) {
            status.textContent = "❌ Por favor, revisa los datos (nombre o mensaje muy corto).";
            status.style.color = "red";
        } else {
            status.textContent = "✅ ¡Gracias! Mensaje validado correctamente.";
            status.style.color = "green";
            form.reset(); // Limpia el formulario
        }
    });
}

// 5. INICIALIZACIÓN: Ejecutar todo cuando el HTML esté listo
document.addEventListener("DOMContentLoaded", () => {
    console.log("Script cargado correctamente 🚀");
    
    // Dibujamos los proyectos en el div con id="projects"
    renderProjects("projects");
    
    // Activamos el formulario
    setupForm();
    
    // Activamos el botón de tema
    const btnTheme = document.getElementById("toggle-theme");
    if (btnTheme) btnTheme.addEventListener("click", toggleTheme);

    // Ver tus datos en una tabla linda en la consola (F12)
    console.table(projects);
});