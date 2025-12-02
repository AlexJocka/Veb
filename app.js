
// 1. POW - возведение в степень
function pow(x, n) {
    if (n === 0) return 1;
    if (n === 1) return x;
    let result = 1;
    for (let i = 0; i < n; i++) {
        result *= x;
    }
    return result;
}

// 2. GCD - НОД (алгоритм Евклида)
function gcd(a, b) {
    if (b === 0) return a;
    return gcd(b, a % b);
}

// 3. MINDIGIT - минимальная цифра (рекурсивный)
function minDigit(x) {
    let str = Math.abs(x).toString();
    function findMin(index) {
        if (index === str.length - 1) {
            return parseInt(str[index]);
        }
        let minRest = findMin(index + 1);
        let current = parseInt(str[index]);
        return current < minRest ? current : minRest;
    }
    if (str.length === 0) return 0;
    return findMin(0);
}

// 4. PLURALIZE - множественное число (русский)
function pluralizeRecords(n) {
    let form;
    let lastDigit = n % 10;
    let lastTwoDigits = n % 100;
    
    if (lastTwoDigits === 11 || lastTwoDigits === 12 || lastTwoDigits === 13 || lastTwoDigits === 14) {
        form = 'many';
    } else if (lastDigit === 1) {
        form = 'one';
    } else if (lastDigit >= 2 && lastDigit <= 4) {
        form = 'few';
    } else {
        form = 'many';
    }
    
    let wordForms = {
        'one': 'запись',
        'few': 'записи',
        'many': 'записей'
    };
    
    return `В результате выполнения запроса было найдено ${n} ${wordForms[form]}`;
}

// 5. FIBB - числа Фибоначчи с мемоизацией
const fibbCache = { 0: 0n, 1: 1n };

function fibb(n) {
    if (fibbCache[n] !== undefined) {
        return fibbCache[n];
    }
    let result;
    if (n <= 1) {
        result = BigInt(n);
    } else {
        result = fibb(n - 1) + fibb(n - 2);
    }
    fibbCache[n] = result;
    return result;
}

// 6. GETSORTEDARRAY - сортировка методом пузырька
function getSortedArray(array, key) {
    let arr = [];
    for (let i = 0; i < array.length; i++) {
        arr[i] = array[i];
    }
    
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            let val1 = arr[j][key];
            let val2 = arr[j + 1][key];
            
            let shouldSwap = false;
            if (typeof val1 === 'string' && typeof val2 === 'string') {
                shouldSwap = val1.localeCompare(val2) > 0;
            } else {
                shouldSwap = val1 > val2;
            }
            
            if (shouldSwap) {
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    
    return arr;
}

// 7. CESAR - шифр Цезаря (русский)
function cesar(str, shift, action) {
    const russianAlphabet = 'абвгдежзийклмнопрстуфхцчшщъыьэюя';
    shift = shift % russianAlphabet.length;
    
    if (action === 'decode') {
        shift = russianAlphabet.length - shift;
    }
    
    let result = '';
    
    for (let i = 0; i < str.length; i++) {
        let char = str[i].toLowerCase();
        let index = russianAlphabet.indexOf(char);
        
        if (index !== -1) {
            let newIndex = (index + shift) % russianAlphabet.length;
            let newChar = russianAlphabet[newIndex];
            
            if (str[i] === str[i].toUpperCase() && str[i] !== ' ') {
                result += newChar.toUpperCase();
            } else {
                result += newChar;
            }
        } else {
            result += str[i];
        }
    }
    
    return result;
}


function switchTab(tabName) {
    let contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => {
        content.classList.remove('active');
    });
    
    let buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.getElementById(tabName).classList.add('active');
    event.target.classList.add('active');
    
    // Если это вкладка игры, запускаем игру
    if (tabName === 'game') {
        setTimeout(() => startGame(), 100);
    }
}

function testPow() {
    let x = parseFloat(document.getElementById('powX').value);
    let n = parseInt(document.getElementById('powN').value);
    
    if (isNaN(x) || isNaN(n) || n < 0) {
        document.getElementById('powResult').innerHTML = '❌ Неверный ввод';
        return;
    }
    
    let result = pow(x, n);
    document.getElementById('powResult').innerHTML = `<strong>${x}^${n} = ${result}</strong>`;
}

