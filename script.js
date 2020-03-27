class Timer {
    constructor(hours = 10, counterClassName) {
        this.timeinterval = null;
        this.timerFinished = false;
        this.couterWrpClass = counterClassName;
        this.endDate = Date.parse(new Date()) + Number(hours) * 60 * 60 * 1000;
        if(!localStorage.getItem('endTimer')) {
            // 5 sec
            // localStorage.setItem('endTimer', Date.parse(new Date()) + 5 * 1000);
            localStorage.setItem('endTimer', this.endDate);


        } else {
            this.endDate = Number(localStorage.getItem('endTimer'));
        }

        this.deadline = new Date(this.endDate); // for endless timer

        if(new Date(Number(localStorage.getItem('endTimer'))) > new Date()) {
            this.initializeClock(this.couterWrpClass, this.deadline);
        } else {
            this.timerFinished = true;
            let clocks = document.querySelectorAll('.'+this.couterWrpClass);
            for(let i = 0; i <= clocks.length-1; i++) {
                clocks[i].classList.add('counter-out');
            }
        }
    }

    getTimeRemaining = (endtime) =>  {
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
    };

    initializeClock = (className, endtime) => {

            let clocks = document.querySelectorAll('.'+className);
            for(let i = 0; i <= clocks.length-1; i++) {
                clocks[i].days = clocks[i].querySelector('.days');
                clocks[i].hours = clocks[i].querySelector('.hours');
                clocks[i].minutes = clocks[i].querySelector('.minutes');
                clocks[i].seconds = clocks[i].querySelector('.seconds');
            }

        const updateClock = () => {


            let t = this.getTimeRemaining(endtime);

            for(let i = 0; i <= clocks.length-1; i++) {
                clocks[i].days.innerHTML = ('0' + t.days).slice(-2);
                clocks[i].hours.innerHTML = ('0' + t.hours).slice(-2);
                clocks[i].minutes.innerHTML = ('0' + t.minutes).slice(-2);
                clocks[i].seconds.innerHTML = ('0' + t.seconds).slice(-2);
            }


            if (t.total <= 0) {
                clearInterval(this.timeinterval);
                this.timerFinished = true;
                for(let i = 0; i <= clocks.length-1; i++) {
                    clocks[i].classList.add('counter-out');
                }
            }
        };

        updateClock();
        this.timeinterval = setInterval(updateClock, 1000);
    }
}

let a = new Timer(48, 'countdown');