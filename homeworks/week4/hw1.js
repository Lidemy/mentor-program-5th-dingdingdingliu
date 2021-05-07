const request = require('request')

const BASE_URL = 'https://lidemy-book-store.herokuapp.com/books'
const page = 10
const GET_BOOKS_URL = `${BASE_URL}?_limit=${page}`

request(
  GET_BOOKS_URL,
  (err, res, body) => {
    if (res.statusCode === 404) {
      console.log('ERROR!', err)
      return
    }

    let data
    try {
      data = JSON.parse(body)
    } catch (err) {
      console.log(err)
      return
    }

    for (let i = 0; i < data.length; i++) {
      console.log(`${data[i].id} ${data[i].name}`)
    }
  }
)
