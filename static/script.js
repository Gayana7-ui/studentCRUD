const API = ""; // Use relative paths
let editId = null;

async function fetchStudents() {
    try {
        let res = await fetch(`/students`);
        let data = await res.json();

        let list = document.getElementById("list");
        let countEl = document.getElementById("student-count");
        list.innerHTML = "";

        if (Array.isArray(data)) {
            countEl.innerText = `${data.length} students`;
            data.forEach(s => {
                list.innerHTML += `
                    <li class="student-item">
                        <div class="student-info">
                            <span class="student-name">${s.name} <small style="color: var(--text-muted); font-weight: normal; margin-left: 8px;">ID: ${s.id_num || 'N/A'}</small></span>
                            <span class="student-meta">Age: ${s.age} | ${s.course}</span>
                            <span class="student-meta" style="font-size: 0.75rem; color: var(--primary);">📧 ${s.email || 'No email'}</span>
                            <span class="student-meta" style="font-size: 0.75rem;"><i class="phone-icon">📞</i> ${s.phone || 'No phone'}</span>
                        </div>
                        <div class="actions">
                            <button class="edit-btn" onclick="editStudent(${s.id}, '${s.name}', ${s.age}, '${s.course}', '${s.phone || ''}', '${s.id_num || ''}', '${s.email || ''}')">Edit</button>
                            <button class="delete-btn" onclick="deleteStudent(${s.id})">Delete</button>
                        </div>
                    </li>
                `;
            });
        }
    } catch (error) {
        console.error("Error fetching students:", error);
    }
}

function editStudent(id, name, age, course, phone, id_num, email) {
    editId = id;
    document.getElementById("name").value = name;
    document.getElementById("age").value = age;
    document.getElementById("course").value = course;
    document.getElementById("phone").value = phone;
    document.getElementById("id_num").value = id_num;
    document.getElementById("email").value = email;
    
    let addBtn = document.getElementById("add-btn");
    addBtn.innerText = "Update Student";
    addBtn.classList.add("update-mode");
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function deleteStudent(id) {
    if (confirm("Are you sure you want to delete this student?")) {
        try {
            await fetch(`/delete/${id}`, { method: "DELETE" });
            fetchStudents();
        } catch (error) {
            console.error("Error deleting student:", error);
        }
    }
}

async function addStudent() {
    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let course = document.getElementById("course").value;
    let phone = document.getElementById("phone").value;
    let id_num = document.getElementById("id_num").value;
    let email = document.getElementById("email").value;
    
    let addBtn = document.getElementById("add-btn");

    if (!name || !age || !course || !phone || !id_num || !email) {
        alert("Please fill in all fields");
        return;
    }

    addBtn.disabled = true;
    addBtn.innerText = "Processing...";

    try {
        let payload = {name, age, course, phone, id_num, email};
        
        if (editId) {
            // UPDATE
            await fetch(`/update/${editId}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(payload)
            });
            editId = null;
            addBtn.classList.remove("update-mode");
        } else {
            // CREATE
            await fetch(`/add`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(payload)
            });
        }

        // Clear inputs
        document.getElementById("name").value = "";
        document.getElementById("age").value = "";
        document.getElementById("course").value = "";
        document.getElementById("phone").value = "";
        document.getElementById("id_num").value = "";
        document.getElementById("email").value = "";
        
        addBtn.innerText = "Add Student";

        await fetchStudents();
    } catch (error) {
        console.error("Error saving student:", error);
    } finally {
        addBtn.disabled = false;
        if (!editId) addBtn.innerText = "Add Student";
    }
}



// Initial fetch
window.onload = fetchStudents;

