
import BookListHeader from './components/BookListHeader'
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



  return (
    <div className="app">
      <BookListHeader listName={'Books List'}/>
    </div>
  )
}

export default App
