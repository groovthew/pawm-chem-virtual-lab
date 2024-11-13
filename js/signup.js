const backendUrl = 'http://localhost:3000/api';
console.log({ email, password }); // Log data sebelum dikirim

function signUpUser(event) {
    event.preventDefault(); // Mencegah halaman reload

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirm-password').value.trim();

    // Validasi input
    if (!name || !email || !password || !confirmPassword) {
        alert('All fields are required.');
        return;
    }

    if (password.length < 6) {
        alert('Password must be at least 6 characters long.');
        return;
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
    }

    // Kirim data ke server
    fetch(`${backendUrl}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                alert('Sign up successful! Please log in.');
                window.location.href = 'login.html'; // Redirect ke halaman login
            } else {
                alert(data.message); // Tampilkan pesan error dari server
            }
        })
        .catch((error) => {
            console.error('Error during sign up:', error);
            alert('An error occurred. Please try again later.');
        });
}