function testGcd() {
    let a = parseInt(document.getElementById('gcdA').value);
    let b = parseInt(document.getElementById('gcdB').value);
    
    if (isNaN(a) || isNaN(b) || a < 0 || b < 0) {
        document.getElementById('gcdResult').innerHTML = '❌ Неверный ввод';
        return;
    }
    
    let result = gcd(a, b);
    document.getElementById('gcdResult').innerHTML = `<strong>НОД(${a}, ${b}) = ${result}</strong>`;
}

function testMinDigit() {
    let x = parseInt(document.getElementById('minDigitX').value);
    
    if (isNaN(x) || x < 0) {
        document.getElementById('minDigitResult').innerHTML = '❌ Неверный ввод';
        return;
    }
    
    let result = minDigit(x);
    document.getElementById('minDigitResult').innerHTML = `<strong>Минимальная цифра в ${x} = ${result}</strong>`;
}

function testPluralize() {
    let n = parseInt(document.getElementById('pluralizeN').value);
    
    if (isNaN(n) || n < 0) {
        document.getElementById('pluralizeResult').innerHTML = '❌ Неверный ввод';
        return;
    }
    
    let result = pluralizeRecords(n);
    document.getElementById('pluralizeResult').innerHTML = `<strong>${result}</strong>`;
}

function testFibb() {
    let n = parseInt(document.getElementById('fibbN').value);
    
    if (isNaN(n) || n < 0 || n > 30) {
        document.getElementById('fibbResult').innerHTML = '❌ Введите число от 0 до 30';
        return;
    }
    
    let result = fibb(n);
    document.getElementById('fibbResult').innerHTML = `<strong>F(${n}) = ${result}</strong>`;
}

function testSort() {
    let key = document.getElementById('sortKey').value;
    
    let testData = [
        { name: 'Иван', age: 28, salary: 50000 },
        { name: 'Алексей', age: 35, salary: 75000 },
        { name: 'Ватный', age: 22, salary: 35000 },
        { name: 'Геннадий', age: 41, salary: 95000 },
        { name: 'Батрак', age: 30, salary: 60000 }
    ];
    
    let sorted = getSortedArray(testData, key);
    
    let html = '<table class="result-table"><tr><th>Имя</th><th>Возраст</th><th>Зарплата</th></tr>';
    for (let item of sorted) {
        html += `<tr><td>${item.name}</td><td>${item.age}</td><td>${item.salary}</td></tr>`;
    }
    html += '</table>';
    
    document.getElementById('sortResult').innerHTML = html;
}

function testCesar() {
    let text = document.getElementById('cesarText').value;
    let shift = parseInt(document.getElementById('cesarShift').value);
    let action = document.getElementById('cesarAction').value;
    
    if (!text || isNaN(shift) || shift < 1) {
        document.getElementById('cesarResult').innerHTML = '❌ Неверный ввод';
        return;
    }
    
    let result = cesar(text, shift, action);
    let actionText = action === 'encode' ? 'Кодировано' : 'Декодировано';
    
    document.getElementById('cesarResult').innerHTML = `<strong>${actionText}:</strong><br><code>${result}</code>`;
}

// МАТЕМАТИЧЕСКАЯ ИГРА

const QUESTIONS_PER_LEVEL = 10;
const PASS_PERCENTAGE = 80;

const LEVELS = {
    beginner: 'Начальный',
    intermediate: 'Средний',
    advanced: 'Продвинутый'
};

let gameState = {
    currentLevel: 'beginner',
    currentQuestion: 0,
    correctAnswers: 0,
    incorrectAnswers: 0,
    questions: [],
    usedQuestionIndices: new Set(),
    isAnswered: false
};

