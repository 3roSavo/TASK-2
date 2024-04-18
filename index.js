const emailForm = document.getElementById("emailForm");

const inputMailField = document.getElementById("inputField")
const objectField = document.getElementById("objectField")
const descriptionField = document.getElementById("descriptionField")
const emailsList = document.getElementById("emailsList")
const sendAllEmailButton = document.getElementById("sendAllEmailButton")

const spinner = document.getElementsByClassName("loader")[0]

let arrayOfEmails = []


const deleteEmail = (i, mail) => {
    console.log("eliminazione partita" + i)

    arrayOfEmails = arrayOfEmails.filter(object => object.email !== mail)

    const elementToRemove = document.getElementById("deleteEmailButton" + i).parentNode.remove()

}

emailForm.addEventListener("submit", (e) => {

    e.preventDefault()

    emailsList.innerHTML = ""

    if (arrayOfEmails.some(mail => mail.email === inputMailField.value)) {
        console.log("Email già presente!")
        alert("Email già presente")
    } else {
        arrayOfEmails.push({
            email: inputMailField.value,
            object: objectField.value,
            description: descriptionField.value
        })
    }

    for (let i = 0; i < arrayOfEmails.length; i++) {
        const newEmail = document.createElement("div");
        newEmail.classList.add("singleEmail")
        newEmail.innerHTML = `
            <div style="text-align:center">
                <div><strong>${arrayOfEmails[i].email}</strong></div>
                <div>${arrayOfEmails[i].object}</div>
            </div>
            <button class="deleteButton" id="deleteEmailButton${i}" onclick="deleteEmail(${i}, '${arrayOfEmails[i].email}')">Elimina</button
            `
        emailsList.appendChild(newEmail)
    }

    console.log(arrayOfEmails)

})

sendAllEmailButton.addEventListener("click", () => {

    spinner.style.display = "block"

    console.log("metodo invio email")

    // Creiamo un oggetto FormData per inviare i dati al file PHP

    // Effettuiamo una richiesta fetch al file PHP per inviare le email
    fetch('http://localhost/TASK 2/mailSender.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Specifica il tipo di contenuto come JSON
        },
        body: JSON.stringify(arrayOfEmails)

    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Si è verificato un errore durante l\'invio delle email: ' + response.statusText);
            }
            spinner.style.display = "none"
            console.log('Email inviate con successo!');
            alert("Email inviate con successo!")

            // svuoto array, nodi figli, campi input
            arrayOfEmails = []
            emailsList.innerHTML = ""
            inputMailField.value = ""
            objectField.value = ""
            descriptionField.value = ""


        })
        .catch(error => {
            console.error(error.message);
        });

})