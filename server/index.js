const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const OpenAI = require("openai");

const openai = new OpenAI({ apiKey: "API KEY HERE" });

app.use(cors());
app.use(express.json());

const createData = `
    DO $$
    BEGIN
      -- Create 'todo_type' enum if it doesn't exist
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'todo_type') THEN
        CREATE TYPE todo_type AS ENUM ('Strength', 'Intelligence', 'Charisma');
      END IF;

      -- Create 'difficulty_level' enum if it doesn't exist
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'difficulty_level') THEN
        CREATE TYPE difficulty_level AS ENUM ('Easy', 'Medium', 'Hard');
      END IF;
    END $$;

    CREATE TABLE IF NOT EXISTS users (
      user_id INT PRIMARY KEY,
      name VARCHAR(255)
    );

    CREATE TABLE IF NOT EXISTS todo (
      todo_id SERIAL PRIMARY KEY,
      user_id INT REFERENCES users(user_id),
      description VARCHAR(255),
      type todo_type,
      difficulty difficulty_level,
      experience INT,
      completed BOOL,
      date DATE
    );

-- Inserting data into 'user' table
INSERT INTO "users" (user_id, name)
VALUES
  (1, 'Alice'),
  (2, 'Bob'),
  (3, 'Charlie');


-- Inserting data into 'todo' table for Alice (user_id = 1)
INSERT INTO todo (description, type, difficulty, experience, completed, date, user_id)
VALUES
  ('Complete 30 push-ups', 'Strength', 'Medium', 50, FALSE, '2024-10-06', 1),
  ('Solve math puzzles', 'Intelligence', 'Hard', 100, FALSE, '2024-10-05', 1),
  ('Give a presentation', 'Charisma', 'Medium', 60, FALSE, '2024-10-04', 1);

-- Inserting data into 'todo' table for Bob (user_id = 2)
INSERT INTO todo (description, type, difficulty, experience, completed, date, user_id)
VALUES
  ('Lift weights for an hour', 'Strength', 'Hard', 150, FALSE, '2024-10-03', 2),
  ('Read a scientific paper', 'Intelligence', 'Medium', 75, FALSE, '2024-10-02', 2),
  ('Organize a meeting', 'Charisma', 'Easy', 30, FALSE, '2024-10-01', 2);

-- Inserting data into 'todo' table for Charlie (user_id = 3)
INSERT INTO todo (description, type, difficulty, experience, completed, date, user_id)
VALUES
  ('Run 5 miles', 'Strength', 'Hard', 200, FALSE, '2024-10-06', 3),
  ('Study programming', 'Intelligence', 'Medium', 90, FALSE, '2024-10-05', 3),
  ('Host a networking event', 'Charisma', 'Hard', 120, FALSE, '2024-10-04', 3),
  ('Complete a book on public speaking', 'Charisma', 'Medium', 80, FALSE, '2024-10-03', 3);


  `;

pool.query(createData);

//Routes
app.post("/todos", async (req, res) => {
  // TODO type, difficulty, experience, completed, date
  const { description } = req.body;

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "I am in a video game and I have 3 stats: Strength, Intelligence and Charisma. I will give you a task that I have completed and I want you to tell me what stat would completing that task level up. And also give me a number of experience points depending on how difficult that task was to complete. Also give a null stat and 0 experience points for tasks that are usually unhealthy. Provide the response in JSON format {stat: ..., experience: ...}",
      },
      {
        role: "user",
        content: description,
      },
    ],
  });

  const chat_response = completion.choices[0].message.content;
  const chat_json = JSON.parse(chat_response);

  // SQL query to insert data
  const query = `
    INSERT INTO todo (user_id, description, type, difficulty, experience, completed, date)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
  `;

  try {
    const result = await pool.query(query, [
      1,
      description,
      chat_json.stat,
      "Easy",
      chat_json.experience,
      true,
      "2024-10-06",
    ]);

    // Send back the inserted row as the response
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error inserting todo item");
  }
});

app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (error) {
    console.error(error.message);
  }
});

app.get("/users", async (req, res) => {
  try {
    const allUsers = await pool.query("SELECT * FROM users");
    res.json(allUsers.rows);
  } catch (error) {
    console.error(error.message);
  }
});

app.get("/users/:user_id", async (req, res) => {
  const { user_id } = req.params;
  console.log(user_id);
  try {
    const result = await pool.query(`SELECT * FROM todo WHERE user_id = $1`, [
      user_id,
    ]);

    if (result.rows.length > 0) {
      res.status(200).json(result.rows); // Return the task if found
    } else {
      res.status(404).json({ error: "Task not found" }); // Return 404 if no task matches the given user ID and task ID
    }
  } catch (error) {
    console.error("Error fetching task from PostgreSQL:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);

    res.json(todo.rows[0]);
  } catch (error) {
    console.error(err.message);
  }
});

app.get("/todos/:user_id/:todo_id", async (req, res) => {
  const { user_id, todo_id } = req.params;
  try {
    const result = await pool.query(
      `SELECT * FROM todo WHERE user_id = $1 AND todo_id = $2`,
      [user_id, todo_id]
    );

    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]); // Return the task if found
    } else {
      res.status(404).json({ error: "Task not found" }); // Return 404 if no task matches the given user ID and task ID
    }
  } catch (error) {
    console.error("Error fetching task from PostgreSQL:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description, type, difficulty, experience, completed, date } =
      req.body;
    const updateTodo = await pool.query(
      `UPDATE todo
        SET
          description = $1,
          type = $2,
          difficulty = $3,
          experience = $4,
          completed = $5,
          date = $6
        WHERE todo_id = $7
      RETURNING *;`,
      [description, type, difficulty, experience, completed, date, id]
    );

    res.json("Todo was updated!");
  } catch (error) {
    console.error(err.message);
  }
});

app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json("Todo was deleted!");
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(3010, () => {
  console.log("server has started on port " + 3010);
});
