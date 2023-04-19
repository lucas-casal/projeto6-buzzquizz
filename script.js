axios.defaults.headers.common['Authorization'] = 'Sz9geys35NfoLDyLNU8wOlUm';

/* let obj = {
	title: "Título do quizz",
	image: "https://http.cat/411.jpg",
	questions: [
		{
			title: "Título da pergunta 1",
			color: "#123456",
			answers: [
				{
					text: "Texto da resposta 1",
					image: "https://http.cat/411.jpg",
					isCorrectAnswer: true
				},
				{
					text: "Texto da resposta 2",
					image: "https://http.cat/412.jpg",
					isCorrectAnswer: false
				}
			]
		},
		{
			title: "Título da pergunta 2",
			color: "#123456",
			answers: [
				{
					text: "Texto da resposta 1",
					image: "https://http.cat/411.jpg",
					isCorrectAnswer: true
				},
				{
					text: "Texto da resposta 2",
					image: "https://http.cat/412.jpg",
					isCorrectAnswer: false
				}
			]
		},
		{
			title: "Título da pergunta 3",
			color: "#123456",
			answers: [
				{
					text: "Texto da resposta 1",
					image: "https://http.cat/411.jpg",
					isCorrectAnswer: true
				},
				{
					text: "Texto da resposta 2",
					image: "https://http.cat/412.jpg",
					isCorrectAnswer: false
				}
			]
		}
	],
	levels: [
		{
			title: "Título do nível 1",
			image: "https://http.cat/411.jpg",
			text: "Descrição do nível 1",
			minValue: 0
		},
		{
			title: "Título do nível 2",
			image: "https://http.cat/412.jpg",
			text: "Descrição do nível 2",
			minValue: 50
		}
	]
}

const envia = axios.post('https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes', obj);
envia.then(x => {
    console.log(`STATUS ENVIO OBJ ${x.status}`);
})
envia.catch(x => {
    console.log(`STATUS ENVIO OBJ ${x.status}`);
}) */


//Aqui exibe todos os quizzes na div 
let arrayQuiz;
const quizzes = document.querySelector('.quizzes');

let pro = axios.get('https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes')
pro.then(x => {
    console.log(x);
    arrayQuiz = x.data;
    quizzes.innerHTML = '';
    arrayQuiz.forEach(element => {
        quizzes.innerHTML += `<div class="quiz">
        <img class="img-quiz" src="${element.image}" alt="">
        <div class="tittle">${element.title}</div>
      </div>`    
    });
}) 


/*let pro = axios.get('https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes')
pro.then(x => {
    console.log(x);
    arrayQuiz = x.data;
    quiz.innerHTML = '';
    arrayQuiz.forEach(element => {
        quiz.innerHTML += `<img class="img-quiz" src="${element.image}" alt="">
    <div class="tittle">${element.title}</div>`    
    });
})
pro.catch(x => {
    console.log(x);
})
 */

