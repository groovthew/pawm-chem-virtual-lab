function signUpUser(event) {
    event.preventDefault(); // Mencegah reload halaman

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirm-password').value.trim();

    // Ambil data pengguna dari localStorage atau buat array kosong jika belum ada
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Validasi Input Kosong
    if (!email || !password || !confirmPassword) {
        alert('All fields are required.');
        return;
    }

    // Validasi Panjang Password
    if (password.length < 6) {
        alert('Password must be at least 6 characters long.');
        return;
    }

    // Validasi Password dan Confirm Password
    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
    }

    // Cek Apakah Email Sudah Terdaftar
    if (users.some((user) => user.email === email)) {
        alert('This email is already registered.');
        return;
    }

    // Simpan Pengguna Baru
    users.push({ email, password });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Sign Up successful! Please log in.');

    // Redirect ke Halaman Login
    window.location.href = 'login.html';
}
