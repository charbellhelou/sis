

    async function checkforcreditsadd() {
        const baseURL = "http://localhost:1337/";

    const res = await fetch(baseURL + "checkforaddcourse", {
        method: "POST",
    headers: {
        "Content-Type": "application/json",
            },
    body: JSON.stringify({

    }),
        });
    const result = await res.json();
    if (result.status === 200) {

        window.location.href = "http://localhost:1337/addcourse";
        }
    else
    alert("unkown error");
    };
    async function checkforcreditsdrop() {
        const baseURL = "http://localhost:1337/";
    const res = await fetch(baseURL + "checkfordropcourse", {
        method: "POST",
    headers: {
        "Content-Type": "application/json",
            },
    body: JSON.stringify({

    }),
        });
    const result = await res.json();

    if (result.status === 200) {

        window.location.href = "http://localhost:1337/dropcourse";
        }
    else
    alert("you do not have enough credits to drop");
    };
    async function showcourses() {
        window.location.href = "http://localhost:1337/showcourse";
    }
async function showenrolledcourses() {
    window.location.href = "http://localhost:1337/showenrolledcourse";
}


