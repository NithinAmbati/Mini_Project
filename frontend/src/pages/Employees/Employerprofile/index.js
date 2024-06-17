import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import "./index.css";
import { Spin } from "antd";

const EmployerProfile = () => {
  const jwtToken = Cookies.get("jwt_token");
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const getUserData = useCallback(async () => {
    const options = {
      method: "GET",
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
    };
    const response = await fetch(
      "https://careerconnect-apis.vercel.app/profile/employer",
      options
    );
    if (response.ok) {
      const data = await response.json();
      setUserData(data);
      setIsLoading(false);
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
      {isLoading ? (
        <Spin />
      ) : (
        <div className="profile-page-container">
          <h2>Employer Profile</h2>
          <hr />
          <div>
            <strong>Username:</strong>{" "}
            {isEditing ? (
              <input
                type="text"
                name="username"
                value={userData.username || ""}
                onChange={(e) =>
                  setUserData({ ...userData, username: e.target.value })
                }
              />
            ) : (
              userData.username
            )}
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
          {isEditing ? (
            <button onClick={() => setIsEditing(false)}>Save</button>
          ) : (
            <button onClick={() => setIsEditing(true)}>Edit</button>
          )}
        </div>
      )}
    </div>
  );
};

export default EmployerProfile;
