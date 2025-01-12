const cardWrapper = document.getElementById('cardWrapper');
const scrollContainer = document.getElementById('scrollContainer');

// Function to clone cards and append to the bottom
function cloneCardsForwards() {
  for (let i = 0; i < 3; i++) {
    document.querySelectorAll('.card').forEach(card => {
      const clone = card.cloneNode(true);
      cardWrapper.appendChild(clone);
    });
  }
}

// Function to clone cards and prepend to the top
function cloneCardsBackwards() {
  for (let i = 0; i < 3; i++) {
    document.querySelectorAll('.card').forEach(card => {
      const clone = card.cloneNode(true);
      cardWrapper.insertBefore(clone, cardWrapper.firstChild);
    });
  }
}

// Initial cloning of cards for reverse scrolling to work from start
cloneCardsBackwards();

// Initial card size adjustment
function adjustCardSizes() {
  const containerCenter = scrollContainer.scrollTop + scrollContainer.offsetHeight / 2;
  document.querySelectorAll('.card').forEach(card => {
    const cardCenter = card.offsetTop + card.offsetHeight / 2;
    const distance = Math.abs(containerCenter - cardCenter);
    if (distance < 100) {
      card.classList.remove('small-card');
    } else {
      card.classList.add('small-card');
    }
  });
}

// Function to check the scroll position and clone cards accordingly
function checkScrollPosition() {
  const scrollTop = scrollContainer.scrollTop;

  // When scrolling down (top to bottom), append new cards
  if (scrollTop + scrollContainer.clientHeight >= scrollContainer.scrollHeight - 10) {
    cloneCardsForwards();
  }

  // When scrolling up (bottom to top), prepend new cards
  if (scrollTop <= 10) {
    cloneCardsBackwards();
  }
}

// Drag-to-scroll logic
let isDragging = false;
let startX;
let scrollLeft;

// When mouse/touch starts
scrollContainer.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.pageX - scrollContainer.offsetLeft;
  scrollLeft = scrollContainer.scrollLeft;
});

scrollContainer.addEventListener('touchstart', (e) => {
  isDragging = true;
  startX = e.touches[0].pageX - scrollContainer.offsetLeft;
  scrollLeft = scrollContainer.scrollLeft;
});

// When mouse/touch moves
scrollContainer.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  e.preventDefault();
  const x = e.pageX - scrollContainer.offsetLeft;
  const walk = (x - startX) * 2; // Multiply by a factor to increase/decrease speed
  scrollContainer.scrollLeft = scrollLeft - walk;
});

scrollContainer.addEventListener('touchmove', (e) => {
  if (!isDragging) return;
  e.preventDefault();
  const x = e.touches[0].pageX - scrollContainer.offsetLeft;
  const walk = (x - startX) * 2; // Multiply by a factor to increase/decrease speed
  scrollContainer.scrollLeft = scrollLeft - walk;
});

// When mouse/touch ends
scrollContainer.addEventListener('mouseup', () => {
  isDragging = false;
});
scrollContainer.addEventListener('touchend', () => {
  isDragging = false;
});

// Attach scroll event to the container
scrollContainer.addEventListener('scroll', () => {
  adjustCardSizes();
  checkScrollPosition(); // Check if new cards should be appended or prepended
});

// Initial card size adjustment
adjustCardSizes();



