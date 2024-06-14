import Cookies from "js-cookie";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useEffect, useState, useCallback } from "react";
import "./index.css";

const EmployerProfile = () => {
  const jwtToken = Cookies.get("jwt_token");
  const [profile, setProfile] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const getUserData = useCallback(async () => {
    const options = {
      method: "GET",
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
    };
    const response = await fetch(
      "http://localhost:8000/profile/student",
      options
    );
    if (response.ok) {
      const data = await response.json();
      setProfile(data);
    }
  }, [jwtToken]);

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      minHeight: "40px",
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "#e7f3ff",
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "#007bff",
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: "#007bff",
      ":hover": {
        backgroundColor: "#007bff",
        color: "white",
      },
    }),
  };

  const animatedComponents = makeAnimated();

  const options = [
    { value: "C Programming", label: "C Programming" },
    { value: "C++", label: "C++" },
    { value: "Java", label: "Java" },
    { value: "Python", label: "Python" },
    { value: "JavaScript", label: "JavaScript" },
    { value: "Ruby", label: "Ruby" },
  ];

  const [skills, setSkills] = useState([
    { value: "C Programming", label: "C Programming" },
    { value: "Java", label: "Java" },
  ]);
  const [selectedOptions, setSelectedOptions] = useState(skills);

  //Jobs
  const jobs = [
    { value: "C Programming", label: "C Programming" },
    { value: "C++", label: "C++" },
    { value: "Java", label: "Java" },
    { value: "Python", label: "Python" },
    { value: "JavaScript", label: "JavaScript" },
    { value: "Ruby", label: "Ruby" },
  ];

  const [job, setJobs] = useState([
    { value: "C Programming", label: "C Programming" },
    { value: "Java", label: "Java" },
  ]);
  const [selectedJobs, setSelectedJob] = useState(jobs);

  //Qualification
  const qualification = [
    { value: "C Programming", label: "C Programming" },
    { value: "C++", label: "C++" },
    { value: "Java", label: "Java" },
    { value: "Python", label: "Python" },
    { value: "JavaScript", label: "JavaScript" },
    { value: "Ruby", label: "Ruby" },
  ];

  const [qualifications, setQualification] = useState([
    { value: "C Programming", label: "C Programming" },
    { value: "Java", label: "Java" },
  ]);
  const [selectedQualification, setSelectedQualification] =
    useState(qualification);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setSkills(selectedOptions);
    setJobs(selectedJobs);
    setQualification(selectedQualification);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setSelectedOptions(skills);
    setSelectedJob(jobs);
    setSelectedQualification(qualification);
    setIsEditing(false);
  };

  const handleSkillsChange = (selected) => {
    setSelectedOptions(selected || []);
  };

  const handleJobsChange = (selected) => {
    setSelectedOptions(selected || []);
  };

  const handleQualificationChange = (selected) => {
    setSelectedOptions(selected || []);
  };

  // username: { type: String, required: true },
  // password: { type: String, required: true },
  // email: { type: String, required: true, unique: true },
  // skills: { type: Array, required: false },
  // resume: { type: String, required: false },
  // education: { type: String, required: false },
  // experience: { type: String, required: false },
  // Adress: { type: String, required: false },
  // contactNumber: { type: String, required: false },
  // qualifications: { type: Array, required: false },
  // jobsApplied: { type: Array, required: false },

  return (
    <div className="profile-page-bg-container">
      <div className="profile-page-container">
        <div className="user-profile">
          <h2>Candidate Profile</h2>
          <div className="info-section">
            <p>
              <strong>Username:</strong>{" "}
              {isEditing ? (
                <input
                  type="text"
                  name="username"
                  value={profile.username}
                  onChange={handleInputChange}
                />
              ) : (
                profile.username
              )}
            </p>
            <p>
              <strong>Email:</strong>{" "}
              {isEditing ? (
                <input
                  type="text"
                  name="email"
                  value={profile.email}
                  onChange={handleInputChange}
                />
              ) : (
                profile.email
              )}
            </p>
            <p>
              <strong>Address:</strong>{" "}
              {isEditing ? (
                <input
                  type="text"
                  name="address"
                  value={profile.address}
                  onChange={handleInputChange}
                />
              ) : (
                profile.address
              )}
            </p>

            <p>
              <strong>Number:</strong>{" "}
              {isEditing ? (
                <input
                  type="text"
                  name="number"
                  value={profile.number}
                  onChange={handleInputChange}
                />
              ) : (
                profile.number
              )}
            </p>
            <p>
              <strong>Experience:</strong>{" "}
              {isEditing ? (
                <input
                  type="text"
                  name="experience"
                  value={profile.experience}
                  onChange={handleInputChange}
                />
              ) : (
                profile.experience
              )}
            </p>
            <p>
              <strong>Skills:</strong>
              {!isEditing ? (
                <ul className="list">
                  {skills.map((skill) => (
                    <li key={skill.value}>{skill.label}</li>
                  ))}
                </ul>
              ) : (
                <div>
                  <Select
                    components={animatedComponents}
                    isMulti
                    options={options}
                    value={selectedOptions}
                    onChange={handleSkillsChange}
                    styles={customStyles}
                    placeholder="Select skills..."
                  />
                </div>
              )}
            </p>
            <p>
              <strong>Jobs:</strong>
              {!isEditing ? (
                <ul className="list">
                  {job.map((job) => (
                    <li key={job.value}>{job.label}</li>
                  ))}
                </ul>
              ) : (
                <div>
                  <Select
                    components={animatedComponents}
                    isMulti
                    options={jobs}
                    value={selectedJobs}
                    onChange={handleJobsChange}
                    styles={customStyles}
                    placeholder="Jobs"
                  />
                </div>
              )}
            </p>
            <p>
              <strong>Qualification:</strong>
              {!isEditing ? (
                <ul className="list">
                  {qualifications.map((qualification) => (
                    <li key={qualification.value}>{qualification.label}</li>
                  ))}
                </ul>
              ) : (
                <div>
                  <Select
                    components={animatedComponents}
                    isMulti
                    options={qualifications}
                    value={selectedQualification}
                    onChange={handleQualificationChange}
                    styles={customStyles}
                    placeholder="Qualifications"
                  />
                </div>
              )}
            </p>
          </div>
          {!isEditing && <button onClick={handleEdit}>Edit</button>}
          {isEditing && (
            <div>
              <button
                onClick={handleSave}
                style={{
                  backgroundColor: "green",
                }}
              >
                Save
              </button>

              <button
                style={{
                  backgroundColor: "#6c757d",
                }}
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployerProfile;
