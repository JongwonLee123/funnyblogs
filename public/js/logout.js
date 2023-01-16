
async function logoutHelper() {
    const logoutRequest = await fetch("/api/user/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    if (logoutRequest.ok) {
      document.location.replace("/");
    } else {
      alert("Logout failed. Please contact site admin.");
    }
  }
  
  const logoutThings = $("#logout");
  logoutThings.on("click", logoutHelper);