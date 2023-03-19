function createMaskDiv(left, top) {
  const maskDiv = document.createElement('div');
  maskDiv.id = 'mask_div_id00';
  maskDiv.style.cssText = `transform: rotate(-15deg); position: absolute; left: ${left}px; top: ${top}px; overflow: hidden; z-index: 9999999; opacity: 0.1; font-family: 微软雅黑; color: black; text-align: center; width: 140px; height: 40px; display: block;`;
  maskDiv.innerText = 'zddhub.com';
  return maskDiv;
}

function handleMutation(mutations, observer) {
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
}

function handleShadowRootMutation(mutations, shadowRootObserver, shadowRoot) {
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
  div.style.cssText = "pointer-events: none !important; display: block !important;";

  const shadowRoot = div.attachShadow({ mode: 'open' });

  for (let i = 0; i < window.innerWidth; i += 280) {
    for (let j= 0; j < window.innerHeight; j += 80) {
      shadowRoot.appendChild(createMaskDiv(i, j));
    }
  }

  const observerConfig = { childList: true, subtree: true, attributes: true, attributeFilter: ['id', 'style'] };

  const observer = new MutationObserver(handleMutation);
  observer.observe(document.body, observerConfig);

  const shadowRootObserver = new MutationObserver((mutations) => handleShadowRootMutation(mutations, shadowRootObserver, shadowRoot));
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
