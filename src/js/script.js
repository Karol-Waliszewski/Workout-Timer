function CountDown(m, s) {
  var $minutes = document.getElementById('minutes');
  var $seconds = document.getElementById('seconds');
  var $toggle = document.getElementById("toggle");

  var minutes = m,
    min = m;
  var seconds = s,
    sec = s;
  var ms = 0;
  var clock = null;

  var updateScreen = function() {
    $minutes.innerHTML = minutes;
    $seconds.innerHTML = (seconds < 10) ? "0" + seconds : seconds;
  }

  var countDown = function() {
    ms++;
    if (ms % 200 == 0) {
      if (seconds == 0) {
        minutes--;
        seconds = 59;
      } else {
        seconds--;
      }
      updateScreen();
      if (minutes == 0 && seconds == 0) {
        stop();
      }
    }
  }

  var start = function() {
    if (minutes == 0 && seconds == 0) {
      reset();
    }
    updateScreen();
    if (clock == null)
      clock = setInterval(countDown, 5);

    $toggle.innerHTML = "||";
  }

  var stop = function() {
    clearInterval(clock);
    clock = null;
    $toggle.innerHTML = ">";
  }

  var reset = function() {
    minutes = min;
    seconds = sec;
    ms = 0;
    updateScreen();
  }

  var updateTimer = function(m, s) {
    min = m;
    sec = s;
    reset();
  }

  updateScreen();

  return {
    start,
    stop,
    reset,
    updateTimer
  }

}

function Timer({
  minutes,
  seconds,
  id,
  color
}) {
  const progressBarId = id;
  const $title = document.getElementById("title");

  var countDown,
    progress,
    running = false,
    clock = null,
    callback = null,
    ms = 0,m,s;

  var updateTimer = function({
    minutes,
    seconds,
    title
  }) {
    $title.innerHTML = title || $title.innerHTML;
    m = minutes % 60 + parseInt(seconds / 60) || 0,
      s = seconds % 60 || 30;
      countDown.updateTimer(m, s);
  }

  var start = function(cb) {
    countDown.start();
    progress.animate(1.0, {
      duration: 1000 * (s + m * 60) - 1000 * (s + m * 60) * progress.value()
    });

    running = true;
    console.log('start')
    clock = setInterval(function() {
      ms += 5;
    }, 5);

    callback = setTimeout(function() {
      clearInterval(clock);
      updateTimer({seconds:10,title:"REST"});
      reset();
      start();

    }, 1000 * (s + m * 60) - ms)

  }

  var stop = function() {
    countDown.stop();
    progress.stop();
    running = false;
    console.log('stop');
    clearInterval(clock);
    clearTimeout(callback);
    clock = null;
  }

  var reset = function() {
    if (progress) {
      stop();
      progress.set(0);
      countDown.reset();
      ms = 0;
    }
  }

  var isRunning = function() {
    return running;
  }

  var init = function() {
    countDown = new CountDown(m, s);
    progress = new ProgressBar.Circle(document.getElementById(progressBarId), {
      strokeWidth: 3,
      duration: 1000 * (s + m * 60),
      color: color || '#FFFFFF',
      trailColor: '#FFFFFF',
      trailWidth: 1,
      svgStyle: {
        width: "100%",
        display: "block"
      }
    });
    updateTimer({minutes,seconds});
  }

  init();

  return {
    start,
    stop,
    reset,
    isRunning
  }
}

let t = new Timer({
  minutes: 0,
  seconds: 2,
  id: "progress"
});

document.getElementById("reset").addEventListener('click', t.reset);

document.getElementById("toggle").addEventListener('click', function() {

  if (t.isRunning() == true) {
    t.stop();

  } else {
    t.start();

  }
});