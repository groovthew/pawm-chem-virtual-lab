/* ---- NAVIGATION BAR FUNCTION ------- */
function myMenuFunction() {
    var menuBtn = document.getElementById("myNavMenu");
    if(menuBtn.className === "nav-menu") {
        menuBtn.className += "responsive";
    } else {
        menuBtn.className = "nav-menu";
    }
}

/* ADD SHADOW ON NAVBAR */
const navbar = document.querySelector('nav');
function addShadowOnScroll() {
    if (window.scrollY > 50) { 
        navbar.classList.add('shadow');
    } else {
        navbar.classList.remove('shadow');
    }
}
window.addEventListener('scroll', addShadowOnScroll); 

/* LOGIN MODAL FUNCTIONALITY */
function showLoginForm() {
    document.getElementById("loginModal").style.display = "block";
}

function closeLoginForm() {
    document.getElementById("loginModal").style.display = "none";
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById("loginModal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
};

/* LOGIN FORM SUBMISSION */
const loginForm = document.getElementById("loginForm");
loginForm.onsubmit = function(event) {
    event.preventDefault(); 

    var username = document.getElementById("Mattheuw").value;
    var password = document.getElementById("bakkie").value;

    if (username && password) {
        // Store user login status in localStorage
        localStorage.setItem('loggedInUser', username);

        // Hide the login modal and button
        document.getElementById("loginModal").style.display = "none";
        document.getElementById("loginBtn").style.display = "none";
        alert("Login successful! Welcome, " + username + "!");
        
        // Update navbar to show logged-in user info
        updateNavbarAfterLogin(username);
    } else {
        alert("Please enter both username and password.");
    }
}

// Fungsi untuk memperbarui navbar setelah login
function updateNavbarAfterLogin(email) {
    const loginLink = document.getElementById('loginLink');
    if (loginLink) {
        loginLink.style.display = 'none'; // Sembunyikan link login
    }

    const userDisplay = document.getElementById('userDisplay');
    if (userDisplay) {
        userDisplay.style.display = 'block'; // Tampilkan user display
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

// Fungsi logout
function logout() {
    // Hapus data login di localStorage
    localStorage.removeItem('loggedInUser');

    // Perbarui navbar
    const userDisplay = document.getElementById('userDisplay');
    if (userDisplay) {
        userDisplay.style.display = 'none'; // Sembunyikan user display
    }

    const loginLink = document.getElementById('loginLink');
    if (loginLink) {
        loginLink.style.display = 'block'; // Tampilkan link login kembali
    }

    alert('You have been logged out!');
    window.location.href = 'index.html'; // Redirect ke halaman utama setelah logout
}


/* HANDLE QUIZ MODAL */
function showQuiz() {
    document.getElementById("quizModal").style.display = "block";
}

function closeQuiz() {
    document.getElementById("quizModal").style.display = "none";
    document.getElementById("quizResult").style.display = "none"; 
}

// Handle quiz form submission
document.getElementById("quizForm").onsubmit = function(event) {
    event.preventDefault(); 

    let score = 0;
    const answers = {
        q1: "C", 
        q2: "B", 
    };

    for (let question in answers) {
        const selected = document.querySelector(`input[name="${question}"]:checked`);
        if (selected && selected.value === answers[question]) {
            score++;
        }
    }

    const resultDiv = document.getElementById("quizResult");
    resultDiv.innerHTML = `You scored ${score} out of ${Object.keys(answers).length}`;
    resultDiv.style.display = "block";
};

/* HANDLE HAMBURGER MENU */
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav_menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('show-menu');
});

/* HANDLE PDF DOWNLOAD */
document.addEventListener('DOMContentLoaded', function() {
    const downloadButtons = document.querySelectorAll('.download-button');
    downloadButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filePath = this.getAttribute('data-file'); 
            downloadPDF(filePath); 
        });
    });
});

function downloadPDF(filePath) {
    const link = document.createElement('a'); 
    link.href = filePath; 
    link.download = ''; 
    document.body.appendChild(link);
    link.click(); 
    document.body.removeChild(link); 
}

/* SCROLL TO SECTION */
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}
