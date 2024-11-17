document.getElementById('backBtn').addEventListener('click', () => {
    window.location.href = '/';
});

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    window.location.href = '/html/conversation.html';
}); 