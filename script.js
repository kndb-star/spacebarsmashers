const body = document.body;

const sun = document.querySelector('.sun');
const moon = document.querySelector('.moon');

const star1 = document.querySelector('.star1');
const star2 = document.querySelector('.star2');
const star3 = document.querySelector('.star3');
const star4 = document.querySelector('.star4');

moon.style.animationPlayState = 'paused';

sun.addEventListener('animationiteration', () => {

    body.style.backgroundColor = '#000055';

    moon.style.animationPlayState = 'running';
    changeStarVisibility(true);

    sun.style.transform = 'translateX(110%)';
    sun.style.animationPlayState = 'paused';
});

moon.addEventListener('animationiteration', () => {

    body.style.backgroundColor = '#009ACD';

    sun.style.animationPlayState = 'running';
    changeStarVisibility(false);

    moon.style.transform = 'translateX(110%)';
    moon.style.animationPlayState = 'paused';
});

function changeStarVisibility(visibility) {
    const stars = document.querySelectorAll('.star');

    stars.forEach(function (star) {
        star.style.visibility = visibility ? 'visible' : 'hidden';
    });
}

const bird = document.querySelector('.bird');

function jump() {
    if (!bird.classList.contains('jumping')) {
        bird.classList.add('jumping');
        setTimeout(() => {
            bird.classList.remove('jumping');
        }, 150);
    }
}

document.addEventListener('keydown', (e) => {
    if (e.key === ' ') {
        jump(); // jump only if spacebar
    }
});

const evilTimer = setInterval(createEvil, 4000); // try to spawn a evil bird every tick
let evilCounter = 0; // global counter for evils, we will use this for bonus

function createEvil() {

    const evilElements = document.querySelectorAll('.evil').length;

    if (evilElements < 10) {

        evilCounter++;

        const minTop = 30;
        const maxTop = 90;
        const randomTop = Math.random() * (maxTop - minTop) + minTop;

        const div = document.createElement('div');
        div.classList.add('evil');

        const shouldBeFast = Math.random() < 0.4; // set close to 1 for more fast evils
        if (shouldBeFast) {
            div.classList.add('evilfast');
        } else {
            div.classList.add('evilslow');
        }
        div.style.top = `${randomTop}%`;
        document.body.appendChild(div);

        div.addEventListener('animationiteration', () => {
            div.remove();
        });
    }
}

const bonusTimer = setInterval(createBonus, 4001); // try to spawn a bonus every tick

function createBonus() {

    const minTop = 30;
    const maxTop = 90;
    const randomTop = Math.random() * (maxTop - minTop) + minTop;

    const div = document.createElement('div');
    div.classList.add('bonus');

    let shouldAdd = true;
    if (evilCounter % 50 == 0) {
        div.classList.add('bonus100');
    } else if (evilCounter % 20 == 0) {
        div.classList.add('bonus50');
    } else if (evilCounter % 5 == 0 || evilCounter % 3 == 0) {
        div.classList.add('bonus10');
    } else {
        shouldAdd = false;
    }

    if (shouldAdd) {

        div.classList.add('bonusSize');
        div.style.top = `${randomTop}%`;
        document.body.appendChild(div);

        div.addEventListener('animationiteration', () => {
            div.remove();
        });
    }
}


function updateScore(score) {
    const scoreElement = document.getElementById('scoreValue');
    scoreElement.textContent = score;

    if (score % 100 == 0) {
        scoreElement.parentElement.classList.add('reached-100');
    } else {
        // Remove the animation class if the score changes
        scoreElement.parentElement.classList.remove('reached-100');
    }
}

let isAlive = setInterval(function () {

    const evil = document.getElementsByClassName("evil");

    let birdTop = bird.getBoundingClientRect().top;
    let birdLeft = bird.getBoundingClientRect().left;

    for (let i = 0; i < evil.length; i++) {
        let evilTop = evil[i]?.getBoundingClientRect().top;
        let evilLeft = evil[i]?.getBoundingClientRect().left;
        if (evilTop >= birdTop && evilTop <= birdTop + 60 && evilLeft >= birdLeft && evilLeft <= birdLeft + 60) {

            const customPopup = document.getElementById('customPopup');
            customPopup.style.display = 'block';

            // calculate simulation credits and hit API
        }
    }

    const bonus = document.getElementsByClassName("bonus");

    for (let i = 0; i < bonus.length; i++) {
        let bonusTop = bonus[i]?.getBoundingClientRect().top;
        let bonusLeft = bonus[i]?.getBoundingClientRect().left;
        if (bonusTop >= birdTop && bonusTop <= birdTop + 60 && bonusLeft >= birdLeft && bonusLeft <= birdLeft + 60) {

            const str = bonus[i]?.classList[1];
            let score = parseInt(document.getElementById("scoreValue").textContent);
            score += parseInt(str.match(/\d+/)[0], 10);

            updateScore(score);

            document.getElementsByClassName(str)[0].remove();
        }
    }
}, 10);