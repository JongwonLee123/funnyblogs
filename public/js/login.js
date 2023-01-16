async function loginHelper(event) {
    event.preventDefault();
    console.log("loginHelper triggered!");
    const username = $("#userFieldLogin").val().trim();
    const password = $("#passwordFieldLogin").val().trim();
    console.log("username:", username);
    console.log("password:", password);
  
    if (username && password) {
      const loginRequest = await fetch("/api/user/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      console.log(loginRequest);
  
      if (loginRequest.ok) {
        document.location.replace("/");
      } else {
        alert("Bad login credentials, please try again");
      }
    }
  }
  
  async function signupHelper(event) {
    event.preventDefault();
  
    const newUsername = $("#userFieldSignUp").val().trim();
    const newPassword = $("#passwordFieldSignUp").val().trim();
  
    if (newUsername && newPassword) {
      const newUser = await fetch("/api/user/create", {
        method: "POST",
        body: JSON.stringify({ newUsername, newPassword }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      console.log(
        "\n****************\n\n****************\n\n****************\nnewUser:",
        newUser,
        "\n****************\n\n****************\n\n****************\n"
      );
  
      if (newUser.ok) {
        document.location.replace("/");
      } else {
        let errmsg =
          "Credentials did not meet required criteria. Please try again.";
        alert(errmsg);
      }
    }
  }
  
  const loginButton = $("#loginButton");
  loginButton.on("click", loginHelper);
  
  const signupButton = $("#signupButton");
  signupButton.on("click", signupHelper);