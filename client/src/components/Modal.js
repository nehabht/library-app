import {useState} from 'react'
import { useCookies } from 'react-cookie';
 

const Modal = ({mode, setShowModal, getData, book}) => {
  const [cookies, setCookies, removeCookie] =useCookies(null)
  const editMode = mode === 'edit' ? true : false //for date
  

  //crate and edit data modal
  const [data, setData] =useState({
    user_email: editMode ? book.user_email : cookies.Email,
    title: editMode ? book.title : null,
    author: editMode ? book.author : null,
    isbn: editMode ? book.isbn : null,
    plot: editMode ? book.plot : null,
    progress:editMode ? book.progress : 1,
    date: editMode ? book.date : new Date()
  })

  //send data to db
  const postData = async (e) => {
    e.preventDefault()
    try{
      const response = await fetch(`http://localhost:8000/books/`,{
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      })
      if (response.status ===201) {
        console.log("Book added successfully!")
        setShowModal(false)
        getData()
      }
    }catch(err) {
      console.log(err)
    }
  }


  //edit data
  const editData = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`http://localhost:8000/books/${book.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (response.status === 200) {
        getData()
        setShowModal(false);
        console.log('Book updated');
      }
    } catch (err) {
      console.error(err);
    }
  };

  

  const handleChange = (e) => {
    //console.log('changing...', e)
    const {name, value } = e.target

    setData(data => ({
      ...data,
      [name] : value
    }))


  }

    return (
      <div className="overlay">
        <div className="modal">
          <div className="form-title-container">
              <h3>Please {mode} your book</h3>
              <button onClick={() => setShowModal(false)}>X</button>

            </div>

            <form>
             
              <input
                required
                name="title"
                maxLength={30}
                placeholder="Book name"
                value={data.title || ""} 
                onChange={handleChange}
              />
              <br/>
              How Many Reads? {data.progress}
              <input
                required
                name="progress"
                type="range"
                min="1"
                max="100"
                value={data.progress}
                onChange={handleChange}
              />

                {/* if create mode postdata */}
              <input className={mode} type="submit" onClick={editMode ? editData: postData}/>
            </form>

        </div>
      </div>
    )
  }
  
  export default Modal
  