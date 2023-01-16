const router = require("express").Router();
const { Post, Comment, User } = require("../models/index");
const loginCheck = require("../utils/loginCheck");


router.get("/", async (req, res) => {
  let allPosts = await Post.findAll({
    include: [{ model: User }],
    order: [["id", "ASC"]],
  });

  allPosts = allPosts.map((row) => row.get({ plain: true }));

  res.render("homepage", {
    allPosts,
    
    sess: req.session,
  });
});

router.get("/post/:id", async (req, res) => {

  let onePost = await Post.findOne({
    where: {
      id: parseInt(req.params.id),
    },
    include: [{ model: Comment }, { model: User }],
  });

  if (onePost === null) {
    res.status(304).redirect("/");
    return;
  }

  onePost = onePost.get({ plain: true });

  const comments = await Comment.findAll({
    where: {
      post_id: onePost.id,
    },
    include: [{ model: User }],
  });

  const plainComments = comments.map((row) => row.get({ plain: true }));

  let sameAuthor = false;
  if (onePost.author_id === req.session.user_id) {
    sameAuthor = true;
  }

 
  res.render("post", {
    Post: onePost,
    comments: plainComments,
    sess: req.session,
    sameAuthor,
  });
});


router.get("/dashboard", loginCheck, async (req, res) => {
  console.log('\n**************\n\n**************\n\n**************\nDashboard route activated\n**************\n\n**************\n\n**************\n')

  console.log(req.session)
  let allPosts = await Post.findAll({
    where: {
      author_id: req.session.user_id,
    },
    order: [["id", "ASC"]],
    include: [{ model: User }],
  });

  allPosts = allPosts.map((row) => row.get({ plain: true }));

 
  console.log(allPosts);


  res.render("dashboard", {
    allPosts,
    sess: req.session,
  });
});


router.get("/loginSignUp", async (req, res) => {
 
  if (req.session.logged_in) {
    res.status(400).redirect("/");
  } else {
   
    res.render("loginSignUp", {
      sess: req.session,
    });
  }
});

module.exports = router;