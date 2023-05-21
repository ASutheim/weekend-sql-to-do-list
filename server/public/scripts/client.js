$(document).ready(function () {
  console.log("jQuery sourced.");
  getTasks();
  clickHandlers();
});

//Links all buttons to functions
function clickHandlers() {
  $("#submit-btn").on("click", handleSubmit);
  $("#task-table").on("click", ".delete-btn", handleDelete);
  $("#task-table").on("click", ".complete-btn", completeTask);
}

function getTasks() {
  console.log("inside task refresh function");
  //Sends a GET request to the server for all tasks
  $.ajax({
    type: "GET",
    url: "/tasks",
  })
    //Passes response to the render function
    .then(function (response) {
      console.log(response);
      renderTasks(response);
    })
    .catch(function (error) {
      console.log("error in GET", error);
    });
}

function renderTasks(tasks) {
  console.log("inside render task function");
  //empty out table body
  $("#table-body").empty();
  //loops through array of tasks
  for (let i = 0; i < tasks.length; i += 1) {
    let task = tasks[i];
    //checks each task for completion
    if (task.complete === false) {
      $("#table-body").append(`
        <tr id="incomplete-task" data-id=${task.id}>
        <td>${task.task}</td>
        <td><button class='complete-btn'>Complete</button></td>
        <td><button class='delete-btn'>Delete</button></td>
      </tr>`);
    } else if (task.complete === true) {
      $("#table-body").append(`
        <tr id="complete-task" data-id=${task.id}>
        <td>${task.task}</td>
        <td id="blossom">🌼</td>
        <td><button class='delete-btn'>Delete</button></td>
      </tr>`);
    }
  }
}
function handleSubmit(event) {
  event.preventDefault();
  //grabs the text from the input field and saves it to a variable
  let newTask = {
    task: $("#task-input").val(),
  };
  console.log("inside submit function", newTask);
  //sends the data in an AJAX post request
  $.ajax({
    type: "POST",
    url: "/tasks",
    data: newTask,
  }).then(function (response) {
    //empties out input field
    $("#task-input").val("");
    //refreshes task array
    getTasks();
  });
}

function completeTask() {
  //uses DOM traversal to grab the id of the task in the same row as the button
  //saves the ID to a variable
  let taskToComplete = $(this).closest("tr").data("id");
  console.log("inside complete task function", taskToComplete);
  //sends ID as an ajax PUT request
  $.ajax({
    type: "PUT",
    url: `/tasks/${taskToComplete}`,
    data: taskToComplete,
  })
    .then(function (response) {
      //gets updates array of tasks
      getTasks();
    })
    .catch(function (error) {
      console.log("Error with update completion function:", error);
    });
}

function handleDelete() {
  //uses DOM traversal to grab the ID of the task in the same row as the clicked button
  // saves ID to a variable
  let taskToDelete = $(this).closest("tr").data("id");
  console.log("inside handle delete function, task to delete:", taskToDelete);
  // sends ID as an ajax DELETE request
  $.ajax({
    type: "DELETE",
    url: `/tasks/${taskToDelete}`,
  })
    .then(function (response) {
      //gets updated array of tasks
      getTasks();
    })
    .catch(function (error) {
      console.log("Error with delete function: ", error);
    });
}
