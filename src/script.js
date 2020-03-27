class Timer {
    constructor(staticDate = false, dateOrHours = 10, counterClassName, counterOffClass = 'counter-out') {
        this.timeInterval = null;
        this.timerFinished = false;
        this.couterWrpClass = counterClassName;
        this.counterOffClass = counterOffClass;
        this.staticDate = staticDate;
        this.storageItemName = counterClassName + 'EndTimer';

        if(!this.staticDate) {
            this.endDate = Date.parse(new Date()) + Number(dateOrHours) * 60 * 60 * 1000;
            if (!localStorage.getItem(this.storageItemName)) {
                // 5 sec
                // localStorage.setItem(this.storageItemName, Date.parse(new Date()) + 5 * 1000);
                localStorage.setItem(this.storageItemName, this.endDate);

            } else {
                this.endDate = Number(localStorage.getItem(this.storageItemName));
            }
        } else {
            this.endDate = Date.parse(dateOrHours);
        }

        this.deadline = new Date(this.endDate);

        if(new Date(this.endDate) > new Date()) {
            this.initializeClock(this.couterWrpClass, this.deadline);
        } else {
            this.timerFinished = true;
            let clocks = document.querySelectorAll('.'+this.couterWrpClass);
            for(let i = 0; i <= clocks.length-1; i++) {
                clocks[i].classList.add(this.counterOffClass);
            }
        }

    }

    getTimeRemaining(endtime)  {
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

    initializeClock(className, endtime) {

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
                clearInterval(this.timeInterval);
                this.timerFinished = true;
                for(let i = 0; i <= clocks.length-1; i++) {
                    clocks[i].classList.add(this.counterOffClass);
                }
            }
        };

        updateClock();
        this.timeInterval = setInterval(updateClock, 1000);
    }
}

let a = new Timer( false, 48, 'countdown', 'counter-out');

let b = new Timer( false, 162, 'second-counter', 'counter-out');

let c = new Timer(true, 'Mar 28 2020', 'countdown2', 'counter-out');


// console.log(a);