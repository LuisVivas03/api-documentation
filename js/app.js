/**
 * Aplicación principal
 * Coordina los diferentes módulos y maneja la lógica central
 */

// Importar servicios y controladores
import dataService from "./data/index.js"
import modalController from "./controllers/modal-controller.js"
import uiController from "./views/ui-controller.js"

/**
 * Clase principal de la aplicación
 */
class App {
  /**
   * Constructor de la aplicación
   */
  constructor() {
    this.dataService = dataService
    this.modalController = modalController
    this.uiController = uiController
  }

  /**
   * Inicializa la aplicación
   */
  init() {
    // Crear componentes de la UI
    this.uiController.createNavigation(this.dataService)
    this.uiController.createSections(this.dataService)
    this.uiController.createModal()

    // Configurar eventos
    this.setupEventListeners()
  }

  /**
   * Configura los escuchadores de eventos
   */
  setupEventListeners() {
    // Navegación suave para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", this.handleSmoothScroll.bind(this))
    })

    // Botones "Ver detalles"
    document.querySelectorAll(".view-details-btn").forEach((button) => {
      button.addEventListener("click", this.handleViewDetails.bind(this))
    })

    // Cerrar modal con tecla Escape
    document.addEventListener("keydown", this.handleKeyPress.bind(this))
  }

  /**
   * Maneja el scroll suave al hacer clic en enlaces internos
   * @param {Event} e - Evento de clic
   */
  handleSmoothScroll(e) {
    e.preventDefault()

    const targetId = e.currentTarget.getAttribute("href").substring(1)
    const targetElement = document.getElementById(targetId)

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 20,
        behavior: "smooth",
      })

      // Si el enlace tiene atributo data-has-details, abrir modal después del scroll
      if (e.currentTarget.hasAttribute("data-has-details")) {
        setTimeout(() => {
          this.modalController.open(targetId, this.dataService)
        }, 500)
      }
    }
  }

  /**
   * Maneja el clic en botones "Ver detalles"
   * @param {Event} e - Evento de clic
   */
  handleViewDetails(e) {
    const sectionId = e.currentTarget.getAttribute("data-section-id")
    this.modalController.open(sectionId, this.dataService)
  }

  /**
   * Maneja eventos de teclado
   * @param {KeyboardEvent} e - Evento de teclado
   */
  handleKeyPress(e) {
    if (e.key === "Escape") {
      this.modalController.close()
    }
  }
}

// Inicializar la aplicación cuando el DOM está completamente cargado
document.addEventListener("DOMContentLoaded", () => {
  const app = new App()
  app.init()
})
