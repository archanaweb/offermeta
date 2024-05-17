import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const OfferDescriptionModal = (props)=> {

    return (
      <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
         Offer Description
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div className="postbackUrl">
                     {/* <p>{props?.offerDesc}</p> */}
                     <span className='hide-toolbar'>
                        <CKEditor
                            editor={ClassicEditor}
                            data={props?.offerDesc}
                            disabled
                            onReady={(editor) => {
                        }} />
                      </span>
          </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
    )
}

export default OfferDescriptionModal