function generateQuestions(level) {
    let questions = [];
    let questionCount = 0;

    if (level === 'beginner') {
        while (questionCount < 50) {
            let a = Math.floor(Math.random() * 20) + 1;
            let b = Math.floor(Math.random() * 20) + 1;
            let op = ['+', '-', '*', '/'][Math.floor(Math.random() * 4)];

            let answer;
            if (op === '+') answer = a + b;
            else if (op === '-') answer = a - b;
            else if (op === '*') answer = a * b;
            else answer = Math.floor(a / b);

            questions.push({
                question: `${a} ${op} ${b}`,
                answer: answer
            });
            questionCount++;
        }
    } else if (level === 'intermediate') {
        while (questionCount < 50) {
            let type = Math.random();
            let a = Math.floor(Math.random() * 20) + 1;
            let b = Math.floor(Math.random() * 20) + 1;

            if (type < 0.5) {
                let op = ['+', '-', '*', '/'][Math.floor(Math.random() * 4)];
                let answer;
                if (op === '+') answer = a + b;
                else if (op === '-') answer = a - b;
                else if (op === '*') answer = a * b;
                else answer = Math.floor(a / b);

                questions.push({
                    question: `${a} ${op} ${b}`,
                    answer: answer
                });
            } else {
                let op = ['>', '<', '=='][Math.floor(Math.random() * 3)];
                let answer;
                if (op === '>') answer = a > b ? 1 : 0;
                else if (op === '<') answer = a < b ? 1 : 0;
                else answer = a === b ? 1 : 0;

                questions.push({
                    question: `${a} ${op} ${b} ? (1-да, 0-нет)`,
                    answer: answer
                });
            }
            questionCount++;
        }
    } else if (level === 'advanced') {
        while (questionCount < 50) {
            let type = Math.random();
            let a = Math.floor(Math.random() * 20) + 1;
            let b = Math.floor(Math.random() * 20) + 1;

            if (type < 0.4) {
                let op = Math.random() < 0.5 ? 'AND' : 'OR';
                let answer;
                if (op === 'AND') answer = (a > 5 && b > 5) ? 1 : 0;
                else answer = (a > 10 || b > 10) ? 1 : 0;

                questions.push({
                    question: `(${a} > ${Math.floor(a / 2)}) ${op} (${b} > ${Math.floor(b / 2)}) ? (1-да, 0-нет)`,
                    answer: answer
                });
            } else {
                let op = ['&', '|', '^'][Math.floor(Math.random() * 3)];
                let answer;
                if (op === '&') answer = a & b;
                else if (op === '|') answer = a | b;
                else answer = a ^ b;

                questions.push({
                    question: `${a} ${op} ${b}`,
                    answer: answer
                });
            }
            questionCount++;
        }
    }

    return questions;
}

function getNextQuestion() {
    if (gameState.questions.length === 0) {
        gameState.questions = generateQuestions(gameState.currentLevel);
    }

    let index;
    do {
        index = Math.floor(Math.random() * gameState.questions.length);
    } while (gameState.usedQuestionIndices.has(index) && gameState.usedQuestionIndices.size < gameState.questions.length);

    gameState.usedQuestionIndices.add(index);
    return gameState.questions[index];
}

function startGame() {
    gameState.currentLevel = 'beginner';
    gameState.currentQuestion = 0;
    gameState.correctAnswers = 0;
    gameState.incorrectAnswers = 0;
    gameState.questions = generateQuestions(gameState.currentLevel);
    gameState.usedQuestionIndices.clear();
    gameState.isAnswered = false;

    document.getElementById('completionModal').classList.remove('show');
    document.getElementById('gameArea').style.display = 'block';

    displayQuestion();
}

function displayQuestion() {
    if (gameState.currentQuestion >= QUESTIONS_PER_LEVEL) {
        finishLevel();
        return;
    }

    let question = getNextQuestion();
    document.getElementById('question').textContent = question.question;
    document.getElementById('questionNumber').textContent = gameState.currentQuestion + 1;
    document.getElementById('answer').value = '';
    document.getElementById('answer').className = '';
    document.getElementById('messageArea').innerHTML = '';
    document.getElementById('answer').focus();
    gameState.isAnswered = false;

    gameState.currentQuestion++;
    gameState.currentQuestionObj = question;
}

function submitAnswer() {
    if (gameState.isAnswered) {
        displayQuestion();
        return;
    }

    let userAnswer = parseInt(document.getElementById('answer').value);
    let correctAnswer = gameState.currentQuestionObj.answer;
    let answerInput = document.getElementById('answer');
    let messageArea = document.getElementById('messageArea');

    if (isNaN(userAnswer)) {
        messageArea.innerHTML = '<div class="message error">⚠️ Пожалуйста, введите число</div>';
        return;
    }

    if (userAnswer === correctAnswer) {
        gameState.correctAnswers++;
        answerInput.classList.add('correct');
        messageArea.innerHTML = '<div class="message success">✅ Правильно!</div>';
    } else {
        gameState.incorrectAnswers++;
        answerInput.classList.add('incorrect');
        messageArea.innerHTML = `<div class="message error">❌ Неправильно! Правильный ответ: ${correctAnswer}</div>`;
    }

    updateStats();
    gameState.isAnswered = true;

    setTimeout(displayQuestion, 2000);
}

