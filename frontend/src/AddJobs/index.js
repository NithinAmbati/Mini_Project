import Header from "../Header";
import "./index.css";

const AddJob = () => {
  return (
    <div className="addjob-page-bg-container">
      <Header />
      <div className="addjob-page-container">
        <form className="form-container">
          <label>Company Name:</label>
          <input type="text" />
          <label>Job Location</label>
          <input type="text" />
          <label>Job Role:</label>
          <input type="text" />
          <label>Mode</label>
          <input type="text" />
          <label>Stipend</label>
          <input type="text" />
          <label>Job Description:</label>
          <input type="text" />
          <button type="submit" className="btn btn-dark">
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddJob;
