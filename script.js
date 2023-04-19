axios.defaults.headers.common['Authorization'] = 'Sz9geys35NfoLDyLNU8wOlUm';

//Código referente a tela1
//Exibe todos os quizzes na div "quizzes"

/* Pegatodos os objetos de "id" do local storage, e solicita uma a uma
com api get e depois exiba na tela*/

// "id": [id1, id2, id3, id4];
//ids: array ^^^^^   //ainda n foi testada
function userQuiz(ids) {
    const usQuiz = document.querySelector('.user-quiz');
    let lista = [];
    for (i = 0; i<ids.length -1; i++) {
        let promisse = axios.get(`https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes/${i}`);
        promisse.then(x => {
            lista.push(x.data);
        })
        promisse.catch(x => {
            console.log(x)
        })
    }
    exibeQuizzes(lista, usQuiz);
}

let arrayQuiz;
const quizzes = document.querySelector('.quizzes');
quizzes.innerHTML = '';

let pro = axios.get('https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes')
pro.then(x => {
    console.log(x);
    arrayQuiz = x.data;
    exibeQuizzes(arrayQuiz, quizzes);
    
}) 

pro.catch(x =>{
    console.log(x);
})

//percorre e adiciona cada quiz do array na div de "where"
function exibeQuizzes(array, where) {
    array.forEach(element => {
        where.innerHTML += `<div class="quiz">
        <img class="img-quiz" src="${element.image}" alt="">
        <div class="tittle">${element.title}</div>
      </div>`    
    });
}


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
