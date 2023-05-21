$(document).ready(function () {
  console.log("jQuery sourced.");
  getTasks();
  clickHandlers();
});

function clickHandlers() {
  $("#submit-btn").on("click", handleSubmit);
  $("#task-table").on("click", ".delete-btn", handleDelete);
  $("#task-table").on("click", ".complete-btn", completeTask);
}

function getTasks() {
  console.log("inside task refresh function");
  $.ajax({
    type: "GET",
    url: "/tasks",
  })
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
  $("#task-table").empty();
  for (let i = 0; i < tasks.length; i += 1) {
    let task = tasks[i];
    $("#task-table").append(`
        <tr data-id=${task.id}>
        <td>${task.task}</td>
        <td><button class='complete-btn'>Complete</button></td>
        <td><button class='delete-btn'>Delete</button></td>
      </tr>`);
  }
}

function handleSubmit() {
  let newTask = {
    task: $("#task-input").val(),
  };
  console.log("inside submit function", newTask);
  $.ajax({
    type: "POST",
    url: "/tasks",
    data: newTask,
  }).then(function (response) {
    $("#task-input").val("");
    getTasks();
  });
}

function completeTask() {
  console.log("inside complete task function");
}

function handleDelete() {
  console.log("inside handle delete function");
}
