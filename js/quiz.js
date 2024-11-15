document.addEventListener("DOMContentLoaded", function () {
    let score = 0;
    let userAnswers = {}; // Menyimpan jawaban yang dipilih oleh user

    const correctAnswers = {
        "choices": "took",
        "choices2": "Apple",
        "choices3": "Riding",
        "choices4": "drink, going",
        "choices5": "usually, mall",
        "choices6": "went"
    };

    // Fungsi untuk mengirim data quiz ke database
    async function submitToDatabase(email, score, correctCount, incorrectCount) {
        try {
            const response = await fetch('http://localhost:3000/submit-quiz', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    score: score,
                    correctAnswers: correctCount,
                    incorrectAnswers: incorrectCount,
                }),
            });

            const result = await response.text();
            console.log(result);
        } catch (error) {
            console.error("Error submitting quiz result:", error);
        }
    }

    // Fungsi untuk mengambil skor sebelumnya dari API
    async function fetchPreviousScore() {
        const email = "farah@gmail.com";
        if (!email) {
            document.getElementById("previousScore").textContent = "No email found.";
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/previous-score?email=${email}`);
            const data = await response.json();
            console.log(response);

            if (data.success && data.previousScore !== undefined) {
                document.getElementById("previousScore").textContent = `Your Previous Score: ${data.previousScore}`;
            } else {
                document.getElementById("previousScore").textContent = "No previous score found.";
            }
        } catch (error) {
            console.error("Error fetching previous score:", error);
            document.getElementById("previousScore").textContent = "Error fetching previous score.";
        }
    }

    // Fungsi untuk menghitung skor dan mengirimnya ke database
    function submitQuiz() {
        score = 0;
        let correctCount = 0;
        let incorrectCount = 0;

        for (const question in correctAnswers) {
            const userAnswer = userAnswers[question];
            const correctAnswer = correctAnswers[question];
            if (userAnswer === correctAnswer) {
                score += 100;
                correctCount++;
            } else {
                incorrectCount++;
            }
        }

        // Simpan skor dan jumlah jawaban benar/salah di localStorage
        localStorage.setItem("score", score);
        localStorage.setItem("correctAnswers", correctCount);
        localStorage.setItem("incorrectAnswers", incorrectCount);

        // Ambil email dari input user
        const email = localStorage.getItem("email");
        // Kirim ke database
        submitToDatabase(email, score, correctCount, incorrectCount);

        // Arahkan ke halaman hasil
        window.location.href = "result.html";
    }

    // Menambahkan event listener ke tombol submit
    document.getElementById("submitQuiz").addEventListener("click", submitQuiz);

    // Menambahkan event listener pada pilihan untuk memeriksa jawaban
    const pilihanElements = document.querySelectorAll('.pilihan, .pilihan2, .pilihan3, .pilihan4, .pilihan5, .pilihan6');
    pilihanElements.forEach((pilihan) => {
        pilihan.onclick = function () {
            const questionType = this.closest('div').className.split(' ')[0];
            const correctAnswer = correctAnswers[questionType];
            userAnswers[questionType] = this.textContent.trim();

            const siblings = this.parentElement.children;
            for (let sibling of siblings) {
                sibling.classList.remove("correct", "wrong");
            }

            if (this.textContent.trim() === correctAnswer) {
                this.classList.add("correct");
            } else {
                this.classList.add("wrong");
            }
        };
    });

    // Panggil fetchPreviousScore saat halaman dimuat
    fetchPreviousScore();
});
