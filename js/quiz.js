document.addEventListener("DOMContentLoaded", function () {
    const correctAnswers = {
        "choices": "took",
        "choices2": "Apple",
        "choices3": "Riding",
        "choices4": "drink, going",
        "choices5": "usually, mall",
        "choices6": "went"
    };

    function checkAnswer(element) {
        const questionType = element.closest('div').className.split(' ')[0];
        const correctAnswer = correctAnswers[questionType];

        const siblings = element.parentElement.children;
        for (let sibling of siblings) {
            sibling.classList.remove("correct", "wrong");
        }
        if (element.textContent.trim() === correctAnswer) {
            element.classList.add("correct");
            showNotification("Correct Answer!");
        } else {
            element.classList.add("wrong");
            showNotification("Wrong Answer! Try again.");
        }
    }

    function showNotification(message) {
        const notification = document.getElementById("notification");
        notification.textContent = message;
        notification.style.display = "block";

        setTimeout(() => {
            notification.style.display = "none";
        }, 3000);
    }

    const pilihanElements = document.querySelectorAll('.pilihan, .pilihan2, .pilihan3, .pilihan4, .pilihan5, .pilihan6');
    pilihanElements.forEach((pilihan) => {
        pilihan.onclick = function () {
            checkAnswer(this);
        };
    });
});

const draggables = document.querySelectorAll('.draggable');
const list = document.getElementById('draggable-list');

draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging');
    });

    draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging');
    });
});

list.addEventListener('dragover', (e) => {
    e.preventDefault();
    const dragging = document.querySelector('.dragging');
    const afterElement = getDragAfterElement(list, e.clientY);
    if (afterElement == null) {
        list.appendChild(dragging);
    } else {
        list.insertBefore(dragging, afterElement);
    }
});

function getDragAfterElement(list, y) {
    const draggableElements = [...list.querySelectorAll('.draggable:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}


