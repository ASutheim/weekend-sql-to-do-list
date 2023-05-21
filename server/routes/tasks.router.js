const express = require("express");
const router = express.Router();

const pool = require("../modules/pool");

router.get("/", (req, res) => {
  //receives request from client for an updated task list
  let queryText = 'SELECT * FROM "task-list"';
  pool
    //sends SQL query to database
    .query(queryText)
    .then((result) => {
      //sends result to client
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("error getting tasks from SQL", error);
      res.sendStatus(500);
    });
});

router.post("/", (req, res) => {
  //uses body parser to parse data from client and saves it to a variable
  let newTask = req.body;
  console.log("New task post request:", req.body);
  //SQL query sanitizes data from client before sending
  let queryText = `INSERT INTO "task-list" ("task") VALUES ($1);`;
  let values = [newTask.task];
  //sends query with new data to database
  pool
    .query(queryText, values)
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log("Query:", queryText, "Error:", error);
      res.sendStatus(500);
    });
});

router.put("/:id", (req, res) => {
  //saves ID of task to a variable
  let taskToComplete = req.params.id;
  //queries database to update the value of 'complete' boolean for the given task
  let queryText = `
    UPDATE "task-list" 
    SET "complete" = TRUE 
    WHERE "id"=$1`;
  pool.query(queryText, [taskToComplete]).then((result) => {
    console.log(
      "In router side of complete function. Task to complete:",
      result.rows
    );
    res.sendStatus(200);
  });
});

router.delete("/:id", (req, res) => {
  //saves ID of task as a variable
  let taskToDelete = req.params.id;
  //queries database to delete the task at the given ID value
  let queryText = 'DELETE FROM "task-list" WHERE "id"=$1';
  pool
    .query(queryText, [taskToDelete])
    .then((result) => {
      console.log("In router side of delete. Task to delete:", result.rows);
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log("Error making delete:", error);
      res.sendStatus(500);
    });
});

module.exports = router;
