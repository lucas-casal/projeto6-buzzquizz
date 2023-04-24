axios.defaults.headers.common['Authorization'] = 'Sz9geys35NfoLDyLNU8wOlUm';

function callScreen3() {
    const screen31 = document.querySelector('.basic-info-background');
    const tela1 = document.querySelector('.tela1');
    tela1.classList.add('hidden');
    screen31.classList.remove('hidden');
}

function callScreen2() {
    //const screen31 = document.querySelector('.basic-info-background');
    //const tela1 = document.querySelector('.tela1');
    //tela1.classList.add('hidden');
    //screen31.classList.remove('hidden');
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
const usQuiz = document.querySelector('.wrappe-user-quiz');
let listaUQ = [];
function userQuiz() {
    let ids = getIdLocalStorage();
    console.log(ids);
    console.log('ids acima');
    
    usQuiz.innerHTML = '';
    for (i = 0; i<ids.length; i++) {

        let promisse = axios.get(`https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes/${ids[i].id}`);
        promisse.then(x => {
            listaUQ.push(x.data);
            exibeQuizzes(listaUQ, usQuiz, "user-quiz",'onclick="callQuizScreen2(this)"');
        })
        promisse.catch(x => {
            console.log(`RETORNO DO USER QUIZ: ${x}`);
            console.log(x)
        })
    }

}
    


//
if (temId) {
    userQuiz();
    document.querySelector(".my-quizzes").classList.remove("hidden");
    document.querySelector(".wrappe-user-quiz").classList.remove("hidden")
    document.querySelector(".create-quiz").classList.add("hidden")
} else {
    console.log('não tem id ainda');
    document.querySelector(".my-quizzes").classList.add("hidden");
    document.querySelector(".wrappe-user-quiz").classList.add("hidden")
    document.querySelector(".create-quiz").classList.remove("hidden")
}


function toggleScreen12() {
    const t1 = document.querySelector('.tela1');
    const t2 = document.querySelector('.tela2');
    t1.classList.toggle('hidden');
    t2.classList.toggle('hidden');
}

function gameQuiz(element) {
    console.log(element);
    console.log(element.parentNode);

    const playingOptions = element.parentNode;
    for (i=0; i<=playingOptions.length-1; i++) {
        console.log(playingOptions[i].firstChild);
        console.log(playingOptions[i].firstChild.classList);
    }
    element.classList.remove('not-selected');
    //toda vez que clicar quero que:
    //remova a classe hidden do (first, second, third, fourth)OptionCheck
    //adicione o "isCorrectAnswer" em um array para calcular a porcentagem de acertos
    //adicione a class not-selected em todos as outras opções

}

var playingQuizz = 0;

//A função que vai pegar o quiz clicado e chamar display none pra tela 1
function callQuizScreen2(element) {
    toggleScreen12();
    console.log(element);
    const pros = axios.get(`https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes/${element.id}`);
    pros.then(x => {
        console.log('clicou')
        document.querySelector(".tela2").classList.remove("hidden")
        document.querySelector(".tela1").classList.add("hidden")
        console.log(x);
        const selectedQuizz = x.data;
        console.log(selectedQuizz);
        const playingTopImage = document.querySelector(".top-image");
        playingTopImage.setAttribute("src", selectedQuizz.image);
        playingQuizzId = selectedQuizz;
        playingQuizzName = document.querySelector(".playing-quizz-name");
        playingQuizzName.innerText = selectedQuizz.title;

        numberOfQuestions = selectedQuizz.questions.length;

        const secondScreen = document.querySelector(".tela2");

        for(i=secondScreen.children.length-1; i >=1 ; i--){
            secondScreen.children[i].remove();
        }

        //renderiza as questões
        for (i=0; i<numberOfQuestions; i++){
        
            const questionBackground = document.createElement("div");
            questionBackground.className = "playing-questions-container";
            
            const questionTitle = document.createElement("div");
            questionTitle.innerText = selectedQuizz.questions[i].title;
            questionTitle.className = "playing-question"
            questionTitle.style.backgroundColor = selectedQuizz.questions[i].color;
            questionBackground.appendChild(questionTitle);
    
            const optionsContainer = document.createElement("div");
            optionsContainer.className = "playing-options-container";
            questionBackground.appendChild(optionsContainer)
    
            const firstOption = document.createElement("div");
            firstOption.className = "option-a";
            firstOption.setAttribute('onclick', 'gameQuiz(this)');
            optionsContainer.appendChild(firstOption);


            const secondOption = document.createElement("div");
            secondOption.className = "option-b";
            secondOption.setAttribute('onclick', 'gameQuiz(this)');
            optionsContainer.appendChild(secondOption);

            const thirdOption = document.createElement("div");
            thirdOption.className = "option-c";
            thirdOption.setAttribute('onclick', 'gameQuiz(this)');
            optionsContainer.appendChild(thirdOption);

            const fourthOption = document.createElement("div");
            fourthOption.className = "option-d";
            fourthOption.setAttribute('onclick', 'gameQuiz(this)');
            optionsContainer.appendChild(fourthOption);
 
            const playingOptionsArray = selectedQuizz.questions[i].answers;
            playingOptionsArray.sort(comparador);
            function comparador() { 
                return Math.random() - 0.5; 
            };

            console.log(selectedQuizz);

            const a = playingOptionsArray[0];
            const b = playingOptionsArray[1];
            var c = 0;
            var d = 0
            if (playingOptionsArray.length === 3){
                
                c = playingOptionsArray[2];
            
            } else if (playingOptionsArray.length === 4) {
            
                c = playingOptionsArray[2];
                d = playingOptionsArray[3];
            
            }
            
            const firstOptionImage = document.createElement("img");
            firstOptionImage.setAttribute("src", a.image);
            firstOptionImage.className = "option-image";
            firstOption.appendChild(firstOptionImage);

            const firstOptionText = document.createElement("div");
            firstOptionText.innerText = a.text;
            firstOptionText.className = "option-text";
            firstOption.appendChild(firstOptionText);

            const firstOptionCheck = document.createElement("div");
            firstOptionCheck.innerText = a.isCorrectAnswer;
            firstOptionCheck.className = "hidden";
            firstOption.appendChild(firstOptionCheck);

            const secondOptionImage = document.createElement("img");
            secondOptionImage.setAttribute("src", b.image);
            secondOptionImage.className = "option-image";
            secondOption.appendChild(secondOptionImage);

            const secondOptionText = document.createElement("div");
            secondOptionText.innerText = b.text;
            secondOptionText.className = "option-text";
            secondOption.appendChild(secondOptionText);

            const secondOptionCheck = document.createElement("div");
            secondOptionCheck.innerText = b.isCorrectAnswer;
            secondOptionCheck.className = "hidden";
            secondOption.appendChild(secondOptionCheck);

            if (c!==0){
            const thirdOptionImage = document.createElement("img");
            thirdOptionImage.setAttribute("src", c.image);
            thirdOptionImage.className = "option-image";
            thirdOption.appendChild(thirdOptionImage);

            const thirdOptionText = document.createElement("div");
            thirdOptionText.innerText = c.text;
            thirdOptionText.className = "option-text";
            thirdOption.appendChild(thirdOptionText);
             
            const thirdOptionCheck = document.createElement("div");
            thirdOptionCheck.innerText = c.isCorrectAnswer;
            thirdOptionCheck.className = "hidden";
            thirdOption.appendChild(thirdOptionCheck);
            
            }

            if(d!==0){

            const fourthOptionImage = document.createElement("img");
            fourthOptionImage.setAttribute("src", d.image);
            fourthOptionImage.className = "option-image";
            fourthOption.appendChild(fourthOptionImage);

            const fourthOptionText = document.createElement("div");
            fourthOptionText.innerText = d.text;
            fourthOptionText.className = "option-text";
            fourthOption.appendChild(fourthOptionText);
            
            const fourthOptionCheck = document.createElement("div");
            fourthOptionCheck.innerText = d.isCorrectAnswer;
            fourthOptionCheck.className = "hidden";
            fourthOption.appendChild(fourthOptionCheck);
            }
            
            secondScreen.appendChild(questionBackground);

        }
            
        const reloadButton = document.createElement("button");
        reloadButton.className = "next-step-button";
        reloadButton.setAttribute("onclick", "reiniciarQuizz()");
        reloadButton.innerText = "Reiniciar Quizz";
        secondScreen.appendChild(reloadButton);

        const backToHome = document.createElement("div");
        backToHome.className = "home-button";
        backToHome.setAttribute("onclick", "window.location.reload()");
        backToHome.innerText = "Voltar pra home";
        secondScreen.appendChild(backToHome);

    });
    pros.catch(x => console.log(x.status));
}
function reiniciarQuizz(){
    callQuizScreen2(playingQuizzId); 

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

function callQuizScreen3(){
    document.querySelector('.tela1').classList.add("hidden");
    document.querySelector('.basic-info-background').classList.remove("hidden");
}
//tela1 end




// tela 3 V
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
    var R = hex.substr(1,2);
    var G = hex.substr(3,2);
    var B = hex.substr(5,2);

    if (hex.length === 7){
        R = hex.substr(1,2);
        G = hex.substr(3,2);
        B = hex.substr(5,2);

        decimalR = parseInt(R, 16)
        decimalG = parseInt(G, 16)
        decimalB = parseInt(B, 16)

    } else if (hex.length === 4){
        R = hex.substr(1,1);
        G = hex.substr(2,1);
        B = hex.substr(3,1);
    
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
    var stopIt = false;

    if (!lengthCheck(quizTitle, 20, 65)){
        alert("O título inserido para o quizz tem " + quizTitle.length + " caracteres! \n Deveria ter entre 20 e 65")
        stopIt = true
    } else if (!checkUrl(quizImage)){
        alert("URL da imagem digitada é inválida!");
        stopIt = true
    } else if (!valueCheck(numberOfQuestions, 3)){
        alert("Você deve criar, pelo menos, 3 perguntas!");
        stopIt = true
    } else if(!valueCheck(numberOfLevels, 2)){
        alert("Você deve criar, pelo menos, 2 níveis!");
        stopIt = true
    }

    //cria as "caixas" de criação de perguntas
    createdQuizz.title = quizTitle
    createdQuizz.image = quizImage
    createdQuizz.questions= []
    createdQuizz.levels= []

    for (i=0; i<numberOfQuestions; i++){
        const questionBackground = document.createElement("div");
        questionBackground.className = "creating-background";
        
        const questionTitle = document.createElement("h4");
        questionTitle.innerText = "Pergunta " + (numberOfQuestions - i);
        questionTitle.className = "questions-title-collapse"
        questionTitle.setAttribute("onclick", "collapse(this)");
        questionBackground.appendChild(questionTitle);


        
        const inputsContainer = document.createElement("div");
        inputsContainer.className = "teste question-container";
        questionBackground.appendChild(inputsContainer)

        const infoContainer = document.createElement("div");
        infoContainer.className = "inputs-container";
        inputsContainer.appendChild(infoContainer)

        const inputQuestion = document.createElement("input");
        inputQuestion.className = "question-text question";
        inputQuestion.setAttribute("type", "text")
        inputQuestion.setAttribute('minlength', "20")
        inputQuestion.setAttribute("required", true)
        inputQuestion.setAttribute('placeholder', "Texto da pergunta")
        infoContainer.appendChild(inputQuestion)
        
        const inputQuestionColor = document.createElement("input");
        inputQuestionColor.className = "question-color question";
        inputQuestionColor.setAttribute("required", true)
        inputQuestionColor.setAttribute('placeholder', "Cor de fundo da pergunta")
        infoContainer.appendChild(inputQuestionColor);

        const rightContainer = document.createElement("div");
        rightContainer.className = "right-container";
        inputsContainer.appendChild(rightContainer);

        const rightContainerText = document.createElement("h4");
        rightContainerText.innerText = "Resposta correta";
        rightContainer.appendChild(rightContainerText);

        const inputRightOption = document.createElement("input");
        inputRightOption.className = "right-option question";
        inputRightOption.setAttribute("required", true)
        inputRightOption.setAttribute('placeholder', 'Resposta correta')
        rightContainer.appendChild(inputRightOption)
        
        const inputRightImage = document.createElement("input");
        inputRightImage.className = "right-image-url question";
        inputRightImage.setAttribute("required", true)
        inputRightImage.setAttribute('placeholder', 'URL da imagem')
        rightContainer.appendChild(inputRightImage);

        const wrongContainer = document.createElement("div");
        wrongContainer.className = "wrong-options-container";
        inputsContainer.appendChild(wrongContainer);

        const wrongContainerText = document.createElement("h4");
        wrongContainerText.innerText = "Respostas incorretas";
        wrongContainer.appendChild(wrongContainerText);

        const wrongContainer1 = document.createElement("div");
        wrongContainer1.className = "inputs-container";
        wrongContainer.appendChild(wrongContainer1);

        const inputWrongOption1 = document.createElement("input");
        inputWrongOption1.className = "wrong-option question";
        inputWrongOption1.setAttribute('placeholder', 'Resposta incorreta 1');
        wrongContainer1.appendChild(inputWrongOption1)
        
        const inputWrongImage1 = document.createElement("input");
        inputWrongImage1.className = "wrong-image-url question";
        inputWrongImage1.setAttribute('placeholder', 'URL da imagem 1');
        wrongContainer1.appendChild(inputWrongImage1);
        
        const wrongContainer2 = document.createElement("div");
        wrongContainer2.className = "inputs-container";
        wrongContainer.appendChild(wrongContainer2);

        const inputWrongOption2 = document.createElement("input");
        inputWrongOption2.className = "wrong-option question";
        inputWrongOption2.setAttribute("required", true)
        inputWrongOption2.setAttribute('placeholder', 'Resposta incorreta 2');
        wrongContainer2.appendChild(inputWrongOption2)
        
        const inputWrongImage2 = document.createElement("input");
        inputWrongImage2.className = "wrong-image-url question";
        inputWrongImage2.setAttribute("required", true)
        inputWrongImage2.setAttribute('placeholder', 'URL da imagem 2');
        wrongContainer2.appendChild(inputWrongImage2);

        const wrongContainer3 = document.createElement("div");
        wrongContainer3.className = "inputs-container";
        wrongContainer.appendChild(wrongContainer3);

        const inputWrongOption3 = document.createElement("input");
        inputWrongOption3.className = "wrong-option question";
        inputWrongOption3.setAttribute("required", true)
        inputWrongOption3.setAttribute('placeholder', 'Resposta incorreta 3');
        wrongContainer3.appendChild(inputWrongOption3)
        
        const inputWrongImage3 = document.createElement("input");
        inputWrongImage3.className = "wrong-image-url question";
        inputWrongImage3.setAttribute("required", true)
        inputWrongImage3.setAttribute('placeholder', 'URL da imagem 3');
        wrongContainer3.appendChild(inputWrongImage3);

        document.querySelector(".questions-titles").after(questionBackground)        
    }
     

    for (i=0; i<numberOfLevels; i++){
        const levelBackground = document.createElement("div");
        levelBackground.className = "creating-background";
        
        const levelTitle = document.createElement("h4");
        levelTitle.innerText = "Nível " + (numberOfLevels - i);
        levelTitle.className = "levels-title-collapse"
        levelTitle.setAttribute("onclick", "collapse(this)");
        levelBackground.appendChild(levelTitle);
        
        const inputsContainer = document.createElement("div");
        inputsContainer.className = "teste level-container";
        levelBackground.appendChild(inputsContainer);

        const inputLevel = document.createElement("input");
        inputLevel.className = "level question";
        inputLevel.setAttribute("type", "text")
        inputLevel.setAttribute('minlength', "10")
        inputLevel.setAttribute("required", true)
        inputLevel.setAttribute('placeholder', "Título do nível")
        inputsContainer.appendChild(inputLevel)
        
        const inputLevelPercentage = document.createElement("input");
        inputLevelPercentage.className = "level-percentage question";
        inputLevelPercentage.setAttribute("type", "number")
        inputLevelPercentage.setAttribute('min', "0")
        inputLevelPercentage.setAttribute("required", true)
        inputLevelPercentage.setAttribute('placeholder', "% de acerto mínima")
        inputsContainer.appendChild(inputLevelPercentage);
        console.log(inputLevelPercentage)

        const inputLevelUrl = document.createElement("input");
        inputLevelUrl.className = "level-url question";
        inputLevelUrl.setAttribute("type", "url")
        inputLevelUrl.setAttribute("required", true)
        inputLevelUrl.setAttribute('placeholder', 'URL da imagem do nível')
        inputsContainer.appendChild(inputLevelUrl)
        
        const inputLevelDescription = document.createElement("input");
        inputLevelDescription.className = "level-description question";
        inputLevelDescription.setAttribute("type", "text")
        inputLevelDescription.setAttribute("required", true)
        inputLevelDescription.setAttribute('placeholder', 'Descrição do nível')
        inputsContainer.appendChild(inputLevelDescription);

        document.querySelector(".creating-levels-titles").after(levelBackground)        
    }
    if (!stopIt){
    document.querySelector(".creating-questions-background").classList.remove("hidden")
    document.querySelector(".basic-info-background").classList.add("hidden")
    }
}




function confirmQuestions(){
    creating_questions_block: {
    questionsArray = []
    for (i=0; i<numberOfQuestions; i++){
        optionsArray = []
        const question = document.querySelectorAll(".question-text")[i].value;
        const questionColor = document.querySelectorAll(".question-color")[i].value;
        const color = questionColor;
        const wrongOptionArray = document.querySelectorAll(".wrong-options-container")[i].children;
        const rightOption = document.querySelectorAll(".right-option")[i].value;
        const rightImage = document.querySelectorAll(".right-image-url")[i].value;  
        var stopIt = false

        //checking inputs
        if (!lengthCheck(question, 20)){
            alert("Uma de suas perguntas tem " + question.length + " caracteres! \n Deveria ter, pelo menos, 20.")
            stopIt = true
            break
        } else if (!hexCheck(questionColor)){
            alert ("Um dos códigos de cor digitados não está no formato HEX!")
            stopIt = true
            break     
        } else if (!checkUrl(rightImage)){
            alert("URL da imagem digitada é inválida!");
            stopIt = true
            break
        } else if (!lengthCheck(rightOption, 1)){
            alert("Uma de suas respostas corretas está vazia!")
            stopIt = true
            break
        }
        
        const rightOptionObject = {
            text: rightOption,
            image: rightImage,
            isCorrectAnswer: true
        }
        optionsArray.push(rightOptionObject);

        for (x=1; x< wrongOptionArray.length; x++){
            const wrongOption = wrongOptionArray[x].children[0].value;
            const wrongImage = wrongOptionArray[x].children[1].value;
            
            if (lengthCheck(wrongImage, 1)){
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
            } else{}
        }
 
        const questionObject = {
            title: question,
            color: color,
            answers: optionsArray
        };
        questionsArray.push(questionObject);


    }
    createdQuizz.questions = questionsArray;
    if (!stopIt){
        document.querySelector(".creating-questions-background").classList.add("hidden")
        document.querySelector(".creating-levels-background").classList.remove("hidden")
    }
}
}


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

    const promisePost = axios.post(
        "https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes",
        createdQuizz
    );
    
   
    promisePost.then(postProcess);
}

var createdQuizzID = 0;
function getProcess(resposta){
    console.log(resposta.data);
    createdQuizzID = resposta.data[0].id
    addIdLocalStorage(createdQuizzID)
    printCreatedQuizz(resposta.data[0]);
}

function postProcess(resposta){
    const promiseGet = axios.get(
        "https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes",
    );
    promiseGet.then(getProcess);
    console.log(resposta.data);

}

function printCreatedQuizz(resposta){    
    const createdQuizzBackground = document.createElement("div");
    createdQuizzBackground.className = "creating-background";
        
    const createdQuizzImage = document.createElement("img");
    createdQuizzImage.className = "quizz-image";
    createdQuizzImage.setAttribute("src", resposta.image);
    createdQuizzBackground.appendChild(createdQuizzImage);

    const createdQuizzTitle = document.createElement("span");
    createdQuizzTitle.className = "quizz-title";
    createdQuizzTitle.innerText = resposta.title;
    createdQuizzBackground.appendChild(createdQuizzTitle);
    document.querySelector(".creating-end-titles").after(createdQuizzBackground);    

    document.querySelector(".creating-levels-background").classList.add("hidden")
    document.querySelector(".creating-end-background").classList.remove("hidden")

}

function goToCreatedQuizz(element= createdQuizzID){
    console.log(element);
    const pros = axios.get(`https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes/${element}`);
    pros.then(x => {
        console.log('clicou')
        document.querySelector(".tela2").classList.remove("hidden")
        document.querySelector(".basic-info-background").classList.add("hidden")
        console.log(x);
        const selectedQuizz = x.data;
        const playingTopImage = document.querySelector(".top-image");
        playingTopImage.set("src", selectedQuizz.image);
    });
    pros.catch(x => console.log(x.status));
}


function collapse(a){ 
    var content = a.nextElementSibling;

    if (content.classList.contains("teste")) {
      content.classList.remove("teste");
    } else{
        content.classList.add("teste")
    }

  const coll = document.getElementsByClassName(a.classList[0])
    for (i=0; i<coll.length; i++){
        if (coll[i] !== a){
            coll[i].nextElementSibling.classList.add("teste");
        }
    }
};



