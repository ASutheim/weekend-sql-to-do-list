const express = require("express");
const router = express.Router();

const pool = require("../modules/pool");

router.get("/", (req, res) => {
  let queryText = 'SELECT * FROM "task-list"';
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("error getting tasks from SQL", error);
      res.sendStatus(500);
    });
});

router.post("/", (req, res) => {
  let newTask = req.body;
  console.log("New task post request:", req.body);
  let queryText = `INSERT INTO "task-list" ("task") VALUES ($1);`;
  let values = [newTask.task];
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

router.put("/boop/:id", (req, res) => {
  console.log("boop");
  let taskToComplete = req.params.id;
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
  let taskToDelete = req.params.id;
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
