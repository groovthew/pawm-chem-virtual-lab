const correctAnswer = ["take", "Apple", "drink, going", "usually, mall"] ;
    let lastSelected = null; // Menyimpan elemen terakhir yang dipilih

    // Fungsi untuk memeriksa jawaban ketika elemen diklik
    function checkAnswer(element) {
        // Menghapus kelas dari elemen yang sebelumnya dipilih
        if (lastSelected && lastSelected !== element) {
            lastSelected.classList.remove("correct", "wrong");
        }
        
        // Jika jawaban benar
        if (element.textContent === correctAnswer) {
            element.classList.add("correct"); // Ubah background menjadi hijau muda dan teks putih
            
            // Tampilkan notifikasi
            showNotification("Correct Answer!");
        } else {
            element.classList.add("wrong"); // Ubah background menjadi putih dan teks merah
        }

        // Simpan elemen yang dipilih terakhir
        lastSelected = element;
    }

    // Fungsi untuk menampilkan notifikasi
    function showNotification(message) {
        const notification = document.getElementById("notification");
        notification.textContent = message; // Set teks notifikasi
        notification.style.display = "block"; // Tampilkan notifikasi

        // Sembunyikan notifikasi setelah 3 detik
        setTimeout(() => {
            notification.style.display = "none";
        }, 3000);
    }