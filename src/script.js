const buttonStartGame = document.getElementById('buttonStartGame');
const questionsPlace = document.getElementById('questionsPlace');
const numberTheme = document.getElementsByClassName('buttonMenu').length;
const numberButtonNext = document.getElementsByClassName('buttonNext').length;
let globalCount = 0;
let themeClick = [];
let buttonNext = [];
let count = 0;

for (let i = 0; i < numberTheme; i++) // Инициализация всех тем
    themeClick[i] = document.getElementsByClassName('buttonMenu')[i];

for (let i = 0; i < numberButtonNext; i++) // Назначение кнопок "ДАЛЕЕ" перехода между вопросами
    buttonNext[i] = document.getElementsByClassName('buttonNext')[i];

function start() // Старт игры
{
    document.getElementsByClassName('contentMenu')[0].style.display = 'block';
    document.getElementsByClassName('startWindow')[0].style.display = 'none';
}

function testQuestion(questions, arrayAnswer, correctAnswer)
{
    let textQuestion = document.createElement('p');
    textQuestion.textContent = arrayAnswer[0];
    questionsPlace.append(textQuestion);
}

function initialQuestion(questions, themeQuestion) 
{
    for (let i = 0; i < 15; i++)
        questions[i] = document.getElementsByClassName(themeQuestion)[i];
}

let themeProg = {
    progCount: 0,
    questions: [],
}

let theme = [themeProg];


function flippingQuestions(theme)
{
    if (count > 0)
        theme.questions[count - 1].style.display = 'none';
    theme.questions[count].style.display = 'block';  
    count++;
}

function mainGame(theme)
{
    initialQuestion(theme.questions, 'questionProg');
    document.getElementsByClassName('contentMenu')[0].style.display = 'none';
    buttonNext[0].style.display = 'block';
    flippingQuestions(theme);
}


buttonStartGame.addEventListener('click', start);
themeClick[0].addEventListener('click', () => mainGame(theme[0]));
buttonNext[0].addEventListener('click', () => flippingQuestions(theme[0])); 