/* =========================================================
   CYBERWISE - script.js
   Member 3 (JavaScript Developer): all interactive features.

   Concepts used: variables, arrays/objects, functions, events,
   conditions (if/else), loops, input validation, localStorage.
   ========================================================= */
'use strict';

/* ---------------------------------------------------------
   1. DATA  (arrays and objects)
   --------------------------------------------------------- */
const CYBER_TIPS = [
  'Turn on two-factor authentication (2FA) for your email first. It protects all your other accounts.',
  'A long passphrase of random words is stronger and easier to remember than a short complex password.',
  'Never share your OTP or verification code with anyone, even if they say they are from support.',
  'Hover over a link before you click it to see where it really goes.',
  'Free Wi-Fi is convenient but risky. Avoid banking or logging in to important accounts on it.',
  'Update your phone and apps. Updates fix security holes that attackers use.',
  'If a message creates panic or urgency, slow down. Scammers rely on rushing you.'
];

// Threat data. Each threat has a category: scam, malware or account
const THREATS = [
  { cat: 'scam', emoji: '🎣', name: 'Phishing', short: 'Fake emails and messages that steal logins',
    what: 'Attackers pretend to be a trusted company, school or friend to trick you into entering your password or personal data on a fake page.',
    signs: ['Urgent or scary wording ("Your account will be closed!")', 'Sender address or link looks slightly wrong (like paypa1.com)', 'Generic greeting and spelling mistakes', 'Asks you to log in through a link'],
    safe: ['Do not click. Open the official site or app yourself.', 'Check the real sender address and hover over links.', 'Report and delete the message.'] },
  { cat: 'scam', emoji: '📱', name: 'Smishing and Vishing', short: 'Scams by text message and phone call',
    what: 'Smishing is phishing through SMS. Vishing is phishing through voice calls. They claim to be a bank, delivery service, prize promo or government office.',
    signs: ['Unknown number with a link to "claim" or "track" something', 'Caller asks for OTP, PIN or card details', 'Pressure to act right now'],
    safe: ['Never give OTP, PIN or passwords by text or call.', 'Hang up and call the official number yourself.', 'Block and report the number.'] },
  { cat: 'scam', emoji: '🧠', name: 'Social Engineering', short: 'Tricking people instead of hacking computers',
    what: 'Attackers manipulate emotions such as fear, trust or curiosity to make you give information or access. This includes fake job offers, fake scholarships and friends asking for load or money.',
    signs: ['Too good to be true offers', 'Someone you just met online asks for personal details', 'A friend suddenly asks for money or a code'],
    safe: ['Verify through another channel, like calling the friend.', 'Share personal details only when you are sure who is asking.', 'Take your time before you act.'] },
  { cat: 'malware', emoji: '🦠', name: 'Malware (Viruses, Trojans, Spyware)', short: 'Harmful software that damages or spies',
    what: 'Malware is software made to harm your device or steal data. A trojan pretends to be useful, such as a cracked game, free movie player or fake app. Spyware secretly watches what you do.',
    signs: ['Device suddenly slow or full of pop-ups', 'Apps you did not install', 'Free "cracked" software or random download buttons'],
    safe: ['Install apps only from official stores.', 'Use antivirus and keep it updated.', 'Do not plug in unknown USB drives.'] },
  { cat: 'malware', emoji: '🔒', name: 'Ransomware', short: 'Locks your files and demands payment',
    what: 'Ransomware encrypts your files and asks for money to unlock them. It often arrives by a malicious email attachment or download.',
    signs: ['Files cannot be opened and have strange extensions', 'A message demands payment', 'Started after opening an attachment'],
    safe: ['Keep regular backups, including one offline copy.', 'Do not open unexpected attachments.', 'Disconnect from the internet and ask for help.'] },
  { cat: 'account', emoji: '🔁', name: 'Weak and Reused Passwords', short: 'The easiest door for attackers',
    what: 'If you reuse one password, a leak from one website lets attackers try it on your other accounts. This is called credential stuffing. Short and common passwords are guessed quickly.',
    signs: ['Same password on many sites', 'Password based on name or birthday', 'Passwords like 123456 or qwerty'],
    safe: ['Use a unique long passphrase for each important account.', 'Use a password manager.', 'Turn on 2FA.'] },
  { cat: 'account', emoji: '📶', name: 'Unsafe Public Wi-Fi', short: 'Fake or unprotected hotspots',
    what: 'Attackers can set up a fake hotspot with a name like a real one (an "evil twin") or watch traffic on unprotected networks to capture what you type.',
    signs: ['Open Wi-Fi with no password', 'Two networks with almost the same name', 'Pop-up page asking for personal details to connect'],
    safe: ['Use mobile data for sensitive tasks.', 'Use a trusted VPN if you must use public Wi-Fi.', 'Look for HTTPS and avoid logging in to important accounts.'] },
  { cat: 'account', emoji: '🪪', name: 'Identity Theft and Account Takeover', short: 'Someone pretends to be you',
    what: 'When attackers get enough of your personal information, they can open accounts, scam your contacts or take over your social media while pretending to be you.',
    signs: ['Login alerts from places you have not been', 'Friends receive strange messages from your account', 'You are logged out and the password stops working'],
    safe: ['Change your password right away and enable 2FA.', 'Log out of other devices.', 'Tell your friends and report to the platform.'] }
];

