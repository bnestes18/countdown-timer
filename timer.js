;(function() {
    let app = document.querySelector('#app');
    let start = 60;

    // Create the data object with the start time
    let data = {
        timer: start
    };

    /**
     * This function counts down the timer from 60 to 0 seconds 
     * and render to the UI each second
     */
    let startCountDown = function() {
            // If timer does not exist, break out the function
            if (!data.timer) return;

            // Otherwise, render the inital start of the timer 
            render();
            // Start counting down
            let countDown = window.setInterval(function () {
            
            // Decrease the timer by 1
            data.timer--;
            render();

            if (data.timer === 0) {
                window.clearInterval(countDown);
                showButton();
            }
        }, 1000);
    }
    /**
     * This function sets up the UI template that will render to the DOM
     */
    let template = function () {
        return '<h1>Countdown Timer</h1>' +
               '<p> :' + data.timer + '</p>';
    };
    /**
     * This function renders the template to the DOM
     */
    let render = function () {
        app.innerHTML = template();
    }
    /**
     * This function renders a button to the DOM
     */
    let showButton = function() {
        app.innerHTML += '<button>Reset</button>';
    }
    /**
     * This function restarts the timer upon a click event
     */
    let handleClick = function(e) {
        // Check if the targeted element is the Reset button
        if (!e.target.matches('button')) return;
            
            console.log('I am the button!');
            data.timer = start;
            startCountDown();
            
    }

    // Start the timer on initial load
    startCountDown();

    // Listens for 'click' event in the DOM
    document.addEventListener('click', handleClick, false)


})();