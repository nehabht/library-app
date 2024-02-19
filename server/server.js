const PORT = process.env.PORT ?? 8000
const express = require('express')
const app = express()
const pool = require('./db')


// app.get('/', (req, res) => {
//     res.send('heel!')
// })

// get all books
app.get('/books', async (req, res) => {

    const userEmail = 'neha@gmail.com'
    
    try {
        const books = await pool.query('SELECT * FROM books WHERE user_email = $1', [userEmail])
        res.json(books.rows)
    }catch (err){
        console.error(err)
    }
})

app.listen(PORT, ()=> console.log(`Server running on PORT ${PORT}`))