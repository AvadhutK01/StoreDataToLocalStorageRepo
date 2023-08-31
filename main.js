
let btn = document.querySelector('.btn');
let NameInput = document.querySelector("#name");
let EmailInput = document.querySelector("#email");
btn.addEventListener('mouseover', (e) => {
    e.preventDefault();
    if (NameInput.value == '') {
        console.log("Please enter your name");
    }
    else {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (EmailInput.value == '') {
                console.log("please enter email address")
            }
            else {
                let info = {
                    name: NameInput.value, email: EmailInput.value
                }
                let infoJson = JSON.stringify(info);
                localStorage.setItem("AppointmentInfo", infoJson);
            }
        })

    }
})
btn.addEventListener('mouseout', (e) => {
    e.preventDefault();
    if (NameInput.value == '' || EmailInput.value == '') {
        console.log(`You have not entered any value`);
    }
    else {
        console.log(localStorage.getItem("AppointmentInfo"));
        console.log("Success");
    }
})