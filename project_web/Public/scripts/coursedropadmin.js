

    async function drop(studentid, courseid) {

        console.log(courseid);

    const baseURL = "http://localhost:1337/";

    var baseURladdcourse = baseURL + "coursedropadmin";
    const res = await fetch(baseURladdcourse, {
        method: "POST",
    headers: {
        "Content-Type": "application/json",
                },
    body: JSON.stringify({
        sid: studentid,
    cid: courseid,

                }),
            });

    const result = await res.json();

    if (result.status === 200) {

        alert("Course: has been dropped ");
    window.location.href = "http://localhost:1337/admin";
            } else
    alert("error");
    window.location.href = "http://localhost:1337/admin";
        }
