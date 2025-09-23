const express = require('express')
const app = express()
const port = 3000

// Parse JSON bodies
app.use(express.json());

app.get('/users/:userId/books/:bookId', (req, res) => {
  const { userId, bookId } = req.params;

  res.json({
    message: 'Route parameters received',
    userId,
    bookId
  });
});
//http://localhost:3000/users/34/books/0666

app.get('/flights/:from-:to', (req, res) => {
  const { from, to } = req.params;

  res.json({
    message: 'Flight search',
    from,
    to
  });
});
//http://localhost:3000/flights/FR-TLL

app.get('/', (req, res) => {
  res.send('Get got!')
})

app.post('/', (req, res) => {
  res.send('Postmen be postin')
})

app.put('/user', (req, res) => {
  res.send('/user got put in his place')
})

app.delete('/user', (req, res) => {
  res.send('/user was mean online, got deleted')
})

//konsoolitestid
app.get('/console-test', (req, res) => {
  console.error("This is an error message");
  console.warn("This is a warning");
  console.info("This is some info");

  console.table([
    { id: 1, name: "Liisa" },
    { id: 2, name: "Liisu" }
  ]);

  console.time("timer1");
  for (let i = 0; i < 1e6; i++) {} // dummy work
  console.timeEnd("timer1");

  console.assert(2 + 2 === 4, "Math is wrong?!");
  console.assert(2 + 2 === 5, "This will fail");

  console.group("Group");
  console.log("Inside the group");
  console.groupEnd();

  console.count("Hit count");
  console.count("Hit count");

  res.send("Check your server console for log outputs!");
});
//http://localhost:3000/console-test

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})