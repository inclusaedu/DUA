const questions = [
  {
    question: "Què significa l'acrònim DUA?",
    options: [
      "Disseny Universal de l'Aprenentatge",
      "Desenvolupament Unitari d'Aprenentatge",
      "Documentació Útil per a l'Aprenentatge",
      "Disseny Unificat d'Avaluació"
    ],
    correct: 0,
    explicacio: "DUA significa Disseny Universal de l'Aprenentatge. CAST (Center for Applied Special Technology) va desenvolupar aquest marc educatiu basat en la neurociència per guiar el disseny d'entorns i materials flexibles."
  },
  {
    question: "Quin organisme va crear el marc teòric del DUA?",
    options: ["UNESCO", "CAST", "OCDE", "OMS"],
    correct: 1,
    explicacio: "CAST (Center for Applied Special Technology) és l'organisme que va crear i desenvolupar el marc teòric del DUA. Ni la UNESCO, l'OCDE ni l'OMS estan directament implicades en la creació del DUA."
  },
  {
    question: "Quants principis fonamentals té el DUA?",
    options: ["2", "3", "4", "5"],
    correct: 1,
    explicacio: "El DUA es fonamenta en 3 principis: Representació (el QUÈ), Acció i Expressió (el COM) i Compromís (el PER QUÈ)."
  },
  {
    question: "A quina xarxa cerebral es refereix el principi de Representació?",
    options: [
      "Xarxa afectiva",
      "Xarxa de reconeixement",
      "Xarxa estratègica",
      "Xarxa executiva"
    ],
    correct: 1,
    explicacio: "El principi de Representació es relaciona amb les xarxes de reconeixement del cervell, que processen la informació i responen al «QUÈ» de l'aprenentatge."
  },
  {
    question: "A quina xarxa cerebral es refereix el principi de Compromís?",
    options: [
      "Xarxa afectiva",
      "Xarxa de reconeixement",
      "Xarxa estratègica",
      "Xarxa executiva"
    ],
    correct: 0,
    explicacio: "El principi de Compromís es relaciona amb les xarxes afectives del cervell, que gestionen les emocions, la motivació i els interessos, responent al «PER QUÈ» de l'aprenentatge."
  },
  {
    question: "A quina xarxa cerebral es refereix el principi d'Acció i Expressió?",
    options: [
      "Xarxa afectiva",
      "Xarxa de reconeixement",
      "Xarxa estratègica",
      "Xarxa executiva"
    ],
    correct: 2,
    explicacio: "El principi d'Acció i Expressió es relaciona amb les xarxes estratègiques del cervell, que planifiquen, organitzen i executen accions, responent al «COM» de l'aprenentatge."
  },
  {
    question: "Quina d'aquestes NO és una pauta del principi de Representació?",
    options: [
      "Proporcionar opcions per a la percepció",
      "Proporcionar opcions per al llenguatge i els símbols",
      "Proporcionar opcions per a l'avaluació estandarditzada",
      "Proporcionar opcions per a la comprensió"
    ],
    correct: 2,
    explicacio: "Les pautes del principi de Representació són: percepció, llenguatge i símbols, i comprensió. L'avaluació estandarditzada no és una pauta del DUA, sinó una pràctica tradicional que el DUA precisament qüestiona."
  },
  {
    question: "El DUA promou principalment:",
    options: [
      "Un currículum únic per a tothom",
      "Un currículum flexible que elimini barreres",
      "L'eliminació de continguts complexos",
      "L'ús exclusiu de tecnologia digital"
    ],
    correct: 1,
    explicacio: "El DUA promou un currículum flexible dissenyat per eliminar barreres i maximitzar les oportunitats d'aprenentatge per a tothom, adaptant-se a la diversitat d'estudiants des del principi."
  },
  {
    question: "Quina de les següents és una pauta del principi d'Acció i Expressió?",
    options: [
      "Proporcionar opcions per captar l'interès",
      "Proporcionar opcions per a la funció executiva",
      "Proporcionar opcions per a la percepció",
      "Proporcionar opcions per a l'autoregulació"
    ],
    correct: 1,
    explicacio: "La funció executiva és una de les tres pautes del principi d'Acció i Expressió, juntament amb l'acció física i l'expressió i comunicació. Les altres opcions pertanyen a altres principis: captar l'interès i l'autoregulació són de Compromís, i la percepció és de Representació."
  },
  {
    question: "Quina és la finalitat principal del DUA?",
    options: [
      "Fer exàmens més difícils",
      "Substituir els docents per tecnologia",
      "Oferir un currículum flexible i accessible per a tothom",
      "Estandarditzar tots els materials educatius"
    ],
    correct: 2,
    explicacio: "La finalitat principal del DUA és oferir un currículum flexible i accessible per a tothom des del principi, reduint barreres i maximitzant les oportunitats d'aprenentatge per a la diversitat d'estudiants."
  }
];

