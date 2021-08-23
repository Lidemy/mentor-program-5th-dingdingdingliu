const bcrypt = require('bcrypt')
const db = require('../models')

const { User } = db

const saltRounds = 10

const userController = {
  register: (req, res) => {
    res.render('register')
  },

  handleRegister: (req, res, next) => {
    const { username, password } = req.body
    if (!username || !password) {
      req.flash('errorMsg', 'Please input all filed')
      return res.redirect('/register')
    }
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        req.flash('errorMsg', err.toString())
        return res.redirect('/register')
      }
      User.create({
        username,
        password: hash
      }).then((user) => {
        req.session.username = username
        req.session.userId = user.id
        next()
      }).catch((err) => {
        req.flash('errorMsg', err.toString())
        next()
      })
    })
  },

  login: (req, res) => {
    res.render('login')
  },

  handleLogin: (req, res, next) => {
    const { username, password } = req.body
    if (!username || !password) {
      req.flash('errorMsg', 'Please input all filed')
      return next()
    }
    User.findOne({
      where: {
        username
      }
    }).then((user) => {
      if (!user) {
        req.flash('errorMsg', 'Have NO this user.')
        return next()
      }
      bcrypt.compare(password, user.password, (err, result) => {
        if (err || !result) {
          req.flash('errorMsg', 'Have WRONG password.')
          return next()
        }
        req.session.username = username
        req.session.userId = user.id
        res.redirect('/')
      })
    }).catch((err) => {
      req.flash('errorMsg', err.toString())
      next()
    })
  },

  handleLogout: (req, res, next) => {
    req.session.username = null
    req.session.userId = null
    next()
  }
}

module.exports = userController
