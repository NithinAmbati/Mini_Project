import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import "./index.css";

const Applications = () => {
  const { id } = useParams();
  const jwtToken = Cookies.get("jwt_token");
  const [applicationsList, setApplicationsList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedResume, setSelectedResume] = useState("");

  useEffect(() => {
    getApplicationsList();
  }, []);

  const getApplicationsList = async () => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${jwtToken}`,
      },
    };
    const response = await fetch(
      `http://localhost:8000/employer/jobs/posted/${id}`,
      options
    );
    const applications = await response.json();
    setApplicationsList(applications);
  };

  const handleViewResume = (resume) => {
    setSelectedResume(resume);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedResume("");
  };

  return (
    <div>
      <h1>Applications</h1>
      {applicationsList.length > 0 ? (
        <table className="applications-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Contact Number</th>
              <th>Resume</th>
            </tr>
          </thead>
          <tbody>
            {applicationsList.map((application) => (
              <tr key={application._id}>
                <td>{application.username}</td>
                <td>{application.email}</td>
                <td>{application.contactNumber}</td>
                <td>
                  <button
                    className="view-resume-button"
                    onClick={() => handleViewResume(application.resume)}
                  >
                    View Resume
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h1>No applications found</h1>
      )}

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={handleCloseModal}>
              &times;
            </span>
            <img src={selectedResume} alt="Resume" className="resume-image" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Applications;
