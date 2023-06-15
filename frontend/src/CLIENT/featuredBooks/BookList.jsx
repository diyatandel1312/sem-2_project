import React from 'react'
import { backend_server } from '../../main'

const BookList = (props) => {
  const { books } = props
  return (
    <div className='row'>
      {books.map((book) => {
        const { _id, title, image, author } = book
        const imgSrc = `${backend_server}/${image}`
        return (
          <div
            className='col-xxl-2 col-lg-3 col-md-4 col-sm-4 col-6 gy-3 '
            key={_id}
          >
            <div className='card h-100'>
              <div className='card-img-top'>
                <img
                  style={{
                    height: '100%',
                    width: '100%',
                  }}
                  className='img-fluid'
                  src={imgSrc}
                  alt='book image'
                />{' '}
              </div>
              <div className='card-body'>
                <h5 className='h5 card-title'>{title}</h5>
                <p className='p card-text'>{author}</p>
                <div className='form-group mb-2 justify-content-center d-flex'>
                  <button type='button' className='btn btn-primary me-2'>
                    Buy
                  </button>
                  <button type='button' className='btn btn-secondary me-2'>
                    View
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default BookList
