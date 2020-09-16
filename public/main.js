const slides = document.querySelectorAll('.slide');
const next = document.querySelector('#next');
const prev = document.querySelector('#prev');
const auto = true;
const intervalTime = 4000;
let slideInterval;


const nextSlide = () => {
  //get current class
  const current = document.querySelector('.current');

  //remove current class
  current.classList.remove('current');

  //check for next slide
  if (current.nextElementSibling) {
    //add current class
    current.nextElementSibling.classList.add('current')
  }
  else {
    //add current to start
    slides[0].classList.add('current')
  }

  setTimeout(() => current.classList.remove('current'));
}

const prevSlide = () => {
  //get current class
  const current = document.querySelector('.current');

  //remove current class
  current.classList.remove('current');

  //check for previous slide
  if (current.previousElementSibling) {
    //add current class
    current.previousElementSibling.classList.add('current')
  }
  else {
    //add current to end
    slides[slides.length - 1].classList.add('current')
  }

  setTimeout(() => current.classList.remove('current'));
}

// button events

next.addEventListener('click', e => {
  nextSlide();
  if (auto) {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, intervalTime);

  }
});

prev.addEventListener('click', e => {
  prevSlide();
  if (auto) {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, intervalTime);

  }
});

//auto slide
if (auto) {
  //run next slide at interval time
  slideInterval = setInterval(nextSlide, intervalTime);
}


//countdown

//set up end time for countdown
let launchDate = new Date("Oct 28,2020 12:00:00").getTime();

//set up timer to tick every 1 second
let timer = setInterval(tick, 1000);

function tick() {
  //get current time
  let now = new Date().getTime();

  //get the difference in time left to reach 0
  let t = launchDate - now;

  //check if time is > 0
  if (t > 0) {
    //set up days,hours,minutes,seconds
    let days = Math.floor(t / (1000 * 60 * 60 * 24));
    if (days < 10) { days = "0" + days }

    let hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    if (hours < 10) { hours = "0" + hours }

    let mins = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60))
    if (mins < 10) { mins = "0" + mins }

    let secs = Math.floor((t % (1000 * 60)) / 1000);
    if (secs < 10) { secs = "0" + secs }

    //create time string
    let time = `${days}: ${hours}: ${mins} : ${secs}`;
    document.querySelector('.countdown').innerText = time;
  }
}


// product slider

$(document).ready(function () {
  $('#autoWidth').lightSlider({
    autoWidth: true,
    loop: true,
    controls: true,
    onSliderLoad: function () {
      $('#autoWidth').removeClass('cS-hidden');
    }
  });
});



//back to top
var btn = $('#button');

$(window).scroll(function () {
  if ($(window).scrollTop() > 300) {
    btn.addClass('show');

  } else {
    btn.removeClass('show');
  }
});

btn.on('click', function (e) {
  e.preventDefault();
  $('html, body').animate({ scrollTop: 0 }, '300');
});