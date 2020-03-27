## How to use

First check clone this repository and open index.html file to see how it Timers can do their job.

All you need:

1. Get file dist/script.js and include it to you're html file.
2. Create new instance of Timer class

Example:
``` javascript
new Timer(staticDate, dateOrHours, counterClassName, counterOffClass);
```

In you're html you have to have structure like this

````html
<div class="countdown">
    <div class="countdown-number">
        <span class="days countdown-time"></span>
        <span class="countdown-text">Days</span>
    </div>
    <div class="countdown-number">
        <span class="hours countdown-time"></span>
        <span class="countdown-text">Hours</span>
    </div>
    <div class="countdown-number">
        <span class="minutes countdown-time"></span>
        <span class="countdown-text">Minutes</span>
    </div>
    <div class="countdown-number">
        <span class="seconds countdown-time"></span>
        <span class="countdown-text">Seconds</span>
    </div>
</div>
````
<hr>

Timer instance accepts next parameters:

````javascript
    staticDate: true || false (Boolean)
````
 <b>true</b> - time will be counted to date that passed in second parameter <b>dateOrHours</b>
 
 <b>false</b> - time will be counted for individual user every new user will have uniq timer
 you need also set how mach hours it timer should count in <b>dateOrHours</b> parameter.
 
 ````javascript
     dateOrHours: 'Mar 28 2030' || 24 (Date string or Number)
 ````
Look at <b>staticDate</b> parameter above

 ````javascript
     counterClassName: 'countdown' (String)
 ````
<b>countdown</b> - this is a class name of our timer wrapper, look at HTML example above
this HTML element should contain elements with such class names <b>.days, .hours, minutes, seconds</b>.

Check HTML example above.

 ````javascript
     counterClassName: 'countdown-out' (String)
 ````
<b>countdown-out</b> - class name that will be added to counter wrapper after Timer will stop.

<b>
P.S</b> <i>If you have any questions just contact me by my email <a href="mailto:shaitan.vladimir@gmail.com">shaitan.vladimir@gmail.com</a> 
you also can contact me via my web-site: <br> <a href="https://vs-dev.info/" target="_blank">vs-dev.info</a>  
</i>