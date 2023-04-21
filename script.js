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

    //Inicio de um ṕroblema; nao está exibindo na tela:
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

//código referente à tela3 
var title=0;
var image=0;
var numberOfQuestions=1;
var quizLevels=0;
var questionsArray = [];
var optionsArray = [];
var createdQuizz = {};
var numberOfLevels = 0;
var colorCheckedArray = [];



//função para checar a URL de imagens  
function checkUrl(string) {
   try{
     let url = new URL(string)
     return true
    } catch(err) {
    return false
    }
} 

//função para checar hexadecimal
function hexCheck(hex){
    colorCheckedArray=[];
    var R = hex.substr(0,2);
    var G = hex.substr(2,2);
    var B = hex.substr(4,2);

    if (hex.length === 6){
        R = hex.substr(0,2);
        G = hex.substr(2,2);
        B = hex.substr(4,2);

        decimalR = parseInt(R, 16)
        decimalG = parseInt(G, 16)
        decimalB = parseInt(B, 16)

    } else if (hex.length === 3){
        R = hex.substr(0,1);
        G = hex.substr(1,1);
        B = hex.substr(2,1);
    
        decimalR = parseInt(R, 16)
        decimalG = parseInt(G, 16)
        decimalB = parseInt(B, 16)
    
    } else{
        decimalR = 300;
        decimalG = 300;
        decimalB = 300;
    }

    if (decimalR > 255 || decimalG > 255 || decimalB > 255){
        return false;
    } else{
        return true;
    }
}

//função para checar o tamanho de uma string
function lengthCheck(str, minLength, maxLength = Number.POSITIVE_INFINITY){
    if (str.length < minLength){
        return false
    } else if (str.length > maxLength){
        return false
    } else{
        return true
    }
}

//função para checar o valor de um número
function valueCheck(num, min, max = Number.POSITIVE_INFINITY){
    if (num < min){
        return false
    } else if(num > max){
        return false
    } else{
        return true
    }
}

