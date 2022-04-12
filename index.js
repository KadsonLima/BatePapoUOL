const conversa = document.querySelector(".conversa")

for (i = 0; i < 5; i++) {
    conversa.innerHTML += 'op'
}

const people = document.querySelector(".header ion-icon")

people.addEventListener('click', e => {
    retorn('https://rickandmortyapi.com/api/character/118')
});




function retorn(url) {
    axios.get(url)
    .then(response => {

    })
    .catch((err) => {
        console.log("Erro no Api :" + err)
    })
}



//// esse é main
