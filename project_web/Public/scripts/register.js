
var registerBtn = document.getElementById('register_btn');

var firstname = document.getElementById('fn');
var lastname = document.getElementById('ln');
var email = document.getElementById('mail');
var password = document.getElementById('pass');
var type = document.getElementById('rol');

const baseURL = "http://localhost:1337/";

registerBtn.addEventListener("click", async function (event) {

    event.preventDefault();

    var baseURladd = baseURL + "register";
  
    const res = await fetch(baseURladd, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                first_name: firstname.value,
                last_name: lastname.value,
                mail: email.value ,
                pass: password.value,
                role: type.value,
            }),
        });
    console.log("hello");
        const result = await res.json();

        if (result.status === 200) {
            alert("student has been added");
            window.location.href = "http://localhost:1337/admin";
        } else 
            alert("student was not added");
        
    });