// Online privacy checklist
const PRIVACY_TIPS = [
  { id: 'p1', title: 'Set social media accounts to private', note: 'Limit who can see your posts, photos and friend list.' },
  { id: 'p2', title: 'Turn on 2FA for your email and social accounts', note: 'Use an authenticator app or SMS code as a second step.' },
  { id: 'p3', title: 'Do not post your address, phone number or school ID', note: 'Strangers can use these details to find or impersonate you.' },
  { id: 'p4', title: 'Turn off location tagging on photos', note: 'Photos can reveal where you live, study or hang out.' },
  { id: 'p5', title: 'Review app permissions', note: 'A flashlight app does not need your contacts or microphone.' },
  { id: 'p6', title: 'Log out of shared and public computers', note: 'Also clear saved passwords and close the browser.' },
  { id: 'p7', title: 'Use a screen lock on your phone', note: 'Use a PIN or fingerprint so a lost phone stays protected.' },
  { id: 'p8', title: 'Think before you post or share', note: 'Anything online can be copied or screenshotted and may stay forever.' },
  { id: 'p9', title: 'Check your logged-in devices and sessions', note: 'Remove devices you do not recognise.' },
  { id: 'p10', title: 'Unsubscribe and delete accounts you no longer use', note: 'Fewer accounts means fewer places for data to leak.' }
];

