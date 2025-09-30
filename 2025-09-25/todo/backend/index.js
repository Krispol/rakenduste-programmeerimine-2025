const express = require('express')
const app = express()
const port = 3000
const todosRoutes = require("./routes/todos.routes");
const cors = require("cors")

app.use(cors());
app.use(express.json());
app.get("/ping", (_req, res) => res.send("pong"));
app.use("/todos", todosRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  
})
