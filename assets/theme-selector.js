// Sistema de seletor de tema claro/escuro
(function() {
  'use strict';

  const THEME_KEY = 'pazetto-theme-preference';
  const DARK_THEME = 'dark';
  const LIGHT_THEME = 'light';

  // Elementos
  let themeToggleBtn = null;

  /**
   * Detecta a preferência de tema do sistema
   */
  function getSystemThemePreference() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return DARK_THEME;
    }
    return LIGHT_THEME;
  }

  /**
   * Obtém o tema salvo ou usa a preferência do sistema
   */
  function getSavedTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved) {
      return saved;
    }
    return getSystemThemePreference();
  }

  /**
   * Aplica o tema ao documento
   */
  function applyTheme(theme) {
    const html = document.documentElement;
    
    if (theme === DARK_THEME) {
      html.classList.add('dark-theme');
      localStorage.setItem(THEME_KEY, DARK_THEME);
      updateThemeToggleButton('☀️'); // Mostrar sol (para mudar para claro)
    } else {
      html.classList.remove('dark-theme');
      localStorage.setItem(THEME_KEY, LIGHT_THEME);
      updateThemeToggleButton('🌙'); // Mostrar lua (para mudar para escuro)
    }
  }

  /**
   * Atualiza o ícone do botão de tema
   */
  function updateThemeToggleButton(icon) {
    if (themeToggleBtn) {
      themeToggleBtn.textContent = icon;
      themeToggleBtn.title = icon === '🌙' ? 'Ativar modo escuro' : 'Ativar modo claro';
    }
  }

  /**
   * Alterna entre tema claro e escuro
   */
  function toggleTheme() {
    const currentTheme = getSavedTheme();
    const newTheme = currentTheme === DARK_THEME ? LIGHT_THEME : DARK_THEME;
    applyTheme(newTheme);
  }

  /**
   * Cria o botão de seletor de tema
   */
  function createThemeToggleButton() {
    const btn = document.createElement('button');
    btn.className = 'theme-toggle';
    btn.setAttribute('aria-label', 'Alternar tema claro/escuro');
    btn.setAttribute('title', 'Alternar tema');
    btn.addEventListener('click', toggleTheme);
    
    return btn;
  }

  /**
   * Inicializa o sistema de tema
   */
  function init() {
    // Aplicar tema salvo ou detectado imediatamente
    const savedTheme = getSavedTheme();
    applyTheme(savedTheme);

    // Aguardar o DOM estar pronto se necessário
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initializeButton);
    } else {
      initializeButton();
    }

    // Observar mudanças de preferência do sistema
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        const newTheme = e.matches ? DARK_THEME : LIGHT_THEME;
        // Só aplicar se o usuário não tiver salvo uma preferência
        if (!localStorage.getItem(THEME_KEY)) {
          applyTheme(newTheme);
        }
      });
    }
  }

  /**
   * Inicializa o botão após o DOM estar pronto
   */
  function initializeButton() {
    // Procurar pelo container onde adicionar o botão
    let container = document.querySelector('.theme-toggle-container');
    
    if (!container) {
      // Se não houver container, criar na body
      container = document.body;
    }

    themeToggleBtn = createThemeToggleButton();
    container.appendChild(themeToggleBtn);

    // Atualizar ícone com o tema atual
    const currentTheme = getSavedTheme();
    updateThemeToggleButton(currentTheme === DARK_THEME ? '☀️' : '🌙');
  }

  // Iniciar quando o script carregar
  init();
})();
