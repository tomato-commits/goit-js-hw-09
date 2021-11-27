import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector(".form");
const submitBtn = document.querySelector("button[type=submit]");

submitBtn.addEventListener("click", submit);

function submit(event) {
  event.preventDefault();

  const delay = +form["delay"].value;
  const step = +form["step"].value;
  const amount = +form["amount"].value;
  let accDelay = delay;

  for (let i = 0; i < amount; i++) {
    const position = i + 1;

    if (i) {
      accDelay += step;
    }
    
    createPromise(position, accDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
    
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
  
  return promise;
}
