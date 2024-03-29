;
(function () {

    // GLOBAL VARIABLES
    let app = document.querySelector('#app');
    let start = 120;

    // Create the data object with the start time
    let data = {
        timer: start,
        done: false,
        paused: true
    };


    // FUNCTIONS

    /**
     * This function sets up the UI template that will render to the DOM
     */
    let template = function () {
        let html = '<h1>Countdown Timer</h1>' +
            '<p>' + formatTime(data.timer) + '</p>' +
            (data.paused ? '<button id="start">Start</button>' : '<button id="pause">Pause</button>') +
            '<button id="reset">Restart Timer</button>';

        return html;

    };
    /**
     * This function renders the template to the DOM
     */
    let render = function () {
        // If no changes to the UI have been made, break out of the function
        if (app.innerHTML === template()) return;

        // Otherwise, render the template to the DOM
        app.innerHTML = template();
    }
    /**
     * This function runs the count down of the timer
     */
    let startCountDown = function () {

        setData({
            paused: false
        });
        countDown = window.setInterval(function () {

            // Get the new timer value
            let time = data.timer - 1;

            // If the timer hits 0, set as done
            let done = time === 0 ? true : false

            // Update data and render a fresh UI
            setData({
                timer: time,
                done: done
            });

            // If the timer is done, stop it from running
            if (done) {
                stopCountDown();
            }

        }, 1000);
    }
    /**
     * This function stops the count down of the timer
     */
    let stopCountDown = function () {
        setData({
            paused: true
        });
        window.clearInterval(countDown);
    }
    /**
     * This function starts the timer
     */
    let startTimer = function () {

        // Clear any existing timers
        stopCountDown();

        // Update the timer every second
        startCountDown();

        // Set the timer property back to the intial start time and done property to false and run an initial render
        setData({
            timer: start,
            done: false
        });
    }
    /**
     * This function converts the timer into M:SS format
     */
    let formatTime = function (time) {

        // Get the minutes and seconds
        let M = Math.floor(time / 60);
        let SS = time % 60;
        // Appends a 0 to the beginning of the seconds string
        // if only one digit is displayed for seconds
        return M + ':' + SS.toString().padStart(2, '0');
    }
    /*
     * This function creates an immutable copy of the data
     * @return {Object} A copy of the data
     */
    let getData = function () {
        return JSON.parse(JSON.stringify(data))
    }
    /*
     * Reactively update the data object
     * @param {Object} obj The updated data
     */
    let setData = function (obj) {
        // Update the data object
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                data[key] = obj[key];
            }
        }
        // Render a new UI
        render();
    }
    /**
     * This function restarts the timer upon a click event
     */
    let handleClick = function (e) {
        // If the targeted element is the Reset button...
        if (e.target.matches('#reset')) {
            // Start the timer
            startTimer();
        }
        // If the targeted element is the Start button...
        if (e.target.matches('#start')) {
            // Start counting down
            startCountDown();
        }
        // If the targeted element is the Pause button...
        if (e.target.matches('#pause')) {
            // Stop the count down from running
            stopCountDown();
        }

    }

    // Start the timer on initial load
    render();

    // Listens for 'click' event on Reset button in the DOM
    document.addEventListener('click', handleClick, false);

})();