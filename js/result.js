// Function to display quiz results on the result page
window.onload = function() {
    const score = sessionStorage.getItem('score') || 0;
    const correctAnswers = sessionStorage.getItem('correctAnswers') || 0;
    const incorrectAnswers = sessionStorage.getItem('incorrectAnswers') || 0;

    document.getElementById('score').innerText = score;
    document.getElementById('correctAnswers').innerText = correctAnswers;
    document.getElementById('incorrectAnswers').innerText = incorrectAnswers;
};

// Function to handle retry button click, redirecting back to quiz page
function retryQuiz() {
    localStorage.removeItem('score');
    localStorage.removeItem('correctAnswers');
    localStorage.removeItem('incorrectAnswers');
    
    window.location.href = "quiz.html";
}