// Quiz questions. IMPORTANT: options[0] is ALWAYS the correct answer.
// The game shuffles the options before showing them.
const QUESTIONS = [
  { cat: 'PASSWORDS', q: 'Which password is the strongest?',
    options: ['blue-tiger-lamp-ocean-92', 'Password123!', 'Sunshine2024', 'qwerty'],
    why: 'Length matters most. A long passphrase of random words is hard to guess. The others are common patterns.' },
  { cat: 'PHISHING', q: 'An email says: "Your account will be closed in 24 hours. Click here to verify." What is it most likely?',
    options: ['A phishing attempt', 'A normal reminder', 'A prize notice', 'A software update'],
    why: 'Urgent threats and "click here" links are classic phishing signs. Go to the official site yourself instead.' },
  { cat: 'ACCOUNTS', q: 'What does two-factor authentication (2FA) add?',
    options: ['A second proof of identity besides your password', 'Faster login', 'More storage space', 'A free antivirus'],
    why: '2FA asks for something more, like a code, so a stolen password alone is not enough.' },
  { cat: 'NETWORK', q: 'You are at a cafe using free Wi-Fi. What is the safest choice?',
    options: ['Use mobile data for banking or important logins', 'Log in to your bank on the free Wi-Fi', 'Share your password with the cafe staff', 'Turn off your screen lock'],
    why: 'Public Wi-Fi can be fake or watched. Mobile data or a trusted VPN is safer for sensitive tasks.' },
  { cat: 'WEB', q: 'What does the padlock (HTTPS) in the browser mean?',
    options: ['The connection to the site is encrypted', 'The website is 100% safe', 'The site is owned by the government', 'The site has no ads'],
    why: 'HTTPS protects the connection. Scam sites can also use HTTPS, so still check the address.' },
  { cat: 'MALWARE', q: 'What is ransomware?',
    options: ['Malware that locks your files and demands payment', 'A free file-sharing tool', 'A type of firewall', 'A password manager'],
    why: 'Ransomware encrypts your files. Regular offline backups are the best defence.' },
  { cat: 'SOCIAL', q: 'A friend\'s account sends: "Is this you in this video?" with a link. What should you do?',
    options: ['Do not click and ask your friend through another channel', 'Click it to see', 'Forward it to others', 'Reply with your password'],
    why: 'Hacked accounts spread links to contacts. Confirm with your friend another way, like a call.' },
  { cat: 'PASSWORDS', q: 'What is the best way to handle many different passwords?',
    options: ['Use a password manager', 'Reuse one strong password', 'Save them in a public note', 'Use your birthday for all'],
    why: 'A password manager creates and stores unique passwords so you only remember one master passphrase.' },
  { cat: 'PHISHING', q: 'What is "smishing"?',
    options: ['Phishing through SMS text messages', 'Phishing through voice calls only', 'A kind of antivirus', 'A fast Wi-Fi mode'],
    why: 'Smishing = SMS + phishing. Do not tap links in unexpected texts.' },
  { cat: 'UPDATES', q: 'Why should you install software updates?',
    options: ['They fix security holes', 'They always make the phone faster', 'They delete your data', 'They are only for new features'],
    why: 'Attackers use known weaknesses. Updates patch them.' },
  { cat: 'SOCIAL', q: 'What is social engineering?',
    options: ['Tricking people into giving information or access', 'Building social media apps', 'A way to speed up the internet', 'Cleaning a computer'],
    why: 'It targets human emotions such as fear, trust and curiosity rather than computers.' },
  { cat: 'MALWARE', q: 'You find a USB flash drive in the school parking lot. What should you do?',
    options: ['Do not plug it in and hand it to IT or the school office', 'Plug it in to find the owner', 'Format it and use it', 'Share the files with classmates'],
    why: 'Unknown USB drives can carry malware that runs automatically.' },
  { cat: 'PRIVACY', q: 'Which of these is generally OK to post publicly?',
    options: ['Your favorite movie genre', 'Your home address', 'A photo of your school ID', 'Your OTP code'],
    why: 'Personal identifiers can be used for scams and identity theft. General interests are low risk.' },
  { cat: 'ACCOUNTS', q: 'Someone calls and asks for the OTP you just received. What do you do?',
    options: ['Never share it and end the call', 'Share it if they sound polite', 'Share only half of it', 'Post it to prove who you are'],
    why: 'An OTP is a secret key to your account. Real companies never ask for it.' },
  { cat: 'PASSWORDS', q: 'Why is reusing the same password on many sites dangerous?',
    options: ['One data leak can expose all your accounts', 'It makes sites slower', 'It uses more storage', 'It is not dangerous'],
    why: 'Attackers try leaked passwords on other sites. This is called credential stuffing.' },
  { cat: 'PHISHING', q: 'Which sender address is most suspicious?',
    options: ['support@paypa1-security.com', 'support@paypal.com', 'noreply@paypal.com', 'service@paypal.com'],
    why: 'Look-alike domains swap letters for numbers, such as "l" to "1".' },
  { cat: 'MALWARE', q: 'Malware that pretends to be a useful program is called a...',
    options: ['Trojan', 'Firewall', 'Router', 'Browser'],
    why: 'Like the Trojan horse, it looks helpful but hides harmful code.' },
  { cat: 'ACCOUNTS', q: 'You think your account was hacked. What is the best FIRST step?',
    options: ['Change the password from a safe device and enable 2FA', 'Ignore it', 'Create a new account and say nothing', 'Delete your phone contacts'],
    why: 'Secure the account quickly, log out other sessions and warn your contacts.' },
  { cat: 'PHISHING', q: 'How can you check where a link goes before clicking?',
    options: ['Hover over it to preview the real address', 'Click it quickly', 'Look at the link color', 'Check how many emojis it has'],
    why: 'The text of a link can lie. The preview shows the real destination.' },
  { cat: 'PRIVACY', q: 'What is a good privacy setting for your social media profile?',
    options: ['Limit posts to friends and review who can see them', 'Make everything public', 'Accept every friend request', 'Share your location in every post'],
    why: 'Limiting your audience reduces the information strangers can collect.' },
  { cat: 'PHISHING', q: 'Which is a red flag of a scam message?',
    options: ['All of these: urgency, a generic greeting and a strange link', 'Urgent threats only', 'A generic greeting only', 'A strange link only'],
    why: 'Scam messages often combine several warning signs. Any one of them is reason to slow down.' },
  { cat: 'MALWARE', q: 'A site offers a free new movie, but asks you to install a "special player". What should you do?',
    options: ['Leave the site. It is likely malware', 'Install it quickly', 'Disable antivirus first', 'Share the link'],
    why: 'Fake players and cracked software are a common way to spread malware.' },
  { cat: 'PRIVACY', q: 'What is shoulder surfing?',
    options: ['Someone watching your screen or keypad to steal information', 'A type of virus', 'A Wi-Fi speed test', 'A browser extension'],
    why: 'Cover your PIN, and be careful typing passwords in crowded places.' },
  { cat: 'BACKUP', q: 'Why are regular backups important for security?',
    options: ['You can recover files after ransomware or loss', 'They make the internet faster', 'They stop all hackers', 'They are needed for 2FA'],
    why: 'Backups let you restore your files without paying criminals.' }
];

const QUIZ_LENGTH = 10;     // questions per game
const QUESTION_TIME = 15;   // seconds per question

/* ---------------------------------------------------------
   2. SAVED DATA HELPERS (browser localStorage, no database)
   --------------------------------------------------------- */
const KEY_SCORES  = 'cyberwise_scores';
const KEY_PLAYER  = 'cyberwise_player';
const KEY_STATS   = 'cyberwise_stats';
const KEY_PRIVACY = 'cyberwise_privacy';

