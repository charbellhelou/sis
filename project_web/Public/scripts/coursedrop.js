
    async function dropcourse(courseid) {

        console.log(courseid);

    const baseURL = "http://localhost:1337/";

    var baseURladdcourse = baseURL + "dropcoursedromdb";
    const res = await fetch(baseURladdcourse, {
        method: "POST",
    headers: {
        "Content-Type": "application/json",
                },
    body: JSON.stringify({
        cid: courseid,

                }),
            });

    const result = await res.json();

    if (result.status === 200) {

        alert("Course: has been dropped ");
    window.location.href = "http://localhost:1337/student";

            } else
    alert("error");




        }
