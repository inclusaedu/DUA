const questions = [
  {
    question: "Què significa l'acrònim DUA?",
    options: [
      "Disseny Universal de l'Aprenentatge",
      "Desenvolupament Unitari d'Aprenentatge",
      "Documentació Útil per a l'Aprenentatge",
      "Disseny Unificat d'Avaluació"
    ],
    correct: 0
  },
  {
    question: "Quin organisme va crear el marc teòric del DUA?",
    options: ["UNESCO", "CAST", "OCDE", "OMS"],
    correct: 1
  },
  {
    question: "Quants principis fonamentals té el DUA?",
    options: ["2", "3", "4", "5"],
    correct: 1
  },
  {
    question: "A quina xarxa cerebral es refereix el principi de Representació?",
    options: [
      "Xarxa afectiva",
      "Xarxa de reconeixement",
      "Xarxa estratègica",
      "Xarxa executiva"
    ],
    correct: 1
  },
  {
    question: "A quina xarxa cerebral es refereix el principi de Compromís?",
    options: [
      "Xarxa afectiva",
      "Xarxa de reconeixement",
      "Xarxa estratègica",
      "Xarxa executiva"
    ],
    correct: 0
  },
  {
    question: "A quina xarxa cerebral es refereix el principi d'Acció i Expressió?",
    options: [
      "Xarxa afectiva",
      "Xarxa de reconeixement",
      "Xarxa estratègica",
      "Xarxa executiva"
    ],
    correct: 2
  },
  {
    question: "Quina d'aquestes NO és una pauta del principi de Representació?",
    options: [
      "Proporcionar opcions per a la percepció",
      "Proporcionar opcions per al llenguatge i els símbols",
      "Proporcionar opcions per a l'avaluació estandarditzada",
      "Proporcionar opcions per a la comprensió"
    ],
    correct: 2
  },
  {
    question: "El DUA promou principalment:",
    options: [
      "Un currículum únic per a tothom",
      "Un currículum flexible que elimini barreres",
      "L'eliminació de continguts complexos",
      "L'ús exclusiu de tecnologia digital"
    ],
    correct: 1
  },
  {
    question: "Quina de les següents és una pauta del principi d'Acció i Expressió?",
    options: [
      "Proporcionar opcions per captar l'interès",
      "Proporcionar opcions per a la funció executiva",
      "Proporcionar opcions per a la percepció",
      "Proporcionar opcions per a l'autoregulació"
    ],
    correct: 1
  },
  {
    question: "Quina és la finalitat principal del DUA?",
    options: [
      "Fer exàmens més difícils",
      "Substituir els docents per tecnologia",
      "Oferir un currículum flexible i accessible per a tothom",
      "Estandarditzar tots els materials educatius"
    ],
    correct: 2
  }
];

const state = {
  answers: new Array(questions.length).fill(null),
  submitted: false
};

function initTheme() {
  const stored = localStorage.getItem('dua-theme');
  const theme = stored || 'light';
  document.body.setAttribute('data-theme', theme);
  const icon = document.querySelector('#themeToggle i');
  if (icon) {
    icon.className = theme === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-fill';
  }
}

function toggleTheme() {
  const current = document.body.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.body.setAttribute('data-theme', next);
  localStorage.setItem('dua-theme', next);
  const icon = document.querySelector('#themeToggle i');
  if (icon) {
    icon.className = next === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-fill';
  }
}

function initTabs() {
  const tabs = document.querySelectorAll('[data-tab]');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
      const target = document.getElementById(`tab-${tab.dataset.tab}`);
      if (target) {
        target.classList.add('active');
        if (tab.dataset.tab === 'quiz') renderQuiz();
      }
    });
  });
}

function renderQuiz() {
  const container = document.getElementById('quiz-questions');
  if (!container || container.children.length > 0) return;

  questions.forEach((q, i) => {
    const card = document.createElement('div');
    card.className = 'question-card';
    card.id = `question-${i}`;

    const num = document.createElement('div');
    num.className = 'question-number';
    num.textContent = `Pregunta ${i + 1} de ${questions.length}`;

    const text = document.createElement('div');
    text.className = 'question-text';
    text.textContent = q.question;

    const optionsDiv = document.createElement('div');
    optionsDiv.className = 'options-list';

    q.options.forEach((opt, j) => {
      const label = document.createElement('label');
      label.className = 'option-label';
      label.id = `q${i}-opt${j}`;

      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = `q${i}`;
      radio.value = j;
      radio.addEventListener('change', () => {
        if (state.submitted) return;
        state.answers[i] = j;
        updateProgress();
        label.parentElement.querySelectorAll('.option-label').forEach(l => l.classList.remove('selected'));
        label.classList.add('selected');
      });

      const span = document.createElement('span');
      span.textContent = opt;

      label.appendChild(radio);
      label.appendChild(span);
      optionsDiv.appendChild(label);
    });

    card.appendChild(num);
    card.appendChild(text);
    card.appendChild(optionsDiv);
    container.appendChild(card);
  });
}