const state = {
  answers: new Array(questions.length).fill(null),
  submitted: false,
  currentStep: 0,
  confirmed: false,
  initialized: false
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
        if (tab.dataset.tab === 'quiz' && !state.initialized) {
          state.initialized = true;
          renderStep();
        }
      }
    });
  });
}

function renderStep() {
  const container = document.getElementById('quiz-container');
  if (!container) return;

  container.style.display = 'block';
  document.getElementById('resetQuiz').style.display = 'none';
  document.getElementById('quiz-result').classList.remove('show');

  const i = state.currentStep;
  const q = questions[i];

  container.innerHTML = '';

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
      if (state.confirmed) return;
      selectAnswer(j);
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

  const feedback = document.createElement('div');
  feedback.className = 'question-feedback';
  feedback.id = `feedback-${i}`;
  feedback.style.display = 'none';
  card.appendChild(feedback);

  container.appendChild(card);

  const buttonsDiv = document.createElement('div');
  buttonsDiv.className = 'quiz-buttons d-grid gap-2 mt-3';
  container.appendChild(buttonsDiv);

  if (!state.confirmed) {
    const confirmBtn = document.createElement('button');
    confirmBtn.className = 'btn btn-primary btn-lg';
    confirmBtn.id = 'confirmBtn';
    confirmBtn.disabled = state.answers[i] === null;
    confirmBtn.innerHTML = '<i class="bi bi-check-lg me-1"></i>Confirmar';
    confirmBtn.addEventListener('click', confirmarPas);
    buttonsDiv.appendChild(confirmBtn);
  } else {
    addNextButton(buttonsDiv);
  }

  updateProgress();
}

function selectAnswer(optionIdx) {
  const i = state.currentStep;
  state.answers[i] = optionIdx;

  const labels = document.querySelectorAll(`#question-${i} .option-label`);
  labels.forEach(l => l.classList.remove('selected'));
  const selectedLabel = document.getElementById(`q${i}-opt${optionIdx}`);
  if (selectedLabel) selectedLabel.classList.add('selected');

  const confirmBtn = document.getElementById('confirmBtn');
  if (confirmBtn) confirmBtn.disabled = false;
}

function confirmarPas() {
  const i = state.currentStep;
  const selected = state.answers[i];
  if (selected === null) return;

  state.confirmed = true;
  const q = questions[i];
  const isCorrect = selected === q.correct;

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

  const feedback = document.getElementById(`feedback-${i}`);
  feedback.style.display = 'block';
  if (isCorrect) {
    feedback.textContent = `✓ Correcte! ${q.explicacio}`;
    feedback.style.color = 'var(--success)';
  } else {
    feedback.textContent = `✗ Incorrecte. Resposta correcta: "${q.options[q.correct]}". ${q.explicacio}`;
    feedback.style.color = 'var(--danger)';
  }

  const buttonsDiv = document.querySelector('.quiz-buttons');
  buttonsDiv.innerHTML = '';
  addNextButton(buttonsDiv);

  updateProgress();
}

function addNextButton(container) {
  const i = state.currentStep;
  const btn = document.createElement('button');
  btn.className = 'btn btn-primary btn-lg';

  if (i === questions.length - 1) {
    btn.innerHTML = '<i class="bi bi-check-all me-1"></i>Veure resultat';
  } else {
    btn.innerHTML = '<i class="bi bi-arrow-right me-1"></i>Següent';
  }

  btn.addEventListener('click', () => {
    if (i === questions.length - 1) {
      finishQuiz();
    } else {
      state.currentStep++;
      state.confirmed = false;
      renderStep();
    }
  });

  container.appendChild(btn);
}

function finishQuiz() {
  state.submitted = true;

  const correctCount = state.answers.filter((ans, i) => ans === questions[i].correct).length;
  const score = Math.round((correctCount / questions.length) * 100);

  document.getElementById('quiz-container').style.display = 'none';
  document.getElementById('resetQuiz').style.display = 'block';

  showResult(score, correctCount);
}

function updateProgress() {
  let answered = state.currentStep;
  if (state.confirmed) answered++;
  const pct = Math.round((answered / questions.length) * 100);
  const bar = document.querySelector('.progress-bar');
  const answeredText = document.querySelector('.progress-text span:first-child');
  const pctText = document.querySelector('.progress-text span:last-child');
  if (bar) bar.style.width = `${pct}%`;
  if (answeredText) answeredText.textContent = `${answered} de ${questions.length} respondes`;
  if (pctText) pctText.textContent = `${pct}%`;
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
  state.currentStep = 0;
  state.confirmed = false;

  document.getElementById('quiz-result').classList.remove('show');
  document.getElementById('resetQuiz').style.display = 'none';

  updateProgress();
  renderStep();
}

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initTabs();

  document.getElementById('themeToggle').addEventListener('click', toggleTheme);
  document.getElementById('resetQuiz').addEventListener('click', resetQuiz);
});
