const emailForm = document.getElementById("emailForm");
const inputMailField = document.getElementById("inputField")
const emailsList = document.getElementById("emailsList")
const deleteEmailButton = document.getElementById("deleteEmailButton")
const sendAllEmailButton = document.getElementById("sendAllEmailButton")

let arrayOfEmails = []

const deleteEmail = (i) => {
    console.log("eliminazione partita" + i)


    const emailToEliminate = document.getElementById("deleteEmailButton" + i).previousElementSibling.textContent

    arrayOfEmails = arrayOfEmails.filter(email => email != emailToEliminate)

    const elementToRemove = document.getElementById("deleteEmailButton" + i).parentNode.remove()



}


emailForm.addEventListener("submit", (e) => {

    e.preventDefault()

    if (arrayOfEmails.includes(inputMailField.value)) {
        console.log("email già presente nella lista")
        alert("email già presente nella lista")
    } else {

        emailsList.innerHTML = ""

        arrayOfEmails.push(inputMailField.value)

        for (let i = 0; i < arrayOfEmails.length; i++) {
            const newEmail = document.createElement("div");
            newEmail.innerHTML = `
            <span>${arrayOfEmails[i]}</span>
            <button id="deleteEmailButton${i}" onclick="deleteEmail(${i})">Elimina</button
            `
            emailsList.appendChild(newEmail)
        }

    }

    console.log(arrayOfEmails)

})

sendAllEmailButton.addEventListener("click", () => {

    console.log("metodo invio email")

    /*fetch('http://localhost/TASK 2/mailSender.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ array: arrayOfEmails })
    })
        .then(function (response) {
            return response.text();
        })
        .then(function (data) {
            console.log('Risposta dal server:', data);
        })
        .catch(function (error) {
            console.error('Errore nella richiesta Fetch:', error);
        });*/


    // Creiamo un oggetto FormData per inviare i dati al file PHP
    const formData = new FormData();
    arrayOfEmails.forEach(email => {
        formData.append('emails[]', email);
    });

    // Effettuiamo una richiesta fetch al file PHP per inviare le email
    fetch('http://localhost/TASK 2/mailSender.php', {
        method: 'POST',
        body: formData
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Si è verificato un errore durante l\'invio delle email: ' + response.statusText);
            }
            console.log('Email inviate con successo!');
            alert("Email inviate con successo!")
        })
        .catch(error => {
            console.error(error.message);
        });

})