//function do primeiro botão
function confirmInfo(){
    //apaga as "caixas" de criação de perguntas
    const creatingBackground = document.getElementsByClassName('creating-background');
    for(i=creatingBackground.length-1; i >=0 ; i--){
    creatingBackground[i].remove();
    }
    //

    //checando a URL da imagem do quizz
    const quizImage = document.getElementById("quiz-image-url").value;
    const quizTitle = document.getElementById("quiz-title").value;
    numberOfQuestions= document.getElementById("quiz-number-questions").value;
    numberOfLevels = document.getElementById("quiz-number-levels").value;

    if (!lengthCheck(quizTitle, 20, 65)){
        alert("O título inserido para o quizz tem " + quizTitle.length + " caracteres! \n Deveria ter entre 20 e 65")
        
    } else if (!checkUrl(quizImage)){
        alert("URL da imagem digitada é inválida!");
    } else if (!valueCheck(numberOfQuestions, 3)){
        alert("Você deve criar, pelo menos, 3 perguntas!");
    } else if(!valueCheck(numberOfLevels, 2)){
        alert("Você deve criar, pelo menos, 2 níveis!");
    }

    //cria as "caixas" de criação de perguntas
    createdQuizz.title = quizTitle
    createdQuizz.image = quizImage
    createdQuizz.questions= []
    createdQuizz.levels= []

    for (i=0; i<numberOfQuestions; i++){
        const questionBackground = document.createElement("div");
        questionBackground.className = "creating-background";
        
        const inputsContainer = document.createElement("div");
        inputsContainer.innerText = "Pergunta " + (numberOfQuestions - i);
        inputsContainer.className = "inputs-container";
        questionBackground.appendChild(inputsContainer);

        const inputQuestion = document.createElement("input");
        inputQuestion.className = "question";
        inputQuestion.setAttribute("type", "text")
        inputQuestion.setAttribute('minlength', "20")
        inputQuestion.setAttribute("required", true)
        inputQuestion.setAttribute('placeholder', "Texto da pergunta")
        inputsContainer.appendChild(inputQuestion)
        
        const inputQuestionColor = document.createElement("input");
        inputQuestionColor.className = "question-color";
        inputQuestionColor.setAttribute("required", true)
        inputQuestionColor.setAttribute('placeholder', "Cor de fundo da pergunta")
        inputsContainer.appendChild(inputQuestionColor);

        const rightContainer = document.createElement("div");
        rightContainer.className = "inputs-container";
        rightContainer.innerText = "Resposta correta";
        questionBackground.appendChild(rightContainer);

        const inputRightOption = document.createElement("input");
        inputRightOption.className = "right-option";
        inputRightOption.setAttribute("required", true)
        inputRightOption.setAttribute('placeholder', 'Resposta correta')
        rightContainer.appendChild(inputRightOption)
        
        const inputRightImage = document.createElement("input");
        inputRightImage.className = "right-image-url";
        inputRightImage.setAttribute("required", true)
        inputRightImage.setAttribute('placeholder', 'URL da imagem')
        rightContainer.appendChild(inputRightImage);

        const wrongContainer = document.createElement("div");
        wrongContainer.className = "wrong-options-container";
        wrongContainer.innerText = "Respostas incorretas";
        questionBackground.appendChild(wrongContainer);

        const wrongContainer1 = document.createElement("div");
        wrongContainer1.className = "inputs-container";
        wrongContainer.appendChild(wrongContainer1);

        const inputWrongOption1 = document.createElement("input");
        inputWrongOption1.className = "wrong-option";
        inputWrongOption1.setAttribute("required", true)
        inputWrongOption1.setAttribute('placeholder', 'Resposta incorreta 1');
        wrongContainer1.appendChild(inputWrongOption1)
        
        const inputWrongImage1 = document.createElement("input");
        inputWrongImage1.className = "wrong-image-url ";
        inputWrongImage1.setAttribute("required", true)
        inputWrongImage1.setAttribute('placeholder', 'URL da imagem 1');
        wrongContainer1.appendChild(inputWrongImage1);
        
        const wrongContainer2 = document.createElement("div");
        wrongContainer2.className = "inputs-container";
        wrongContainer.appendChild(wrongContainer2);

        const inputWrongOption2 = document.createElement("input");
        inputWrongOption2.className = "wrong-option";
        inputWrongOption2.setAttribute("required", true)
        inputWrongOption2.setAttribute('placeholder', 'Resposta incorreta 2');
        wrongContainer2.appendChild(inputWrongOption2)
        
        const inputWrongImage2 = document.createElement("input");
        inputWrongImage2.className = "wrong-image-url";
        inputWrongImage2.setAttribute("required", true)
        inputWrongImage2.setAttribute('placeholder', 'URL da imagem 2');
        wrongContainer2.appendChild(inputWrongImage2);

        const wrongContainer3 = document.createElement("div");
        wrongContainer3.className = "inputs-container";
        wrongContainer.appendChild(wrongContainer3);

        const inputWrongOption3 = document.createElement("input");
        inputWrongOption3.className = "wrong-option";
        inputWrongOption3.setAttribute("required", true)
        inputWrongOption3.setAttribute('placeholder', 'Resposta incorreta 3');
        wrongContainer3.appendChild(inputWrongOption3)
        
        const inputWrongImage3 = document.createElement("input");
        inputWrongImage3.className = "wrong-image-url";
        inputWrongImage3.setAttribute("required", true)
        inputWrongImage3.setAttribute('placeholder', 'URL da imagem 3');
        wrongContainer3.appendChild(inputWrongImage3);

        document.querySelector(".creating-questions-titles").after(questionBackground)        
    }
     

    for (i=0; i<numberOfLevels; i++){
        const levelBackground = document.createElement("div");
        levelBackground.className = "creating-background";
        
        const inputsContainer = document.createElement("div");
        inputsContainer.innerText = "Nível " + (numberOfLevels - i);
        inputsContainer.className = "inputs-container";
        levelBackground.appendChild(inputsContainer);

        const inputLevel = document.createElement("input");
        inputLevel.className = "level";
        inputLevel.setAttribute("type", "text")
        inputLevel.setAttribute('minlength', "10")
        inputLevel.setAttribute("required", true)
        inputLevel.setAttribute('placeholder', "Título do nível")
        inputsContainer.appendChild(inputLevel)
        
        const inputLevelPercentage = document.createElement("input");
        inputLevelPercentage.className = "level-percentage";
        inputLevelPercentage.setAttribute("type", "number")
        inputLevelPercentage.setAttribute('min', "0")
        inputLevelPercentage.setAttribute("required", true)
        inputLevelPercentage.setAttribute('placeholder', "% de acerto mínima")
        inputsContainer.appendChild(inputLevelPercentage);
        console.log(inputLevelPercentage)

        const inputLevelUrl = document.createElement("input");
        inputLevelUrl.className = "level-url";
        inputLevelUrl.setAttribute("type", "url")
        inputLevelUrl.setAttribute("required", true)
        inputLevelUrl.setAttribute('placeholder', 'URL da imagem do nível')
        inputsContainer.appendChild(inputLevelUrl)
        
        const inputLevelDescription = document.createElement("input");
        inputLevelDescription.className = "level-description";
        inputLevelDescription.setAttribute("type", "text")
        inputLevelDescription.setAttribute("required", true)
        inputLevelDescription.setAttribute('placeholder', 'Descrição do nível')
        inputsContainer.appendChild(inputLevelDescription);

        document.querySelector(".creating-levels-titles").after(levelBackground)        
    }
}



