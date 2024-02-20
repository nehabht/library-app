import CheckIcon from './CheckIcon'
import ProgressBar from './ProgressBar'
import {useState} from "react"
import Modal from './Modal'


const BookListItem = ({book, getData}) => {

  const [showModal, setShowModal] = useState(false)

    return (
      <li className="list-item">
        <div className="info-container">
          <CheckIcon/>
          <p className="book-title">{book.title}</p>
          <ProgressBar/>
        </div>

        <div className='button-container'>
          <button className="edit" onClick={() => setShowModal(true)}>EDIT</button>
          <button className="delete">DELETE</button>
        </div>

        {showModal && <Modal mode={'edit'} setShowModal={setShowModal} getData={getData} book={book} />}
        
      </li>
    )
  }
  
  export default BookListItem
  