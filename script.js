const postList = document.getElementById('postList');
const statusDiv = document.getElementById('status');
const postForm1 = document.getElementById('postForm');
const confirmation1 = document.getElementById('confirmation');
// Fetch and display posts
async function fetchPosts() {
try {
statusDiv.innerHTML = '<p class="loading">Loading posts...</p>';
const response = await fetch('https://jsonplaceholder.typicode.com/posts');
if (!response.ok) 
throw new Error('Failed to fetch posts');
const posts = await response.json();
 console.log(response.json);
  } catch (error) {
    console.error(error.message);
  }
}   
// Submit a new post
const postForm2 = document.getElementById('postForm');
const confirmation2 = document.getElementById('confirmation');

postForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const title = document.getElementById('title').value;
    const body = document.getElementById('body').value;

    try {
        confirmation.innerText = 'Sending...';
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, body }),
        });

        if (!response.ok) throw new Error('Failed to send post');

        const result = await response.json();
        confirmation.innerHTML = `<p>Post added! ID: ${result.id}</p>`;
        postForm.reset();
    } catch (error) {
        confirmation.innerHTML = `<p class="error">${error.message}</p>`;
    }
});
function renderPosts(posts) {
    postList.innerHTML = '';
    posts.forEach(post => {
        const postItem = document.createElement('div');
        postItem.className = 'post';
        postItem.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.body}</p>
            <button onclick="deletePost(${post.id})">Delete</button>
        `;
        postList.appendChild(postItem);
    });
}

async function deletePost(id) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete');
        fetchPosts(); // refresh list
    } catch (error) {
        alert(error.message);
    }
}