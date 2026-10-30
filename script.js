const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const filters = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('.project-card');
const revealEls = document.querySelectorAll('.reveal');

function applyTheme(theme) {
  if (theme === 'light') {
    body.classList.add('light');
  } else {
    body.classList.remove('light');
  }
  localStorage.setItem('theme', theme);
}

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  applyTheme('light');
}

themeToggle.addEventListener('click', () => {
  const isLight = body.classList.contains('light');
  applyTheme(isLight ? 'dark' : 'light');
});

filters.forEach((button) => {
  button.addEventListener('click', () => {
    filters.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');

    const filter = button.dataset.filter;
    cards.forEach((card) => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.style.display = match ? 'block' : 'none';
    });
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.12 }
);

revealEls.forEach((el) => observer.observe(el));
