// Instagram Reels Modal & Theater Video Controller
document.addEventListener('DOMContentLoaded', () => {
  const reelCards = document.querySelectorAll('.reel-trigger');
  const modal = document.getElementById('reel-modal');
  const modalIframe = document.getElementById('reel-modal-iframe');
  const closeModalBtn = document.getElementById('close-reel-modal');
  const directLinkBtn = document.getElementById('modal-direct-reel-link');

  if (reelCards && modal && modalIframe) {
    reelCards.forEach(card => {
      card.addEventListener('click', (e) => {
        // If clicking the card's top-right direct external link icon, allow normal navigation
        if (e.target.closest('.direct-ig-link')) return;

        const reelId = card.getAttribute('data-reel-id');
        const reelUrl = card.getAttribute('data-reel-url') || `https://www.instagram.com/reel/${reelId}/`;

        if (directLinkBtn) {
          directLinkBtn.href = reelUrl;
        }

        // On mobile devices, opening directly in Instagram app/browser gives 10x better UX
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if (isMobile) {
          window.open(reelUrl, '_blank');
          return;
        }

        // On desktop, load in modal with fallback direct button
        modalIframe.src = `https://www.instagram.com/reel/${reelId}/embed/captioned/`;
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
