window.onload = function() {
  animateBlocks();
};

function animateBlocks() {
  const totalBlocks = 40;
  const blocksContainer = document.getElementById('blocks');
  const percentDisplay = document.getElementById('progress-percent');

  // Create blocks
  for (let i = 0; i < totalBlocks; i++) {
    const block = document.createElement('div');
    block.classList.add('block');
    blocksContainer.appendChild(block);
  }

  let current = 0;
  const blocks = document.querySelectorAll('.block');

  const interval = setInterval(() => {
    if (current < totalBlocks) {
      blocks[current].classList.add('active');
      const percent = Math.round(((current + 1) / totalBlocks) * 100);
      percentDisplay.textContent = `${percent}%`;
      current++;
    } else {
      clearInterval(interval);

      // Show Graduation text
      const graduation = document.getElementById('graduation-text');
      graduation.classList.add('show');

      // Show typewriter text after fade-in
      setTimeout(() => {
        document.getElementById('typewriter').classList.add('show');
        typeLine("line1", "Code compiled", 0, () => {
          setTimeout(() => {
            typeLine("line2", "Degree unlocked", 0, () => {
              setTimeout(() => {
                typeLine("line3", "#BCAGraduate", 0, () => {
                  // 🎉 Confetti after all typing done!
                  launchConfetti();
                });
              }, 200);
            });
          }, 200);
        });
      }, 1000);
    }
  }, 100);
}

function typeLine(id, text, i, callback) {
  const el = document.getElementById(id);
  if (i < text.length) {
    el.innerHTML += text.charAt(i);
    el.style.animation = "blink-caret .75s step-end infinite";
    setTimeout(() => typeLine(id, text, i + 1, callback), 50);
  } else {
    el.style.borderRight = "none";
    if (callback) callback();
  }
}

function launchConfetti() {
  confetti({
    particleCount: 200,
    spread: 70,
    origin: { y: 0.6 }
  });
}
