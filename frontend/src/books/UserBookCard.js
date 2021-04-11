import React from "react";
// import { Link } from "react-router-dom";
import { useState } from 'react';
import { Card, CardTitle, CardImg, CardBody, Button, Modal } from 'reactstrap';


const UserBookCard = ({
  thumbnail,
  title,
  pageCount,
  language,
  description,
  authors,
  publisher,
  previewLink,
  personalReview,
  category,
  infoLink
}) => {
  // States
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const log = () => console.log({title}, {authors}, {description}, {thumbnail} );

  return (
    <Card style={{ width: '233px' }} className='m-auto '>
      <CardImg
        top
        style={{ width: '100%', height: '233px' }}
        src={thumbnail}
        alt={title}
      />
      <CardBody>
        <CardTitle className='card-title'>{title}</CardTitle>
        <Button onClick={toggle}>More info</Button>
      </CardBody>
      <Modal isOpen={modal} toggle={toggle}>
        <div className='modal-header d-flex justify-content-center'>
          <h5 className='modal-title text-center' id='exampleModalLabel'>
            {title}
          </h5>
          <button
            aria-label='Close'
            className='close'
            type='button'
            onClick={toggle}
          >
            <span aria-hidden={true}>X</span>
          </button>
        </div>
        <div className='modal-body'>
          <div className='d-flex justify-content-between ml-3'>
            <img src={thumbnail} alt={title} style={{ height: '233px' }} />
            <div>
              <p>Authors : {authors}</p>
              <p>Category : {category}</p>

            </div>
          </div>
          <div className='mt-3'><p>Publisher's Description: {description}</p></div>
          <div className='mt-3'><p>Persional Review: {personalReview}</p></div>
        </div>
        <div className='modal-footer'>

          <div className='divider'></div>
          <div>
          {/* <a href='/addbook' color='secondary' onClick={log} >Add to Bookshelf
              </a> */}
                <button
                    className="btn btn-primary float-right"
                    onClick={log}
                >
                  Edit
                </button>
          </div>
        </div>
      </Modal>
    </Card>
  );
};

export default UserBookCard;

