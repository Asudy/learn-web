function startTimer() {
    timerInterval = setInterval(() => {
  // The time left label is updated
      document.getElementById("timer").innerHTML = formatTime(timePassed);
      
      // The amount of time passed increments by one
      timePassed = timePassed + 1;
      timeLeft = TIME_LIMIT - timePassed;
  
      if (timeLeft < 0) {
          clearInterval(timerInterval)
      }
      
      
    }, 100);
      return timerInterval;
  }
  
  function formatTime(time) {
      let hours = Math.floor(time / 60);
      let minutes = Math.floor(time / 60);
      let seconds = time % 60;
  
      if (seconds < 10) {
          seconds = `0${seconds}`;
      }
      if (minutes < 10) {
          minutes = `0${minutes}`;
      }
  
      return `${minutes}:${seconds}`;
  }
  TIME_LIMIT = 300
  timePassed = 0
  h1 = document.createElement('h1')
  h1.style='font-family: Avenir Black; font-style: italic'
  h1.class = "random-head"
  h1.id = "timer"
  h1.innerHTML="00:00"
  document.body.appendChild(h1);
  interval = startTimer()