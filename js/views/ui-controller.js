/**
 * Controlador de la interfaz de usuario
 * Maneja la creación y actualización de elementos HTML
 */
export default {
  /**
   * Crea el menú de navegación
   * @param {Object} dataService - Servicio de datos para obtener las secciones
   */
  createNavigation(dataService) {
    const navLinks = document.getElementById("nav-links")
    navLinks.innerHTML = ""

    // Obtener todas las secciones
    const allSections = dataService.getAllSections()

    allSections.forEach((section) => {
      const li = document.createElement("li")
      const a = document.createElement("a")

      a.href = `#${section.id}`
      a.textContent = section.title

      // Si es una sección detallada, añadir atributo
      if (section.hasDetailedPage) {
        a.setAttribute("data-has-details", "true")
      }

      li.appendChild(a)
      navLinks.appendChild(li)
    })
  },

  /**
   * Crea las secciones de contenido
   * @param {Object} dataService - Servicio de datos para obtener las secciones
   */
 createSections(dataService) {
  const sectionsContainer = document.getElementById("sections-container");
  sectionsContainer.innerHTML = "";

  // Obtener todas las secciones
  const allSections = dataService.getAllSections();

  allSections.forEach((section) => {
    const sectionDiv = document.createElement("div");
    sectionDiv.className = "api-section";
    sectionDiv.id = section.id;

    const title = document.createElement("h2");
    title.textContent = section.title;

    const contentDiv = document.createElement("div");
    contentDiv.className = "api-content";

    // Verificar si la sección tiene imagen antes de crear el elemento
    if (section.image) {
      const img = document.createElement("img");
      img.src = section.image;
      img.alt = section.title;
      img.className = "api-image";
      contentDiv.appendChild(img);
    }

    const description = document.createElement("p");
    description.textContent = section.description;
    description.className = "api-description";
    contentDiv.appendChild(description);

    // Si es una sección detallada, añadir botón "Ver detalles"
    if (section.hasDetailedPage) {
      const viewDetailsBtn = document.createElement("button");
      viewDetailsBtn.className = "view-details-btn";
      viewDetailsBtn.textContent = "Ver detalles";
      viewDetailsBtn.setAttribute("data-section-id", section.id);
      contentDiv.appendChild(viewDetailsBtn);
    }

    sectionDiv.appendChild(title);
    sectionDiv.appendChild(contentDiv);

    sectionsContainer.appendChild(sectionDiv);
  });
},

  /**
   * Crea la estructura de la ventana modal
   */
  createModal() {
    // Crear overlay
    const modalOverlay = document.createElement("div")
    modalOverlay.className = "modal-overlay"
    modalOverlay.id = "modal-overlay"

    // Crear contenido
    const modalContent = document.createElement("div")
    modalContent.className = "modal-content"

    // Crear encabezado
    const modalHeader = document.createElement("div")
    modalHeader.className = "modal-header"

    const modalTitle = document.createElement("h2")
    modalTitle.id = "modal-title"

    const closeButton = document.createElement("button")
    closeButton.className = "modal-close"
    closeButton.innerHTML = "&times;"
    closeButton.addEventListener("click", () => {
      this.closeModal()
    })

    // Crear cuerpo
    const modalBody = document.createElement("div")
    modalBody.className = "modal-body"
    modalBody.id = "modal-body"

    // Ensamblar modal
    modalHeader.appendChild(modalTitle)
    modalHeader.appendChild(closeButton)

    modalContent.appendChild(modalHeader)
    modalContent.appendChild(modalBody)

    modalOverlay.appendChild(modalContent)

    // Añadir al DOM
    document.body.appendChild(modalOverlay)

    // Cerrar modal al hacer clic fuera del contenido
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) {
        this.closeModal()
      }
    })
  },

  /**
   * Cierra la ventana modal
   */
  closeModal() {
    const modalOverlay = document.getElementById("modal-overlay")
    modalOverlay.classList.remove("active")
    document.body.style.overflow = ""
  },
}
