const Comment = require("./Comment");
const Post = require("./Post");
const User = require("./User");

Comment.belongsTo(Post, {
  foreignKey: "post_id",
});

Post.hasMany(Comment, {
});

Post.belongsTo(User, {
  foreignKey: "author_id",
});

User.hasMany(Post, {
  foreignKey: "author_id",

});

Comment.belongsTo(User, {
  foreignKey: "author_id",
});

User.hasMany(Comment, {
  foreignKey: "author_id",
});

module.exports = { Comment, Post, User };