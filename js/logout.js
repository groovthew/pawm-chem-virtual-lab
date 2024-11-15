function logout() {
    // Hapus token dan nama pengguna dari localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('name');

    // Redirect ke halaman login setelah logout
    alert('You have been logged out.');
    window.location.href = 'index.html'; // Arahkan kembali ke halaman utama (index.html)
}

function cancelLogout() {
    // Redirect kembali ke halaman utama atau sebelumnya
    window.location.href = 'index.html'; // Halaman utama
}
