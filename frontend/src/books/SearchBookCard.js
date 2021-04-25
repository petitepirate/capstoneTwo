import React from "react";
import { useState } from 'react';
import { useHistory } from "react-router-dom";
// import { Link} from "react-router";
// import props from 'prop-types';
import { Card, CardTitle, CardImg, CardBody, Button, Modal } from 'reactstrap';


const SearchBookCard = ({
  thumbnail,
  title,
  pageCount,
  language,
  description,
  authors,
  publisher,
  previewLink,
  infoLink, 
  props
}) => {
  // States
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const history = useHistory();
  
  const [targetBook, settargetBook] = useState({title, authors, description, thumbnail});
  // const log = () => console.log({title}, {authors}, {description}, {thumbnail} );
  const redirect = (e) => {
      // setCard(title, authors, description, thumbnail);
      settargetBook({title, authors, description, thumbnail});
      // console.log(targetBook);
        // let targetTitle = targetBook.title;
        // console.log(targetTitle);
        history.push({
        pathname: "/addsearchbook",
        state: { title: `${targetBook.title}`}});
        // history.push('/addbook', { title: `${targetTitle}`})

  }

  const log = () => {
    settargetBook({title, authors, description, thumbnail});
    console.log(targetBook);
    console.log(targetBook.title);
    console.log(targetBook.authors);
    console.log(targetBook.description);
    console.log(targetBook.thumbnail);

  }

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
              <p>Page Count: {pageCount}</p>
              <p>Language : {language}</p>
              <p>Authors : {authors.join(', ')}</p>
              <p>Publisher : {publisher}</p>
            </div>
          </div>
          <div className='mt-3'>{description}</div>
        </div>
        <div className='modal-footer'>
          <div className='left-silde'>
            <a
              href={previewLink}
              className='btn-link'
              color='default'
              type='button'
              target='_blank'
              rel='noopener noreferrer'
            >
              Preview Link
            </a>
          </div>
          <div className='divider'></div>
          <div className='right-silde'>
            <a
              href={infoLink}
              className='btn-link'
              color='default'
              type='button'
              target='_blank'
              rel='noopener noreferrer'
            >
              Info Link
            </a>
          </div>
          <div className='divider'></div>
          <div>
          {/* <a href='/addbook' color='secondary' onClick={log} >Add to Bookshelf
              </a> */}
              <button onClick={log}>Log?</button>
                <button
                    className="btn btn-primary float-right"
                    onClick={redirect}
                    data={targetBook}
                >
                  Add to Shelf
                </button>
          </div>
        </div>
      </Modal>
    </Card>
  );
};

export default SearchBookCard;

