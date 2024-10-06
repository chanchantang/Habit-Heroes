const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const OpenAI = require("openai");

const openai = new OpenAI({ apiKey: 'API KEY HERE'});

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

    -- Create the 'todo' table if it doesn't exist
    CREATE TABLE IF NOT EXISTS todo (
      todo_id SERIAL PRIMARY KEY,
      description VARCHAR(255),
      type todo_type,
      difficulty difficulty_level,
      experience INT,
      completed BOOL,
      date DATE
    );
    `;

pool.query(createData);

//Routes
app.post("/todos", async (req, res) => {

  // TODO type, difficulty, experience, completed, date
  const { description } = req.body;

  const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
          { role: "system", content: "I am in a video game and I have 3 stats: Strength, Intelligence and Charisma. I will give you a task that I have completed and I want you to tell me what stat would completing that task level up. And also give me a number of experience points depending on how difficult that task was to complete. Also give a null stat and 0 experience points for tasks that are usually unhealthy. Provide the response in JSON format {stat: ..., experience: ...}" },
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
    INSERT INTO todo (description, type, difficulty, experience, completed, date)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;

  try {
    // Execute the query
    // const result = await pool.query(query, [
    //   description,
    //   type,
    //   difficulty,
    //   experience,
    //   completed,
    //   date,
    // ]);

    const result = await pool.query(query, [
      description,
      chat_json.stat,
      "Hard",
      chat_json.experience,
      true,
      "2024-10-05",
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
