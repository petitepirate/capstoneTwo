
import React, { useState, useContext} from "react";
// import Alert from "../common/Alert";
import BookWormApi from "../api/api";
import UserContext from "../auth/UserContext";
// import TargetBookContext from "./TargetBookContext";
// import { useHistory } from "react-router-dom";
import Alert from "../common/Alert";




function BookForm(
  {
    targetBook,
    thumbnail,
    title,
    description,
    authors,
  }
  ) {
  const { currentUser } = useContext(UserContext);
  // const {targetBook} = useContext(TargetBookContext);
  const [formData, setFormData] = useState({
    title: `${targetBook}`,
    authors: /* {authors}*/"Shenanigans",
    description: /* {description}*/"",
    personalReview: "",
    categroy: "",
    thumnnail: /* {thumbnail}*/"",
  });
  const [formErrors, setFormErrors] = useState([]);

  // switch to use our fancy limited-time-display message hook
  // const [saveConfirmed, setSaveConfirmed] = useState(false);
  // const [saveConfirmed, setSaveConfirmed] = useTimedMessage()
  const log = () => {
    
    let data = targetBook;
    console.log(data);

  }

  console.debug(
    //   "ProfileForm",
    //   "currentUser=", currentUser,
      "formData=", formData,
      "formErrors=", formErrors,
      // "saveConfirmed=", saveConfirmed,
  );

  /** on form submit:
   * - attempt save to backend & report any errors
   * - if successful
   *   - clear previous error messages and password
   *   - show save-confirmed message
   *   - set current user info throughout the site
   */
  // const log = () => console.log(formData.title, currentUser);

  async function handleSubmit(evt) {
    evt.preventDefault();

    let bookData = {
      title: formData.title,
      authors: formData.authors, 
      description: formData.description, 
      personalReview: formData.personalReview, 
      category: formData.category,
      thumbnail: formData.thumbnail, 
      username: currentUser.username,
    };
    // console.log(bookData);
    // let username = formData.username;
    // let addBook;

    try {
      await BookWormApi.saveBook(bookData);
    } catch (errors) {
      debugger;
      setFormErrors(errors);
      return;
    }

    setFormData(f => ({     title: "",
      authors: "",
      description: "",
      personalReview: "",
      categroy: "",
      thumnnail: "", }));
    setFormErrors([]);
    // setSaveConfirmed(true);

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
                 <input
                    name="title"
                    className="form-control"
                    value={formData.title}
                    onChange={handleChange}
                    />
                    </div>
              <div className="form-group">
                <label>Authors</label>
                <input
                    name="authors"
                    className="form-control"
                    value={formData.authors}
                    onChange={handleChange}
                />
              </div>
               <div className="form-group">
                 <label>Description</label>
                 <input
                    name="description"
                    className="form-control"
                    value={formData.description}
                    onChange={handleChange}
                />
              </div>
              <div className="form-group">
                 <label>Personal Review</label>
                 <input
                    name="personalReview"
                    className="form-control"
                    value={formData.personalReview}
                    onChange={handleChange}
                />
              </div>
              <div className="form-group">
                 <label>Category</label>
                 <input
                    name="category"
                    className="form-control"
                    value={formData.category}
                    onChange={handleChange}
                />
              </div>
               <div className="form-group">
                 <label>Cover</label>
                 <input
                    name="thumbnail"
                    className="form-control"
                    value={formData.thumbnail}
                    onChange={handleChange}
                />
              </div>



              {formErrors.length
                  ? <Alert type="danger" messages={formErrors} />
                  : null}

              {/* {saveConfirmed
                  ?
                  <Alert type="success" messages={["Updated successfully."]} />
                  : null}   */}

              <button
                  className="btn btn-primary btn-block mt-4"
                  onClick={handleSubmit}
              >
                Add Book
              </button>
              <button onClick={log}>Log?</button>
            </form>
          </div>
        </div>
      </div>
  );
}

export default BookForm;
