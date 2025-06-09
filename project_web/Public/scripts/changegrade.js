
    async function updateGrade(studentId, courseId) {
            const newGradeInput = document.getElementById(`newgrade_${studentId}_${courseId}`);
    const newGrade = newGradeInput.value;
    const baseURL = "http://localhost:1337/";
    var baseURlchangegrade = baseURL + "dbchangegrade";
    const res = await fetch(baseURlchangegrade, {
        method: "POST",
    headers: {
        "Content-Type": "application/json",
                },
    body: JSON.stringify({
        sid: studentId,
    cid: courseId,
    newgrade: newGrade,

                }),
            });

    console.log(`New grade for student ${studentId} in course ${courseId}: ${newGrade}`);
    const result = await res.json();

    if (result.status === 200) {

        alert("Course grade has been changed ");
    window.location.href = "http://localhost:1337/admin";
            } else {

        alert("error");
    window.location.href = "http://localhost:1337/admin";
            }
        }




