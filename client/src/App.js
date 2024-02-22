
import BookListHeader from './components/BookListHeader'
import BookListItem from './components/BookListItem'
import Auth from './components/Auth'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';



const App = () => {

  const [cookies, setCookies, removeCookie] =useCookies(null)
  const authToken = cookies.AuthToken
  const userEmail = cookies.Email
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


  //get data only if token exists
  useEffect(() => {
    if(authToken) {
      getData()
    }
  }, [])
  
  console.log(books)

  //Sort books by date
  const sortedBooks = books?.sort((b,a) => new Date(a.date) - new Date(b.date))


  return (
    <div className="app">
       {/* if authToken doesnt exists show login or signup  */}
      {!authToken && <Auth/>}

      {authToken &&
      <>
        <BookListHeader listName={'Book List '} getData={getData}/>
        {sortedBooks?.map((book) => <BookListItem key={book.id} book={book} getData={getData}/>)}
      </>}
    </div>
  )
}

export default App
