const router = require("express").Router();
const { Post, User, Comment } = require("../../models/index");


router.post("/create", async (req, res) => {
  try {
    let writingUser = await User.findOne({
      where: {
        username: req.session.username,
      },
    });

    writingUser = writingUser.get({ plain: true });
 
    const postContent = {
      author_id: writingUser.id,
      creation_time: Date.now(),
      title: req.body.postTitle,
      content: req.body.postContent,
    };

    const newPost = await Post.create(postContent);

    res.status(200).json(newPost);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.put("/edit/", async (req, res) => {

  try {
    const editContent = {
      author_id: req.session.user_id,
      creation_time: Date.now(),
      title: req.body.postTitle,
      content: req.body.postContent,
    };

    console.log("Edited post to write:", editContent);

    const editPost = await Post.update(editContent, {
      where: {
        id: req.body.postID,
      },
    });

    res.status(200).json(editPost);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.delete("/delete", async (req, res) => {

  try {
  
    const delPost = await Post.destroy({
      where: {
        id: parseInt(req.body.postID),
      },
    });

    res.status(200).json(delPost);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;