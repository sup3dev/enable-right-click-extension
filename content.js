// Включение правого клика на странице
(function() {
  // Перечисляем события, которые нужно разблокировать
  const events = [
    'contextmenu',   // Правый клик
    'mousedown',     // Нажатие кнопки мыши (для отлова правой кнопки)
    'mouseup',       // Отпускание кнопки мыши
    'selectstart',   // Начало выделения текста
    'copy',          // Копирование
    'cut',           // Вырезание
    'dragstart',     // Начало перетаскивания
    'select'         // Выделение текста
  ];

  // Функция для установки перехватчика и разрешения действия
  function enableAction(event) {
    event.stopPropagation();
    return true;
  }

  // Удаляем все обработчики событий, которые могут блокировать правый клик
  function removeHandlers() {
    events.forEach(function(eventType) {
      // Удаляем все существующие обработчики событий
      document.addEventListener(eventType, enableAction, true);
      
      // Очищаем инлайновые обработчики событий
      const elements = document.querySelectorAll(`[on${eventType}]`);
      elements.forEach(function(element) {
        element.removeAttribute(`on${eventType}`);
      });
    });
  }

  // Убираем атрибуты, которые могут блокировать контекстное меню или выделение текста
  function removeBlockingAttributes() {
    const allElements = document.querySelectorAll('*');
    allElements.forEach(function(element) {
      // Удаляем атрибуты, которые могут блокировать выделение и правый клик
      element.style.setProperty('user-select', 'auto', 'important');
      element.style.setProperty('-webkit-user-select', 'auto', 'important');
      element.style.setProperty('-moz-user-select', 'auto', 'important');
      element.style.setProperty('-ms-user-select', 'auto', 'important');
      element.style.setProperty('pointer-events', 'auto', 'important');
      
      // Удаляем onselectstart и oncontextmenu атрибуты
      element.removeAttribute('onselectstart');
      element.removeAttribute('oncontextmenu');
      element.removeAttribute('unselectable');
    });
  }

  // Функция для отключения защиты от правого клика в CSS
  function disableCSSProtection() {
    // Создаем и добавляем собственный CSS, который переопределит защиту
    const css = `
      * {
        -webkit-user-select: auto !important;
        -moz-user-select: auto !important;
        -ms-user-select: auto !important;
        user-select: auto !important;
        pointer-events: auto !important;
      }
    `;
    
    const style = document.createElement('style');
    style.type = 'text/css';
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
  }

  // Обработчик мутаций DOM
  function setupMutationObserver() {
    // Наблюдаем за изменениями в DOM и повторно применяем наши правила
    const observer = new MutationObserver(function(mutations) {
      removeHandlers();
      removeBlockingAttributes();
    });
    
    // Настройка наблюдателя
    observer.observe(document, {
      childList: true,
      subtree: true,
      attributes: true
    });
  }

  // Применяем все наши методы при загрузке страницы
  function init() {
    removeHandlers();
    removeBlockingAttributes();
    disableCSSProtection();
    setupMutationObserver();
    
    // Также добавляем защиту от переопределения window.oncontextmenu и других событий
    Object.defineProperty(HTMLElement.prototype, 'oncontextmenu', {
      configurable: false,
      get: function() { return null; },
      set: function() { return true; }
    });
  }

  // Запускаем инициализацию
  init();
  
  // На всякий случай повторяем через небольшой промежуток времени
  setTimeout(init, 500);
})();
