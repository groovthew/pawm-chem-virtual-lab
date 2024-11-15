const backendUrl = 'http://localhost:3000/api';


function loginUser(event) {
    event.preventDefault(); // Mencegah reload halaman
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    localStorage.setItem("email", email);

    // Validasi Input Kosong
    if (!email || !password) {
        alert('Please fill in both email and password.');
        return;
    }

    // Kirim data login ke server
    fetch(`${backendUrl}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then(response => response.json())
        .then(data => {
            console.log('Login API Response:', data); 
            if (data.success) {
                localStorage.setItem('authToken', data.token);
                localStorage.setItem('name', data.name || ''); 
                
                console.log('authToken:', localStorage.getItem('authToken')); // Log untuk token
                console.log('Stored Name:', localStorage.getItem('name'));    // Log untuk nama user

    
                alert(`Welcome back, ${data.name}!`);
                window.location.href = 'index.html'; 
            } else {
                alert(data.message);
            }
        })
        .catch(error => {
            console.error('Error during login:', error);
            alert('An error occurred during login.');
        });    
}

// document.addEventListener('DOMContentLoaded', () => {
//     const authToken = localStorage.getItem('authToken');
//     const name = localStorage.getItem('name');

//     if (authToken) {
//         // Jika user sudah login, sembunyikan tombol Login dan tampilkan user info serta tombol Logout
//         // document.getElementById('loginLink').style.display = 'none';
//         // document.getElementById('userInfo').style.display = 'block';
//         document.getElementById('userName').textContent = `Welcome, ${name}`;
//     } else {
//         // Jika user belum login, tampilkan tombol Login dan sembunyikan user info
//         document.getElementById('loginLink').style.display = 'block';
//         document.getElementById('userInfo').style.display = 'none';
//     }
// });

function logoutUser() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('name');
    alert('You have been logged out!');
    window.location.href = 'login.html'; // Redirect ke halaman login
}
