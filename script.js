document.addEventListener("DOMContentLoaded", () => {
  const ribbon = document.getElementById("ribbon");
  const envelope = document.getElementById("envelope");
  const instruction = document.getElementById("instruction");
  const instructionText = instruction.querySelector("p");
  const surpriseScreen = document.getElementById("surpriseScreen");
  const letterScreen = document.getElementById("letterScreen");
  const openLetter = document.getElementById("openLetter");
  const closeLetter = document.getElementById("closeLetter");

  let dragging = false, startY = 0, distance = 0, opened = false;

  ribbon.addEventListener("pointerdown", e => {
    if (opened) return;
    dragging = true;
    startY = e.clientY;
    ribbon.classList.add("dragging");
    ribbon.setPointerCapture(e.pointerId);
    e.preventDefault();
  });

  ribbon.addEventListener("pointermove", e => {
    if (!dragging || opened) return;
    distance = Math.max(0, Math.min(150, e.clientY - startY));
    ribbon.style.transform = `translateX(-50%) translateY(${distance}px)`;
    if (distance < 45) instructionText.textContent = "Pull the ribbon down";
    else if (distance < 80) instructionText.textContent = "Keep pulling... 💙";
    else instructionText.textContent = "Almost there... ✨";
    if (distance >= 80) openSurprise();
    e.preventDefault();
  });

  const resetRibbon = () => {
    if (opened) return;
    dragging = false;
    ribbon.classList.remove("dragging");
    ribbon.style.transition = "transform .35s ease";
    ribbon.style.transform = "translateX(-50%) translateY(0)";
    setTimeout(() => ribbon.style.transition = "", 400);
    instructionText.textContent = "Pull the ribbon down";
  };

  ribbon.addEventListener("pointerup", resetRibbon);
  ribbon.addEventListener("pointercancel", resetRibbon);

  function openSurprise() {
    if (opened) return;
    opened = true;
    dragging = false;
    ribbon.classList.remove("dragging");
    ribbon.style.transition = "transform .6s ease";
    ribbon.style.transform = "translateX(-50%) translateY(145px)";
    envelope.classList.add("open");
    instruction.style.opacity = "0";
    setTimeout(() => {
      surpriseScreen.classList.add("show");
      createHearts();
    }, 650);
  }

  openLetter.addEventListener("click", () => {
    surpriseScreen.classList.remove("show");
    setTimeout(() => letterScreen.classList.add("show"), 300);
  });

  closeLetter.addEventListener("click", () => {
    letterScreen.classList.remove("show");
  });

  function createHearts() {
    for (let i = 0; i < 18; i++) {
      const h = document.createElement("div");
      h.className = "floating-heart";
      h.textContent = Math.random() > .35 ? "♥" : "✦";
      h.style.left = `${Math.random() * 100}%`;
      h.style.fontSize = `${14 + Math.random() * 18}px`;
      h.style.animationDelay = `${Math.random() * 1.5}s`;
      document.body.appendChild(h);
      setTimeout(() => h.remove(), 5000);
    }
  }
});