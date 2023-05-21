$(document).ready(function () {
  console.log("jQuery sourced.");
  renderTasks();
  clickHandlers();
});

function clickHandlers() {
  $("#submit-btn").on("click", handleSubmit);
  $("#task-table").on("click", ".delete-btn", handleDelete);
  $("#task-table").on("click", ".complete-btn", completeTask);
}

function renderTasks() {
  console.log("inside task render function");
}

function handleSubmit() {
  console.log("inside submit function");
}

function handleDelete() {
  console.log("inside handle delete function");
}
function completeTask() {
  console.log("inside complete task function");
}
