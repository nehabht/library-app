const PORT = process.env.PORT ?? 8000
const express = require('express')
const cors = require('cors')
const app = express()
const pool = require('./db')
const {v4: uuidv4} = require('uuid')
const bcrypt = require('bcrypt') //hash
const jwt = require('jsonwebtoken')// token

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


//edit a book
app.put('/books/:id', async (req, res) => {
    const { id } = req.params;
    const { user_email, title, author, isbn, plot, progress, date } = req.body;
  
    console.log('PUT request received:', req.body); 
  
    try {
      const editBook = await pool.query(
        'UPDATE books SET user_email = $1, title = $2, author = $3, isbn = $4, plot= $5, progress= $6, date= $7 WHERE id = $8;',
        [user_email, title, author, isbn, plot, progress, date, id]
      );
      res.json(editBook);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });


//delete
app.delete('/books/:id', async (req,res) => {
    const {id} = req.params;

    try{
        const deleteBook = await pool.query('DELETE FROM books WHERE id=$1;', [id])
        res.json(deleteBook)


    }catch(err){
        console.log(err)
    }
}) 


//signup
app.post('/signup', async (req,res) => {
    const {name, lastname, email, password } = req.body
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password,salt)
    try {
        const signUp = await pool.query(`INSERT INTO users (name, lastname, email, hashed_password) VALUES($1, $2, $3, $4)`,
          [name, lastname, email, hashedPassword]  
        )

        const token = jwt.sign({email}, 'secret', {expiresIn: '1hr'})

        res.json({ email, token })
        
    } catch (err) {
         console.log(err)
        if(err) {
            res.json({ detail: err.detail})
        }
    }
})





//login
app.post('/login', async (req,res) => {
    const {email, password } = req.body
    
    try {
        
    } catch (err) {
        console.log(err)
    }
})



app.listen(PORT, ()=> console.log(`Server running on PORT ${PORT}`))