function updateProgress() {
  const answered = state.answers.filter(a => a !== null).length;
  const pct = Math.round((answered / questions.length) * 100);
  const bar = document.querySelector('.progress-bar');
  const answeredText = document.querySelector('.progress-text span:first-child');
  const pctText = document.querySelector('.progress-text span:last-child');
  if (bar) bar.style.width = `${pct}%`;
  if (answeredText) answeredText.textContent = `${answered} de ${questions.length} respondes`;
  if (pctText) pctText.textContent = `${pct}%`;
}

function submitQuiz() {
  if (state.submitted) return;

  const unanswered = state.answers.some(a => a === null);
  if (unanswered) {
    const firstUnanswered = state.answers.indexOf(null);
    document.getElementById(`question-${firstUnanswered}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }

  state.submitted = true;

  let correctCount = 0;

  questions.forEach((q, i) => {
    const selected = state.answers[i];
    const isCorrect = selected === q.correct;
    if (isCorrect) correctCount++;

    const card = document.getElementById(`question-${i}`);
    card.classList.add(isCorrect ? 'correct' : 'incorrect');

    q.options.forEach((_, j) => {
      const label = document.getElementById(`q${i}-opt${j}`);
      if (!label) return;
      label.classList.add('disabled');
      const radio = label.querySelector('input[type="radio"]');
      if (radio) radio.disabled = true;

      if (j === q.correct) {
        label.classList.add('correct-answer');
      }
      if (j === selected && !isCorrect) {
        label.classList.add('wrong-answer');
      }

      if (j === q.correct || j === selected) {
        const icon = document.createElement('span');
        icon.className = 'feedback-icon';
        icon.textContent = j === q.correct ? '✓' : '✗';
        icon.style.color = j === q.correct ? 'var(--success)' : 'var(--danger)';
        label.appendChild(icon);
      }
    });

    const feedback = document.createElement('div');
    feedback.className = 'question-feedback';
    if (isCorrect) {
      feedback.textContent = '✓ Correcte';
      feedback.style.color = 'var(--success)';
    } else {
      feedback.textContent = `✗ Incorrecte. Resposta correcta: "${q.options[q.correct]}"`;
      feedback.style.color = 'var(--danger)';
    }
    card.appendChild(feedback);
  });

  const score = Math.round((correctCount / questions.length) * 100);
  showResult(score, correctCount);

  const submitBtn = document.getElementById('submitQuiz');
  const resetBtn = document.getElementById('resetQuiz');
  submitBtn.disabled = true;
  submitBtn.style.display = 'none';
  resetBtn.style.display = 'block';
}

function showResult(score, correctCount) {
  const resultDiv = document.getElementById('quiz-result');
  const scoreEl = document.getElementById('score-value');
  const labelEl = document.getElementById('score-label');
  const messageEl = document.getElementById('score-message');

  scoreEl.textContent = `${score}%`;
  labelEl.textContent = `${correctCount} de ${questions.length} encertades`;

  let msg, msgClass;
  if (score === 100) {
    msg = 'Perfecte! Domines el DUA!';
    msgClass = 'bg-success text-white';
  } else if (score >= 80) {
    msg = 'Excel·lent! Tens un coneixement sòlid del DUA.';
    msgClass = 'bg-success text-white';
  } else if (score >= 60) {
    msg = 'Bé! Pots repassar alguns conceptes clau.';
    msgClass = 'bg-warning text-dark';
  } else if (score >= 40) {
    msg = 'Necessites repassar la teoria del DUA.';
    msgClass = 'bg-warning text-dark';
  } else {
    msg = 'Torna a estudiar la secció teòrica i intenta-ho de nou.';
    msgClass = 'bg-danger text-white';
  }

  messageEl.textContent = msg;
  messageEl.className = `score-message ${msgClass}`;
  resultDiv.classList.add('show');
  resultDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function resetQuiz() {
  state.answers = new Array(questions.length).fill(null);
  state.submitted = false;

  const container = document.getElementById('quiz-questions');
  container.innerHTML = '';

  const resultDiv = document.getElementById('quiz-result');
  resultDiv.classList.remove('show');

  const submitBtn = document.getElementById('submitQuiz');
  const resetBtn = document.getElementById('resetQuiz');
  submitBtn.disabled = false;
  submitBtn.style.display = 'block';
  resetBtn.style.display = 'none';

  updateProgress();
  renderQuiz();
}

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initTabs();

  document.getElementById('themeToggle').addEventListener('click', toggleTheme);

  const submitBtn = document.getElementById('submitQuiz');
  if (submitBtn) submitBtn.addEventListener('click', submitQuiz);

  const resetBtn = document.getElementById('resetQuiz');
  if (resetBtn) resetBtn.addEventListener('click', resetQuiz);
});
