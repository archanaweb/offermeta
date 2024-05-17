import React from 'react'

function PubPayments() {
  return (
    <div className='page_sec pt-3'>
              <div className="container">
            <div className="table-container">
            <h3 className='py-2'>Billing</h3>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Invoive ID</th>
                    <th>Invoive Date</th>
                    <th>Report Range</th>
                    <th>Due Date</th>
                    <th>Payment Date</th>
                    <th>Total Amount</th>
                    <th>Status</th>
                    <th>Note</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                </tbody>
              </table>
              </div>
            </div>
            </div>
            </div>
  )
}

export default PubPayments