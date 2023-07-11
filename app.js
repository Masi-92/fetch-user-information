document.getElementById("searchButton").addEventListener("click", function () {
  const username = document.getElementById("usernameInput").value;

  if (username !== "") {
    const apiUrl = "https://api.github.com/users/" + username;

    fetch(apiUrl)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch user information.");
        }
      })
      .then((data) => {
        displayUserInfo(data);
      })
      .catch((error) => {
        displayError(error.message);
      });
  } else {
    displayError("Please enter a GitHub username.");
  }
});

function displayUserInfo(user) {
  const userInfoDiv = document.getElementById("userInfo");
  userInfoDiv.innerHTML = "";

  const avatarUrl = user.avatar_url;
  const name = user.name || user.login;
  const bio = user.bio || "No bio available";
  const followers = user.followers;
  const repos = user.public_repos;

  const avatarImg = document.createElement("img");
  avatarImg.src = avatarUrl;
  avatarImg.classList.add("image");

  const nameHeader = document.createElement("h2");
  nameHeader.textContent = name;
  nameHeader.classList.add("text");

  const bioParagraph = document.createElement("p");
  bioParagraph.textContent = bio;
  bioParagraph.classList.add("text");

  const followersSpan = document.createElement("span");
  followersSpan.textContent = "Followers: " + followers;
  followersSpan.classList.add("text");
  const reposSpan = document.createElement("span");
  reposSpan.textContent = "Public Repositories: " + repos;

  userInfoDiv.appendChild(avatarImg);
  userInfoDiv.appendChild(nameHeader);
  userInfoDiv.appendChild(bioParagraph);
  userInfoDiv.appendChild(followersSpan);
  userInfoDiv.appendChild(reposSpan);
}

function displayError(message) {
  const userInfoDiv = document.getElementById("userInfo");
  userInfoDiv.innerHTML = "";

  const errorParagraph = document.createElement("p");
  errorParagraph.style.color = "red";
  errorParagraph.textContent = message;

  userInfoDiv.appendChild(errorParagraph);
}
