
import BookListHeader from './components/BookListHeader'
import BookListItem from './components/BookListItem'
import { useEffect, useState } from 'react'



const App = () => {

  const userEmail = 'neha@gmail.com'
  const [books, setBooks ] = useState(null)

  //get data
  const getData = async () => {

    try {
      const response = await fetch(`http://localhost:8000/books/${userEmail}`)
      const json = await response.json()
      //console.log(json)
      setBooks(json)
    }catch (err) {
      console.error(err)
    }
  }

  useEffect(() => getData, [])
  
  console.log(books)

  //Sort books by date
  const sortedBooks = books?.sort((b,a) => new Date(a.date) - new Date(b.date))




  return (
    <div className="app">
      <BookListHeader listName={'Book List '} getData={getData}/>
      {sortedBooks?.map((book) => <BookListItem key={book.id} book={book} getData={getData}/>)}
    </div>
  )
}

export default App
