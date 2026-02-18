import {
  supportedLanguages,
  languageNames,
  getLanguageFromUrl,
  changeLanguage,
} from './i18n';

export const createLanguageSwitcher = (): HTMLElement => {
  const currentLang = getLanguageFromUrl();

  const container = document.createElement('div');
  container.className = 'relative';
  container.id = 'language-switcher';

  const button = document.createElement('button');
  button.className = `
    inline-flex items-center gap-1.5 text-sm font-medium
    bg-gray-800 text-gray-200 border border-gray-600
    px-3 py-1.5 rounded-full transition-colors duration-200
    shadow-sm hover:shadow-md hover:bg-gray-700
  `.trim();
  button.setAttribute('aria-haspopup', 'true');
  button.setAttribute('aria-expanded', 'false');

  const textSpan = document.createElement('span');
  textSpan.className = 'font-medium';
  textSpan.textContent = languageNames[currentLang];

  const chevron = document.createElement('svg');
  chevron.className = 'w-4 h-4';
  chevron.setAttribute('fill', 'none');
  chevron.setAttribute('stroke', 'currentColor');
  chevron.setAttribute('viewBox', '0 0 24 24');
  chevron.innerHTML =
    '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>';

  button.appendChild(textSpan);
  button.appendChild(chevron);

  const dropdown = document.createElement('div');
  dropdown.className = `
    hidden absolute right-0 mt-2 w-40 rounded-lg
    bg-gray-800 border border-gray-700 shadow-xl
    py-1 z-50
  `.trim();
  dropdown.setAttribute('role', 'menu');

  supportedLanguages.forEach((lang) => {
    const option = document.createElement('button');
    option.className = `
      w-full px-4 py-2 text-left text-sm text-gray-200
      hover:bg-gray-700 flex items-center gap-2
      ${lang === currentLang ? 'bg-gray-700' : ''}
    `.trim();
    option.setAttribute('role', 'menuitem');

    const name = document.createElement('span');
    name.textContent = languageNames[lang];

    option.appendChild(name);

    option.addEventListener('click', () => {
      if (lang !== currentLang) {
        changeLanguage(lang);
      }
    });

    dropdown.appendChild(option);
  });

  container.appendChild(button);
  container.appendChild(dropdown);

  button.addEventListener('click', (e) => {
    e.stopPropagation();
    const isExpanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', (!isExpanded).toString());
    dropdown.classList.toggle('hidden');
  });

  document.addEventListener('click', () => {
    button.setAttribute('aria-expanded', 'false');
    dropdown.classList.add('hidden');
  });

  return container;
};

export const injectLanguageSwitcher = (): void => {
  // Simple mode switcher
  const simpleModeContainer = document.getElementById(
    'simple-mode-language-switcher'
  );
  if (simpleModeContainer) {
    const switcher = createLanguageSwitcher();
    simpleModeContainer.appendChild(switcher);
    return;
  }

  // Desktop Navbar Switcher
  const desktopContainer = document.getElementById('desktop-language-selector');
  if (desktopContainer) {
    const switcher = createLanguageSwitcher();

    // Style the button for navbar
    const button = switcher.querySelector('button');
    if (button) {
      button.className = `
        inline-flex items-center gap-1.5 text-sm font-medium
        bg-gray-800 text-gray-200 border border-gray-600
        px-3 py-1.5 rounded-full transition-colors duration-200
        shadow-sm hover:shadow-md hover:bg-gray-700
      `.trim();
    }

    desktopContainer.appendChild(switcher);
  }

  // Mobile Navbar Switcher
  const mobileContainer = document.getElementById('mobile-language-selector');
  if (mobileContainer) {
    const switcher = createLanguageSwitcher();

    // Style for mobile menu
    const button = switcher.querySelector('button');
    if (button) {
      button.className = `
        flex items-center justify-between w-full text-sm font-medium
        bg-gray-700 text-gray-200 border border-gray-600
        px-4 py-2 rounded-lg transition-colors duration-200
        hover:bg-gray-600
      `.trim();
    }

    // Adjust dropdown for mobile
    const dropdown = switcher.querySelector('div[role="menu"]');
    if (dropdown) {
      dropdown.className = `
            hidden absolute bottom-full mb-2 w-full left-0 rounded-lg
            bg-gray-800 border border-gray-700 shadow-xl
            py-1 z-50
        `.trim();
    }

    switcher.className = 'relative w-full max-w-xs';
    mobileContainer.appendChild(switcher);
  }
};
