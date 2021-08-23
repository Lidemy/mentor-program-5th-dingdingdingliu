const express = require('express')

const app = express()

const router = express.Router()
const port = process.env.PORT || 5001
const bodyParser = require('body-parser')
const flash = require('connect-flash')
const session = require('express-session')
const userController = require('./controllers/usercontroller')
const lotteryController = require('./controllers/lotterycontroller')
require('dotenv').config()

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

router.get('/', lotteryController.index)
router.get('/lottery', lotteryController.lottery)
router.get('/get-lottery', lotteryController.handleLottery, redirectToIndex)
router.get('/logout', userController.handleLogout, redirectToIndex)
router.get('/admin', checkPermission, lotteryController.admin)
router.get('/delete/:id', checkPermission, lotteryController.handleDelete, redirectBack)

router.route('/register')
  .get(userController.register)
  .post(userController.handleRegister, redirectToIndex)
router.route('/login')
  .get(userController.login)
  .post(userController.handleLogin, redirectBack)
router.route('/create')
  .get(checkPermission, lotteryController.create)
  .post(checkPermission, lotteryController.handleCreate, redirectBack)
router.route('/update/:id')
  .get(checkPermission, lotteryController.update, redirectToIndex)
  .post(checkPermission, lotteryController.handleUpdate, redirectToAdmin)

app.use('/', router)
app.listen(port, () => {
  console.log(port)
})
