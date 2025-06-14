// register.js
import { participantTemplate, successTemplate } from './Templates.js';

let participantCount = 1;

document.addEventListener("DOMContentLoaded", () => {
  const addButton = document.querySelector("#add");
  const form = document.querySelector("form");
  const summary = document.querySelector("#summary");

  // Handle Add Participant
  addButton.addEventListener("click", () => {
    participantCount++;
    const newHTML = participantTemplate(participantCount);
    addButton.insertAdjacentHTML("beforebegin", newHTML);
  });

  // Handle Form Submit
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const total = totalFees();
    const name = document.querySelector("#adult_name").value;

    const info = {
      name: name,
      participants: participantCount,
      total: total
    };

    form.style.display = "none";
    summary.innerHTML = successTemplate(info);
    summary.style.display = "block";
  });
});

function totalFees() {
  let feeElements = document.querySelectorAll("[id^=fee]");
  feeElements = [...feeElements];

  const total = feeElements.reduce((sum, el) => {
    const fee = parseFloat(el.value) || 0;
    return sum + fee;
  }, 0);

  return total;
}