function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (err) {
    return fallback; // storage blocked or corrupted data
  }
}

function saveJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn('Could not save data:', err);
  }
}

/* ---------------------------------------------------------
   3. SHORTCUTS TO HTML ELEMENTS
   --------------------------------------------------------- */
const $  = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// Fisher-Yates shuffle: returns the same array in random order
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/* ---------------------------------------------------------
   4. NAVIGATION (switching pages)
   --------------------------------------------------------- */
function showPage(id) {
  // Leaving the quiz page cancels the round in progress
  if (id !== 'quiz' && quiz.running) resetQuiz();

  $$('.page').forEach((page) => page.classList.remove('active'));
  $$('.nav-btn').forEach((btn) => btn.classList.remove('active'));

  $('#' + id).classList.add('active');
  const activeBtn = document.querySelector('.nav-btn[data-target="' + id + '"]');
  if (activeBtn) activeBtn.classList.add('active');

  if (id === 'leaderboard') renderLeaderboard();
  if (id === 'home') renderStats();
  window.scrollTo(0, 0);
}

// Nav buttons and the feature cards on Home both use data-target
$$('[data-target]').forEach((btn) => {
  btn.addEventListener('click', () => showPage(btn.dataset.target));
});

/* ---------------------------------------------------------
   5. SOUND (simple beeps using the Web Audio API)
   --------------------------------------------------------- */
let soundOn = true;
let audioCtx = null;

function beep(frequency, duration, type) {
  if (!soundOn) return;
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type || 'sine';
    osc.frequency.value = frequency;
    gain.gain.value = 0.07;
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (err) { /* sound is optional, ignore errors */ }
}

$('#soundToggle').addEventListener('click', () => {
  soundOn = !soundOn;
  $('#soundToggle').textContent = soundOn ? '🔊' : '🔇';
});

/* ---------------------------------------------------------
   6. HOME: name validation, stats, tips
   --------------------------------------------------------- */
let playerName = loadJSON(KEY_PLAYER, '');
$('#playerName').value = playerName;

// Returns an error message, or '' when the name is valid
function validateName(name) {
  const trimmed = name.trim();
  if (trimmed === '')       return 'Please enter your name.';
  if (trimmed.length < 2)   return 'Name must be at least 2 characters.';
  if (trimmed.length > 15)  return 'Name must be 15 characters or fewer.';
  if (!/^[A-Za-z0-9 ]+$/.test(trimmed)) return 'Use letters, numbers and spaces only.';
  return '';
}

$('#nameForm').addEventListener('submit', (event) => {
  event.preventDefault(); // stop the page from reloading
  const value = $('#playerName').value;
  const error = validateName(value);
  $('#nameError').textContent = error;

  if (error === '') {
    playerName = value.trim();
    saveJSON(KEY_PLAYER, playerName);
    resetQuiz();
    showPage('quiz');
  }
});

function renderStats() {
  const stats = loadJSON(KEY_STATS, { games: 0, best: 0, correct: 0 });
  $('#statGames').textContent   = stats.games;
  $('#statBest').textContent    = stats.best;
  $('#statCorrect').textContent = stats.correct;
}

function showTip() {
  const index = Math.floor(Math.random() * CYBER_TIPS.length);
  $('#cyberTip').textContent = CYBER_TIPS[index];
}
$('#newTip').addEventListener('click', showTip);

/* ---------------------------------------------------------
   7. PASSWORD GUIDE: strength checker + generator
   --------------------------------------------------------- */
const COMMON_WORDS = ['password', '123456', 'qwerty', 'abc123', 'iloveyou', 'admin', 'letmein',
                      'welcome', 'monkey', 'dragon', '111111', 'sunshine', 'princess', 'football',
                      '1q2w3e', 'login', 'master', 'passw0rd'];
const SEQUENCES = ['1234', '2345', '3456', '4567', '5678', '6789', 'abcd', 'bcde', 'qwer', 'asdf', 'zxcv'];

function isCommon(pw) {
  const lower = pw.toLowerCase();
  for (const word of COMMON_WORDS) {
    if (lower.includes(word)) return true;
  }
  for (const seq of SEQUENCES) {
    if (lower.includes(seq)) return true;
  }
  return false;
}

// Runs each rule and returns an object of true/false results
function runChecks(pw) {
  return {
    length: pw.length >= 12,
    upper:  /[A-Z]/.test(pw),
    lower:  /[a-z]/.test(pw),
    number: /[0-9]/.test(pw),
    symbol: /[^A-Za-z0-9]/.test(pw),
    common: pw.length > 0 && !isCommon(pw)
  };
}

