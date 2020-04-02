const buttonStartGame = document.getElementById('buttonStartGame');
const questionsPlace = document.getElementById('questionsPlace');
const numberTheme = document.getElementsByClassName('buttonMenu').length;
const numberButtonNext = document.getElementsByClassName('buttonNext').length;
const buttonThemeReturn = document.getElementById('buttonThemeReturn');
let globalCount = 0;
let themeClick = [];
let buttonNext = [];
let count = 0;

for (let i = 0; i < numberTheme; i++) // Инициализация всех тем
    themeClick[i] = document.getElementsByClassName('buttonMenu')[i];

for (let i = 0; i < numberButtonNext; i++) // Назначение кнопок "ДАЛЕЕ" перехода между вопросами
    buttonNext[i] = document.getElementsByClassName('buttonNext')[i];

let themeProg = { // Тема Программирование
    points: 0,
    questions: [],
    lightLevelAnswer: [3, 3, 1, 4, 2],
}

let theme = [themeProg];


function flippingQuestions(theme) // Переход между вопросами
{
    if (count > 0)
        theme.questions[count - 1].style.display = 'none';
    theme.questions[count].style.display = 'block';
    //alert(theme.points);
}

function testQuestions(theme) // Проверка тестовых вопросов
{
    let correctAnswer = theme.lightLevelAnswer[count];
    let answer = theme.questions[count];
    let numberInput = 1;

    for (let node of answer.querySelectorAll('input')) {
        if (node.checked == true && numberInput == correctAnswer)
            theme.points += 3;
        numberInput++;
    }
    count++;
}

function initialQuestion(questions, themeQuestion) 
{
    for (let i = 0; i < 15; i++)
        questions[i] = document.getElementsByClassName(themeQuestion)[i];
}

function start() // Старт игры
{
    document.getElementsByClassName('contentMenu')[0].style.display = 'block';
    document.getElementsByClassName('startWindow')[0].style.display = 'none';
}

function returnTheme(theme) // Рестарт
{
    document.getElementsByClassName('contentMenu')[0].style.display = 'block';
    document.getElementsByClassName('startWindow')[0].style.display = 'none';
    buttonThemeReturn.style.display = 'none';
    buttonNext[0].style.display = 'none';
    theme.questions[count].style.display = 'none';
    theme.points = 0;
}

function mainGame(theme)
{
    initialQuestion(theme.questions, 'questionProg');
    document.getElementsByClassName('contentMenu')[0].style.display = 'none';
    buttonNext[0].style.display = 'block';
    buttonThemeReturn.style.display = 'block';
    flippingQuestions(theme);
    buttonThemeReturn.addEventListener('click', () => returnTheme(theme));
}

buttonStartGame.addEventListener('click', start);
themeClick[0].addEventListener('click', () => mainGame(theme[0]));
buttonNext[0].addEventListener('click', () => testQuestions(theme[0])); 
buttonNext[0].addEventListener('click', () => flippingQuestions(theme[0])); 