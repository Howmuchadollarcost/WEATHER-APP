const API_URL = "https://api.openweathermap.org/data/2.5/weather?q=";
const APU_URL2 = "&units=metric&appid=7b1dc3984cda7b97825cbfe8885b3a24";

const form = document.querySelector('form');
const input = document.querySelector('input');
const loadingImage = document.querySelector('.loadingImage');
const section = document.querySelector('.left-side');
const right_side = document.querySelector('.right-side');


loadingImage.style.display="none";

form.addEventListener('submit',submittedArea);

function submittedArea(event){
    event.preventDefault();
    const searchTerm = input.value;
    search(searchTerm).then(showTemp);
}

function search(searchTerm){
    const url = API_URL + searchTerm + APU_URL2;
    loadingImage.style.display = '';
    section.innerHTML = ''

     return fetch(url).then(res => res.json()).then(result => {
        return result;
    });
}

function showTemp(temperatur){
    setText(Math.round(temperatur.main.temp));
    setText(temperatur.name);
    setText(temperatur.weather[0].description);

    section.style.border = "solid 5px #565656";
    loadingImage.style.display="none";
}



function setText(word){
    const createH1 = document.createElement('H1');
    const nodeWord = document.createTextNode(word);

    createH1.appendChild(nodeWord);
    section.appendChild(createH1);
    changeColor();

    /*console.log(createH1);*/
}

function setText2(word){
    const createH2 = document.createElement('H2');
    const nodeWord = document.createTextNode(word);

    createH2.appendChild(nodeWord);
    right_side.appendChild(createH2);

    /*console.log(createH1);*/
}


function sideBar(city){
    search(city).then(function(result){
    setText2(city);
    setText2(Math.round(result.main.temp));

    loadingImage.style.display="none";
    right_side.style.border = "5px #565656";

    })
}

function showCities(){
    sideBar("Stange")
    sideBar("Hamar")
    sideBar("Oslo")
    sideBar("New York")
}

showCities();


function changeColor(){
    var r = getRandomInt(100,244);
    var g = getRandomInt(100,244);
    var b = getRandomInt(100,244);
    document.body.style.backgroundColor = "rgb("+r+","+g+","+b+")";
    document.body.style.color = "rgb("+r+","+g+","+b+")";
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; 
  }