// Score from 0 to 100
function scorePassword(pw, checks) {
  if (pw.length === 0) return 0;
  const collapsed = pw.replace(/(.)\1+/g, '$1');   // "aaaa" counts as one character
  let score = Math.min(collapsed.length, 12) * 4; // up to 48 for length
  if (checks.upper)  score += 13;
  if (checks.lower)  score += 13;
  if (checks.number) score += 13;
  if (checks.symbol) score += 13;
  if (collapsed.length > 12) score += Math.min(collapsed.length - 12, 8); // small bonus for very long
  if (!checks.common) score = Math.min(score, 25); // common patterns are always weak
  return Math.max(0, Math.min(100, score));
}

function labelFor(score) {
  if (score < 30) return { text: 'Very Weak', color: '#ff4d6d' };
  if (score < 50) return { text: 'Weak',      color: '#ff8c42' };
  if (score < 70) return { text: 'Fair',      color: '#ffc857' };
  if (score < 90) return { text: 'Strong',    color: '#9dff57' };
  return { text: 'Very Strong', color: '#39ff88' };
}

// Rough estimate only: assumes 10 billion guesses per second
function crackTime(pw, checks) {
  if (!checks.common) return 'instantly';
  let pool = 0;
  if (checks.lower)  pool += 26;
  if (checks.upper)  pool += 26;
  if (checks.number) pool += 10;
  if (checks.symbol) pool += 32;
  const length = pw.replace(/(.)\1+/g, '$1').length;   // ignore repeated characters
  const seconds = Math.pow(pool, length) / 2 / 1e10;
  if (seconds < 1)        return 'instantly';
  if (seconds < 60)       return Math.round(seconds) + ' seconds';
  if (seconds < 3600)     return Math.round(seconds / 60) + ' minutes';
  if (seconds < 86400)    return Math.round(seconds / 3600) + ' hours';
  if (seconds < 31536000) return Math.round(seconds / 86400) + ' days';
  if (seconds < 3.15e9)   return Math.round(seconds / 31536000) + ' years';
  return 'centuries';
}

function updatePasswordMeter() {
  const pw = $('#pwInput').value;
  const checks = runChecks(pw);
  const score = scorePassword(pw, checks);

  // tick or untick each rule in the list
  $$('#pwChecks li').forEach((li) => {
    li.classList.toggle('ok', checks[li.dataset.check] === true);
  });

  if (pw.length === 0) {
    $('#pwBar').style.width = '0%';
    $('#pwLabel').textContent = 'Type something to begin';
    $('#pwCrack').textContent = '';
    return;
  }

  const label = labelFor(score);
  $('#pwBar').style.width = Math.max(score, 6) + '%';
  $('#pwBar').style.background = label.color;
  $('#pwLabel').textContent = label.text;
  $('#pwLabel').style.color = label.color;
  $('#pwCrack').textContent = ' | Rough time to crack: ' + crackTime(pw, checks);
}

$('#pwInput').addEventListener('input', updatePasswordMeter);

$('#pwShow').addEventListener('click', () => {
  const input = $('#pwInput');
  const hidden = input.type === 'password';
  input.type = hidden ? 'text' : 'password';
  $('#pwShow').textContent = hidden ? '🙈 Hide' : '👁 Show';
});

// ----- Password generator -----
$('#genLength').addEventListener('input', () => {
  $('#genLenText').textContent = $('#genLength').value;
});

// Picks a secure random whole number from 0 to max-1
function randomInt(max) {
  const buffer = new Uint32Array(1);
  window.crypto.getRandomValues(buffer);
  return buffer[0] % max;
}

function generatePassword() {
  const sets = [];
  if ($('#optUpper').checked)  sets.push('ABCDEFGHJKLMNPQRSTUVWXYZ');
  if ($('#optLower').checked)  sets.push('abcdefghijkmnopqrstuvwxyz');
  if ($('#optNumber').checked) sets.push('23456789');
  if ($('#optSymbol').checked) sets.push('!@#$%^&*?-_');

  if (sets.length === 0) {
    $('#genMsg').textContent = 'Choose at least one character type.';
    $('#genOutput').value = '';
    return;
  }
  $('#genMsg').textContent = '';

  const length = parseInt($('#genLength').value, 10);
  const chars = [];

  // make sure at least one character from every chosen type is included
  sets.forEach((set) => chars.push(set[randomInt(set.length)]));

  const all = sets.join('');
  while (chars.length < length) {
    chars.push(all[randomInt(all.length)]);
  }

  // shuffle so the guaranteed characters are not always at the front
  for (let i = chars.length - 1; i > 0; i--) {
    const j = randomInt(i + 1);
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }
  $('#genOutput').value = chars.join('');
}

$('#genBtn').addEventListener('click', generatePassword);

