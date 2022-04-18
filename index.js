let intervalo;
clearInterval(intervalo);

const usuarios = document.querySelector(".usrs");
const conversa = document.querySelector(".conversa");
const people = document.querySelector(".header ion-icon");
const url = 'https://mock-api.driven.com.br/api/v4/uol/'
let pessoas = [];

let usr = document.querySelector(".nome").value;
const usuario = { name: usr }



function conectarChat() {
    usr = document.querySelector(".nome").value;
    let promise = axios.post(url + 'participants', { name: usr });
    promise.then(e => {
        console.log(e.data)
        document.querySelector(".telaloguin").classList.add("hidden");
        searchMsg();
        keepConect();
    }).catch(e => {
        if (e.response.status == 400) {
            alert("Tente outro nome!");
        }
    })
}
function keepConect() {
    intervalo = setInterval(() => {
        let promise = axios.post(url + 'status', { name: usr });
        promise.then(function () {
        searchMsg()
            //console.log("estou conectado")
        })
    }, 4000);
}

people.addEventListener('click', e => {
    document.querySelector(".participants").classList.remove("hidden");
    optionChat()
});
document.querySelector(".border-gray").addEventListener('click', e => {
    document.querySelector(".participants").classList.add("hidden")
});
function searchMsg() {
    let promise = axios.get(url + 'messages')
    promise.then(response => {

        pessoas = response.data;



        renderizChat();
    })
}
function renderizChat() {
    conversa.innerHTML = ''
    pessoas.forEach(e => {
        if (e.type == "status") {
            conversa.innerHTML += `<div class="mensagem entry">
            <div class="hora">(${converteHr(e.time)})</div>
            <div class="name">${e.from}</div>
            <div class="msg">${e.text}</div>
    </div>`
        } else if (e.type == "message") {
            conversa.innerHTML += `<div class="mensagem">
        <div class="hora">(${converteHr(e.time)})</div>
        <div class="name">${e.from}</div>para
        <div class="name">${e.to}:</div>
        <div class="msg">${e.text}</div>
    </div>`
        } else if (e.type == 'private_message' && e.to == usuario.name) {
            conversa.innerHTML += `<div class="mensagem reservadamente">
        <div class="hora">(${converteHr(e.time)})</div>
        <div class="name">${e.from}</div>reservadamente para
        <div class="name">${e.to}:</div>
        <div class="msg">${e.text}</div>
    </div>`
        }else{
            console.log ("erro")
        }
    })
}

function retorn(url) {
    axios.get(url)
        .then(response => {
            console.log(response.data)
        })
        .catch((err) => {
            console.log("Erro no Api :" + err)
        })
}

function sendMessage() {
    let mensagem = document.querySelector(".footer input").value;
    axios.post(url + 'messages', { from: usr, to: 'Todos', text: mensagem, type: 'message' })
        .then((response) => {
            searchMsg();
            console.log('tdcerto')
            document.querySelector(".footer input").value = '';
        })
    lastMessage();

}
let participants;

function optionChat() {
    usuarios.innerHTML = `<div class="usr todos">
    <ion-icon size="large" name="people"></ion-icon>
    Todos
</div>`
    axios.get(url + "participants")
        .then((response) => {
            participants = response.data;
            participants.forEach(e => {
                usuarios.innerHTML += `<div class="usr ${e.name}">
            <ion-icon name="person-circle-outline"></ion-icon>
            ${e.name}
        </div>`
            })
        })


}

function converteHr(hora) {
    hrSplit = hora.split(":")
    hrConvert = parseInt(hrSplit[0] - 3);
    if (hrConvert < 10) { hrConvert = "0" + hrConvert }
    hrSplit[0] = hrConvert
    return hrSplit.join(':')
}

function lastMessage(){

    const mensagems = document.querySelector(".conversa");

    mensagems.lastElementChild.scrollIntoView();
}

function changPrivateMessage(){
    
}
// Agora é o checkout