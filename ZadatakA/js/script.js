//slusac na odabir
const button = document.querySelectorAll("#cards .card__button");

for (let i = 0; i < button.length; i++) {
    button[i].addEventListener("click", onOrderButtonClick);
}


//funkcija koja stvara glumca
function selectActor(nameOfActor) {
    const actorName = document.createElement("article");
    actorName.classList.add("tag");

    actorName.innerHTML = `<span class="tag__name">${nameOfActor}</span>
        <i class="fas fa-times tag__close"></i>`

    //prikaz odabranih glumaca
    document.getElementById("tags").append(actorName);
    actorName.querySelector(".tag__close").addEventListener("click", removeActor);

    plus();
}

//funkcija za klik na botun
function onOrderButtonClick(event) {
    const clickedButtonElement = event.currentTarget;
    const articleElement = clickedButtonElement.parentElement;
    const characterName = articleElement.querySelector("h3").innerText;

    if (characterName) {
        selectActor(characterName);

        //Onemougucivanje botuna
        articleElement.querySelector("button").disabled = true;
    }
}

//funkcija koja brise glumca
function removeActor(event) {
    const clickedX = event.currentTarget;
    const actor = clickedX.parentElement;
    const actorname = actor.querySelector("span").innerText;
    let clickOnButton = 0;

    for (let i = 0; i < button.length; i++) {
        if (actorname == button[i].parentElement.querySelector("h3").innerText) {
            clickOnButton = button[i].parentElement.querySelector("button");
        }
    }

    //ponovo vraca mogucnost odabira
    clickOnButton.disabled = false;
    actor.remove();

    minus();
}

//brojac glumaca
let count = 0;

//funkcija koja inkrementira broj glumaca
function plus() {

    count++;
    document.getElementById("counter").innerText = count;
}
//funkcija koja dekrementira broj glumaca
function minus() {
    count--;
    document.getElementById("counter").innerText = count;
}