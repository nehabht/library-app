const PORT = process.env.PORT ?? 8000
const express = require('express')
const cors = require('cors')
const app = express()
const pool = require('./db')

app.use(cors())


// app.get('/', (req, res) => {
//     res.send('heel!')
// })

// get all books
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

app.listen(PORT, ()=> console.log(`Server running on PORT ${PORT}`))