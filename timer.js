;(function() {

    // GLOBAL VARIABLES
    let app = document.querySelector('#app');
    let start = 120;

    // Create the data object with the start time
    let data = {
        timer: start
    };

    let countDown = window.setInterval(function () {
            
        // Decrease the timer by 1
        data.timer--;
        render();
    
        if (data.timer === 0) {
            window.clearInterval(countDown);
            showResetButton();
        }
    }, 1000);
    
    


    // FUNCTIONS
    let pauseCountDown = function () {
        window.clearInterval(countDown);
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
    /**
     * This function sets up the UI template that will render to the DOM
     */
    let template = function () {
        return '<h1>Countdown Timer</h1>' +
               '<p>' + formatTime(data.timer) + '</p>' +
               '<button id="start">Start</button>' +
               '<button id="pause">Pause</button>';

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
     * This function renders a button to the DOM
     */
    let showResetButton = function() {
        app.innerHTML += '<button id="reset">Restart Timer</button>';
    }
    /**
     * This function restarts the timer upon a click event
     */
    let handleClick = function(e) {
        // If the targeted element is the Reset button...
        if (e.target.matches('#reset')) {
            console.log('I am the reset button')
            // ...Set the timer property back to the intial start time
            data.timer = start;
            // Start the countdown
            render();
            let countDown = window.setInterval(function () {
            
        // Decrease the timer by 1
        data.timer--;
        render();
    
        if (data.timer === 0) {
            window.clearInterval(countDown);
            showResetButton();
        }
    }, 1000);

        }   

        if (e.target.matches('#start')) {
            console.log('I am the start button');
            
            let resumeCountDown = window.setInterval(function() {
                    data.timer--;
                    render();

                    if (data.timer === 0) {
                        window.clearInterval(resumeCountDown);
                        showResetButton();
                    }
            }, 1000);
            
        }

        if (e.target.matches('#pause')) {
            console.log('I am the pause button');
            pauseCountDown();
            
        }
            
           
    }

    // Start the timer on initial load
    render();

    // Listens for 'click' event on Reset button in the DOM
    document.addEventListener('click', handleClick, false);

    


})();