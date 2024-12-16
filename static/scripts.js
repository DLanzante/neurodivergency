// static/scripts.js

const apiUrl = 'http://localhost:8000/api/';  // Change this URL for production

// Handle login
document.getElementById('login-form').addEventListener('submit', async function (event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch(apiUrl + 'login/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (response.ok) {
        localStorage.setItem('access_token', data.access); // Store token
        alert('Logged in successfully');
        loadPosts(); // Load posts after login
    } else {
        alert(data.detail);
    }
});

// Handle registration
document.getElementById('register-form').addEventListener('submit', async function (event) {
    event.preventDefault();
    const username = document.getElementById('reg-username').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;

    const response = await fetch(apiUrl + 'register/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();
    if (response.ok) {
        alert('Registration successful, you can now log in!');
    } else {
        alert(data.detail);
    }
});

// Load posts
async function loadPosts() {
    const token = localStorage.getItem('access_token');
    const response = await fetch(apiUrl + 'posts/', {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
    const posts = await response.json();

    const postsContainer = document.getElementById('posts-container');
    postsContainer.innerHTML = '';
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.content}</p>
        `;
        postsContainer.appendChild(postElement);
    });
}

// Initial load of posts if logged in
if (localStorage.getItem('access_token')) {
    loadPosts();
}