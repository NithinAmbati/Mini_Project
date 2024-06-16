import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import "./index.css";

const EmployerProfile = () => {
  const jwtToken = Cookies.get("jwt_token");
  const [userData, setUserData] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const getUserData = useCallback(async () => {
    const options = {
      method: "GET",
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
    };
    const response = await fetch(
      "https://careerconnect-apis-cqaklzs35-nithin-ambatis-projects.vercel.app/profile/employer",
      options
    );
    if (response.ok) {
      const data = await response.json();
      setUserData(data);
    }
  }, [jwtToken]);

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  if (jwtToken === undefined) {
    return <Navigate to="/employer/login" />;
  }

  return (
    <div className="profile-page-bg-container">
      <div className="profile-page-container">
        <div>
          <h2>Employer Profile</h2>
          <div>
            <strong>Username:</strong> {userData.username}
          </div>
          <div>
            <strong>Email:</strong> {userData.email}
          </div>
          <div>
            <strong>Company Name:</strong> {userData.companyName}
          </div>
          <div>
            <strong>Current JobRole :</strong> {userData.currentJobRole}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerProfile;
