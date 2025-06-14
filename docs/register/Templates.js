// Templates.js

export function participantTemplate(count) {
  return `
    <section class="participant participant${count}">
      <p>Participant ${count}</p>
      <div class="item">
        <label for="fname${count}">First Name<span>*</span></label>
        <input id="fname${count}" type="text" name="fname${count}" required />
      </div>
      <div class="item activities">
        <label for="activity${count}">Activity #<span>*</span></label>
        <input id="activity${count}" type="text" name="activity${count}" />
      </div>
      <div class="item">
        <label for="fee${count}">Fee ($)<span>*</span></label>
        <input id="fee${count}" type="number" name="fee${count}" />
      </div>
      <div class="item">
        <label for="date${count}">Desired Date <span>*</span></label>
        <input id="date${count}" type="date" name="date${count}" />
      </div>
      <div class="item">
        <p>Grade</p>
        <select name="grade${count}">
          <option selected value="" disabled></option>
          ${[...Array(12)].map((_, i) => `<option value="${i + 1}">${i + 1}${getOrdinal(i + 1)}</option>`).join('')}
        </select>
      </div>
    </section>
  `;
}

function getOrdinal(n) {
  if (n === 1) return 'st';
  if (n === 2) return 'nd';
  if (n === 3) return 'rd';
  return 'th';
}

export function successTemplate(info) {
  return `
    <h2>Thank you ${info.name} for registering.</h2>
    <p>You have registered ${info.participants} participant(s) and owe $${info.total} in fees.</p>
  `;
}
