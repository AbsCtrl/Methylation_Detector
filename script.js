function estimatePercentile(value, gene) {
  let points;
  if (gene === "AHRR") {
    points = [
      { val: 0.55, pct: 10 }, // assumed min
      { val: 0.6309, pct: 25 },
      { val: 0.7417, pct: 50 },
      { val: 0.8208, pct: 75 },
      { val: 0.9, pct: 90 }   // assumed max
    ];
  } else if (gene === "F2RL3") {
    points = [
      { val: 0.5, pct: 10 },  // assumed min
      { val: 0.5685, pct: 25 },
      { val: 0.6311, pct: 50 },
      { val: 0.6883, pct: 75 },
      { val: 0.75, pct: 90 }  // assumed max
    ];
  } else {
    return null;
  }

  // Linear interpolation
  for (let i = 0; i < points.length - 1; i++) {
    let x0 = points[i].val, y0 = points[i].pct;
    let x1 = points[i + 1].val, y1 = points[i + 1].pct;
    if (value >= x0 && value <= x1) {
      let slope = (y1 - y0) / (x1 - x0);
      let pct = y0 + slope * (value - x0);
      return Math.round(pct);
    }
  }

  return value < points[0].val ? 5 : 95;
}

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

const ahrrFunFacts = [
  "AHRR is a gene that acts like your body's natural defense against the toxins in smoke. When you smoke, AHRR works overtime to protect you, but it's a signal that your body is stressed by the chemicals. 🧠 Good News: When you quit smoking, AHRR starts to relax and return to normal levels.",
  "After you quit smoking, the changes in your AHRR gene expression slowly reverse. Your body starts healing and acting more like a non-smoker again. 🧑‍🔬 Real Insight: Quitting smoking for 1 year already reduces your risk of heart disease by half!",
  "Even if you've smoked for years, quitting helps your body recover. AHRR gene expression and other health markers improve, reducing your risk of serious diseases like lung cancer and heart disease. 🧬 Real Insight: After 15 years of quitting, your heart disease risk is almost the same as a non-smoker's!",
  "Even if you only smoke occasionally, it still affects your AHRR gene. No amount of smoking is completely safe, and even light smokers face increased health risks.🏥 Real Insight: Even a few cigarettes can damage your lungs and raise your risk for heart disease.",
  "Smoking triggers changes in AHRR that make your body more vulnerable to cancer. By quitting, you're lowering your cancer risk significantly.🧑‍🔬 Real Insight: Former smokers who quit for 5+ years have half the risk of lung cancer compared to those who keep smoking.",
  "AHRR also impacts your immune system. Smoking weakens your ability to fight off infections and inflammation. Quitting restores your immune defenses and helps your body stay healthy. 🧬 Real Insight: Quitting can reduce your chances of getting respiratory infections and chronic diseases like COPD and arthritis.",
  "When you smoke, your lungs suffer, and AHRR gene expression is part of the reason. By quitting, you allow your lungs to start recovering and begin breathing easier. 🏃 Real Insight: After 2-3 weeks of quitting, your lung function improves, and you'll notice it's easier to exercise.",
  "Even if you're not the one smoking, secondhand smoke can change the AHRR gene in people around you, raising their risk for respiratory problems. Quitting smoking doesn't just protect you; it protects your loved ones, too. 🏠 Real Insight: Children and pets exposed to secondhand smoke have a higher risk of asthma and other lung diseases.",
  "Even if you've smoked for decades, quitting still gives your body the chance to repair itself. Over time, your AHRR expression and other markers of health return to normal levels. 🧠 Real Insight: After 10-15 years of quitting, your risk of stroke and heart disease drops to that of a non-smoker.",
  "Quitting smoking may feel hard, but every day you stay smoke-free is one step closer to better health. Your genes, like AHRR, start repairing themselves, and so does your body. 💪 Real Insight: Every day without cigarettes helps you lower your risk of cancer, heart disease, and respiratory issues."
];

