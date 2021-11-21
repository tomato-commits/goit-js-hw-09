import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBtn = document.querySelector('button[data-start]');
const daysElement = document.querySelector('.value[data-days]');
const hoursElement = document.querySelector('.value[data-hours]');
const minutesElement = document.querySelector('.value[data-minutes]');
const secondsElement = document.querySelector('.value[data-seconds]');

// disabled until valid date selected
startBtn.disabled = true;
startBtn.addEventListener('click', start);

let date;
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        date = selectedDates[0];
      
        if (date < new Date()) {
            // selected date is in the past
            Notify.failure('Please choose a date in the future');
        } else {
            startBtn.disabled = false;
        }
    },
};

flatpickr('#datetime-picker', options);

function start() {
    // start countdown immediately, then run interval
    countdown();

    timerId = setInterval(countdown, 1000);
}

function countdown() {
    const now = new Date();

    let dates = convertMs(date - now);
    let { days, hours, minutes, seconds } = dates;

    daysElement.textContent = addLeadingZero(days);
    hoursElement.textContent = addLeadingZero(hours);
    minutesElement.textContent = addLeadingZero(minutes);
    secondsElement.textContent = addLeadingZero(seconds);
    
    const isFinished = Object.keys(dates).every(date => dates[date] === 0);

    if (isFinished) {
        startBtn.disabled = false;

        clearInterval(timerId);
        daysElement.textContent = '00';
        hoursElement.textContent = '00';
        minutesElement.textContent = '00';
        secondsElement.textContent = '00';
    } else {
        startBtn.disabled = true;
    }
};

function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}
