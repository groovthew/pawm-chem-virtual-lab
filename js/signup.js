const backendUrl = 'http://localhost:3000/';

function signUpUser(event) {
    event.preventDefault(); // Mencegah halaman reload

    // Ambil nilai dari input form
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirm-password').value.trim();

    // Log data yang akan dikirim ke backend
    console.log("Data yang akan dikirim:", { name, email, password });

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
    fetch("http://localhost:3000/api/signup", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }), // Data dikirim dalam format JSON
    })
        .then((response) => response.json())
        .then((data) => {
            // Log response dari server
            console.log("Response dari server:", data);

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

const form = document.getElementById('signup-form');
if (!form) {
    console.error('Form with ID "signup-form" not found in the DOM.');
}


// console.log("Sending data to backend:", { name, email, password });

// fetch('http://localhost:3000/api/signup', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ name, email, password }),
// })
//     .then(response => response.json())
//     .then(data => console.log("Response from backend:", data))
//     .catch(error => console.error("Error:", error));
