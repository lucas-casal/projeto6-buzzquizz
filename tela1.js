axios.defaults.headers.common['Authorization'] = 'Sz9geys35NfoLDyLNU8wOlUm';

function callScreen3() {
    const screnn31 = document.querySelector('.basic-info-background');
    const tela1 = document.querySelector('.tela1');
    tela1.classList.add('hidden');
    screnn31.classList.remove('hidden');
}

const listasIds = []


let temId = false; //para futura verificação se ja tem quiz feitos pelo user

//quando fizer o post do quiz, pegar o objt id do quiz, e passar como parâmetro:
function addIdLocalStorage(id) {
    temId = true;
    listasIds.push(id);
    const listasIdsSerialiado = JSON.stringify(listasIds);
    localStorage.setItem("idUserQuiz", listasIdsSerialiado);
}

//teste
//debugger
addIdLocalStorage(7);

//pega o objeto de lista adicionado no local storage
function getIdLocalStorage() {
    const listaSerializada = localStorage.getItem("idUserQuiz");
    const ids = JSON.parse(listaSerializada); 
    return ids;
}

//Código referente a tela1
//Exibe todos os quizzes na div "quizzes"

/* Pegatodos os objetos de "id" do local storage, e solicita uma a uma
com api get e depois exiba na tela*/

// "id": [id1, id2, id3, id4];
//ids: array ^^^^^   //ainda n foi testada
function userQuiz() {
    let ids = getIdLocalStorage();
    const usQuiz = document.querySelector('.user-quiz');
    let lista = [];
    for (i = 0; i<ids.length -1; i++) {
        let promisse = axios.get(`https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes/${ids[i]}`);
        promisse.then(x => {
            console.log(`RETORNO DO USER QUIZ: ${x}`);
            lista.push(x.data);
        })
        promisse.catch(x => {
            console.log(`RETORNO DO USER QUIZ: ${x}`);
            console.log(x)
        })
    }
    exibeQuizzes(lista, usQuiz);
}

if (temId) {
    userQuiz();
} else {
    console.log('não tem id ainda');
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
