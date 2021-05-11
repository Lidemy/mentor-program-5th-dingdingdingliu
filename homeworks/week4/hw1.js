const request = require('request')

const BASE_URL = 'https://lidemy-book-store.herokuapp.com/books'
const count = 10
const GET_BOOKS_URL = `${BASE_URL}?_limit=${count}`

request(
  GET_BOOKS_URL,
  (err, res, body) => {
    if (err) {
      return console.log('ERROR!', err)
    }

    let data
    try {
      data = JSON.parse(body)
    } catch (err) {
      return console.log(err)
    }

    for (let i = 0; i < data.length; i++) {
      console.log(`${data[i].id} ${data[i].name}`)
    }
  }
)
