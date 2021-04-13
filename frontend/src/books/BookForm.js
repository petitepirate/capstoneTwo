
import React, { useState} from "react";
// import Alert from "../common/Alert";
// import JoblyApi from "../api/api";
// import UserContext from "../auth/UserContext";
// import { useState } from 'react';
// import { Card, CardTitle, CardImg, CardBody, Button, Modal } from 'reactstrap';
// eslint-disable-next-line
// import useTimedMessage from "../hooks/useTimedMessage";



function BookForm({
    thumbnail,
    title,
    description,
    authors,

  }) {
//   const { currentUser, setCurrentUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    bookTitle: title,
    bookAuthor: authors,
    bookDescrip: description,
    bookCover: thumbnail
  });
  const [formErrors, setFormErrors] = useState([]);

  // switch to use our fancy limited-time-display message hook
  const [saveConfirmed, setSaveConfirmed] = useState(false);
  // const [saveConfirmed, setSaveConfirmed] = useTimedMessage()

  console.debug(
    //   "ProfileForm",
    //   "currentUser=", currentUser,
      "formData=", formData,
      "formErrors=", formErrors,
      "saveConfirmed=", saveConfirmed,
  );

  /** on form submit:
   * - attempt save to backend & report any errors
   * - if successful
   *   - clear previous error messages and password
   *   - show save-confirmed message
   *   - set current user info throughout the site
   */

  async function handleSubmit(evt) {
    evt.preventDefault();

    // let profileData = {
    //   firstName: formData.firstName,
    //   lastName: formData.lastName,
    //   email: formData.email,
    //   password: formData.password,
    // };

    // let username = formData.username;
    // let updatedUser;

    // try {
    //   updatedUser = await JoblyApi.saveProfile(username, profileData);
    // } catch (errors) {
    //   debugger;
    //   setFormErrors(errors);
    //   return;
    // }

    setFormData(f => ({ ...f, password: "" }));
    setFormErrors([]);
    setSaveConfirmed(true);

    // trigger reloading of user information throughout the site
    // setCurrentUser(updatedUser);
  }

  /** Handle form data changing */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(f => ({
      ...f,
      [name]: value,
    }));
    setFormErrors([]);
  }

  return (
      <div className="col-md-6 col-lg-4 offset-md-3 offset-lg-4">
        <h3>Book</h3>
        <div className="card">
          <div className="card-body">
            <form>
              <div className="form-group">
                <label>Title</label>
                <p className="form-control-plaintext">{formData.title}</p>
              </div>
              <div className="form-group">
                <label>Authors</label>
                <input
                    name="bookAuthors"
                    className="form-control"
                    value={formData.authors}
                    onChange={handleChange}
                />
              </div>
               <div className="form-group">
                 <label>Description</label>
                 <input
                    name="bookDescript"
                    className="form-control"
                    value={formData.description}
                    onChange={handleChange}
                />
              </div>
               <div className="form-group">
                 <label>Cover</label>
                 <input
                    name="bookCover"
                    className="form-control"
                    value={formData.thumbnail}
                    onChange={handleChange}
                />
              </div>
            {/* //   <div className="form-group">
            //     <label>Confirm password to make changes:</label>
            //     <input */}
            {/* //         type="password"
            //         name="password"
            //         className="form-control"
            //         value={formData.password}
            //         onChange={handleChange}
            //     />
            //   </div>

              {formErrors.length
                  ? <Alert type="danger" messages={formErrors} />
                  : null}

              {saveConfirmed
                  ?
                  <Alert type="success" messages={["Updated successfully."]} />
                  : null} */}

              <button
                  className="btn btn-primary btn-block mt-4"
                  onClick={handleSubmit}
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
  );
}

export default BookForm;
