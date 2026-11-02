// Interactive Event Budget & Mood Estimator Logic
document.addEventListener('DOMContentLoaded', () => {
  const eventTypeSelect = document.getElementById('calc-event-type');
  const guestCountInput = document.getElementById('calc-guest-count');
  const guestCountDisplay = document.getElementById('calc-guest-display');
  const productionLevelInputs = document.querySelectorAll('input[name="production-tier"]');
  const estimateDisplay = document.getElementById('calc-estimated-range');
  const whatsappQuoteBtn = document.getElementById('calc-whatsapp-btn');

  // Base pricing tables (INR)
  const basePrices = {
    'wedding': 150000,
    'destination': 350000,
    'sangeet': 90000,
    'reception': 120000,
    'milestone': 25000,
    'corporate': 80000
  };

  const tierMultipliers = {
    'classic': 1.0,
    'haute': 1.7,
    'regal': 2.6
  };

  function updateEstimate() {
    const eventType = eventTypeSelect ? eventTypeSelect.value : 'wedding';
    const guests = parseInt(guestCountInput ? guestCountInput.value : 250, 10);
    
    let selectedTier = 'haute';
    productionLevelInputs.forEach(input => {
      if (input.checked) selectedTier = input.value;
    });

    if (guestCountDisplay) {
      guestCountDisplay.innerText = `${guests} Guests`;
    }

    const base = basePrices[eventType] || 150000;
    const tierMultiplier = tierMultipliers[selectedTier] || 1.7;
    
    // Scale factor based on guest count & venue production
    const guestFactor = Math.max(0.7, guests / 200);

    const calculatedLow = Math.round((base * tierMultiplier * guestFactor) / 5000) * 5000;
    const calculatedHigh = Math.round((calculatedLow * 1.35) / 5000) * 5000;

    const formatINR = (val) => {
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
      }).format(val);
    };

    if (estimateDisplay) {
      estimateDisplay.innerText = `${formatINR(calculatedLow)} – ${formatINR(calculatedHigh)}`;
    }

    // Dynamic WhatsApp Link construction
    const eventNameFormatted = eventTypeSelect.options[eventTypeSelect.selectedIndex].text;
    const tierNameFormatted = selectedTier.charAt(0).toUpperCase() + selectedTier.slice(1);
    
    const message = encodeURIComponent(
      `Hello Eternity Events Team,\n\nI was exploring your website and estimated a package with the following details:\n• Event: ${eventNameFormatted}\n• Expected Guests: ${guests}\n• Production Aesthetic: ${tierNameFormatted} Tier\n• Indicative Range: ${formatINR(calculatedLow)} - ${formatINR(calculatedHigh)}\n\nCould we check available dates and discuss custom decor concepts?`
    );

    if (whatsappQuoteBtn) {
      whatsappQuoteBtn.href = `https://wa.me/917030644067?text=${message}`;
    }
  }

  // Event Listeners
  if (eventTypeSelect) eventTypeSelect.addEventListener('change', updateEstimate);
  if (guestCountInput) guestCountInput.addEventListener('input', updateEstimate);
  productionLevelInputs.forEach(input => input.addEventListener('change', updateEstimate));

  // Initial Calculation
  updateEstimate();
});

