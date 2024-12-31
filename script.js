/////////// Up button
let upButton = document.querySelector('.up');

////////////////////// For progress in our skills section
let section = document.querySelector('.our-skills');
let progSpans = document.querySelectorAll('.skill .the-progress span');
let percentSpans = document.querySelectorAll('.skill .percent');

///////////// for numbers in stat section
let nums = document.querySelectorAll('.stats .box .number');
let statSection = document.querySelector('.stats');
console.log(nums);

function countUp(el) {
    let numGoal = el.getAttribute('data-goal');
    console.log(numGoal);
    let count = setInterval(() => {
        el.textContent++;
        if (el.textContent == numGoal) {
            clearInterval(count);
        }
    }, 100 / numGoal);
}

let started1 = false;
let started2 = false;
window.onscroll = function () {
    // for Up Button
    scrollY >= 600 ? upButton.classList.add('show') : upButton.classList.remove('show');
    // for progress in skills section
    if (window.scrollY >= section.offsetTop) {
        if (!started1) {
            percentSpans.forEach((sp) => {
                let startValue = 0;
                let endValue = parseInt(sp.getAttribute('data-percent'));
                let duration = Math.floor(1000 / endValue);

                let counter = setInterval(() => {
                    startValue += 1;
                    sp.textContent = `${startValue}%`;
                    progSpans.forEach((span) => {
                        span.style.width = span.dataset.width;
                    });
                    if (endValue == startValue) {
                        clearInterval(counter);
                    }
                }, duration);
            });
        }
        started1 = true;
    }

    if (window.scrollY >= statSection.offsetTop) {
        if (!started2) {
            nums.forEach((num) => {
                countUp(num);
            });
        }
        started2 = true;
    }
};

upButton.onclick = function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
};

/////////// Popup for images in gallery section
let ourGallery = document.querySelectorAll('.gallery .image img');

ourGallery.forEach((img) => {
    console.log(img);
    img.addEventListener('click', (e) => {
        let popOverlay = document.createElement('div');
        popOverlay.className = 'overlay_popup';
        document.body.appendChild(popOverlay);

        let popBox = document.createElement('div');
        popBox.className = 'popup_box';

        if (img.alt != 'null') {
            let imgHead = document.createElement('h3');
            imgHead.appendChild(document.createTextNode(img.alt));
            popBox.appendChild(imgHead);
        }

        let popImage = document.createElement('img');
        popImage.src = img.src;
        console.log(popImage.src);

        popBox.appendChild(popImage);
        popOverlay.appendChild(popBox);

        let closeBtn = document.createElement('span');
        closeBtn.appendChild(document.createTextNode('X'));
        closeBtn.className = 'closeBtn';
        popBox.appendChild(closeBtn);
    });
});

document.addEventListener('click', (e) => {
    // if (e.target.className == 'closeBtn') {
    //     document.body.removeChild(popOverlay);
    // }
    if (e.target.classList.contains('closeBtn')) {
        e.target.parentNode.remove();
        document.querySelector('.popOverlay').remove();
    }
});

///////// The Date in event section
let countDownDate = new Date(new Date(new Date().getFullYear(), 11, 31, 23, 59, 59)).getTime();
//console.log(countDownDate);
let counterDate = setInterval(() => {
    let dateNow = new Date().getTime();

    let DiffDate = countDownDate - dateNow;

    let days = Math.floor(DiffDate / (1000 * 60 * 60 * 24));
    let hours = Math.floor((DiffDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((DiffDate % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((DiffDate % (1000 * 60)) / 1000);

    document.querySelector('.days').innerHTML = days < 10 ? `00${days}` : days < 100 ? `0${days}` : days;

    document.querySelector('.hours').innerHTML = hours < 10 ? `0${hours}` : hours;
    document.querySelector('.minutes').innerHTML = minutes < 10 ? `0${minutes}` : minutes;
    document.querySelector('.seconds').innerHTML = seconds < 10 ? `0${seconds}` : seconds;

    if (DiffDate < 0) {
        clearInterval(counterDate);
    }
}, 1000);

//console.log(new Date(new Date().getFullYear(), 11, 31, 23, 59, 59));
////// for video section
let videoList = document.querySelectorAll('.video-list .vid');
let mainVideo = document.querySelector('.main-video video');
let title = document.querySelector('.main-video .title');

videoList.forEach((vid) => {
    //console.log(vid);
    vid.addEventListener('click', (eve) => {
        videoList.forEach((v) => v.classList.remove('active'));
        vid.classList.add('active');
        if (vid.classList.contains('active')) {
            let src = vid.children[0].getAttribute('src');
            //console.log(src);
            mainVideo.src = src;
            let tit = vid.children[1].innerHTML;
            title.innerHTML = tit;
        }
    });
});

/////////////// toggle mega menu
let megaMenu = document.querySelectorAll('.main-menu>li');

megaMenu[3].onclick = () => {
    megaMenu[3].children[1].classList.toggle('show');
};
