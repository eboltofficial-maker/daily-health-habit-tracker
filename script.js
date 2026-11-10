const boxes = [...document.querySelectorAll('input[data-habit]')];
const today = new Date().toISOString().slice(0, 10);
const storageKey = `health-habits-${today}`;

document.getElementById('date').textContent =
  new Date().toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });

function updateProgress() {
  const completed = boxes.filter(box => box.checked).length;
  const percent = Math.round((completed / boxes.length) * 100);
  document.getElementById('progress-text').textContent = `${completed} of ${boxes.length} completed`;
  document.getElementById('progress-percent').textContent = `${percent}%`;
  document.getElementById('progress-bar').style.width = `${percent}%`;
  localStorage.setItem(storageKey, JSON.stringify(
    boxes.filter(box => box.checked).map(box => box.dataset.habit)
  ));
}

try {
  const saved = JSON.parse(localStorage.getItem(storageKey) || '[]');
  boxes.forEach(box => { box.checked = saved.includes(box.dataset.habit); });
} catch {
  localStorage.removeItem(storageKey);
}

boxes.forEach(box => box.addEventListener('change', updateProgress));
document.getElementById('reset').addEventListener('click', () => {
  boxes.forEach(box => { box.checked = false; });
  updateProgress();
});
updateProgress();
