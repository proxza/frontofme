document.addEventListener("DOMContentLoaded", () => {
  const postsContainer = document.getElementById("post-list");
  const paginationContainer = document.getElementById("pagination");
  const loginForm = document.getElementById("login-form");
  const newPostForm = document.getElementById("new-post-form");
  const logoutButton = document.getElementById("logout");

  // Function to toggle visibility of login and post forms based on login status
  function toggleForms() {
    const isLoggedIn = checkLogin();
    loginForm.style.display = isLoggedIn ? "none" : "block";
    newPostForm.style.display = isLoggedIn ? "block" : "none";
    logoutButton.style.display = isLoggedIn ? "block" : "none";
    if (isLoggedIn) {
      loadPosts();
    }
  }

  // Function to check login status
  function checkLogin() {
    return sessionStorage.getItem("loggedIn") === "true";
  }

  // Function to handle login
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          sessionStorage.setItem("loggedIn", "true");
          toggleForms();
        } else {
          alert("Login failed. Please check your username and password.");
        }
      })
      .catch((error) => {
        console.error("Error logging in:", error);
      });
  });

  // Function to handle logout
  logoutButton.addEventListener("click", function () {
    fetch("/logout")
      .then(() => {
        sessionStorage.setItem("loggedIn", "false");
        toggleForms();
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  });

  // Function to load and render posts for a specific page
  function loadPosts(page = 1) {
    fetch(`/posts?page=${page}`)
      .then((response) => response.json())
      .then((data) => {
        renderPosts(data.posts);
        renderPagination(data.currentPage, data.totalPages);
      })
      .catch((error) => {
        console.error("Error loading posts:", error);
      });
  }

  // Function to render posts
  function renderPosts(posts) {
    postsContainer.innerHTML = posts
      .map(
        (post) => `
          <div class="post">
              <h3>${post.title}</h3>
              <p>${post.content}</p>
              <button onclick="editPost('${post.id}')">Edit</button>
          </div>
      `
      )
      .join("");
  }

  // Function to render pagination controls
  function renderPagination(currentPage, totalPages) {
    paginationContainer.innerHTML = "";
    for (let page = 1; page <= totalPages; page++) {
      const pageLink = document.createElement("button");
      pageLink.textContent = page;
      pageLink.className = currentPage === page ? "active" : "";
      pageLink.addEventListener("click", () => loadPosts(page));
      paginationContainer.appendChild(pageLink);
    }
  }

  // Function to edit a post
  window.editPost = function (postId) {
    const postTitle = prompt("New title:");
    const postContent = prompt("New content:");
    if (postTitle && postContent) {
      fetch(`/posts/${postId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: postTitle, content: postContent }),
      })
        .then((response) => response.json())
        .then(() => {
          loadPosts(); // Reload posts to see the updates
        })
        .catch((error) => {
          console.error("Error updating post:", error);
        });
    }
  };

  // Handle new post submission
  newPostForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const title = document.getElementById("post-title").value;
    const content = document.getElementById("post-content").value;
    fetch("/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    })
      .then((response) => response.json())
      .then(() => {
        loadPosts(); // Reload posts to include the new one
      })
      .catch((error) => {
        console.error("Error adding post:", error);
      });
  });

  toggleForms(); // Initial check for login status and adjust UI accordingly
});
