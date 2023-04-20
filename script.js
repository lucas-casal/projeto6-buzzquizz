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

//código referente à tela3 