$('#copyBtn').addEventListener('click', () => {
  const value = $('#genOutput').value;
  if (value === '') {
    $('#genMsg').textContent = 'Generate a password first.';
    return;
  }
  const done = () => { $('#genMsg').textContent = 'Copied to clipboard!'; };
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(value).then(done).catch(() => {
      $('#genOutput').select();
      $('#genMsg').textContent = 'Press Ctrl+C to copy the selected text.';
    });
  } else {
    $('#genOutput').select();
    $('#genMsg').textContent = 'Press Ctrl+C to copy the selected text.';
  }
});

/* ---------------------------------------------------------
   8. COMMON CYBER THREATS (search + filter)
   --------------------------------------------------------- */
let threatFilter = 'all';

function renderThreats() {
  const list = $('#threatList');
  list.innerHTML = '';
  // remove spaces and symbols so "wifi" also matches "Wi-Fi"
  const simplify = (text) => text.toLowerCase().replace(/[^a-z0-9]/g, '');
  const query = simplify($('#threatSearch').value);

  const results = THREATS.filter((t) => {
    const matchesFilter = threatFilter === 'all' || t.cat === threatFilter;
    const text = simplify(t.name + ' ' + t.short + ' ' + t.what);
    return matchesFilter && (query === '' || text.includes(query));
  });

  $('#threatCount').textContent = results.length + ' threat(s) found';

  if (results.length === 0) {
    list.innerHTML = '<p>No match. Try a word like "phishing" or "wifi".</p>';
    return;
  }

  results.forEach((t) => {
    const details = document.createElement('details');
    details.className = 'threat ' + t.cat;
    details.innerHTML =
      '<summary>' + t.emoji + ' ' + t.name + '<small>' + t.short + '</small></summary>' +
      '<div class="body">' +
        '<p>' + t.what + '</p>' +
        '<h4>🚩 Warning signs</h4><ul>' + t.signs.map((s) => '<li>' + s + '</li>').join('') + '</ul>' +
        '<h4>🛡️ How to stay safe</h4><ul>' + t.safe.map((s) => '<li>' + s + '</li>').join('') + '</ul>' +
      '</div>';
    list.appendChild(details);
  });
}

$('#threatSearch').addEventListener('input', renderThreats);
$('#threatClear').addEventListener('click', () => {
  $('#threatSearch').value = '';
  renderThreats();
});
$$('#threats .filter').forEach((btn) => {
  btn.addEventListener('click', () => {
    $$('#threats .filter').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    threatFilter = btn.dataset.filter;
    renderThreats();
  });
});

/* ---------------------------------------------------------
   9. ONLINE PRIVACY TIPS (checklist saved in localStorage)
   --------------------------------------------------------- */
function renderPrivacy() {
  const done = loadJSON(KEY_PRIVACY, {});
  const list = $('#privList');
  list.innerHTML = '';
  let count = 0;

  PRIVACY_TIPS.forEach((tip) => {
    const checked = done[tip.id] === true;
    if (checked) count++;

    const label = document.createElement('label');
    label.className = 'priv-item' + (checked ? ' done' : '');
    label.innerHTML =
      '<input type="checkbox" data-id="' + tip.id + '"' + (checked ? ' checked' : '') + '>' +
      '<div><b>' + tip.title + '</b><small>' + tip.note + '</small></div>';
    list.appendChild(label);
  });

  const percent = Math.round((count / PRIVACY_TIPS.length) * 100);
  $('#privBar').style.width = percent + '%';
  $('#privBar').style.background = percent === 100 ? '#39ff88' : '#00e5ff';
  $('#privText').textContent = count + ' of ' + PRIVACY_TIPS.length + ' done (' + percent + '%)' +
                               (percent === 100 ? ' 🎉 Great job!' : '');
}

$('#privList').addEventListener('change', (event) => {
  if (event.target.type !== 'checkbox') return;
  const done = loadJSON(KEY_PRIVACY, {});
  done[event.target.dataset.id] = event.target.checked;
  saveJSON(KEY_PRIVACY, done);
  renderPrivacy();
});

$('#privReset').addEventListener('click', () => {
  saveJSON(KEY_PRIVACY, {});
  renderPrivacy();
});

/* ---------------------------------------------------------
   10. QUIZ GAME
   --------------------------------------------------------- */
const quiz = {
  running: false,
  list: [],          // the 10 chosen questions
  index: 0,          // current question number (0-based)
  score: 0,
  lives: 3,
  streak: 0,
  correct: 0,
  timeLeft: QUESTION_TIME,
  timerId: null,
  locked: false,     // true after the player has answered
  lifelineUsed: false
};

function showQuizPanel(name) {
  ['quizStart', 'quizPlay', 'quizEnd'].forEach((id) => {
    $('#' + id).classList.toggle('hidden', id !== name);
  });
}

function resetQuiz() {
  clearInterval(quiz.timerId);
  quiz.running = false;
  quiz.timerId = null;
  $('#quizPlayer').textContent = playerName || 'Guest';
  showQuizPanel('quizStart');
}

