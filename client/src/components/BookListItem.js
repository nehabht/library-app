import CheckIcon from './CheckIcon'
import ProgressBar from './ProgressBar'
import {useState} from "react"
import Modal from './Modal'


const BookListItem = ({book, getData}) => {

  const [showModal, setShowModal] = useState(false)

  // confir or not before deleting
  const confirmDelete = () => {
    const shouldDelete = window.confirm("Are you sure you want to delete the book?");
    if (shouldDelete) {
      deleteItem();
    }
  };

  //delete book
  const deleteItem = async() => {
    try {
      const response = await fetch(`http://localhost:8000/books/${book.id}`, {
        method: 'DELETE',
      })
      console.log('Book deleted');
      if (response.status === 200) {
        getData()
      }
    } catch (err) {
      console.error(err);
    }
  };



    return (
      <li className="list-item">
        <div className="info-container">
          <CheckIcon/>
          <p className="book-title">{book.title}</p>
          <ProgressBar/>
        </div>

        <div className='button-container'>
        <button className="edit" onClick={() => setShowModal(true)}>EDIT</button>
        <button className="delete" onClick={confirmDelete}>DELETE</button>
      </div>

        {showModal && <Modal mode={'edit'} setShowModal={setShowModal} getData={getData} book={book} />}
        
      </li>
    )
  }
  
  export default BookListItem
  