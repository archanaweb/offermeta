import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import BASE_URL from '../Api/base';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fetchPublisherList } from '../Redux/PublisherSlice';
import { Spinner } from 'react-bootstrap';

const LinkTestingModal = (props)=> {
    const [linkUrl ,setLinkUrl] = useState('')
    const [Loading, setLoading] = useState(false)
    const [linkDetail, setLinkDetail] = useState([])
    const loggedIn = JSON.parse(localStorage.getItem('userData'))

    const handleChange = (e) => {
      setLinkUrl(e.target.value)
    };
    const handleLinkTester = async()=> {
      setLoading(true)
      try {
        const response = await fetch(`${BASE_URL}subAdmin/linkTester?url=${encodeURIComponent(linkUrl)}`)
        const data = await response.json();
        setLinkDetail(data.resposneResult)
        setLoading(false)
      } catch (error) {
        console.log('something went wrong', error)
        setLoading(false)
      }
     
  }

    return (
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
          Link Testing
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="sendMail">
                        <div className="form row">
                        <form>
                        <label class="custom-field one">
                            <input type="text" placeholder=" " name='url' className="form-control w-100" value={linkUrl} onChange={handleChange}/>
                            <span class="cstmPlaceholder">Enter Url</span>
                        </label>
                        <button type="button" className="btn btn-primary mt-4" onClick={handleLinkTester}>Run test</button>
                        </form>
                        <div className="table-responsive event-table mt-2">
                <table className="table">
                    <thead>
                        <tr>
                            <th>S.No.</th>
                            <th>Domain</th>
                            <th>Redirect URL</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                  {Loading ? <tbody>
                    <tr>
                      <td colSpan={4}>
                      <div className='spinner'>
                        <Spinner animation="border" />
                      </div>
                      </td>
                    </tr>
                    </tbody> : 
                    <tbody>
                    {linkDetail?.map((item, index)=> <tr>
                            <td>{index + 1}</td>
                            <td>{item?.Domain}</td>
                            <td>{item?.RedirectUrl}</td>
                            <td>{item?.Status}</td>
                        </tr>)}
                    </tbody>}
                </table>
            </div>
                        </div>
                        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
}

export default LinkTestingModal