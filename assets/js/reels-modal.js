// Instagram Reels Modal & Theater Video Controller
document.addEventListener('DOMContentLoaded', () => {
  const reelCards = document.querySelectorAll('.reel-trigger');
  const modal = document.getElementById('reel-modal');
  const modalIframe = document.getElementById('reel-modal-iframe');
  const closeModalBtn = document.getElementById('close-reel-modal');

  if (reelCards && modal && modalIframe) {
    reelCards.forEach(card => {
      card.addEventListener('click', (e) => {
        // If clicking direct external icon, let it open Instagram in new tab
        if (e.target.closest('.direct-ig-link')) return;

        const reelId = card.getAttribute('data-reel-id');
        const reelUrl = card.getAttribute('data-reel-url');

        // Construct clean Instagram embed URL with auto-sizing
        modalIframe.src = `https://www.instagram.com/p/${reelId}/embed/?cr=1&v=14&wp=540&rd=${encodeURIComponent(window.location.origin)}`;
        
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.style.overflow = 'hidden';
      });
    });

    const closeModal = () => {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
      modalIframe.src = '';
      document.body.style.overflow = '';
    };

    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
      }
    });
  }
});
