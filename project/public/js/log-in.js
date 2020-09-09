const logIn = document.querySelector(".log-in-form");

logIn.addEventListener("submit", async (e) => {
  
  e.preventDefault();

  console.log("AAAAAAAAA");
  const formData = new FormData(logIn);
  const email = formData.get("email");
  const password = formData.get("password");
  const body = { email, password };

  try {
    console.log("body::::: ", body);
    const res = await fetch("/users/token", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw res;
    }
    const {
      token,
      user: { id },
    } = await res.json();

    localStorage.setItem("TURF_ACCESS_TOKEN", token);
    localStorage.setItem("TURF_CURRENT_USER_ID", id);
 
    window.location.href = "/";
    
  } catch (err) {
    if (err.status >= 400 && err.status < 600) {
      const errorJSON = await err.json();
      const errorsContainer = document.querySelector(".errors-container");
      let errorsHtml = [
        `
        <div class="alert alert-danger">
            Something went wrong. Please try again.
        </div>
      `,
      ];
      const { errors } = errorJSON;
      if (errors && Array.isArray(errors)) {
        errorsHtml = errors.map(
          (message) => `
          <div class="alert alert-danger">
              ${message}
          </div>
        `
        );
      }
      errorsContainer.innerHTML = errorsHtml.join("");
    } else {
      alert(
        "Something went wrong. Please check your internet connection and try again!"
      );
    }
  }
});