function updateStats() {
    document.getElementById('correctCount').textContent = gameState.correctAnswers;
    document.getElementById('incorrectCount').textContent = gameState.incorrectAnswers;
}

function finishLevel() {
    let percentage = (gameState.correctAnswers / QUESTIONS_PER_LEVEL) * 100;
    let modal = document.getElementById('completionModal');
    let modalTitle = document.getElementById('modalTitle');
    let modalMessage = document.getElementById('modalMessage');

    document.getElementById('modalTotal').textContent = QUESTIONS_PER_LEVEL;
    document.getElementById('modalCorrect').textContent = gameState.correctAnswers;
    document.getElementById('modalPercent').textContent = Math.round(percentage) + '%';

    if (gameState.currentLevel === 'advanced') {
        modalTitle.textContent = '🎉 Поздравляем!';
        modalMessage.textContent = `Вы успешно прошли продвинутый уровень! Вы истинный мастер математики!`;
    } else if (percentage >= PASS_PERCENTAGE) {
        let nextLevel = gameState.currentLevel === 'beginner' ? 'intermediate' : 'advanced';
        let nextLevelName = LEVELS[nextLevel];

        modalTitle.textContent = '🌟 Отлично!';
        modalMessage.textContent = `Вы набрали ${Math.round(percentage)}%! Готовы к ${nextLevelName.toLowerCase()} уровню?`;

        let buttonGroup = document.querySelector('.modal-content .button-group');
        buttonGroup.innerHTML = `
            <button class="btn-next-level" onclick="nextLevel()">Следующий уровень</button>
            <button class="btn-exit" onclick="exitFromModal()">Выход</button>
        `;
    } else {
        modalTitle.textContent = '📚 Еще попытка';
        modalMessage.textContent = `Вы набрали ${Math.round(percentage)}%. Нужно ${PASS_PERCENTAGE}% для прохождения. Попробуйте еще раз!`;

        let buttonGroup = document.querySelector('.modal-content .button-group');
        buttonGroup.innerHTML = `
            <button class="btn-restart" onclick="retryLevel()">Повторить уровень</button>
            <button class="btn-exit" onclick="exitFromModal()">Выход</button>
        `;
    }

    document.getElementById('gameArea').style.display = 'none';
    modal.classList.add('show');
}

function nextLevel() {
    gameState.currentLevel = gameState.currentLevel === 'beginner' ? 'intermediate' : 'advanced';
    document.getElementById('currentLevel').textContent = LEVELS[gameState.currentLevel];
    gameState.currentQuestion = 0;
    gameState.correctAnswers = 0;
    gameState.incorrectAnswers = 0;
    gameState.questions = generateQuestions(gameState.currentLevel);
    gameState.usedQuestionIndices.clear();
    gameState.isAnswered = false;

    updateStats();

    document.getElementById('completionModal').classList.remove('show');
    document.getElementById('gameArea').style.display = 'block';

    displayQuestion();
}

function retryLevel() {
    gameState.currentQuestion = 0;
    gameState.correctAnswers = 0;
    gameState.incorrectAnswers = 0;
    gameState.usedQuestionIndices.clear();
    gameState.isAnswered = false;

    updateStats();

    document.getElementById('completionModal').classList.remove('show');
    document.getElementById('gameArea').style.display = 'block';

    displayQuestion();
}

function exitGame() {
    if (confirm('Вы уверены? Прогресс будет потерян.')) {
        if (confirm('Начать новую игру?')) {
            startGame();
        }
    }
}

function exitFromModal() {
    alert('Спасибо за игру!');
    location.reload();
}

function restartGame() {
    startGame();
}

// Инициализация при Enter
document.addEventListener('DOMContentLoaded', function() {
    let answerInput = document.getElementById('answer');
    if (answerInput) {
        answerInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                submitAnswer();
            }
        });
    }
});