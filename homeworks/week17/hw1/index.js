require('dotenv').config()
const express = require('express')

const app = express()
const router = express.Router()
const port = process.env.PORT || 5001
const bodyParser = require('body-parser')
const flash = require('connect-flash')
const session = require('express-session')
const userControllers = require('./controllers/usercontrollers')
const articleControllers = require('./controllers/articlecontrollers')

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
app.use(flash())
app.use((req, res, next) => {
  res.locals.username = req.session.username
  res.locals.errorMsg = req.flash('errorMsg')
  next()
})

function redirectToIndex(req, res) {
  res.redirect('/')
}
function redirectToAdmin(req, res) {
  res.redirect('/admin')
}
function redirectBack(req, res) {
  res.redirect('back')
}
function checkPermission(req, res, next) {
  const { username } = req.session
  username ? next() : redirectToIndex(req, res)
}

router.get('/', articleControllers.index)
router.get('/index/:page', articleControllers.index, redirectToIndex)
router.get('/logout', userControllers.handleLogout, redirectToIndex)
router.get('/articles', articleControllers.articles, redirectToIndex)
router.get('/articles/:page', articleControllers.articles, redirectToIndex)
router.get('/read/:id', articleControllers.read, redirectToIndex)
router.get('/admin', checkPermission, articleControllers.admin, redirectToIndex)
router.get('/delete/:id', checkPermission, articleControllers.handleDelete, redirectBack)
router.route('/login')
  .get(userControllers.login)
  .post(userControllers.handleLogin, redirectBack)
router.route('/register')
  .get(userControllers.register)
  .post(userControllers.handleRegister, redirectToIndex)
router.route('/create')
  .get(checkPermission, articleControllers.create)
  .post(checkPermission, articleControllers.handleCreate)
router.route('/update/:id')
  .get(checkPermission, articleControllers.update, redirectBack)
  .post(checkPermission, articleControllers.handleUpdate, redirectToAdmin)

app.use('/', router)

app.listen(port, () => {
  console.log(port)
})
