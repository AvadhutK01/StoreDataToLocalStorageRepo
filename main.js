
let btn = document.querySelector('.btn');
let NameInput = document.querySelector("#name");
let EmailInput = document.querySelector("#email");
let PnoInput = document.querySelector('#pno');
let AppointmetList = document.getElementById('Appoinments');
let flag = false;
parseInt(PnoInput);
btn.addEventListener('mouseover', (e) => {
    e.preventDefault();
    if (NameInput.value == '') {
        console.log("Please enter your name");
    }
    else if (PnoInput.value === '') {
        console.log("please Enter a valid phone number")
    }
    else if (EmailInput.value == '') {
        console.log("please enter email address")
    }
    else if (NameInput.value == '' || EmailInput.value == '' || PnoInput == null) {
        console.log(`You have not entered any value`);
    }
    else {
        flag = true;
    }
}
)
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
        li.appendChild(document.createTextNode(inforparsed.name + " " + "|" + " " + inforparsed.pno + " " + "|" + " " + inforparsed.email));
        AppointmetList.appendChild(li);
        console.log("success");
    }
}
)
