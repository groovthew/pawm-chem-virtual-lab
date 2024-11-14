function logout() {
    // Menghapus token dari localStorage
    localStorage.removeItem('authToken');
    alert("You have been logged out.");
    window.location.href = "login.html"; // Redirect ke halaman login
}

function cancelLogout() {
    window.location.href = "index.html"; // Redirect ke halaman home
}