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
    }
    else if (PnoInput.value === '') {
        console.log("Please enter a valid phone number");
    }
    else if (EmailInput.value === '') {
        console.log("Please enter an email address");
    }
    else {
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
        localStorage.setItem(NameInput.value, infoJson);
        let inforparsed = JSON.parse(localStorage.getItem(NameInput.value));
        let li = document.createElement('li');
        li.className = "list-group-item";
        var delbutton = document.createElement('button');
        delbutton.className = "btn btn-danger btn-sm float-right m-0 delete w-25";
        delbutton.appendChild(document.createTextNode("X"));
        li.appendChild(document.createTextNode(inforparsed.name + " " + "|" + " " + inforparsed.pno + " " + "|" + " " + inforparsed.email + " " + "|" + " "));
        li.appendChild(delbutton);
        AppointmetList.appendChild(li);
        console.log("success");
    }
});

AppointmetList.addEventListener('click', clearLi);

function clearLi(e) {
    if (e.target.classList.contains('delete')) {
        if (confirm('Are you sure?')) {
            let Parli = e.target.parentElement;
            AppointmetList.removeChild(Parli);
            let nameToDelete = Parli.textContent.split('|')[0].trim();
            localStorage.removeItem(nameToDelete);
        }
    }
}
