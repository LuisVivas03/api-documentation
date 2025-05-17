/**
 * Controlador para la ventana modal
 * Maneja la apertura, cierre y contenido de la ventana modal
 */
export default {
  /**
   * Abre la ventana modal con el contenido de una sección
   * @param {string} sectionId - ID de la sección a mostrar
   * @param {Object} dataService - Servicio de datos para obtener la información de la sección
   */
  open(sectionId, dataService) {
    const section = dataService.getSectionById(sectionId)
    if (!section || !section.hasDetailedPage) return

    const modalTitle = document.getElementById("modal-title")
    const modalBody = document.getElementById("modal-body")
    const modalOverlay = document.getElementById("modal-overlay")

    // Establecer título
    modalTitle.textContent = section.title

    // Crear contenido
    modalBody.innerHTML = ""

    // Crear pestañas
    const tabsContainer = this.createTabs()
    modalBody.appendChild(tabsContainer)

    // Crear contenido de pestañas
    const tabContents = this.createTabContents(section)
    modalBody.appendChild(tabContents)

    // Mostrar modal
    modalOverlay.classList.add("active")
    document.body.style.overflow = "hidden"
  },

  /**
   * Cierra la ventana modal
   */
  close() {
    const modalOverlay = document.getElementById("modal-overlay")
    modalOverlay.classList.remove("active")
    document.body.style.overflow = ""
  },

  /**
   * Crea las pestañas para la ventana modal
   * @returns {HTMLElement} - Contenedor de pestañas
   */
  createTabs() {
    const tabsContainer = document.createElement("div")
    tabsContainer.className = "modal-tabs"

    const tabs = ["Descripción general", "Código", "Uso", "Ejemplos"]

    tabs.forEach((tab, index) => {
      const tabElement = document.createElement("div")
      tabElement.className = "modal-tab"
      if (index === 0) tabElement.classList.add("active")

      tabElement.textContent = tab
      tabElement.setAttribute("data-tab", index)

      tabElement.addEventListener("click", function () {
        // Desactivar todas las pestañas y contenidos
        document.querySelectorAll(".modal-tab").forEach((t) => t.classList.remove("active"))
        document.querySelectorAll(".tab-content").forEach((c) => c.classList.remove("active"))

        // Activar esta pestaña y su contenido
        this.classList.add("active")
        document.querySelector(`.tab-content[data-tab="${index}"]`).classList.add("active")
      })

      tabsContainer.appendChild(tabElement)
    })

    return tabsContainer
  },

  /**
   * Crea el contenido de las pestañas para la ventana modal
   * @param {Object} section - Objeto de sección con detalles
   * @returns {HTMLElement} - Contenedor de contenido de pestañas
   */
  createTabContents(section) {
    const tabContents = document.createElement("div")

    // Pestaña 1: Descripción general
    const overviewTab = document.createElement("div")
    overviewTab.className = "tab-content active"
    overviewTab.setAttribute("data-tab", "0")
    overviewTab.innerHTML = `<p>${section.details.overview}</p>`

    // Pestaña 2: Código
    const codeTab = document.createElement("div")
    codeTab.className = "tab-content"
    codeTab.setAttribute("data-tab", "1")
    codeTab.innerHTML = `<pre><code>${section.details.code}</code></pre>`

    // Pestaña 3: Uso
    const usageTab = document.createElement("div")
    usageTab.className = "tab-content"
    usageTab.setAttribute("data-tab", "2")
    usageTab.innerHTML = `<p>${section.details.usage}</p>`

    // Pestaña 4: Ejemplos
    const examplesTab = document.createElement("div")
    examplesTab.className = "tab-content"
    examplesTab.setAttribute("data-tab", "3")

    let examplesHTML = ""
    section.details.examples.forEach((example) => {
      examplesHTML += `<h3>${example.title}</h3>`
      examplesHTML += `<pre><code>${example.code}</code></pre>`
    })

    examplesTab.innerHTML = examplesHTML

    // Añadir todas las pestañas al contenedor
    tabContents.appendChild(overviewTab)
    tabContents.appendChild(codeTab)
    tabContents.appendChild(usageTab)
    tabContents.appendChild(examplesTab)

    return tabContents
  },
}
