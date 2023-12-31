const socket = io() //lo cargo de un elementro script en el html

const messagesEl = document.querySelector('#messages')
const inputElement = document.querySelector('.inputBox input')
inputElement.placeholder = 'write your message and press Enter to send it...'

const castDate = function (stringfecha) {
  const date = new Date(stringfecha)
  const hora = date.getHours()
  const minuto = date.getMinutes()

  return `${hora}:${minuto}`
}

const appendMessageElement = ({ user, message, createdAt }) => {
  const time = castDate(createdAt)
  const username = user.split('@')[0].toLowerCase()
  const div = document.createElement('div')
  div.classList.add('uk-width-1-1')
  div.innerHTML = `(${time})\t<span class="uk-label">${username}</span>\t<span class="uk-margin-left">${message}</span>`
  messagesEl.appendChild(div)
}

const deleteLastMessage = () => {
  messagesEl.removeChild(messagesEl.lastChild)
}

messagesEl.innerHTML = ''

const getMessages = async function () {
  fetch('/api/messages/', {
    method: 'GET',
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Error en la solicitud')
      }
      return response.json()
    })
    .then((data) => {
      const prevM = data.messages //aca tengo un array con todos los mensajes que traigo de la BD
      prevM.forEach((m) => {
        appendMessageElement(m)
      })
    })
    .catch((error) => {
      console.error(error)
    })
}

getMessages()

//esta funcion manda un get() al la ruta especificada. y desde esta ruta con la cookie de session recupero los datos.
const setUser = () => {
  fetch('/api/sessions/user/info', {
    method: 'GET',
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Error en la solicitud')
      }
      return response.json()
    })
    .then((data) => {
      const { firstname, lastname, email } = data
      const user = email
      const fullname = firstname + ' ' + lastname
      Swal.fire(`Hola ${fullname} !!\nBienvenido al Chat!`)

      inputElement.addEventListener('keydown', function (event) {
        if (
          (event.code === 'Enter' || event.code === 'NumpadEnter ') &&
          inputElement.value != ''
        ) {
          const msg = {
            user,
            message: inputElement.value,
            createdAt: new Date(),
          }
          socket.emit('message', msg)
          appendMessageElement(msg)
          inputElement.value = ''
        }
      })
    })
    .catch((error) => {
      console.error(error)
    })
}
setUser()

//aca recibo y pinto los msg de los otros clientes
socket.on('message', (msg) => {
  console.log(msg)
  appendMessageElement(msg)
})

//si recibo algun mensaje de alerta lo muestro
socket.on('alertMsg', async (data) => {
  if (data.alertCode === 1) {
    deleteLastMessage()
  }
  alert(data.message)
})
