let elemt = document.getElementsByClassName('buttonStartGame')[0];

elemt.addEventListener("click", start);

function start()
{
    let elem = document.getElementsByClassName('contentMenu')[0];
    let startWindow = document.getElementsByClassName('startWindow')[0];
    elem.style.display = 'block';
    startWindow.style.display = 'none';
}