function updateQuizHUD() {
  $('#qNum').textContent = quiz.index + 1;
  $('#qScore').textContent = quiz.score;
  $('#qStreak').textContent = quiz.streak;
  $('#qLives').textContent = '❤️'.repeat(quiz.lives) + '🖤'.repeat(3 - quiz.lives);
}

function startQuiz() {
  if (playerName === '') {
    showPage('home');
    $('#nameError').textContent = 'Please enter your name first.';
    return;
  }

  // pick random questions and shuffle the answer options of each
  const picked = shuffle(QUESTIONS.slice()).slice(0, QUIZ_LENGTH);
  quiz.list = picked.map((item) => ({
    cat: item.cat,
    q: item.q,
    why: item.why,
    opts: shuffle(item.options.map((text, i) => ({ text: text, correct: i === 0 })))
  }));

  quiz.running = true;
  quiz.index = 0;
  quiz.score = 0;
  quiz.lives = 3;
  quiz.streak = 0;
  quiz.correct = 0;
  quiz.lifelineUsed = false;
  $('#qLifeline').disabled = false;

  showQuizPanel('quizPlay');
  showQuestion();
}

function showQuestion() {
  const item = quiz.list[quiz.index];
  quiz.locked = false;

  $('#qCat').textContent = '[ ' + item.cat + ' ]';
  $('#qText').textContent = item.q;
  $('#qFeedback').classList.add('hidden');
  $('#qNext').classList.add('hidden');

  const box = $('#qOptions');
  box.innerHTML = '';
  item.opts.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'q-opt';
    btn.type = 'button';
    btn.dataset.index = i;
    btn.textContent = (i + 1) + '. ' + opt.text;   // textContent keeps text safe
    box.appendChild(btn);
  });

  updateQuizHUD();
  startTimer();
}

function startTimer() {
  clearInterval(quiz.timerId);
  quiz.timeLeft = QUESTION_TIME;
  drawTimer();

  quiz.timerId = setInterval(() => {
    quiz.timeLeft -= 0.1;
    if (quiz.timeLeft <= 0) {
      quiz.timeLeft = 0;
      drawTimer();
      answer(-1);            // -1 means time ran out
    } else {
      drawTimer();
    }
  }, 100);
}

function drawTimer() {
  const percent = (quiz.timeLeft / QUESTION_TIME) * 100;
  const bar = $('#timerBar');
  bar.style.width = percent + '%';
  bar.style.background = percent > 50 ? '#39ff88' : percent > 25 ? '#ffc857' : '#ff4d6d';
  $('#timerText').textContent = Math.ceil(quiz.timeLeft);
}

// choice = index of clicked option, or -1 for timeout
function answer(choice) {
  if (!quiz.running || quiz.locked) return;
  quiz.locked = true;
  clearInterval(quiz.timerId);

  const item = quiz.list[quiz.index];
  const buttons = $$('#qOptions .q-opt');
  const isCorrect = choice >= 0 && item.opts[choice].correct;

  // lock all buttons and show which one was right
  buttons.forEach((btn, i) => {
    btn.disabled = true;
    if (item.opts[i].correct) btn.classList.add('correct');
  });

  const feedback = $('#qFeedback');
  feedback.classList.remove('hidden', 'good', 'bad');

  if (isCorrect) {
    quiz.streak++;
    quiz.correct++;
    const speedBonus = Math.ceil(quiz.timeLeft);          // faster = more points
    const streakBonus = Math.min(quiz.streak - 1, 5) * 2; // up to +10
    const points = 10 + speedBonus + streakBonus;
    quiz.score += points;
    feedback.classList.add('good');
    feedback.textContent = '✅ Correct! +' + points + ' points. ' + item.why;
    beep(660, 0.12, 'triangle');
  } else {
    quiz.lives--;
    quiz.streak = 0;
    if (choice >= 0) buttons[choice].classList.add('wrong');
    feedback.classList.add('bad');
    feedback.textContent = (choice === -1 ? '⏰ Time is up! ' : '❌ Not quite. ') + item.why;
    beep(180, 0.25, 'sawtooth');
  }

  updateQuizHUD();

  const last = quiz.index === quiz.list.length - 1 || quiz.lives <= 0;
  $('#qNext').textContent = last ? '🏁 See Results' : 'Next ▶';
  $('#qNext').classList.remove('hidden');
}

function nextQuestion() {
  const last = quiz.index === quiz.list.length - 1 || quiz.lives <= 0;
  if (last) {
    endQuiz();
  } else {
    quiz.index++;
    showQuestion();
  }
}

