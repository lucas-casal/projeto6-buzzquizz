axios.defaults.headers.common['Authorization'] = 'Sz9geys35NfoLDyLNU8wOlUm';

function callScreen3() {
    const screnn31 = document.querySelector('.basic-info-background');
    const tela1 = document.querySelector('.tela1');
    tela1.classList.add('hidden');
    screnn31.classList.remove('hidden');
}

function callScreen2() {
    //const screnn31 = document.querySelector('.basic-info-background');
    //const tela1 = document.querySelector('.tela1');
    //tela1.classList.add('hidden');
    //screnn31.classList.remove('hidden');
    console.log('CHAMA TELA 2');
}



//verifica se tem ids já salvos, se tiver armazena no ids
let temId = false;
const ids = [];
const arrr = getIdLocalStorage();
if (arrr != null){
    temId = true;
    arrr.forEach(x => {
        ids.push(x)
    })
}


//quando fizer o post do quiz, pegar o objt id do quiz, e passar como parâmetro:

//debugger
function addIdLocalStorage(id) {
    temId = true;
    ids.push({
		id: id
	},);
    console.log(`Lista de id1s: ${ids}`);
    const listasIdsSerialiado = JSON.stringify(ids);
    localStorage.setItem("idUserQuiz", listasIdsSerialiado);
} 

console.log(`ids: ${getIdLocalStorage()}`);

//pega o objeto de lista adicionado no local storage
function getIdLocalStorage() {
    const listaSerializada = localStorage.getItem("idUserQuiz");
    const ids = JSON.parse(listaSerializada); 
    return ids;
}

//Código referente a tela1
//Exibe todos os quizzes na div "wrappe-user-quiz"

/* Pegatodos os objetos de "id" do local storage, e solicita uma a uma
com api get e depois exiba na tela*/

// "id": [id1, id2, id3, id4];
//ids: array ^^^^^   //ainda n foi testada
let listaUQ = [];
function userQuiz() {
    let ids = getIdLocalStorage();
    console.log(ids);
    console.log('ids acima');
    const usQuiz = document.querySelector('.wrappe-user-quiz');
    usQuiz.innerHTML = '';
    for (i = 0; i<ids.length -1; i++) {
        let promisse = axios.get(`https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes/${ids[i].id}`);
        promisse.then(x => {
            console.log(`RETORNO DO USER QUIZ: ${i}:`);
            console.log(x);
            listaUQ.push(x.data);
        })
        promisse.catch(x => {
            console.log(`RETORNO DO USER QUIZ: ${x}`);
            console.log(x)
        })
    }
    debugger
    exibeQuizzes(listaUQ, usQuiz, "user-quiz",'onclick="callQuizScreen2(this)"');
}


//
if (temId) {
    userQuiz();
} else {
    console.log('não tem id ainda');
}



//A função que vai pegar o quiz clicado e chamar display none pra tela 1
function callQuizScreen2(element) {
    console.log(element);
    const pros = axios.get(`https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes/${element.id}`);
    pros.then(x => {
        console.log('clicou')
        console.log(x);
    });
    pros.catch(x => console.log(x.status));
}

//percorre e adiciona cada quiz do array na div de "where" + CLASSS adiciona classe e FUN adiciona funções
function exibeQuizzes(array, where, classs, fun) {
    array.forEach(element => {
        where.innerHTML += `<div id="${element.id}" ${fun} class="${classs}">
        <img class="img-quiz" src="${element.image}" alt="">
        <p>${element.title}</p>
      </div>`    
    });
}

function showAllQuizT1() {
    let arrayQuiz;
    const allQuizzes = document.querySelector('.wrappe-quiz');
    console.log(allQuizzes);
    allQuizzes.innerHTML = '';

    let pro = axios.get('https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes');
    pro.then(x => {
        console.log(x);
        arrayQuiz = x.data;
        exibeQuizzes(arrayQuiz, allQuizzes, "quiz", 'onclick="callQuizScreen2(this)"');
        
    }) 

    pro.catch(x =>{
        console.log(x);
    })
}

showAllQuizT1();

//tela1 end


var title=0;
var image=0;
var numberOfQuestions=1;
var levels=0;
const questionsArray = [];
const optionsArray = [];




function confirmInfo(){

    const quizTitle = document.getElementById("quiz-title").value;
    const quizImage = document.getElementById("quiz-image-url").value;
    const quizNumberOfQuestions = document.getElementById("quiz-number-questions").value;
    const quizLevels = document.getElementById("quiz-number-levels").value;
    console.log(quizTitle);
     
    
}
function confirmQuestions(){
    for (i=0; i<numberOfQuestions; i++){
        const question = document.querySelectorAll(".question")[i].value;
        const questionColor = document.querySelectorAll(".question-color")[i].value;
        const color = "#" + questionColor;
        const wrongOptionArray = document.querySelectorAll(".wrong-options-container")[i].children;
        const rightOption = document.querySelectorAll(".right-option")[i].value;
        const rightImage = document.querySelectorAll(".right-image-url")[i].value;
        
        const rightOptionObject = {
            text: rightOption,
            image: rightImage,
            isCorrectAnswer: true
        }
        optionsArray.push(rightOptionObject);

        for (x=0; x<3; x++){
            console.log(wrongOptionArray)
            question.children
            const wrongOption = wrongOptionArray[x].children[0];
            const wrongImage = wrongOptionArray[x].children[1];
            const wrongOptionObject = {
                text: wrongOption,
                image: wrongImage,
                isCorrectAnswer: false

            }
            console.log(wrongOption)
            console.log(wrongImage)
            optionsArray.push(wrongOptionObject);
            
        }
 
        const questionObject = {
            title: question,
            color: color,
            answers: optionsArray
        };
        questionsArray.push(questionObject);
        console.log(questionsArray);
    }
    console.log(questionsArray);



}
