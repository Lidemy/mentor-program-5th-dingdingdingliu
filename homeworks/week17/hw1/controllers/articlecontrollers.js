const db = require('../models')

const { Article, User } = db
let totalPage

const articleController = {
  paginator: (limitPerPage) => {
    Article.findAll({
      where: {
        isDeleted: 0
      }
    }).then((articles) => {
      const articlesCount = articles.length
      totalPage = Math.ceil(articlesCount / limitPerPage)
    }).catch((err) => {
      console.log(err)
    })
    return totalPage
  },

  index: (req, res) => {
    const limitPerPage = 5
    let { page } = req.params
    if (!page) page = 1
    const offset = (page - 1) * limitPerPage
    totalPage = articleController.paginator(limitPerPage)
    Article.findAll({
      where: {
        isDeleted: 0
      },
      offset,
      limit: limitPerPage,
      order: [
        ['id', 'DESC']
      ]
    }).then((articles) => {
      res.render('index', {
        articles,
        page: Number(page),
        totalPage
      })
    }).catch((err) => {
      console.log(err)
    })
  },

  articles: (req, res, next) => {
    const limitPerPage = 10
    let { page } = req.params
    if (!page) page = 1
    const offset = (page - 1) * limitPerPage
    totalPage = articleController.paginator(limitPerPage)
    Article.findAll({
      where: {
        isDeleted: 0
      },
      offset,
      limit: limitPerPage,
      order: [
        ['id', 'DESC']
      ]
    }).then((articles) => {
      res.render('articles', {
        articles,
        page: Number(page),
        totalPage
      })
    }).catch((err) => {
      console.log(err)
      next()
    })
  },

  read: (req, res, next) => {
    const { id } = req.params
    Article.findOne({
      where: {
        id
      }
    }).then((article) => {
      console.log(article.createdAt[0])
      res.render('read', {
        article
      })
    }).catch((err) => {
      console.log(err)
      next()
    })
  },

  admin: (req, res, next) => {
    Article.findAll({
      include: User,
      order: [
        ['id', 'DESC']
      ]
    }).then((articles) => {
      res.render('admin', {
        articles
      })
    }).catch((err) => {
      console.log(err)
      next()
    })
  },

  create: (req, res) => {
    res.render('create')
  },

  handleCreate: (req, res) => {
    const { userId } = req.session
    const { title, content } = req.body
    if (!title || !content) {
      req.flash('errorMsg', 'Please input all filed.')
      return res.redirect('/create')
    }
    Article.create({
      title,
      content,
      isDeleted: 0,
      UserId: userId
    }).then(() => {
      res.redirect('/admin')
    }).catch((err) => {
      req.flash('errorMsg', err.toString())
      res.redirect('/create')
    })
  },

  handleDelete: (req, res, next) => {
    const { id } = req.params
    const { userId } = req.session
    Article.findOne({
      where: {
        id,
        UserId: userId
      }
    }).then((article) => {
      const { isDeleted } = article
      if (isDeleted === 0) {
        return article.update({
          isDeleted: 1
        })
      } else {
        return article.update({
          isDeleted: 0
        })
      }
    }).then(() => {
      next()
    }).catch((err) => {
      console.log(err)
      res.redirect('/')
    })
  },

  update: (req, res, next) => {
    const { id } = req.params
    const { userId } = req.session
    Article.findOne({
      where: {
        id,
        UserId: userId
      }
    }).then((article) => {
      !article
        ? next()
        : res.render('update', {
          article
        })
    }).catch((err) => {
      res.flash('errorMsg', err.toString())
      next()
    })
  },

  handleUpdate: (req, res, next) => {
    const { id } = req.params
    const { userId } = req.session
    const { title, content } = req.body
    if (!title || !content) return next()
    Article.findOne({
      where: {
        id,
        UserId: userId
      }
    }).then((article) => {
      if (!article) next()
      return article.update({
        title,
        content
      })
    }).then(() => {
      next()
    }).catch((err) => {
      res.flash('errorMsg', err.toString())
      next()
    })
  }
}

module.exports = articleController
