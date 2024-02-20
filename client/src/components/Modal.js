import {useState} from 'react'


const Modal = ({mode, setShowModal, book}) => {

  const editMode = mode === 'edit' ? true : false //for date


  const [data, setData] =useState({
    user_mail: editMode ? book.user_email : null,
    title: editMode ? book.title : null,
    author: editMode ? book.author : null,
    isbn: editMode ? book.isbn : null,
    plot: editMode ? book.plot : null,
    progress:editMode ? book.progress : 1,
    date: editMode ? "" : new Date()
  })


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

              <input className={mode} type="submit"/>
            </form>

        </div>
      </div>
    )
  }
  
  export default Modal
  