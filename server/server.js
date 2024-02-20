const PORT = process.env.PORT ?? 8000
const express = require('express')
const cors = require('cors')
const app = express()
const pool = require('./db')
const {v4: uuidv4} = require('uuid')

app.use(cors())
app.use(express.json())


// app.get('/', (req, res) => {
//     res.send('heel!')
// })

//  get all books
app.get('/books/:userEmail', async (req, res) => {

    // console.log(req)

    //const userEmail = 'test@gmail.com'
    const { userEmail } = req.params
    //console.log(userEmail)

    try {
        const books = await pool.query('SELECT * FROM books WHERE user_email = $1', [userEmail])
        res.json(books.rows)
    }catch (err){
        console.error(err)
    }
})


// create new book
app.post('/books', (req, res) => {
    const { user_email, title, author, isbn, plot, progress, date } = req.body;
    //console.log(user_email, title, author, isbn, plot, progress, date);

    const id = uuidv4();

    try {
        pool.query(
            `INSERT INTO books(id, user_email, title, author, isbn, plot, progress, date) VALUES($1, $2, $3, $4, $5, $6, $7, $8)`,
            [id, user_email, title, author, isbn, plot, progress, date]
        );

        res.status(201).send("Book added successfully!");
        console.log("Book added successfully!")

    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
        console.log("Internal Server Error")
    }
});

app.listen(PORT, ()=> console.log(`Server running on PORT ${PORT}`))