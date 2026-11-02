// Lookbook Filtering & Gallery Modal Logic
document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const lookbookCards = document.querySelectorAll('.lookbook-item');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active states
      filterButtons.forEach(b => {
        b.classList.remove('bg-amber-500', 'text-black', 'border-amber-400');
        b.classList.add('bg-zinc-900/80', 'text-zinc-300', 'border-zinc-800');
      });
      btn.classList.remove('bg-zinc-900/80', 'text-zinc-300', 'border-zinc-800');
      btn.classList.add('bg-amber-500', 'text-black', 'border-amber-400');

      const filter = btn.getAttribute('data-filter');

      lookbookCards.forEach(card => {
        const categories = card.getAttribute('data-category').split(' ');
        if (filter === 'all' || categories.includes(filter)) {
          card.classList.remove('hidden');
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.classList.add('hidden');
          }, 300);
        }
      });
    });
  });
});