const f2rl3FunFacts = [
  "F2RL3 is a gene that's heavily affected by smoking. It helps your body react to toxins from smoke, but when you smoke, it starts working overtime. 🧠 Good News: When you quit smoking, the stress on F2RL3 decreases, and it starts functioning like it should again.",
  "F2RL3 is part of your immune system, and smoking triggers it to go into high alert. It reacts by increasing inflammation and making you more vulnerable to disease. 🧑‍🔬 Real Insight: Once you quit, your inflammation levels drop, and F2RL3 expression returns to healthier levels.",
  "When you quit smoking, F2RL3 starts to recover. This gene regulates inflammation, and smoking disrupts it, but quitting lets your body heal. 🧬 Real Insight: After quitting for 1-3 months, you'll notice better lung function and reduced inflammation.",
  "It's not just heavy smokers who suffer — even light smoking disrupts the F2RL3 gene and increases your risk of heart disease and respiratory issues. 🏥 Real Insight: Even small amounts of smoking contribute to increased inflammation, which is linked to heart disease and lung problems.",
  "F2RL3 is linked to your body's inflammatory response. Smoking increases inflammation, but quitting allows the gene to “calm down,” reducing your body's inflammation.🧑‍🔬 Real Insight: After quitting for a year, your inflammation markers are much lower, making your body less prone to chronic diseases.",
  "Smoking turns on F2RL3 in a way that promotes respiratory issues like asthma and COPD. Quitting helps turn off this damaging signal, allowing your lungs to recover.🏃 Real Insight: Quitting smoking for 3-9 months can improve your lung function and reduce symptoms of asthma.",
  "Smoking makes F2RL3 trigger inflammation, which is a risk factor for heart disease. Quitting helps restore your gene's normal function, lowering your heart disease risk. 🧬 Real Insight: After 1 year of quitting, your risk of heart disease drops by half.",
  "F2RL3 is sensitive to the toxins in cigarettes, which means smoking keeps it activated. Quitting gives your body a chance to reset this gene and lower its response to harmful chemicals. 🧠 Real Insight: Your body starts detoxing and returning to normal after you quit, reducing the harmful effects of smoking.",
  "F2RL3 isn't just about inflammation; it also helps regulate your immune system. Smoking disrupts its function, but quitting boosts your immune system's ability to protect you from infections and diseases. 🏥 Real Insight: After quitting for a few months, your immune system becomes more efficient, reducing your chances of getting sick.",
  "Quitting smoking helps F2RL3 “reset” and allows your immune system to work properly again. While not everything can be fully reversed, many benefits start immediately. 💪 Real Insight: Even after smoking for years, quitting can reduce your risk of chronic diseases and improve your quality of life."
];

// === CALCULATION FUNCTIONS (move these up here) ===
function calculateAHRR(days, gender) {
  if (days <= 0) return "Invalid (days must be > 0)";
  let logTime = Math.log(days);
  let result;
  if (gender === 'Female') {
    result = 0.2342 + 0.1397 * logTime;
  } else if (gender === 'Male') {
    result = 0.254 + 0.1321 * logTime;
  } else {
    result = 0.2481 + 0.1344 * logTime;
  }
  return result.toFixed(4);
}

function calculateF2RL3(days, gender) {
  if (days <= 0) return "Invalid (days must be > 0)";
  let logTime = Math.log(days);
  let result;
  if (gender === 'Female') {
    result = 0.32 + 0.087 * logTime;
  } else if (gender === 'Male') {
    result = 0.32 + 0.087 * logTime;
  } else {
    result = 0.32 + 0.087 * logTime;
  }
  return result.toFixed(4);
}

// === BUTTON HANDLERS ===

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

