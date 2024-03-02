const express = require("express");
require("dotenv").config();
const app = express();
const postgres = require("postgres");
const port = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(function (_, result, next) {
  result.setHeader("Access-Control-Allow-Origin", "*");
  result.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  result.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  result.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.listen(port, () => console.log(`Server is running on port ${port}`));

let PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID;
PGHOST = "ep-round-term-a5h49vg7.us-east-2.aws.neon.tech";
PGDATABASE = "online-shop-db";
PGUSER = "radin.amrihesari@gmail.com";
PGPASSWORD = "Lx4cvVzUyFW7";
ENDPOINT_ID = "ep-round-term-a5h49vg7";

const sql = postgres({
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  ssl: "require",
  connection: {
    options: `project=${ENDPOINT_ID}`,
  },
});

// WARES
app.get("/wares", async (request, response) => {
  try {
    const wares = await sql`
      SELECT w.*, u.fullname, u.email, u.phonenumber
      FROM wares w
      JOIN users u ON w.user_id = u.user_id
    `;
    response.status(200).send(wares);
  } catch (error) {
    response.status(500).send({ error: error.message });
  }
});

app.get("/wares/:username", async (request, response) => {
  try {
    const username = request.params.username;
    const wares = await sql`
      SELECT w.*, u.fullname, u.email, u.phonenumber
      FROM wares w
      JOIN users u ON w.user_id = u.user_id
      WHERE u.username = ${username}
    `;
    response.status(200).send(wares);
  } catch (error) {
    response.status(500).send({ error: error.message });
  }
});

app.post("/wares", async (request, response) => {
  try {
    const user_id = request.body.user_id;
    const { title, description, date } = request.body;
    const wares = await sql`
      INSERT INTO wares (title, description, date, user_id) 
      VALUES (${title}, ${description}, ${date}, ${user_id})`;
    response
      .status(200)
      .send({ message: "New ware created successfully!", wares });
  } catch (error) {
    response.status(500).send({ error: error.message });
  }
});

app.put("/wares/:id", async (request, response) => {
  try {
    const ware_id = request.params.id;
    const { title, description, date } = request.body;
    const wares =
      await sql`UPDATE wares SET title = ${title}, description = ${description}, date = ${date} WHERE ware_id = ${ware_id}`;
    response.status(200).send(wares);
    response.send(`Ware with ID ${ware_id} has been updated successfully!`);
  } catch (error) {
    response.status(500).send({ error: error.message });
  }
});

app.delete("/wares/:id", async (request, response) => {
  try {
    const ware_id = request.params.id;
    const wares = await sql`DELETE FROM wares WHERE ware_id = ${ware_id}`;
    response.status(200).send(wares);
    response.send(`Ware with ID ${ware_id} has been deleted successfully!`);
  } catch (error) {
    response.status(500).send({ error: error.message });
  }
});

// USEES
app.get("/users", async (request, response) => {
  try {
    const users = await sql`SELECT * FROM users`;
    response.status(200).send(users);
  } catch (error) {
    response.status(500).send({ error: error.message });
  }
});

app.post("/users", async (request, response) => {
  try {
    const { fullname, username, password, email, phonenumber } = request.body;
    const users =
      await sql`INSERT INTO users (fullname, username, password, email, phoneNumber) VALUES (${fullname}, ${username}, ${password}, ${email}, ${phonenumber})`;
    response.status(200).send(users);
    response.send("New User created successfully!");
  } catch (error) {
    response.status(500).send({ error: error.message });
  }
});

app.put("/users/:id", async (request, response) => {
  try {
    const user_id = request.params.id;
    const { fullName, username, password, email, phoneNumber } = request.body;
    const users =
      await sql`UPDATE users SET fullName = ${fullName}, username = ${username}, password = ${password}, email = ${email}, phoneNumber = ${phoneNumber} WHERE user_id = ${user_id} RETURNING *`;
    response.status(200).send(users);
    response.send(`User with ID ${user_id} has been updated successfully!`);
  } catch (error) {
    response.status(500).send({ error: error.message });
  }
});

app.delete("/users/:id", async (request, response) => {
  try {
    const user_id = request.params.id;
    const users = await sql`DELETE FROM users WHERE user_id = ${user_id}`;
    response.status(200).send(users);
    response.send(`User with ID ${user_id} has been deleted successfully!`);
  } catch (error) {
    response.status(500).send({ error: error.message });
  }
});

app.get("/login", async (request, response) => {
  try {
    const users = await sql`SELECT username, password FROM users`;
    response.status(200).send(users);
  } catch (error) {
    response.status(500).send({ error: error.message });
  }
});

app.post("/login", async (request, response) => {
  try {
    const { username, password } = request.body;
    const findUser =
      await sql`SELECT * FROM users WHERE username = ${username} AND password = ${password}`;
    console.log(findUser);
    if (findUser & (findUser.length > 0)) {
      response.status(200).send(findUser);
    }
  } catch (error) {
    response.send({ error: true, message: "Wrong username or password!" });
  }
});
