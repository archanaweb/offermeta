import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import BASE_URL from '../Api/base';
import { useNavigate } from 'react-router-dom';

const PostbackUrlModal = (props)=> {

    return (
        <Modal
        {...props}
        size="l"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
           Postback Url
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="postbackUrl">
                       <p>{props.postbackUrl}</p>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
}

export default PostbackUrlModal