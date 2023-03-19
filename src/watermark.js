function createWatermark() {
  // Create a div with id 'eb-watermark'
  const div = document.createElement('div');
  div.id = 'eb-watermark';
  // Add style to the div
  div.style.cssText = "pointer-events: none !important; display: block !important;";

  // Attach a shadow root to the div
  const shadowRoot = div.attachShadow({ mode: 'open' });
    
function createMaskDiv(left, top) {
  const maskDiv = document.createElement('div');
  maskDiv.id = 'mask_div_id00';
  maskDiv.style.cssText = `transform: rotate(-15deg); position: absolute; left: ${left}px; top: ${top}px; overflow: hidden; z-index: 9999999; opacity: 0.5; font-family: 微软雅黑; color: black; text-align: center; width: 140px; height: 40px; display: block;`;
  maskDiv.innerText = 'zddhub.com';
  return maskDiv;
}

for (let i = 0; i < window.innerWidth; i += 280) {
  for (let j = 0; j < window.innerHeight; j += 80) {
    shadowRoot.appendChild(createMaskDiv(i, j));
  }
}

// Monitor div with id 'eb-watermark', when it is deleted or changed, recreate it
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    // Log the mutation event
    console.log('Mutation event detected:', mutation);
    if (mutation.removedNodes.length > 0 || mutation.target.id === 'eb-watermark') {
      const watermark = document.getElementById('eb-watermark');
      if (!watermark) {
        console.log('Watermark not found, recreating...'); // Added log
        createWatermark();
      }
    }
    // Monitor div with id 'eb-watermark', when its attribute is changed, recreate it
    if (mutation.type === 'attributes' && (mutation.target.id === 'eb-watermark' || mutation.attributeName === 'style')) {
      console.log('Watermark attribute changed, recreating...'); // Added log
      const watermark = document.getElementById('eb-watermark');
      if (watermark) {
        watermark.remove();
      }
      createWatermark();
    }
  });
});
observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['id', 'style'] });


// Create an observer for the shadow root
const shadowRootObserver = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    // Log the mutation event for shadow root
    console.log('Shadow root mutation event detected:', mutation);

    // Check if child nodes of shadow root are deleted, changed, or innerText is changed
    if (mutation.removedNodes.length > 0 || mutation.type === 'attributes' || (mutation.type === 'characterData' && (mutation.target.parentNode === shadowRoot || mutation.target.parentNode.parentNode === shadowRoot))) {
      // Recreate parent div with id 'eb-watermark'
      const watermark = document.getElementById('eb-watermark');
      if (watermark) {
        watermark.remove();
      }
      createWatermark();
    }
  });
});

// Start observing the shadow root
shadowRootObserver.observe(shadowRoot, { childList: true, subtree: true, attributes: true, attributeFilter: ['id', 'style'], characterData: true });

    
  // Append the div to the body
  document.body.appendChild(div);
}

// Add an event listener for window resize
window.addEventListener('resize', () => {
  // Remove the existing watermark
  const watermark = document.getElementById('eb-watermark');
  if (watermark) {
    watermark.remove();
  }

  // Recreate the watermark with updated window size
  createWatermark();
});

export default createWatermark;
