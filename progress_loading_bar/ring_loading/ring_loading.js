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

    setCircleDasharray();
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
  // const rawTimeFraction = timePassed / TIME_LIMIT;
  // return rawTimeFraction + (1 / TIME_LIMIT) * rawTimeFraction;
  
  // Loading
  // const rawTimeFraction = timePassed / LOAD_PERIOD;
  // return rawTimeFraction + (1 / LOAD_PERIOD) * rawTimeFraction;

  // return (timePassed % LOAD_PERIOD) / LOAD_PERIOD;
  return (timePassed) / LOAD_PERIOD;
}

// Update the dasharray value as time passes, starting with 283
function setCircleDasharray() {
  const dashArrayStart = calculateTimeFraction() * FULL_DASH_ARRAY_LEN;
  console.log(dashArrayStart);
  let timerPath = document.getElementById("base-timer-path-remaining");

/*   const overflow = dashArrayStart % FULL_DASH_ARRAY_LEN + DASH_ARRAY_SLIDER_LEN - FULL_DASH_ARRAY_LEN;
  if (overflow > 0) {
    const circleDasharray = `${overflow} ${FULL_DASH_ARRAY_LEN - DASH_ARRAY_SLIDER_LEN} ${DASH_ARRAY_SLIDER_LEN}`;
    timerPath.setAttribute("stroke-dasharray", circleDasharray);
    timerPath.setAttribute("stroke-dashoffset", `-${
      dashArrayStart + DASH_ARRAY_SLIDER_LEN - overflow
    }`);
  } else {
    const circleDasharray = `${DASH_ARRAY_SLIDER_LEN} ${FULL_DASH_ARRAY_LEN}`;
    timerPath.setAttribute("stroke-dasharray", circleDasharray);
    timerPath.setAttribute("stroke-dashoffset", `-${dashArrayStart.toFixed(0)}`);
  } */
  const circleDasharray = `${DASH_ARRAY_SLIDER_LEN} ${FULL_DASH_ARRAY_LEN}`;
  timerPath.setAttribute("stroke-dasharray", circleDasharray);
  timerPath.setAttribute("stroke-dashoffset", `-${dashArrayStart.toFixed(0)}`);
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
const UPDATE_INTERVAL = 100;   // ms
const LOAD_PERIOD = 2;     // s

// Dash array length
const DASH_ARRAY_SLIDER_LEN = 20;
const FULL_DASH_ARRAY_LEN = 2 * Math.PI * 45;

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

let timerInterval = null;

// let remainingPathColor = COLOR_CODES.info.color;
let remainingPathColor = "blue";

base_timer = document.createElement('div')
base_timer.class = 'base-timer'
base_timer.innerHTML = `
<div class="base-timer">
  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
      <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45" />
      <path
        id="base-timer-path-remaining"
        stroke-dasharray="${DASH_ARRAY_SLIDER_LEN} 283"
        class="base-timer__path-remaining ${remainingPathColor}"
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
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