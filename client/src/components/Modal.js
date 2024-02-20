import {useState} from 'react'


const Modal = ({mode, setShowModal, getData, book}) => {

  const editMode = mode === 'edit' ? true : false //for date

  //crate and edit data modal
  const [data, setData] =useState({
    user_email: editMode ? book.user_email : "neha@gmail.com",
    title: editMode ? book.title : null,
    author: editMode ? book.author : null,
    isbn: editMode ? book.isbn : null,
    plot: editMode ? book.plot : null,
    progress:editMode ? book.progress : 1,
    date: editMode ? "" : new Date()
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
      //console.log(response)
    }catch(err) {
      console.log(err)
    }
  }


  const handleChange = (e) => {
    //console.log('changing...', e)
    const {name, value } = e.target

    setData(data => ({
      ...data,
      [name] : value
    }))

    console.log(data)
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
                value={data.title}
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
              <input className={mode} type="submit" onClick={editMode ? '': postData}/>
            </form>

        </div>
      </div>
    )
  }
  
  export default Modal
  