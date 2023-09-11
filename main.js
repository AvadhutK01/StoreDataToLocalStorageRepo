let btn = document.querySelector('.btn');
let NameInput = document.querySelector("#name");
let EmailInput = document.querySelector("#email");
let PnoInput = document.querySelector('#pno');
let AppointmetList = document.getElementById('Appoinments');
let flag = false;

btn.addEventListener('mouseover', (e) => {
    e.preventDefault();
    if (NameInput.value === '') {
        console.log("Please enter your name");
    } else if (PnoInput.value === '') {
        console.log("Please enter a valid phone number");
    } else if (EmailInput.value === '') {
        console.log("Please enter an email address");
    } else {
        flag = true;
    }
});

btn.addEventListener('click', (e) => {
    e.preventDefault();
    if (flag) {
        let info = {
            name: NameInput.value, pno: PnoInput.value, email: EmailInput.value
        }
        let infoJson = JSON.stringify(info);
        const userId = btn.getAttribute("data-user-id");

        if (userId) {
            axios.put(`https://crudcrud.com/api/e7558da975a74961a11e5842fa4fd7ad/appoinmentData/${userId}`, infoJson, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(res => {
                    updateEditedUser(userId, infoJson);
                    NameInput.value = '';
                    PnoInput.value = '';
                    EmailInput.value = '';
                    btn.removeAttribute("data-user-id");
                    btn.value = 'Submit';
                })
                .catch(err => {
                    console.log(err);
                });
        } else {
            axios.post("https://crudcrud.com/api/e7558da975a74961a11e5842fa4fd7ad/appoinmentData", infoJson, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(res => {
                    showUser(res.data);
                    NameInput.value = '';
                    PnoInput.value = '';
                    EmailInput.value = '';
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
});

window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/e7558da975a74961a11e5842fa4fd7ad/appoinmentData").then(res => {
        for (let i = 0; i < res.data.length; i++) {
            showUser(res.data[i]);
        }
    }).catch(err => {
        console.log(err);
    })
})

function showUser(data) {
    let inforparsed = data;
    let li = document.createElement('li');
    li.className = "list-group-item";
    li.setAttribute("user-id", inforparsed._id);
    var delbutton = document.createElement('button');
    delbutton.className = "btn btn-danger btn-sm float-right m-0 delete w-25";
    delbutton.appendChild(document.createTextNode("X"));
    var Editbutton = document.createElement('button');
    Editbutton.className = "btn mr-1 btn-info btn-sm float-right m-0 edit w-25";
    Editbutton.appendChild(document.createTextNode("Edit"));
    li.appendChild(document.createTextNode(inforparsed.name + " | " + inforparsed.pno + " | " + inforparsed.email + " | "));
    li.appendChild(delbutton);
    li.appendChild(Editbutton);
    AppointmetList.appendChild(li);
}

AppointmetList.addEventListener('click', deleteuser);
AppointmetList.addEventListener('click', EditUser);

function deleteuser(e) {
    if (e.target.classList.contains('delete')) {
        if (confirm('Are you sure?')) {
            let Parli = e.target.parentElement;
            let userId = Parli.getAttribute("user-id");
            axios.delete(`https://crudcrud.com/api/e7558da975a74961a11e5842fa4fd7ad/appoinmentData/${userId}`)
                .then(() => {
                    AppointmetList.removeChild(Parli);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
}

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
        btn.setAttribute("data-user-id", userId);
        btn.value = 'Update';
    }
}

function updateEditedUser(userId, newData) {
    let data = JSON.parse(newData);
    const liToUpdate = document.querySelector(`li[user-id="${userId}"]`);
    if (liToUpdate) {
        liToUpdate.textContent = `${data.name} | ${data.pno} | ${data.email} | `;
        var delbutton = document.createElement('button');
        delbutton.className = "btn btn-danger btn-sm float-right m-0 delete w-25";
        delbutton.appendChild(document.createTextNode("X"));
        var Editbutton = document.createElement('button');
        Editbutton.className = "btn mr-1 btn-info btn-sm float-right m-0 edit w-25";
        Editbutton.appendChild(document.createTextNode("Edit"));
        liToUpdate.appendChild(delbutton);
        liToUpdate.appendChild(Editbutton);
    }

}
