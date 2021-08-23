const db = require('../models')

const { Lottery } = db
let isChecked
let errorMsg

const lotteryController = {
  confirmLottery: (lottery) => {
    const { title, content, imgURL, chance } = lottery
    if (!title || !content || !imgURL || !chance) {
      errorMsg = 'Please input ALL Filed'
      isChecked = false
      return {
        isChecked,
        errorMsg
      }
    }
    if (title.length > 5 || content.length > 30) {
      errorMsg = 'Please let TITLE or CONTENT match the rules'
      isChecked = false
      return {
        isChecked,
        errorMsg
      }
    }
    isChecked = true
    return isChecked
  },

  index: (req, res) => {
    res.render('index')
  },

  lottery: async(req, res) => {
    res.render('lottery')
  },

  handleLottery: async(req, res, next) => {
    const num = Math.floor(Math.random() * 99 + 1)
    const lotterys = await Lottery.findAll()
    const lotterysLength = lotterys.length
    let lottery
    let start = 1
    if (!lotterys) {
      return next()
    }
    for (let i = 0; i < lotterysLength; i++) {
      const { chance } = lotterys[i]
      if (start <= num && num <= (start + chance - 1)) {
        lottery = lotterys[i]
        break
      } else {
        start += chance
      }
    }
    res.render('getlottery', {
      lottery
    })
  },

  admin: (req, res) => {
    Lottery.findAll().then((lotterys) => {
      res.render('admin', {
        lotterys
      })
    }).catch((err) => {
      console.log(err)
      res.redirect('index')
    })
  },

  create: (req, res) => {
    res.render('create')
  },

  handleCreate: (req, res, next) => {
    const { isChecked, errorMsg } = lotteryController.confirmLottery(req.body)
    const { title, content, imgURL, chance } = req.body
    const { userId } = req.session
    if (isChecked === false) {
      req.flash('errorMsg', errorMsg)
      return next()
    }
    Lottery.create({
      title,
      content,
      imgURL,
      chance,
      UserId: userId,
      isDeleted: 0
    }).then(() => {
      res.redirect('admin')
    }).catch((err) => {
      req.flash('errorMsg', err.toString())
      next()
    })
  },

  update: (req, res, next) => {
    const { id } = req.params
    Lottery.findOne({
      where: {
        id
      }
    }).then((lottery) => {
      res.render('update', {
        lottery
      })
    }).catch((err) => {
      console.log(err)
      next()
    })
  },

  handleUpdate: (req, res, next) => {
    const { isChecked, errorMsg } = lotteryController.confirmLottery(req.body)
    const { title, content, imgURL, chance } = req.body
    const { id } = req.params
    if (isChecked === false) {
      req.flash('errorMsg', errorMsg)
      return next()
    }
    Lottery.findOne({
      where: {
        id
      }
    }).then((lottery) => {
      if (!lottery) res.redirect('admin')
      return lottery.update({
        title,
        content,
        imgURL,
        chance
      })
    }).then(() => {
      next()
    }).catch((err) => {
      console.log(err)
      res.redirect('back')
    })
  },

  handleDelete: (req, res, next) => {
    const { id } = req.params
    Lottery.findOne({
      where: {
        id
      }
    }).then((lottery) =>
      lottery.destroy()
    ).then(() => {
      next()
    }).catch((err) => {
      console.log(err)
      next()
    })
  }
}

module.exports = lotteryController
