let timerFinished = false;
(function () {

    let endDate = Date.parse(new Date()) + 10 * 24 * 60 * 60 * 1000;
    if(!localStorage.getItem('endTimer')) {
        // localStorage.setItem('endTimer', Date.parse(new Date()) + 10 * 24 * 60 * 60 * 1000);

        // 5 sec from now (refresh twice to see this)
        localStorage.setItem('endTimer', Date.parse(new Date()) + 5 * 1000);
    } else {
        endDate = Number(localStorage.getItem('endTimer'));
    }

    // console.log(endDate, typeof endDate);

    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date());
        let seconds = Math.floor((t / 1000) % 60);
        let minutes = Math.floor((t / 1000 / 60) % 60);
        let hours = Math.floor((t / (1000 * 60 * 60)) % 24);
        let days = Math.floor(t / (1000 * 60 * 60 * 24));
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function initializeClock(id, endtime) {
        let clock = document.getElementById(id);
        let daysSpan = clock.querySelector('.days');
        let hoursSpan = clock.querySelector('.hours');
        let minutesSpan = clock.querySelector('.minutes');
        let secondsSpan = clock.querySelector('.seconds');

        function updateClock() {
            let t = getTimeRemaining(endtime);

            daysSpan.innerHTML = t.days;
            hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
            minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
            secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

            if (t.total <= 0) {
                clearInterval(timeinterval);
                timerFinished = true;
                // console.log(timerFinished)
            }
        }

        updateClock();
        let timeinterval = setInterval(updateClock, 1000);
    }

    let deadline = new Date(endDate); // for endless timer

    if(new Date(Number(localStorage.getItem('endTimer'))) > new Date()) {
        // console.log(timerFinished)
        initializeClock('countdown', deadline);
    } else {
        timerFinished = true;
        // console.log(timerFinished)
    }
}());

console.log(timerFinished);
// Use timerFinished variable to know if timer is finished counting
