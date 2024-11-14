const backendUrl = 'http://localhost:3000/api';

function loginUser(event) {
    event.preventDefault(); // Mencegah reload halaman
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    // Validasi Input Kosong
    if (!email || !password) {
        alert('Please fill in both email and password.');
        return;
    }

    // Kirim data login ke server
    fetch('http://localhost:3000/api/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
})
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Simpan token dan userName di localStorage
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('userName', data.userName); // Simpan nama pengguna

            alert(`Welcome back, ${data.userName}!`);
            window.location.href = 'index.html'; // Redirect ke halaman home
        } else {
            alert(data.message);
        }
    })
    .catch(error => {
        console.error('Error during login:', error);
        alert('An error occurred during login.');
    });
}
