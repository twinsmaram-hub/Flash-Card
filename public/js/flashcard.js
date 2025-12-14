
function flashcardFlip() {
    const flashcards = document.querySelectorAll('.flashcard');

    flashcards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
    });

    console.log("Flashcard flip functionality is active.");
}

function closeModal() {
    const modal = document.getElementById('flashcardModal');
    if (modal) {
        modal.style.display = 'none';
    }

    window.location.href = '/cards/show/';

    console.log("Modal closed and redirecting to /cards...");
}

document.addEventListener('DOMContentLoaded', flashcardFlip);


