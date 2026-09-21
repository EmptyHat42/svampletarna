// Vi sätter ett par tomma referens-parametrar för att komma åt senare. //
let formRef;
let welcomeRef;
let wrongRef;

// Vi sätter två konstanter som vi kollar emot senare för att se om det är rätt användarnamn och lösenord. //
const namn = "Kalle"
const lösenord = "qwe123"

// Basic init funktion tillsammans med window.onload = init; lite längre ner i koden. //
// Gör så att allt på sidan laddar innan vi kör det som är inuti kodblocket //
function init(){
    formRef = document.querySelector("form"); // Vi plockar datan från vårat formsobjekt. Går att specifiera men vi har endast en just nu så detta funkar. //
    welcomeRef = document.querySelector("#welcome") // Vi plockar datan från våran section med id welcome. //
    wrongRef = document.querySelector("#wrongDetails") // Vi plockar datan från en specefik paragraf med id wrongDetails. //

    formRef.addEventListener("submit", event=>{ // Kör kodblocket när vi trycker på submit. //
        event.preventDefault(); // Ser till att submit inte kör webbläsarens standard utan vad vi säger med JS i stället. //
        getFormData(); // Kör funktionen GetFormData(). //
        userAndPass(); // Kör funktionen userAndPass(). //
        if (formRef.elements.name.value != namn || formRef.elements.password.value != lösenord){ // OM namn INTE är Kalle OCH ELLER om password INTE är qwe123 kör: //
            wrongRef.hidden = false; // Gömmer wrongRef. //
        }
    });

    welcomeRef.querySelector("button").addEventListener("click", event=>{ // Kör kodblocket när vi trycker på vår button inuti welcomeRef. //
        event.preventDefault(); // Ser till att button inte kör webbläsarens standard utan vad vi säger med JS i stället. //
        localStorage.clear(); // Tar bort den sparade localStorage datan. //
        welcomeRef.hidden = true; // Gömmer welcomeRef. //
        formRef.hidden = false; // Visar formRef. //
        wrongRef.hidden = true; // Gömmer wrongRef. //
    });
    userAndPass(); // Avslutar med att köra userAndPass, då kollar vi localStorage och håller oss inloggade om det är rätt user+pass. //
}
window.onload = init; // // Basic window.onload funktion tillsammans med function init lite längre upp i koden. //

// Vår funktion för att hämta input från våra text form objekt och sparar dessa i localStorage så vi slipper logga in igen. //
function getFormData(){
    const name = formRef.elements.name.value; // Vi hämtar input från name.value och sparar som en konstant. //
    const password = formRef.elements.password.value; // Vi hämtar input från password.value och sparar som en konstant. //
    localStorage.setItem("name", name); // Vi sparar konstanten name i localStorage. //
    localStorage.setItem("password", password); // Vi sparar konstanten password i localStorage. //
}

// Vår funktion som läser den sparade localStorage datan och kollar den emot våra konstanter satta längst upp i dokumentet. //
function userAndPass(){
    const name = localStorage.getItem("name") // Hämta name ur localStorage. //
    const password = localStorage.getItem("password") // Hämta password ur localStorage

    // OM localStorage sparade användarnamn OCH lösenord stämmer överens med våra konstanter längst upp i dokumentet, kör: //
    if(name === namn && password === lösenord){ 
        formRef.hidden = true; // Gömmer formRef. //
        welcomeRef.hidden = false; // Visar welcomeRef. //
        welcomeRef.querySelector("h2").textContent = "Välkommen " + name + " du är nu inloggad"; // Lägger till en välkomstext med name från localStorage i h2 under welcomeRef. //
    }
}