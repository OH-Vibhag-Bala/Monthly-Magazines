const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const pages = document.querySelectorAll('.page');

let currentPage = 0; // 0 means closed cover (or starting point)
// Note: Logic for folding pages.
// We treat the book as having 'leaves'.
// Leaf 0 is the cover.
// When we click 'Next', Leaf 0 flips.
// Z-index handling is crucial so pages stack correctly.

function updateZIndexes() {
    // Reset z-indexes based on state
    // Pages that are NOT flipped should be stacked normally (higher index on top)
    // Pages that ARE flipped should be stacked reverse (higher index on bottom of the flipped stack)
    
    pages.forEach((page, index) => {
        if (index < currentPage) {
            // Page is flipped
            page.style.zIndex = index + 1; // 1, 2, 3...
        } else {
            // Page is not flipped
            page.style.zIndex = pages.length - index; // 3, 2, 1...
        }
    });
}

function flipPage(index, direction) {
    if (direction === 'next') {
        if (index < pages.length) {
            pages[index].classList.add('flipped');
            currentPage++;
        }
    } else if (direction === 'prev') {
        if (index >= 0) {
            pages[index].classList.remove('flipped');
            currentPage--;
        }
    }
    updateZIndexes();
    updateButtons();
}

function updateButtons() {
    prevBtn.disabled = currentPage === 0;
    nextBtn.disabled = currentPage === pages.length;
}

nextBtn.addEventListener('click', () => {
    // Flip the current page (which is at index equal to 'currentPage' but wait, index 0 is cover)
    // If currentPage is 0, we want to flip page[0].
    
    if (currentPage < pages.length) {
        flipPage(currentPage, 'next');
    }
});

prevBtn.addEventListener('click', () => {
    // If currentPage is 1 (meaning page 0 is flipped), we want to unflip page 0.
    // So we target page[currentPage - 1]
    
    if (currentPage > 0) {
        flipPage(currentPage - 1, 'prev');
    }
});

// Initial Setup
updateZIndexes();
updateButtons();
