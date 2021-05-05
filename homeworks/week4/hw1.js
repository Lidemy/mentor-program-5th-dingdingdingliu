const request = require('request')

const page = 10

request(
  `https://lidemy-book-store.herokuapp.com/books?_limit=${page}`,
  (error, response, body) => {
    const data = JSON.parse(body)
    for (let i = 0; i < page; i++) {
      console.log(`${data[i].id} ${data[i].name}`)
    }
  }
)
