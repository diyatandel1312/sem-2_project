import React, { useEffect, useState } from 'react'
import { backend_server } from '../../main'
import axios from 'axios'
import { Toaster, toast } from 'react-hot-toast'

const ClientDashboard = ({ userBookData }) => {
  const DELETE_BOOK_API = `${backend_server}/api/v1/requestBooks`

  const handleRemoveBook = async (transactionId) => {
    try {
      const response = await axios.patch(DELETE_BOOK_API, {
        id: transactionId,
        issueStatus: 'DELETE',
      })

      console.log(response)
      toast.success('Cancel Success')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='container my-3'>
      <Toaster />
      {/* User Books data table */}
      {userBookData.length > 0 ? (
        <div className='row my-4'>
          <table className='table table-hover'>
            <thead>
              <tr>
                <th scope='col'>#</th>
                <th scope='col'>Book Title</th>
                <th scope='col'>Issue Status</th>
                <th scope='col'>Issue Date</th>
                <th scope='col'> Return Due</th>
                <th scope='col'> Returned Status</th>
                <th scope='col'>Extra Charge</th>
                {/* <th scope='col'>Update</th> */}
              </tr>
            </thead>
            <tbody>
              {userBookData &&
                userBookData.map((users, index) => {
                  const {
                    bookTitle,
                    _id,
                    issueStatus,
                    isReturned,
                    extraCharge,
                    issueDate,
                    returnDate,
                  } = users

                  const bookissuedate = new Date(issueDate).toDateString()

                  const returnOrNot = isReturned === true ? 'True' : 'False'

                  const updatedReturnDate =
                    returnDate === null
                      ? 'NONE'
                      : new Date(returnDate).toDateString()
                  return (
                    <tr key={_id}>
                      <th scope='row'>{index + 1}</th>
                      <td>{bookTitle}</td>
                      <td>{issueStatus}</td>
                      <td>{bookissuedate}</td>
                      <td>{updatedReturnDate}</td>
                      <td>{returnOrNot}</td>
                      <td>Nrs.{extraCharge} /-</td>
                      {issueStatus === 'PENDING' || issueStatus === 'READY' ? (
                        <td>
                          <button
                            className='btn btn-danger'
                            onClick={() => handleRemoveBook(_id)}
                          >
                            Cancel
                          </button>
                        </td>
                      ) : (
                        ''
                      )}
                    </tr>
                  )
                })}
            </tbody>
          </table>
        </div>
      ) : (
        <p className='p text-center mt-4'>0 Book Data</p>
      )}
    </div>
  )
}

export default ClientDashboard
