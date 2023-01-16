const router = require("express").Router();
const { Comment } = require("../../models/index");

router.get("/", async (req, res) => [

]);


router.post("/create", async (req, res) => {
 
  try {
    const commentBody = {
      content: req.body.content,
      author_id: req.session.user_id,
      post_id: req.body.post_id,
      creation_time: Date.now(),
    };

    const newComment = await Comment.create(commentBody);


    res.status(200).json(newComment);
  } catch (err) {
   
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;