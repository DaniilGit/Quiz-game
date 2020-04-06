const buttonStartGame = document.getElementById('buttonStartGame');
const questionsPlace = document.getElementById('questionsPlace');
const numberThemeLength = document.getElementsByClassName('buttonMenu').length;
const numberButtonLength = document.getElementsByClassName('buttonNext').length;
const divGlobalPoints = document.getElementById('globalPoints');
const headerlevelLenght = document.getElementsByClassName('headerLevel').length;
let globalCount = 0;
let themeClick = [];
let buttonNext = [];
let buttonThemeReturn = [];
let headerLevel = [];
let count = 0;
let textCountQ = 0;
let checkboxCountQ = 0;
let timerId;

for (let i = 0; i < numberThemeLength; i++)   // Инициализация всех тем 
    themeClick[i] = document.getElementsByClassName('buttonMenu')[i];

for (let i = 0; i < numberButtonLength; i++) {    // Назначение кнопок "ДАЛЕЕ" перехода между вопросами и кнопок возврата
    buttonNext[i] = document.getElementsByClassName('buttonNext')[i];
    buttonThemeReturn[i] = document.getElementsByClassName('buttonThemeReturn')[i];
}

for (let i = 0; i < headerlevelLenght; i++)
    headerLevel[i] = document.getElementsByClassName('headerLevel')[i];

let themeProg = { // Тема Программирование
    name: "questionProg",
    points: 0,
    questions: [],
    countTheme: 0,
    testAnswer: [3, 3, 1, 4, 2],
    textAnswer: ["Полиморфизм", "Класс"],
    // oneCheckbox: [1, 2, 5],
    // twoCheckbox: [2, 5],
    // threeCheckbox: [1, 3, 5],
    checkboxAnswer: [[1, 2, 5], [2, 5], [1, 3, 5]],
}

let themeMath = { // Тема Математика
    name: "questionMath",
    points: 0,
    questions: [],
    countTheme: 1,
    testAnswer: [2, 3, 1, 1, 2],
}
let themeRus = { // Тема Русский язык
    name: "questionRus",
    points: 0,
    questions: [],
    countTheme: 2,
    testAnswer: [3, 4, 1, 1, 3],
}
let themeBio = { // Тема Биология
    name: "questionBio",
    points: 0,
    questions: [],
    countTheme: 3,
    testAnswer: [3, 3, 2, 3, 3],
}
let themeInf = { // Тема Информатика
    name: "questionInf",
    points: 0,
    questions: [],
    countTheme: 4,
    testAnswer: [1, 3, 4, 1, 2],
}

let theme = [themeProg, themeMath, themeRus, themeBio, themeInf];


function flippingQuestions(theme) // Переход между вопросами
{
    printHeaderLevel(count);
    if (count > 0)
        theme.questions[count - 1].style.display = 'none';
    theme.questions[count].style.display = 'block';

    timerId = setInterval(() => timer(theme, timerId), 100);
    buttonNext[theme.countTheme].style.display = 'none';
}


function questionsCheck(theme)
{
    if (count < 5)
        liteQuestions(theme);
    else if (count > 4 && count < 10) {
        middleQuestions(theme);
    }
    else {

    } 
}

function liteQuestions(theme) // Проверка тестовых вопросов 1 уровня
{
    let correctAnswer = theme.testAnswer[count];
    let answer = theme.questions[count];
    let numberInput = 1;

    for (let node of answer.querySelectorAll('input')) {
        if (node.checked == true && numberInput == correctAnswer) 
            theme.points += 3;
        numberInput++;
    }
    count++;
}

function middleQuestions(theme) // Проверка вопросов 2 уровня
{
    let n = 0;
    let answer = theme.questions[count];
    let numberInput = 1;
    let correctAnswer = theme.checkboxAnswer[checkboxCountQ];

    for (let node of answer.querySelectorAll('input')) {
        if (node.type == 'text' && node.value == theme.textAnswer[textCountQ]) {
            theme.points += 7;
            textCountQ++;
        } else if (node.type == 'checkbox') {
            if (node.checked == true && correctAnswer.includes(numberInput) == true)
                theme.points += 2;
            else if (node.checked == true && correctAnswer.includes(numberInput) == false)
                theme.points -= 2;
            numberInput++;
            n = 1;
        }
    }
    if (n != 0)
        checkboxCountQ++;
    count++;    
}

function timer(theme, timerId)
{
    let i = 0;
    let answer = theme.questions[count];
    for (let node of answer.querySelectorAll('input')) {
        if (node.checked == true || (node.value != '' && node.type == 'text')) {
            buttonNext[theme.countTheme].style.display = 'block';
            i = 1;
            clearInterval(timerId);
        }
    }
    if (i == 0) 
        buttonNext[theme.countTheme].style.display = 'none';
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
    divGlobalPoints.style.display = 'block';
}

function printHeaderLevel(count)
{
    if (count < 5)
        headerLevel[0].style.display = 'block';
    else if (count > 4 && count < 10) {
        headerLevel[0].style.display = 'none';
        headerLevel[1].style.display = 'block';
    }
    else {
        headerLevel[1].style.display = 'none';
        headerLevel[2].style.display = 'block';
    }
}

function returnTheme(theme) // Рестарт
{
    clearInterval(timerId);  
    document.getElementsByClassName('contentMenu')[0].style.display = 'block';
    document.getElementsByClassName('startWindow')[0].style.display = 'none';
    buttonThemeReturn[theme.countTheme].style.display = 'none';
    buttonNext[theme.countTheme].style.display = 'none';
    theme.questions[count].style.display = 'none';
    for (let i = 0; i < headerlevelLenght; i++)
        headerLevel[i].style.display = 'none';
    theme.points = 0;
    count = 0; 
    checkboxCountQ = 0;
    textCountQ = 0;
}




function main(theme)
{
    initialQuestion(theme.questions, theme.name);
    document.getElementsByClassName('contentMenu')[0].style.display = 'none';
    buttonThemeReturn[theme.countTheme].style.display = 'block';
    flippingQuestions(theme);
    buttonThemeReturn[theme.countTheme].addEventListener('click', () => returnTheme(theme));
}

buttonStartGame.addEventListener('click', start);

for (let i = 0; i < 5; i++) {
    themeClick[i].addEventListener('click', () => main(theme[i]));
    buttonNext[i].addEventListener('click', () => questionsCheck(theme[i])); 
    buttonNext[i].addEventListener('click', () => flippingQuestions(theme[i]));
}

// buttonNext[0].addEventListener('click', () => liteQuestions(theme[0])); 
// buttonNext[0].addEventListener('click', () => flippingQuestions(theme[0])); 
// buttonNext[1].addEventListener('click', () => liteQuestions(theme[1])); 
// buttonNext[1].addEventListener('click', () => flippingQuestions(theme[1]));
// buttonNext[2].addEventListener('click', () => liteQuestions(theme[2])); 
// buttonNext[2].addEventListener('click', () => flippingQuestions(theme[2]));
// buttonNext[3].addEventListener('click', () => liteQuestions(theme[3])); 
// buttonNext[3].addEventListener('click', () => flippingQuestions(theme[3]));