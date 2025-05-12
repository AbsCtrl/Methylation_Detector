// Navigation helpers
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(page => page.classList.add('hidden'));
  document.getElementById(pageId).classList.remove('hidden');
}

// Global variables to store user inputs
let userData = {
  name: '',
  gender: 'Male',
  days: 0,
  marker: 'AHRR'
};

// Page 1 → Page 2
document.getElementById('startBtn').addEventListener('click', () => {
  document.getElementById('nameInput').value = '';
  document.getElementById('daysInput').value = '';
  userData.name = '';
  userData.days = 0;

  // Clear results
  document.getElementById('ahrrResult').textContent = '';
  document.getElementById('f2rl3Result').textContent = '';
  
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
  userData.name = document.getElementById('nameInput').value;
  userData.days = parseInt(document.getElementById('daysInput').value) || 0;

  // Example placeholder formulas (replace later)
  function calculateAHRR(days, gender) {
  if (days <= 0) return "Invalid (days must be > 0)";
  let result;
  if (gender === 'Female') {
    result = 1.2 / (1 + Math.exp(0.017 * (days - 66.442)));
  } else if (gender === 'Male') {
    result = 0.923 / (1 + Math.exp(0.032 * (days - 85.859)));
  } else {
    result = 1.2 / (1 + Math.exp(0.017 * (days - 66.169)));
  }
  return result.toFixed(4);
}

function calculateF2RL3(days, gender) {
  if (days <= 0) return "Invalid (days must be > 0)";
  let logTime = Math.log(days);
  let result;
  if (gender === 'Female') {
    result = 0.234 + 0.14 * logTime;
  } else if (gender === 'Male') {
    result = 0.254 + 0.132 * logTime;
  } else {
    result = 0.248 + 0.134 * logTime;
  }
  return result.toFixed(4);
}

// Page 2 → Page 3 or 4 with real formulas
document.getElementById('goBtn').addEventListener('click', () => {
  userData.name = document.getElementById('nameInput').value;
  userData.days = parseInt(document.getElementById('daysInput').value) || 0;

  // Validate days input
  if (userData.days <= 0 || isNaN(userData.days)) {
    alert("Please enter a valid number of days greater than 0.");
    return; // Stop, don’t continue
  }

  if (userData.marker === 'AHRR') {
    let result = calculateAHRR(userData.days, userData.gender);
    document.getElementById('ahrrResult').textContent = `AHRR Result for ${userData.name} (${userData.gender}): ${result}`;
    showPage('page3');
  } else {
    let result = calculateF2RL3(userData.days, userData.gender);
    document.getElementById('f2rl3Result').textContent = `F2RL3 Result for ${userData.name} (${userData.gender}): ${result}`;
    showPage('page4');
  }
});


});

// === PAGE 3 BUTTONS ===
document.getElementById('page3Btn1').addEventListener('click', () => {
  showPage('page4'); // Check out other page
});
document.getElementById('page3Btn2').addEventListener('click', () => {
  // Clear inputs
  document.getElementById('nameInput').value = '';
  document.getElementById('daysInput').value = '';
  userData.name = '';
  userData.days = 0;

  // Clear results
  document.getElementById('ahrrResult').textContent = '';
  document.getElementById('f2rl3Result').textContent = '';

  showPage('page2');
});
document.getElementById('page3Btn3').addEventListener('click', () => {
  showPage('page5'); // Done → Page 5 (we'll make soon)
});

// === PAGE 4 BUTTONS ===
document.getElementById('page4Btn1').addEventListener('click', () => {
  showPage('page3'); // Check out other page
});
document.getElementById('page4Btn2').addEventListener('click', () => {
  // Clear inputs
  document.getElementById('nameInput').value = '';
  document.getElementById('daysInput').value = '';
  userData.name = '';
  userData.days = 0;

  // Clear results
  document.getElementById('ahrrResult').textContent = '';
  document.getElementById('f2rl3Result').textContent = '';

  showPage('page2');
});
document.getElementById('page4Btn3').addEventListener('click', () => {
  showPage('page5'); // Done → Page 5 (we'll make soon)
});
