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

  const toggleEditing = () => {
    setIsEditing(!isEditing);
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

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setSkills(selectedOptions);
    setIsEditing(false);
  };

  const handleSaveOptions = () => {
    setSkills(selectedOptions);
  };

  const handleCancel = () => {
    setSelectedOptions(skills);
    setIsEditing(false);
  };

  const handleChange = (selected) => {
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
                    onChange={handleChange}
                    styles={customStyles}
                    placeholder="Select skills..."
                  />
                  <div style={{ marginTop: "10px" }}>
                    <button
                      style={{
                        backgroundColor: "#007bff",
                        color: "white",
                        border: "none",
                        padding: "10px",
                        cursor: "pointer",
                        borderRadius: "4px",
                      }}
                      onClick={handleSaveOptions}
                    >
                      Save
                    </button>
                    <button
                      style={{
                        backgroundColor: "#6c757d",
                        color: "white",
                        border: "none",
                        padding: "10px",
                        cursor: "pointer",
                        borderRadius: "4px",
                        marginLeft: "10px",
                      }}
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </p>
          </div>
          {!isEditing && <button onClick={toggleEditing}>Edit</button>}
          {isEditing && (
            <button onClick={handleSave} className="save">
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployerProfile;
