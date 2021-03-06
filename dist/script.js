'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Timer = function () {
    function Timer() {
        var staticDate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        var dateOrHours = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
        var counterClassName = arguments[2];
        var counterOffClass = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'counter-out';

        _classCallCheck(this, Timer);

        this.timeInterval = null;
        this.timerFinished = false;
        this.couterWrpClass = counterClassName;
        this.couterWrpDOMEl = document.querySelectorAll('.' + counterClassName);
        this.counterOffClass = counterOffClass;
        this.staticDate = staticDate;
        this.storageItemName = counterClassName + 'EndTimer';
        this.createEvents();

        if (!this.staticDate) {
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

        if (new Date(this.endDate) > new Date()) {
            this.events().beforeInit();
            this.initializeClock(this.couterWrpClass, this.deadline);
        } else {
            this.timerFinished = true;
            var clocks = document.querySelectorAll('.' + this.couterWrpClass);
            for (var i = 0; i <= clocks.length - 1; i++) {
                clocks[i].classList.add(this.counterOffClass);
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
                    clearInterval(_this.timeInterval);
                    _this.timerFinished = true;
                    for (var _i2 = 0; _i2 <= clocks.length - 1; _i2++) {
                        clocks[_i2].classList.add(_this.counterOffClass);
                    }
                }
            };

            updateClock();
            this.timeInterval = setInterval(updateClock, 1000);
        }
    }, {
        key: 'stopTimer',
        value: function stopTimer() {
            clearInterval(this.timeInterval);
            var clocks = document.querySelectorAll('.' + this.couterWrpClass);
            this.timerFinished = true;
            for (var i = 0; i <= clocks.length - 1; i++) {
                clocks[i].classList.add(this.counterOffClass);
            }
        }
    }, {
        key: 'createEvents',
        value: function createEvents() {
            this.beforeInit = new Event('counterBeforeInit');
            this.beforeInit.timer = this;
        }
    }, {
        key: 'events',
        value: function events() {
            var _this2 = this;

            return {
                beforeInit: function beforeInit() {
                    _this2.couterWrpDOMEl[0].dispatchEvent(_this2.beforeInit);
                }
            };
        }
    }]);

    return Timer;
}();

var a = new Timer(false, 48, 'countdown', 'counter-out');

var b = new Timer(false, 162, 'second-counter', 'counter-out');

var c = new Timer(true, 'May 28 2020', 'countdown2', 'counter-out');

var d = new Timer(false, 162, 'second-counter', 'counter-out');

// Custom event
var e = function () {
    var coundownClass = 'countdown3';
    document.addEventListener('counterBeforeInit', function (e) {
        console.log("Hi i'm before init event, nice to meet you");
        if (e.target.classList.contains(coundownClass)) {
            setTimeout(function () {
                e.timer.stopTimer();
            }, 5000);
        }
    }, true);
    return new Timer(false, 48, 'countdown3', 'counter-out');
}();

// console.log(a);