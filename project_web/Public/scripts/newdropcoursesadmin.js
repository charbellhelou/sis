src = "https://code.jquery.com/jquery-3.6.0.min.js";

    $(document).ready(function () {
        let currentCourseName; // Define currentCourseName in the broader scope

        // Event listener for course selection
        $('.courseLink').on('click', function (e) {
            e.preventDefault();
            currentCourseName = $(this).text(); // Get course name from the link text
            currentCourseName = currentCourseName.trim();
            // AJAX call to fetch students for the selected course using POST and JSON
            $.ajax({
                type: 'POST',
                url: '/getstudentsforcourse',
                contentType: 'application/json', // Set content type to JSON
                data: JSON.stringify({ currentCourseName }), // Send course name as JSON
                success: function (data) {
                    data.forEach(function (student) {
                        console.log(currentCourseName);
                        var row = $('<tr>'); // Create a new row for each student

                        // Create table data (columns) for firstName, lastName, and id
                        $('<td>').text(student.firstname).appendTo(row);
                        $('<td>').text(student.lastname).appendTo(row);
                        $('<td>').text(student.id).appendTo(row);

                        // Create a drop button (assuming it's a button to remove the student)
                        var dropButton = $('<button>').text('Drop').addClass('dropButton').attr('data-student-id', student.id).attr('data-coursename', currentCourseName); // Set the appropriate course .attr('data-coursename', 'YourCourseName'); // Set the appropriate course name
                               
                        var dropButtonCell = $('<td>').append(dropButton);
                        dropButtonCell.appendTo(row);

                        // Append the row to the table
                        $('#studentsTable').append(row);
                    });
                    $('.courseLink').on('click', function (e) {
                        $('#studentsTable').empty();

                    });
                },
                error: function (error) {
                    console.error('Error fetching students:', error);
                }
            });
        });
    });

        // Event listener for grade modification (assuming a form input)
        $('#studentsTable').on('click', '.dropButton', function () {
            const studentId = $(this).data('student-id');
            const courseName = $(this).data('coursename'); // Assuming course name is available

            // Create an object with student ID and course name
            const requestData = { studentId, courseName };
            console.log("req dat = "+requestData);
            // AJAX call to send student ID and course name as JSON to the server
            $.ajax({
                type: 'POST',
                url: '/coursedropadmin',
                contentType: 'application/json',
                data: JSON.stringify(requestData),
                success: function (response) {
                    // Handle the server response, if needed
                    alert("Course has been dropped");
                    $('#studentsTable').empty();
                },
                error: function (error) {
                    console.error('Error dropping student:', error);
                }
            });

            // Remove the table or specific row after dropping the student
           
        });
    
