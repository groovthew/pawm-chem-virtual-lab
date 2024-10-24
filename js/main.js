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

function showLoginForm() {
    document.getElementById("loginModal").style.display = "block";
}

function closeLoginForm() {
    document.getElementById("loginModal").style.display = "none";
}

window.onclick = function(event) {
    const modal = document.getElementById("loginModal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
};

var modal = document.getElementById("loginModal");

var btn = document.getElementById("loginBtn");

var span = document.getElementById("closeModal");

var loginForm = document.getElementById("loginForm");

btn.onclick = function() {
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Handle form submission
loginForm.onsubmit = function(event) {
    event.preventDefault(); 
    var username = document.getElementById("Mattheuw").value;
    var password = document.getElementById("password").value;

    if (username && password) {
        modal.style.display = "none";

        // Hide the login button
        btn.style.display = "none";
        alert("Login successful! Welcome, " + username + "!");
    } else {
        alert("Please enter both username and password.");
    }
}

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

// Show the quiz modal
function showQuiz() {
    document.getElementById("quizModal").style.display = "block";
}

// Close the quiz modal
function closeQuiz() {
    document.getElementById("quizModal").style.display = "none";
    document.getElementById("quizResult").style.display = "none"; 
}

// Handle quiz form submission
document.getElementById("quizForm").onsubmit = function(event) {
    event.preventDefault(); // Prevent form submission

    // Check answers
    let score = 0;
    const answers = {
        q1: "C", // Correct answer for question 1
        q2: "B", // Correct answer for question 2
    };

    for (let question in answers) {
        const selected = document.querySelector(`input[name="${question}"]:checked`);
        if (selected && selected.value === answers[question]) {
            score++;
        }
    }

    // Display results
    const resultDiv = document.getElementById("quizResult");
    resultDiv.innerHTML = `You scored ${score} out of ${Object.keys(answers).length}`;
    resultDiv.style.display = "block";
};

const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav_menu');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('show-menu');
    });

    


