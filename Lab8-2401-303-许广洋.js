
const students = Array.from({ length: 50 }, (_, i) => i + 1); 


const studentListEl = document.getElementById('studentList');
const selectedNameEl = document.getElementById('selectedName');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');

let intervalId = null;
let isRunning = false;
let currentIndex = -1;

function initStudentList() {
    studentListEl.innerHTML = '';
    students.forEach((student, index) => {
        const studentEl = document.createElement('div');
        studentEl.className = 'student-item bg-white shadow-sm border border-gray-200';
        studentEl.textContent = student; // 直接显示数字编号
        studentEl.dataset.index = index;
        studentListEl.appendChild(studentEl);
    });
}

function selectRandomStudent() {
    const prevActive = document.querySelector('.student-item.active');
    if (prevActive) prevActive.classList.remove('active');

    currentIndex = Math.floor(Math.random() * students.length);
    const currentStudent = document.querySelector(`.student-item[data-index="${currentIndex}"]`);
    if (currentStudent) {
        currentStudent.classList.add('active');
        selectedNameEl.textContent = students[currentIndex]; // 显示选中的数字
    }
}

function startSelection() {
    if (isRunning) return;
    isRunning = true;
    startBtn.disabled = true;
    stopBtn.disabled = false;
    selectedNameEl.classList.add('animate-pulse-custom');
    intervalId = setInterval(selectRandomStudent, 80);
}

function stopSelection() {
    if (!isRunning) return;
    isRunning = false;
    clearInterval(intervalId);
    startBtn.disabled = false;
    stopBtn.disabled = true;
    selectedNameEl.classList.remove('animate-pulse-custom');
    
    const currentStudent = document.querySelector(`.student-item[data-index="${currentIndex}"]`);
    if (currentStudent) {
        currentStudent.classList.add('bg-green-500');
        setTimeout(() => currentStudent.classList.remove('bg-green-500'), 1000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initStudentList();
    startBtn.addEventListener('click', startSelection);
    stopBtn.addEventListener('click', stopSelection);
});