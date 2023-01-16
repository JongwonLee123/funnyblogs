async function postSubmission() {

    const postContent = $("#newPostTextArea").val().trim();
    const postTitle = $("#newPostTitleInput").val().trim();

    if (postContent.length > 1) {

      const postRequest = await fetch("/api/post/create", {
        method: "POST",
        body: JSON.stringify({ postContent, postTitle }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (postRequest.ok) {
        window.location.replace("/dashboard");
      } else {
        alert("Post sumission failed, bad server response to page");
      }
    } else {
      alert("No text in post content.");
    }
  }
  
  async function postComment() {
    const commentContent = $("#newCommentTextArea").val().trim();
  
    let post_id = $("#submitCommentButton").attr("data-post");
  
    if (commentContent.length > 1) {
 
      const newComment = await fetch("/api/comment/create", {
        method: "POST",
        body: JSON.stringify({
          content: commentContent,
          post_id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (newComment.ok) {
        window.location.replace(`/post/${post_id}`);
      } else {
        alert("Comment sumission failed, bad server response to page");
      }
    }
  }
  
  async function editPost() {

    const postContent = $("#editPostTextArea").val().trim();
    const postTitle = $("#editPostTitleInput").val().trim();
    const editButton = $("#editPostButton");

    if (postContent.length > 1) {
      
      const editRequest = await fetch("/api/post/edit", {
        method: "PUT",
        body: JSON.stringify({
          postContent,
          postTitle,
          postID: editButton.attr("data-post"),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (editRequest.ok) {
        window.location.replace("/dashboard");
      } else {
        alert("Post edit failed, bad server response to page");
      }
    } else {
      alert("No text in post content.");
    }
  }
  
  async function deletePost() {
    const deleteButton = $("#deletePostButton");
  
    const deletePost = await fetch("/api/post/delete", {
      method: "DELETE",
      body: JSON.stringify({
        postID: deleteButton.attr("data-post"),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (deletePost.ok) {
      window.location.replace("/dashboard");
    } else {
      alert("Post deletion failed, bad server response to page");
    }
  }
  
  const submissionButton = $("#submitPostButton");
  submissionButton.on("click", postSubmission);
  
  const commentButton = $("#submitCommentButton");
  commentButton.on("click", postComment);
  
  const editButton = $("#editPostButton");
  editButton.on("click", editPost);
  
  const deleteButton = $("#deletePostButton");
  deleteButton.on("click", deletePost);