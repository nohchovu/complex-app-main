const Post = require('../models/Post')

exports.viewCreateScreen = function (req, res) {
  res.render('create-post')
}

exports.create = function (req, res) {
  let post = new Post(req.body, req.session.user._id)
  post.create().then(function () {
    res.redirect('/posts')
  }).catch(function (errors) {
    res.send(errors)
  })
}

exports.viewSingle = async function (req, res) {
  try {
    let post = await Post.findSingleById(req.params.id, req.visitorId)
    res.render('single-post-screen', { post: post })
  } catch {
    res.render("404")
  }
}

exports.viewAll = async function (req, res) {
  try {
    let posts = await Post.findAll()
    res.render('all-posts', { posts: posts })
  }
  catch {
    res.render("404")
  }
}