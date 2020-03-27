'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Timer = function () {
    function Timer() {
        var hours = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
        var counterClassName = arguments[1];

        _classCallCheck(this, Timer);

        this.timeinterval = null;
        this.timerFinished = false;
        this.couterWrpClass = counterClassName;
        this.endDate = Date.parse(new Date()) + Number(hours) * 60 * 60 * 1000;
        if (!localStorage.getItem('endTimer')) {
            // 5 sec
            // localStorage.setItem('endTimer', Date.parse(new Date()) + 5 * 1000);
            localStorage.setItem('endTimer', this.endDate);
        } else {
            this.endDate = Number(localStorage.getItem('endTimer'));
        }

        this.deadline = new Date(this.endDate); // for endless timer

        if (new Date(Number(localStorage.getItem('endTimer'))) > new Date()) {
            this.initializeClock(this.couterWrpClass, this.deadline);
        } else {
            this.timerFinished = true;
            var clocks = document.querySelectorAll('.' + this.couterWrpClass);
            for (var i = 0; i <= clocks.length - 1; i++) {
                clocks[i].classList.add('counter-out');
            }
        }
    }

    _createClass(Timer, [{
        key: 'getTimeRemaining',
        value: function getTimeRemaining(endtime) {
            var t = Date.parse(endtime) - Date.parse(new Date());
            var seconds = Math.floor(t / 1000 % 60);
            var minutes = Math.floor(t / 1000 / 60 % 60);
            var hours = Math.floor(t / (1000 * 60 * 60) % 24);
            var days = Math.floor(t / (1000 * 60 * 60 * 24));
            return {
                'total': t,
                'days': days,
                'hours': hours,
                'minutes': minutes,
                'seconds': seconds
            };
        }
    }, {
        key: 'initializeClock',
        value: function initializeClock(className, endtime) {
            var _this = this;

            var clocks = document.querySelectorAll('.' + className);
            for (var i = 0; i <= clocks.length - 1; i++) {
                clocks[i].days = clocks[i].querySelector('.days');
                clocks[i].hours = clocks[i].querySelector('.hours');
                clocks[i].minutes = clocks[i].querySelector('.minutes');
                clocks[i].seconds = clocks[i].querySelector('.seconds');
            }

            var updateClock = function updateClock() {

                var t = _this.getTimeRemaining(endtime);

                for (var _i = 0; _i <= clocks.length - 1; _i++) {
                    clocks[_i].days.innerHTML = ('0' + t.days).slice(-2);
                    clocks[_i].hours.innerHTML = ('0' + t.hours).slice(-2);
                    clocks[_i].minutes.innerHTML = ('0' + t.minutes).slice(-2);
                    clocks[_i].seconds.innerHTML = ('0' + t.seconds).slice(-2);
                }

                if (t.total <= 0) {
                    clearInterval(_this.timeinterval);
                    _this.timerFinished = true;
                    for (var _i2 = 0; _i2 <= clocks.length - 1; _i2++) {
                        clocks[_i2].classList.add('counter-out');
                    }
                }
            };

            updateClock();
            this.timeinterval = setInterval(updateClock, 1000);
        }
    }]);

    return Timer;
}();

var a = new Timer(48, 'countdown');
console.log(a);