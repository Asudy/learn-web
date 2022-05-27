function startTimer() {
  timerInterval = setInterval(() => {

    // The amount of time passed increments by one
    timePassed = timePassed + UPDATE_INTERVAL / 1000; // ms to s
    timeLeft = TIME_LIMIT - timePassed;

    // Stop if time runs out
    if (timePassed >= TIME_LIMIT) {
      clearInterval(timerInterval);
    }

    // The time left label is updated
    // document.getElementById("base-timer-label").innerHTML = formatTimePassed(timePassed);

    updateLineDasharray();
    // setRemainingPathColor(timeLeft);
  }, UPDATE_INTERVAL);
}

/* function formatTimeLeft(time) {
  // The largest round integer less than or equal to the result of time divided being by 60.
  const minutes = Math.floor(time / 60);

  // Seconds are the remainder of the time divided by 60 (modulus operator)
  let seconds = time % 60;

  // If the value of seconds is less than 10, then display seconds with a leading zero
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  // The output in MM:SS format
  return `${minutes}:${seconds}`;
} */

function formatTimePassed(time) {
  fraction = (time / TIME_LIMIT * 100).toFixed(0);
  return `${fraction}%`
}

// Divides time left by the defined time limit.
function calculateTimeFraction() {
  // Countdown
  // const rawTimeFraction = timeLeft / TIME_LIMIT;
  // return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
  
  // Progress
  const rawTimeFraction = timePassed / TIME_LIMIT;
  return rawTimeFraction + (1 / TIME_LIMIT) * rawTimeFraction;
}

// Update the dasharray value as time passes, starting with 283
function updateLineDasharray() {
  const lineDasharray = `${SLIDER_LEN} ${FULL_DASH_ARRAY_LEN}`;

  console.log(sliderLocation.toFixed(2));

  let path = document.getElementById("base-timer-path-remaining");
  path.setAttribute("stroke-dasharray", lineDasharray)
  path.setAttribute("stroke-dashoffset", -sliderLocation);

  sliderLocation += direction * LEN_PER_UPDATE;
  if (sliderLocation + SLIDER_LEN >= FULL_DASH_ARRAY_LEN || sliderLocation <= 0) {
    direction = -direction;
  }
}

/* function setRemainingPathColor(timeLeft) {
  const {
    alert,
    warning,
    info
  } = COLOR_CODES;

  // If the remaining time is less than or equal to 5, remove the "warning" class and apply the "alert" class.
  if (timeLeft <= alert.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(warning.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(alert.color);

    // If the remaining time is less than or equal to 10, remove the base color and apply the "warning" class.
  } else if (timeLeft <= warning.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(info.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(warning.color);
  }
} */


// Start with an initial value of 20 seconds
const TIME_LIMIT = 10;        // total time
const UPDATE_INTERVAL = 1000;   // ms
const LOAD_PERIOD = 2;     // s

const FULL_DASH_ARRAY_LEN = 90;
const SLIDER_LEN = 15;
const LEN_PER_UPDATE = (FULL_DASH_ARRAY_LEN - SLIDER_LEN) / LOAD_PERIOD * UPDATE_INTERVAL / 1000;

// Warning occurs at 10s
const WARNING_THRESHOLD = 10;
// Alert occurs at 5s
const ALERT_THRESHOLD = 5;

const COLOR_CODES = {
  info: {
    color: "green"
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD
  }
};


// Initially, no time has passed, but this will count up
// and subtract from the TIME_LIMIT
let timePassed = 0;
let timeLeft = TIME_LIMIT;

let sliderLocation = 0;
let direction = 1;

let timerInterval = null;

// let remainingPathColor = COLOR_CODES.info.color;
let remainingPathColor = "blue";

base_timer = document.createElement('div')
base_timer.class = 'base-timer'
base_timer.innerHTML = `
<div class="base-timer">
  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
      <line class="base-timer__path-elapsed" x1="5" y1="50" x2="95" y2="50"/>
      <path
        id="base-timer-path-remaining"
        stroke-dasharray="${SLIDER_LEN} ${FULL_DASH_ARRAY_LEN}"
        class="base-timer__path-remaining ${remainingPathColor}"
        d="
          M 50,5
          L 50,95
        "
      ></path>
    </g>
  </svg>
  <span id="base-timer-label" class="base-timer__label">
    <!-- Remaining time label --
    ${formatTimePassed(timePassed)} -->
  </span>
</div>
`;

document.body.appendChild(base_timer)

startTimer();