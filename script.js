const body = document.body;

const sun = document.querySelector('.sun');
const moon = document.querySelector('.moon');

const star1 = document.querySelector('.star1');
const star2 = document.querySelector('.star2');
const star3 = document.querySelector('.star3');
const star4 = document.querySelector('.star4');

moon.style.animationPlayState = 'paused';

sun.addEventListener('animationiteration', () => {

    body.style.backgroundColor = '#000033';

    moon.style.animationPlayState = 'running';
    star1.style.visibility = 'visible';
    star2.style.visibility = 'visible';
    star3.style.visibility = 'visible';
    star4.style.visibility = 'visible';

    sun.style.transform = 'translateX(110%)';
    sun.style.animationPlayState = 'paused';
});

moon.addEventListener('animationiteration', () => {

    body.style.backgroundColor = '#87CEEB';

    sun.style.animationPlayState = 'running';
    star1.style.visibility = 'hidden';
    star2.style.visibility = 'hidden';
    star3.style.visibility = 'hidden';
    star4.style.visibility = 'hidden';

    moon.style.transform = 'translateX(110%)';
    moon.style.animationPlayState = 'paused';
});

const bird = document.querySelector('.bird');

// Function to trigger the bird's jump
function jump() {
    if (!bird.classList.contains('jumping')) {
        bird.classList.add('jumping');
        setTimeout(() => {
            bird.classList.remove('jumping');
        }, 150);
    }
}

// Add a spacebar key press event listener to jump
document.addEventListener('keydown', (e) => {
    if (e.key === ' ') {
        jump();
    }
});

const evilTimer = setInterval(createEvil, 5000); // try to spawn a evil bird every tick

let evilCounter = 0; // global counter for evils, we will use this for bonus

function createEvil() {

    const evilElements = document.querySelectorAll('.evil').length;

    if (evilElements < 5) {

        evilCounter++;

        const minTop = 20;
        const maxTop = 90;
        const randomTop = Math.random() * (maxTop - minTop) + minTop;

        const div = document.createElement('div'); // Create a new div element
        div.classList.add('evil'); // Add a CSS class to style the div (optional)

        const fast = Math.random() < 0.5;
        if (fast) {
            div.classList.add('evilfast');
        } else {
            div.classList.add('evilslow');
        }
        div.style.top = `${randomTop}%`; // Set the top position
        document.body.appendChild(div); // Append the div to the body


        div.addEventListener('animationiteration', () => {
            div.remove();
        });
    }
}

const bonusTimer = setInterval(createBonus, 5000);

function createBonus() {

    const minTop = 20;
    const maxTop = 90;
    const randomTop = Math.random() * (maxTop - minTop) + minTop;

    const div = document.createElement('div'); // Create a new div element
    div.classList.add('bonus');

    console.log('bonus' + evilCounter);
    let shouldAdd = false;
    if (evilCounter % 50 == 0) {
        div.classList.add('bonus100');
        shouldAdd = true;
    } else if (evilCounter % 10 == 0) {
        div.classList.add('bonus50');
        shouldAdd = true;
    } else if (evilCounter % 5 == 0) {
        div.classList.add('bonus10');
        shouldAdd = true;
    }

    if (shouldAdd) {
        div.style.top = `${randomTop}%`;
        document.body.appendChild(div);

        div.addEventListener('animationiteration', () => {
            div.remove();
        });
    }
}
