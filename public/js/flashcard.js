// 1. SELECTORS 
const modal         = document.getElementById('flashcardModal');
const closeBtn      = document.querySelector('.close-button');
const flashcards    = document.querySelectorAll('.flashcard');


// 2. FUNCTIONS 

function handleCardFlip(cardEvent) {
    if (cardEvent.target.closest('.card-actions')) return;
    
    cardEvent.currentTarget.classList.toggle('flipped');
}

// close and send to show page
function handleCloseModal() {
    if (modal) {
        modal.style.display = 'none';
        window.location.href = '/cards';
    }
}


// 3. EVENT LISTENERS

flashcards.forEach(card => {
    card.addEventListener('click', handleCardFlip);
});
closeBtn.addEventListener('click', handleCloseModal);


    



