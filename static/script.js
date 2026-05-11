document.addEventListener('DOMContentLoaded', function() {
    const studentForm = document.getElementById('studentForm');
    const studentsList = document.getElementById('studentsList');

    // Load students on page load
    loadStudents();

    // Handle form submission
    studentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            age: parseInt(document.getElementById('age').value)
        };

        fetch('/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            if (response.ok) {
                studentForm.reset();
                loadStudents();
                showMessage('Student added successfully!', 'success');
            } else {
                showMessage('Error adding student: ' + data.message, 'error');
            }
        })
        .catch(error => {
            showMessage('Error: ' + error.message, 'error');
        });
    });

    function loadStudents() {
        fetch('/students')
            .then(response => response.json())
            .then(students => {
                displayStudents(students);
            })
            .catch(error => {
                showMessage('Error loading students: ' + error.message, 'error');
            });
    }

    function displayStudents(students) {
        studentsList.innerHTML = '';
        
        if (students.length === 0) {
            studentsList.innerHTML = '<p>No students found.</p>';
            return;
        }

        students.forEach(student => {
            const studentDiv = document.createElement('div');
            studentDiv.className = 'student-item';
            studentDiv.innerHTML = `
                <div class="student-info">
                    <h3>${student.name}</h3>
                    <p>Email: ${student.email}</p>
                    <p>Age: ${student.age}</p>
                </div>
                <div class="student-actions">
                    <button onclick="editStudent(${student.id})" class="btn-edit">Edit</button>
                    <button onclick="deleteStudent(${student.id})" class="btn-delete">Delete</button>
                </div>
            `;
            studentsList.appendChild(studentDiv);
        });
    }

    function deleteStudent(id) {
        if (confirm('Are you sure you want to delete this student?')) {
            fetch(`/delete/${id}`, {
                method: 'DELETE'
            })
            .then(response => response.json())
            .then(data => {
                if (response.ok) {
                    loadStudents();
                    showMessage('Student deleted successfully!', 'success');
                } else {
                    showMessage('Error deleting student: ' + data.message, 'error');
                }
            })
            .catch(error => {
                showMessage('Error: ' + error.message, 'error');
            });
        }
    }

    function editStudent(id) {
        // For simplicity, we'll just show an alert
        // In a real app, you'd open a modal or form with pre-filled data
        alert('Edit functionality would be implemented here. Student ID: ' + id);
    }

    function showMessage(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.textContent = message;
        
        document.body.appendChild(messageDiv);
        
        setTimeout(() => {
            messageDiv.remove();
        }, 3000);
    }
});