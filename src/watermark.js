// This file contains the implementation of a watermark feature for a web page.
// It creates a watermark with the text "zddhub.com" and adds it to the page.
// The watermark is displayed at a -15 degree angle and is repeated across the entire page.
// The watermark is also responsive to changes in the page's content and window resizing events.

// GPT-4 wrote 90% code and zddhub assisted it

function createMaskDiv(left, top) {
  const maskDiv = document.createElement('div');
  maskDiv.id = 'mask_div_id00';
  maskDiv.style.cssText = `transform: rotate(-15deg); position: absolute; left: ${left}px; top: ${top}px; overflow: hidden; z-index: 9999999; opacity: 0.1; font-family: 微软雅黑; color: black; text-align: center; width: 140px; height: 40px; display: block;`;
  maskDiv.innerText = 'zddhub.com';
  return maskDiv;
}

function handleMutation(mutations) {
  mutations.forEach((mutation) => {
    const watermark = document.getElementById('eb-watermark');
    if (mutation.removedNodes.length > 0 || mutation.target.id === 'eb-watermark') {
      if (!watermark) {
        createWatermark();
      }
    }
    if (mutation.type === 'attributes' && (mutation.target.id === 'eb-watermark' || mutation.attributeName === 'style')) {
      if (watermark) {
        watermark.remove();
      }
      createWatermark();
    }
  });

  const watermark = document.body.querySelector('#eb-watermark');
  if (!watermark || watermark.parentElement !== document.body || !watermark.shadowRoot || !watermark.shadowRoot.querySelector('#mask_div_id00')) {
    if (watermark) {
      watermark.remove();
    }
    createWatermark();
  }
}

function handleShadowRootMutation(mutations, shadowRoot) {
  mutations.forEach((mutation) => {
    if (mutation.removedNodes.length > 0 || mutation.type === 'attributes' || (mutation.type === 'characterData' && (mutation.target.parentNode === shadowRoot || mutation.target.parentNode.parentNode === shadowRoot))) {
      const watermark = document.getElementById('eb-watermark');
      if (watermark) {
        watermark.remove();
      }
      createWatermark();
    }
  });
}

function createWatermark() {
  const div = document.createElement('div');
  div.id = 'eb-watermark';
  div.style.cssText = "pointer-events: none !important; display: block !important; visibility: visible !important; position: fixed !important; top: 0 !important; left: 0 !important; opacity: 1 !important;";
  const shadowRoot = div.attachShadow({ mode: 'open' });

  for (let i = 0; i < window.innerWidth; i += 280) {
    for (let j= 0; j < window.innerHeight; j += 80) {
      shadowRoot.appendChild(createMaskDiv(i, j));
    }
  }

  const observerConfig = { childList: true, subtree: true, attributes: true, attributeFilter: ['id', 'style'] };

  const observer = new MutationObserver(handleMutation);
  observer.observe(document.body, observerConfig);

  const shadowRootObserver = new MutationObserver((mutations) => handleShadowRootMutation(mutations, shadowRoot));
  shadowRootObserver.observe(shadowRoot, { ...observerConfig, characterData: true });

  document.body.appendChild(div);
}

function handleResize() {
  const watermark = document.getElementById('eb-watermark');
  if (watermark) {
    watermark.remove();
  }

  createWatermark();
}

window.addEventListener('resize', handleResize);

export default createWatermark;
