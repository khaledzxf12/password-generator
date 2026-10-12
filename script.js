const passwordEl = document.getElementById('password');
const copyBtn = document.getElementById('copy-btn');
const lengthEl = document.getElementById('length');
const lengthValEl = document.getElementById('length-val');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateBtn = document.getElementById('generate-btn');
const themeToggle = document.getElementById('theme-toggle');
const strengthText = document.getElementById('strength-text');
const bar1 = document.getElementById('bar-1');
const bar2 = document.getElementById('bar-2');
const bar3 = document.getElementById('bar-3');

const charsUpper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const charsLower = 'abcdefghijklmnopqrstuvwxyz';
const charsNumbers = '0123456789';
const charsSymbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

lengthEl.addEventListener('input', (e) => {
  lengthValEl.textContent = e.target.value;
});

themeToggle.addEventListener('click', () => {
  const currentTheme = document.body.getAttribute('data-theme');
  if (currentTheme === 'dark') {
    document.body.removeAttribute('data-theme');
    themeToggle.textContent = '🌙';
  } else {
    document.body.setAttribute('data-theme', 'dark');
    themeToggle.textContent = '☀️';
  }
});

function evaluateStrength(password) {
  const len = password.length;
  if (len < 8) return 'Weak';

  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNum = /[0-9]/.test(password);
  const hasSym = /[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password);

  const typesCount = [hasUpper, hasLower, hasNum, hasSym].filter(Boolean).length;

  if (len >= 12 && typesCount >= 3) {
    return 'Strong';
  } else if (len >= 8 && typesCount >= 2) {
    return 'Medium';
  } else {
    return 'Weak';
  }
}

function updateStrengthUI(strength) {
  strengthText.textContent = strength;
  bar1.style.backgroundColor = 'var(--bar-default)';
  bar2.style.backgroundColor = 'var(--bar-default)';
  bar3.style.backgroundColor = 'var(--bar-default)';

  if (strength === 'Weak') {
    bar1.style.backgroundColor = 'var(--weak-color)';
  } else if (strength === 'Medium') {
    bar1.style.backgroundColor = 'var(--medium-color)';
    bar2.style.backgroundColor = 'var(--medium-color)';
  } else if (strength === 'Strong') {
    bar1.style.backgroundColor = 'var(--strong-color)';
    bar2.style.backgroundColor = 'var(--strong-color)';
    bar3.style.backgroundColor = 'var(--strong-color)';
  }
}

function generatePassword() {
  const length = parseInt(lengthEl.value);
  let availableChars = '';

  if (uppercaseEl.checked) availableChars += charsUpper;
  if (lowercaseEl.checked) availableChars += charsLower;
  if (numbersEl.checked) availableChars += charsNumbers;
  if (symbolsEl.checked) availableChars += charsSymbols;

  if (!availableChars) {
    passwordEl.value = '';
    strengthText.textContent = '-';
    bar1.style.backgroundColor = 'var(--bar-default)';
    bar2.style.backgroundColor = 'var(--bar-default)';
    bar3.style.backgroundColor = 'var(--bar-default)';
    return;
  }

  let generated = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * availableChars.length);
    generated += availableChars[randomIndex];
  }

  passwordEl.value = generated;
  const strength = evaluateStrength(generated);
  updateStrengthUI(strength);
}

generateBtn.addEventListener('click', generatePassword);

copyBtn.addEventListener('click', () => {
  if (!passwordEl.value) return;
  navigator.clipboard.writeText(passwordEl.value);
  copyBtn.textContent = 'Copied!';
  setTimeout(() => {
    copyBtn.textContent = 'Copy';
  }, 1500);
});

generatePassword();