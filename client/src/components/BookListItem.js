import CheckIcon from './CheckIcon'
import ProgressBar from './ProgressBar'


const BookListItem = ({book}) => {
    return (
      <li className="list-item">
        <div className="info-container">
          <CheckIcon/>
          <p className="book-title">{book.title}</p>
          <ProgressBar/>
        </div>

        <div className='button-container'>
          <button className="edit">EDIT</button>
          <button className="delete">DELETE</button>
        </div>
        
      </li>
    )
  }
  
  export default BookListItem
  