// Page 2 → Page 3 or 4 with real formulas
document.getElementById('goBtn').addEventListener('click', () => {
  userData.name = document.getElementById('nameInput').value;
  userData.days = parseInt(document.getElementById('daysInput').value) || 0;

  // Validate days input
  if (userData.days <= 0 || isNaN(userData.days)) {
    alert("Please enter a valid number of days greater than 0.");
    return;
  }

  if (userData.marker === 'AHRR') {
    let result = calculateAHRR(userData.days, userData.gender);
    let numResult = parseFloat(result);
    let percentile = estimatePercentile(numResult, "AHRR");

    document.getElementById('ahrrResult').textContent = `AHRR Result for ${userData.name} (${userData.gender}): ${result}`;

    const percentileDiv = document.createElement('div');
    percentileDiv.textContent = `You are at the ${percentile}th percentile for former smokers!`;
    percentileDiv.style.marginTop = "10px";
    percentileDiv.style.fontWeight = "bold";
    document.getElementById('ahrrResult').appendChild(percentileDiv);

    showPage('page3');
  } else {
    let result = calculateF2RL3(userData.days, userData.gender);
    let numResult = parseFloat(result);
    let percentile = estimatePercentile(numResult, "F2RL3");

    document.getElementById('f2rl3Result').textContent = `F2RL3 Result for ${userData.name} (${userData.gender}): ${result}`;

    const percentileDiv = document.createElement('div');
    percentileDiv.textContent = `You are at the ${percentile}th percentile for former smokers!`;
    percentileDiv.style.marginTop = "10px";
    percentileDiv.style.fontWeight = "bold";
    document.getElementById('f2rl3Result').appendChild(percentileDiv);

    showPage('page4');
  }
});

// === PAGE 3 BUTTONS ===
document.getElementById('f2rl3FunFact').textContent = `F2RL3 Fun Fact: ${f2rl3FunFacts[Math.floor(Math.random() * 10)]}`;
document.getElementById('page3Btn1').addEventListener('click', () => {
  let result = calculateF2RL3(userData.days, userData.gender);
  let numResult = parseFloat(result);
  let percentile = estimatePercentile(numResult, "F2RL3");

  const resultContainer = document.getElementById('f2rl3Result');
  resultContainer.textContent = `F2RL3 Result for ${userData.name} (${userData.gender}): ${result}`;
  
  const percentileDiv = document.createElement('div');
  percentileDiv.textContent = `You are at the ${percentile}th percentile for former smokers!`;
  percentileDiv.style.marginTop = "10px";
  percentileDiv.style.fontWeight = "bold";
  resultContainer.appendChild(percentileDiv);

  showPage('page4');
});
document.getElementById('page3Btn2').addEventListener('click', () => {
  document.getElementById('nameInput').value = '';
  document.getElementById('daysInput').value = '';
  userData.name = '';
  userData.days = 0;
  document.getElementById('ahrrResult').textContent = '';
  document.getElementById('f2rl3Result').textContent = '';
  showPage('page2');
});
document.getElementById('page3Btn3').addEventListener('click', () => {
  showPage('page5');
});

// === PAGE 4 BUTTONS ===
document.getElementById('ahrrFunFact').textContent = `AHRR Fun Fact: ${ahrrFunFacts[Math.floor(Math.random() * 10)]}`;
document.getElementById('page4Btn1').addEventListener('click', () => {
  let result = calculateAHRR(userData.days, userData.gender);
  let numResult = parseFloat(result);
  let percentile = estimatePercentile(numResult, "AHRR");

  const resultContainer = document.getElementById('ahrrResult');
  resultContainer.textContent = `AHRR Result for ${userData.name} (${userData.gender}): ${result}`;
  
  const percentileDiv = document.createElement('div');
  percentileDiv.textContent = `You are at the ${percentile}th percentile for former smokers!`;
  percentileDiv.style.marginTop = "10px";
  percentileDiv.style.fontWeight = "bold";
  resultContainer.appendChild(percentileDiv);

  showPage('page3');
});
document.getElementById('page4Btn2').addEventListener('click', () => {
  document.getElementById('nameInput').value = '';
  document.getElementById('daysInput').value = '';
  userData.name = '';
  userData.days = 0;
  document.getElementById('ahrrResult').textContent = '';
  document.getElementById('f2rl3Result').textContent = '';
  showPage('page2');
});
document.getElementById('page4Btn3').addEventListener('click', () => {
  showPage('page5');
});
document.getElementById('endBtn').addEventListener('click', () => {
  showPage('page1');
});
