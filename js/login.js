// Simulasi Data Pengguna (gunakan database pada aplikasi nyata)
const users = JSON.parse(localStorage.getItem('users')) || [];

function loginUser(event) {
    event.preventDefault(); // Mencegah reload halaman
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    // Validasi Input Kosong
    if (!email || !password) {
        alert('Please fill in both email and password.');
        return;
    }

    // Cek Apakah Pengguna Terdaftar
    const user = users.find((user) => user.email === email && user.password === password);
    if (user) {
        // Simpan data login di localStorage
        localStorage.setItem('loggedInUser', email);

        alert(`Welcome back, ${email}!`);
        // Panggil fungsi untuk memperbarui navbar setelah login
        updateNavbarAfterLogin(email);
        // Arahkan pengguna ke halaman Home
        window.location.href = 'index.html';
    } else {
        alert('Invalid email or password. Please try again.');
    }
}

// Fungsi untuk memperbarui navbar setelah login
function updateNavbarAfterLogin(email) {
    // Sembunyikan link login
    const loginLink = document.querySelector('.nav-link[href="login.html"]');
    if (loginLink) {
        loginLink.style.display = 'none';
    }

    // Tampilkan pesan selamat datang dengan email pengguna
    const userDisplay = document.getElementById('userDisplay');
    if (userDisplay) {
        userDisplay.style.display = 'block'; // Menampilkan nama pengguna
        const welcomeMessage = document.getElementById('welcomeMessage');
        welcomeMessage.textContent = `Welcome, ${email}`; // Menampilkan email pengguna
    }
}

// Periksa apakah pengguna sudah login saat halaman dimuat
window.onload = function() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        updateNavbarAfterLogin(loggedInUser);
    }
};
