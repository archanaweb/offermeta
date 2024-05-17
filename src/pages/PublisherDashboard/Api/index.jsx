import React from 'react'
import { Link } from 'react-router-dom'

function ApiKey() {
    const loggedIn = JSON.parse(localStorage.getItem('userData'))


  return (
    <div className='page_sec p-2'>
        <div className='container'>
            <div className='bg-white border p-4'>
                <p>To learn more about OffersMeta Publisher API, please click here for<Link target='_blank' to='https://offersmeta.com/publisher-api-docs'> API Dcumentation</Link></p>
                <div className='d-flex justify-content-start gap-4 align-items-center pb-5 pt-2'>
                    <h4 className='mb-0 text-secondary'>API KEY:</h4>
                    <input name='apiKey' readOnly value={loggedIn?.key} className='form-control w-50'/>
                </div>
                <div>
                    <p><strong>Get All Campaigns/Offers API Request </strong> - <Link target='_blank' to={`https://apiv2.offersmeta.in/offer/api?partners_Id=${loggedIn?.partners_Id}&publisherId=${loggedIn.publisherId}&Key=${loggedIn?.key}`}>{`https://apiv2.offersmeta.in/offer/api?partners_Id=${loggedIn?.partners_Id}&publisherId=${loggedIn.publisherId}&key=${loggedIn?.key}`}</Link></p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ApiKey