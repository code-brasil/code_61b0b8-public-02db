// app.js

document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname.split('/').pop();

    if (path === 'signup.html') {
        const signupForm = document.getElementById('signup-form');
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(signupForm);
            const body = Object.fromEntries(formData);
            const response = await fetch('http://localhost:8000/functions/code_61b0b8/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            const result = await response.json();
            if (result.success) {
                window.location.href = 'login.html';
            } else {
                alert(result.message);
            }
        });
    }

    if (path === 'login.html') {
        const loginForm = document.getElementById('login-form');
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(loginForm);
            const body = Object.fromEntries(formData);
            const response = await fetch('http://localhost:8000/functions/code_61b0b8/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            const result = await response.json();
            if (result.success) {
                // Redirecionar com base no papel do usuário
                if (result.role === 'aluno') {
                    window.location.href = 'dashboard_aluno.html';
                } else if (result.role === 'instrutor') {
                    window.location.href = 'dashboard_instrutor.html';
                } else if (result.role === 'admin') {
                    window.location.href = 'admin.html';
                }
            } else {
                alert(result.message);
            }
        });
    }

    // Implementar outras funcionalidades conforme necessário
});