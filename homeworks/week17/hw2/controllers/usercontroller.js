const bcrypt = require('bcrypt')
const db = require('../models')

const { User } = db
const saltRounds = 10
let isChecked
let errorMsg

const userController = {
  confirmUser: (user) => {
    const { username, password } = user
    if (!username || !password) {
      errorMsg = 'Please input ALL Filed'
      isChecked = false
      return {
        isChecked,
        errorMsg
      }
    }
    isChecked = true
    return isChecked
  },

  register: (req, res) => {
    res.render('register')
  },

  handleRegister: (req, res, next) => {
    const { isChecked, errorMsg } = userController.confirmUser(req.body)
    const { username, password } = req.body
    if (isChecked === false) {
      req.flash('errorMsg', errorMsg)
      return res.redirect('register')
    }
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        req.flash('errorMsg', err.toString())
        return res.redirect('register')
      }
      User.create({
        username,
        password: hash
      }).then((user) => {
        req.session.username = user.username
        req.session.userId = user.id
        next()
      }).catch((err) => {
        req.flash('errorMsg', err.toString())
        return res.redirect('register')
      })
    })
  },

  login: (req, res) => {
    res.render('login')
  },

  handleLogin: (req, res, next) => {
    const { isChecked, errorMsg } = userController.confirmUser(req.body)
    const { username, password } = req.body
    if (isChecked === false) {
      req.flash('errorMsg', errorMsg)
      return next()
    }
    User.findOne({
      where: {
        username
      }
    }).then((user) => {
      if (!user) {
        req.flash('errorMsg', 'Has NO this user.')
        return next()
      }
      bcrypt.compare(password, user.password, (err, result) => {
        if (err || !result) {
          req.flash('errorMsg', 'Has WRONG password.')
          return next()
        }
        req.session.username = user.username
        req.session.userId = user.id
        res.redirect('/')
      })
    }).catch((err) => {
      console.log(err)
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
