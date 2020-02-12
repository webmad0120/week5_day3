const axiosApp = axios.create({ baseURL: 'https://ih-crud-api.herokuapp.com/' })


// document.getElementById("postWalle").onclick = () => {

//     const characterInfo = {
//         name: 'Buñuelo el perro',
//         occupation: 'Waste Allocation Robot',
//         weapon: 'Pedos'
//     }

//     axiosApp.post('characters', characterInfo)
//         .then(response => {
//             console.log(response)
//             const character = response.data
//             const details = `<li>Nombre: ${character.name}<br>Trabajo: ${character.occupation}<br>Arma: ${character.weapon}</li>`
//             document.querySelector('#charactersList').innerHTML += details
//         })
//         .catch(error => console.log('Oh No! Error is: ', error))
// } 



const inputs = document.querySelectorAll('input')


document.getElementById("characterForm").onsubmit = e => {

    e.preventDefault()  // Anula el envío de formulario

    const characterInfo = {
        name: inputs[0].value,
        occupation: inputs[1].value,
        weapon: inputs[2].value
    }

    axiosApp.post('characters', characterInfo)
        .then(response => {
            console.log(response)
            const character = response.data
            const details = `<li>Nombre: ${character.name}<br>Trabajo: ${character.occupation}<br>Arma: ${character.weapon}</li>`
            document.querySelector('#charactersList').innerHTML += details
            document.getElementById("characterForm").reset()
        })
        .catch(error => console.log('Oh No! Error is: ', error))
}



// Obtener info de personaje para edición:
document.getElementById('getButton').onclick = () => {

    const characterId = document.getElementById('theCharId').value
    axiosApp.get(`characters/${characterId}`)
        .then(theCharacter => {
            console.log("el personaje es:", theCharacter.data)
            inputs[4].value = theCharacter.data.name
            inputs[5].value = theCharacter.data.occupation
            inputs[6].value = theCharacter.data.weapon
            inputs[7].value = theCharacter.data.id
        })
}



// Actualizar personaje
document.querySelector('#updateForm').onsubmit = e => {
    e.preventDefault()

    const characterInfo = {
        name: inputs[4].value,
        occupation: inputs[5].value,
        weapon: inputs[6].value
    }

    const characterId = inputs[7].value
    axiosApp.put(`characters/${characterId}`, characterInfo)
        .then(response => {
            console.log(response)
            const character = response.data
            const details = `<li>Nombre: ${character.name}<br>Trabajo: ${character.occupation}<br>Arma: ${character.weapon}</li>`
            document.querySelector('#charactersList').innerHTML += details
            document.getElementById("updateForm").reset()
        })
        .catch(error => console.log('Oh No! Error is: ', error))
}