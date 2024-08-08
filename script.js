const board = document.querySelector('.game-board');
const resetButton = document.getElementById('reset-btn');
const showAllButton = document.getElementById('show-all');
const rNIcon = document.getElementById('r-n-icon');
const menuIcon = document.getElementById('menu-icon');
const profileSection = document.getElementById('profile-section');
const loginSection = document.getElementById('login-section');
const aboutBtn = document.getElementById('about-btn');
const loginBtn = document.getElementById('login-btn');
const submitLogin = document.getElementById('submit-login');
const loginMessage = document.getElementById('login-message');
const userNameElement = document.getElementById('user-name');
let firstCard, secondCard;
let lockBoard = false;
let matchedPairs = 0;
let showAllUsed = false;
let loggedIn = false;

menuIcon.addEventListener('click', () => {
    profileSection.style.display = profileSection.style.display === 'none' || profileSection.style.display === '' ? 'block' : 'none';
});

aboutBtn.addEventListener('click', () => {
    userNameElement.textContent = 'Developer by Rahiyan';
});

loginBtn.addEventListener('click', () => {
    profileSection.style.display = 'none';
    loginSection.style.display = 'block';
});

submitLogin.addEventListener('click', () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'nasrin' && password === 'rahiyan') {
        loginMessage.textContent = 'Login Successful!';
        loginMessage.style.color = 'green';
        loggedIn = true;
        setTimeout(() => {
            loginSection.style.display = 'none';
            showAllButton.style.display = 'none'; // Hide Show All button after login
            rNIcon.style.display = 'block'; // Show R+N icon after login
        }, 1000);
    } else {
        loginMessage.textContent = 'Invalid Username or Password!';
        loginMessage.style.color = 'red';
    }
});

const symbols = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
const cardSymbols = [...symbols, ...symbols].sort(() => Math.random() - 0.5);

function createBoard() {
    matchedPairs = 0;
    showAllUsed = false;
    showAllButton.style.opacity = '1';
    showAllButton.style.cursor = 'pointer';
    showAllButton.style.display = loggedIn ? 'none' : 'block'; // Show Show All button based on login status
    rNIcon.style.display = loggedIn ? 'block' : 'none'; // Show R+N icon based on login status

    cardSymbols.forEach(symbol => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.symbol = symbol;
        card.addEventListener('click', flipCard);
        board.appendChild(card);
    });
}

function flipCard() {
    if (lockBoard || this === firstCard) return;
    this.textContent = this.dataset.symbol;
    this.classList.add('flipped');

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    const isMatch = firstCard.dataset.symbol === secondCard.dataset.symbol;
    if (isMatch) {
        disableCards();
        matchedPairs++;

        if (matchedPairs === symbols.length) {
            setTimeout(() => {
                alert('Congratulations 🎉');
                resetGame();
            }, 500);
        }
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.textContent = '';
        secondCard.textContent = '';
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

function resetGame() {
    board.innerHTML = '';
    createBoard();
}

function showAllCards() {
    if (showAllUsed) return;
    showAllUsed = true;
    showAllButton.style.opacity = '0.5';
    showAllButton.style.cursor = 'not-allowed';

    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.textContent = card.dataset.symbol;
        card.classList.add('flipped');
    });

    setTimeout(() => {
        cards.forEach(card => {
            if (!card.classList.contains('matched')) {
                card.textContent = '';
                card.classList.remove('flipped');
            }
        });
    }, 3000);
}

function showAllCardsFor4Seconds() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.textContent = card.dataset.symbol;
        card.classList.add('flipped');
    });

    setTimeout(() => {
        cards.forEach(card => {
            if (!card.classList.contains('matched')) {
                card.textContent = '';
                card.classList.remove('flipped');
            }
        });
    }, 4000);
}

resetButton.addEventListener('click', resetGame);
showAllButton.addEventListener('click', showAllCards);
rNIcon.addEventListener('click', showAllCardsFor4Seconds);

createBoard();
