// Navigation helpers
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(page => page.classList.add('hidden'));
  document.getElementById(pageId).classList.remove('hidden');
}

// Global variables to store user inputs
let userData = {
  coverTitle: '',
  inputTitle: '',
  name: '',
  gender: 'Male',
  days: 0,
  marker: 'AHRR'
};

// Page 1 → Page 2
document.getElementById('startBtn').addEventListener('click', () => {
  userData.coverTitle = document.getElementById('coverTitle').value;
  showPage('page2');
});

// Gender toggle
document.getElementById('genderBtn').addEventListener('click', () => {
  userData.gender = userData.gender === 'Male' ? 'Female' : 'Male';
  document.getElementById('genderBtn').textContent = userData.gender;
});

// Marker toggle (AHRR / F2RL3)
document.getElementById('markerBtn').addEventListener('click', () => {
  userData.marker = userData.marker === 'AHRR' ? 'F2RL3' : 'AHRR';
  document.getElementById('markerBtn').textContent = userData.marker;
});

// Page 2 → Page 3 or 4
document.getElementById('goBtn').addEventListener('click', () => {
  userData.inputTitle = document.getElementById('inputTitle').value;
  userData.name = document.getElementById('nameInput').value;
  userData.days = parseInt(document.getElementById('daysInput').value) || 0;

  // Example placeholder formulas (replace later)
  if (userData.marker === 'AHRR') {
    let result = `AHRR Result for ${userData.name}: ${(userData.days * 2) + 5}`;
    document.getElementById('ahrrResult').textContent = result;
    showPage('page3');
  } else {
    let result = `F2RL3 Result for ${userData.name}: ${(userData.days * 3) + 10}`;
    document.getElementById('f2rl3Result').textContent = result;
    showPage('page4');
  }
});
