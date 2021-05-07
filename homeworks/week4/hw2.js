const request = require('request')
const process = require('process')

const BASE_URL = 'https://lidemy-book-store.herokuapp.com/books'
const arg = process.argv[2]

if (arg === 'list') {
  listBooks()
} else if (arg === 'read') {
  readBook(process.argv[3])
} else if (arg === 'delete') {
  deleteBook(process.argv[3])
} else if (arg === 'create') {
  createBook(process.argv[3])
} else if (arg === 'update') {
  updateBook(process.argv[3], process.argv[4])
}

// function for printing the first 20 books
function listBooks() {
  request.get(
    `${BASE_URL}?_limit=20`,
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
}

// function for read the book which id is specified
function readBook(id) {
  request.get(
    `${BASE_URL}/${id}`,
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

      console.log(data)
    }
  )
}

// function for delete the book
function deleteBook(id) {
  request.delete(
    `${BASE_URL}/${id}`,
    (err, res) => {
      if (res.statusCode === 404) {
        return console.log('ERROR!', err)
      } else {
        console.log('success')
      }
    }
  )
}

// function for creating the new book
function createBook(title) {
  request.post(
    {
      url: BASE_URL,
      form: {
        name: title
      }
    },
    (err, res) => {
      if (res.statusCode === 404) {
        return console.log('ERROR!', err)
      } else {
        console.log('success')
      }
    }
  )
}

// function for change the book's title
function updateBook(id, title) {
  request.patch(
    {
      url: `${BASE_URL}/${id}`,
      form: {
        name: title
      }
    },
    (err, res) => {
      if (res.statusCode === 404) {
        return console.log('ERROR!', err)
      } else {
        console.log('success')
      }
    }
  )
}
