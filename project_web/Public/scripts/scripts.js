var loginBtn = document.getElementById('btn-login');
var loginemail = document.getElementById('login-email');
var loginpass = document.getElementById('login-pass');

const baseURL = "http://localhost:1337/";
loginBtn.addEventListener("click", async function (event) {


    
    event.preventDefault();
    var baseURlPost = baseURL + "login";
    const res = await fetch(baseURlPost, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: loginemail.value,
            password: loginpass.value,
        }),
    });

    const result = await res.json();

    if (result.status === 200) {

        window.location.href = "http://localhost:1337/student";
    }
    else if (result.status === 201) { //insertt admin authentication relocation
        window.location.href = "http://localhost:1337/admin";
        alert("welcome admin");}
    else if (result.status === 404) { //insertt admin authentication relocation
        alert("WHAT HAPPEN?");
    }
    else
        alert("Incorrect email or password");

});



    async function courseaddition() {

            const baseURL = "http://localhost:1337/";

    var baseURladd = baseURL + "additionofcourse";
    const courseName = document.getElementById('course_name').value;
    const credits = document.getElementById('credits').value;
    const description = document.getElementById('description').value;
    const res = await fetch(baseURladd, {
        method: "POST",
    headers: {
        "Content-Type": "application/json",
            },
    body: JSON.stringify({
        courseName: courseName,
    credits: credits,
    description: description,
            }),
        });

    const result = await res.json();

    if (result.status === 200) {
        alert("Course has been added");
    window.location.href = "http://localhost:1337/admin";
        } else {
        alert("Course was not added");
            // Consider handling this scenario differently as per your requirements
        }
    };

