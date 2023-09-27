let AppointmentsList = document.getElementById('Appointments');
let flag = false;
let NameInput = document.getElementById('name');
let PnoInput = document.getElementById('phone_no');
let EmailInput = document.getElementById('email');
let btn = document.getElementById('btn');
const form = document.getElementById("my-form");
async function fetchAndDisplayUsers() {
    try {
        const response = await axios.get('/get-users');
        const users = response.data;
        AppointmentsList.innerText = '';
        for (let i = 0; i < users.length; i++) {
            const li = document.createElement('li');
            li.className = "list-group-item";
            li.setAttribute("user-id", users[i].id);
            const delButton = document.createElement('button');
            delButton.className = "btn btn-danger btn-sm float-right m-0 delete w-25";
            delButton.appendChild(document.createTextNode("X"));
            const editButton = document.createElement('button');
            editButton.className = "btn mr-1 btn-info btn-sm float-right m-0 edit w-25";
            editButton.appendChild(document.createTextNode("Edit"));

            li.appendChild(document.createTextNode(users[i].Name + " | " + users[i].phone_no + " | " + users[i].Email + " | "));
            li.appendChild(delButton);
            li.appendChild(editButton);
            AppointmentsList.appendChild(li);
        }
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

AppointmentsList.addEventListener('click', deleteuser);
AppointmentsList.addEventListener('click', EditUser);
async function deleteuser(e) {
    if (e.target.classList.contains('delete')) {
        if (confirm('Are you sure?')) {
            let parentLi = e.target.parentElement;
            let userId = parentLi.getAttribute("user-id");
            try {
                await axios.post('/delete-user', { userId });
                AppointmentsList.removeChild(parentLi);
                await fetchAndDisplayUsers();
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        }
    }
}
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const userId = btn.getAttribute("data-user-id");
    const name = NameInput.value;
    const phoneNo = PnoInput.value;
    const email = EmailInput.value;
    const btnVal = btn.value;

    try {
        if (btnVal === "Submit") {
            await axios.post("/post-data", { name, phoneNo, email });
        } else if (btnVal === "Update" && userId) {
            await axios.post("/update-user", { userId, name, phoneNo, email });
            btn.removeAttribute("data-user-id");
            btn.value = "Submit";
        }
        NameInput.value = "";
        PnoInput.value = "";
        EmailInput.value = "";
        fetchAndDisplayUsers();
    } catch (error) {
        console.error("Error:", error);
    }
});
function EditUser(e) {
    if (e.target.classList.contains('edit')) {
        let Parli = e.target.parentElement;
        let userId = Parli.getAttribute("user-id");
        let name = Parli.textContent.split('|')[0].trim();
        let pno = Parli.textContent.split('|')[1].trim();
        let email = Parli.textContent.split('|')[2].trim();
        NameInput.value = name;
        PnoInput.value = pno;
        EmailInput.value = email;
        AppointmentsList.removeChild(Parli);
        btn.setAttribute("data-user-id", userId);
        btn.value = 'Update';
    }
}
window.addEventListener("DOMContentLoaded", async () => {
    await fetchAndDisplayUsers();
});