// 50/50 lifeline: hide two wrong options (once per game)
function useLifeline() {
  if (!quiz.running || quiz.locked || quiz.lifelineUsed) return;
  quiz.lifelineUsed = true;
  $('#qLifeline').disabled = true;

  const item = quiz.list[quiz.index];
  const buttons = $$('#qOptions .q-opt');
  const wrongIndexes = [];
  item.opts.forEach((opt, i) => { if (!opt.correct) wrongIndexes.push(i); });

  shuffle(wrongIndexes).slice(0, 2).forEach((i) => {
    buttons[i].classList.add('removed');
    buttons[i].disabled = true;
  });
  beep(520, 0.1, 'square');
}

function rankTitle(correct) {
  if (correct >= 9) return '🥇 Cyber Hero';
  if (correct >= 7) return '🛡️ Cyber Guardian';
  if (correct >= 5) return '🔰 Cyber Defender';
  return '🌱 Cyber Rookie';
}

function endQuiz() {
  quiz.running = false;
  clearInterval(quiz.timerId);

  const position = saveScore();
  updateStats();

  const survived = quiz.lives > 0;
  $('#endTitle').textContent = survived ? 'Quiz Complete!' : 'Game Over';
  $('#endScore').textContent = quiz.score;
  $('#endDetail').textContent = 'Correct answers: ' + quiz.correct + ' of ' + quiz.list.length +
                                ' | Lives left: ' + quiz.lives;
  $('#endRank').textContent = 'Your rank: ' + rankTitle(quiz.correct) + '. ' +
    (position <= 10 ? 'You are #' + position + ' on the leaderboard! 🏆' : 'Keep practicing to reach the Top 10!');
  showQuizPanel('quizEnd');
  beep(880, 0.3, 'sawtooth');
}

$('#quizStartBtn').addEventListener('click', startQuiz);
$('#quizAgain').addEventListener('click', startQuiz);
$('#goBoard').addEventListener('click', () => showPage('leaderboard'));
$('#qNext').addEventListener('click', nextQuestion);
$('#qLifeline').addEventListener('click', useLifeline);

// Click on an answer button (event delegation)
$('#qOptions').addEventListener('click', (event) => {
  const btn = event.target.closest('.q-opt');
  if (btn && !btn.disabled) answer(parseInt(btn.dataset.index, 10));
});

// Keyboard: 1-4 to answer, Enter or Space to go to the next question
document.addEventListener('keydown', (event) => {
  if (event.target.tagName === 'INPUT') return;
  if (!$('#quiz').classList.contains('active') || !quiz.running) return;

  if (!quiz.locked && ['1', '2', '3', '4'].includes(event.key)) {
    const index = parseInt(event.key, 10) - 1;
    const btn = $$('#qOptions .q-opt')[index];
    if (btn && !btn.disabled) answer(index);
  } else if (quiz.locked && (event.key === 'Enter' || event.key === ' ')) {
    event.preventDefault();
    nextQuestion();
  }
});

/* ---------------------------------------------------------
   11. LEADERBOARD + STATS (saved in localStorage)
   --------------------------------------------------------- */
function saveScore() {
  const scores = loadJSON(KEY_SCORES, []);
  const entry = {
    name: playerName,
    score: quiz.score,
    correct: quiz.correct,
    date: new Date().toLocaleDateString(),
    id: Date.now()
  };
  scores.push(entry);
  scores.sort((a, b) => b.score - a.score); // highest first
  const top = scores.slice(0, 10);
  saveJSON(KEY_SCORES, top);

  const position = top.findIndex((s) => s.id === entry.id);
  return position === -1 ? 99 : position + 1;
}

function updateStats() {
  const stats = loadJSON(KEY_STATS, { games: 0, best: 0, correct: 0 });
  stats.games++;
  stats.correct += quiz.correct;
  if (quiz.score > stats.best) stats.best = quiz.score;
  saveJSON(KEY_STATS, stats);
}

function renderLeaderboard() {
  const scores = loadJSON(KEY_SCORES, []);
  const body = $('#boardBody');
  body.innerHTML = '';

  if (scores.length === 0) {
    body.innerHTML = '<tr><td colspan="5">No scores yet. Play the quiz to be the first!</td></tr>';
    return;
  }

  scores.forEach((s, index) => {
    const row = document.createElement('tr');
    if (s.name === playerName) row.className = 'me';
    const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1;
    row.innerHTML = '<td>' + medal + '</td><td></td><td>' + s.score + '</td><td>' + s.correct + '/10</td><td>' + s.date + '</td>';
    row.children[1].textContent = s.name; // textContent keeps names safe from HTML injection
    body.appendChild(row);
  });
}

$('#resetBoard').addEventListener('click', () => {
  if (confirm('Delete all saved scores and stats?')) {
    localStorage.removeItem(KEY_SCORES);
    localStorage.removeItem(KEY_STATS);
    renderLeaderboard();
    renderStats();
  }
});

/* ---------------------------------------------------------
   12. START UP
   --------------------------------------------------------- */
showTip();
renderStats();
renderThreats();
renderPrivacy();
updatePasswordMeter();
resetQuiz();