function confirmQuestions(){
    creating_questions_block: {
    questionsArray = []
    for (i=0; i<numberOfQuestions; i++){
        optionsArray = []
        const question = document.querySelectorAll(".question")[i].value;
        const questionColor = document.querySelectorAll(".question-color")[i].value;
        const color = "#" + questionColor;
        const wrongOptionArray = document.querySelectorAll(".wrong-options-container")[i].children;
        const rightOption = document.querySelectorAll(".right-option")[i].value;
        const rightImage = document.querySelectorAll(".right-image-url")[i].value;  
        
        //checking inputs
        if (!lengthCheck(question, 20)){
            alert("Uma de suas perguntas tem " + question.length + " caracteres! \n Deveria ter, pelo menos, 20.")
            break
        } else if (!hexCheck(questionColor)){
            alert ("Um dos códigos de cor digitados não está no formato HEX!")
            break
        } else if (!lengthCheck(rightOption, 1)){
            alert("Uma de suas respostas corretas está vazia!")
            break
        } else if (!checkUrl(rightImage)){
            alert("URL da imagem digitada é inválida!");
            break
        }
        
        const rightOptionObject = {
            text: rightOption,
            image: rightImage,
            isCorrectAnswer: true
        }
        optionsArray.push(rightOptionObject);

        for (x=0; x<3; x++){
            const wrongOption = wrongOptionArray[x].children[0].value;
            const wrongImage = wrongOptionArray[x].children[1].value;
            

            if (!lengthCheck(wrongOption, 1)){
                alert("Uma de suas respostas incorretas está vazia!")
                break creating_questions_block;
            } else if (!checkUrl(wrongImage)){
                alert("URL da imagem digitada é inválida!");
                break creating_questions_block;
            }
                const wrongOptionObject = {
                    text: wrongOption,
                    image: wrongImage,
                    isCorrectAnswer: false
                }
            optionsArray.push(wrongOptionObject);
        }
 
        const questionObject = {
            title: question,
            color: color,
            answers: optionsArray
        };
        questionsArray.push(questionObject);


    }
    createdQuizz.questions = questionsArray;

}}


function confirmLevels(){
    var levelsArray = [];
    var levelsPercArray = [];
    var zeroWarranty = true;

    creating_levels_block: {
    for (i=0; i<numberOfLevels; i++){
        const level = document.querySelectorAll(".level")[i].value;
        const levelPercentage = document.querySelectorAll(".level-percentage")[i].value;
        const levelUrl = document.querySelectorAll(".level-url")[i].value;
        const levelDescription = document.querySelectorAll(".level-description")[i].value;

        
        //checking inputs
        if (!lengthCheck(level, 10)){
            alert("O título de um de seus níveis tem " + level.length + " caracteres! \n Deveria ter, pelo menos, 10.")
            break
        } 
        else if (!valueCheck(levelPercentage, 0, 100)){
            alert ("O valor da sua porcentagem deve estar entre 0 e 100!")
            break
        } else if (!checkUrl(levelUrl)){
            alert("URL da imagem digitada é inválida!");
            break
        } else if (!lengthCheck(levelDescription, 30)){
            alert("A descrição de um de seus níveis tem " + levelDescription.length + " caracteres! \n Deveria ter, pelo menos, 30.")
            break
        }
        
        if (levelPercentage == 0){
            zeroWarranty = false
        };

        const levelObject = {
            title: level,
            image: levelUrl,
            text: levelDescription,
            minValue: levelPercentage
        }
        levelsPercArray.push(levelPercentage);
        levelsArray.push(levelObject);
    }
    console.log (zeroWarranty)
    if (zeroWarranty){
        break creating_levels_block;
    }
    createdQuizz.levels = levelsArray
    console.log(createdQuizz);
    } 
    const promise = axios.post(
        "https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes",
        createdQuizz
    );
  
  promise.then(apiFeedback);
}

function apiFeedback(sent) {
    console.log(sent.data);
}

