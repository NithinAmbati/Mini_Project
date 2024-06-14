import Cookies from "js-cookie";
import { useEffect, useState, useCallback } from "react";

const EmployerProfile = () => {
  const jwtToken = Cookies.get("jwt_token");
  const [userData, setUserData] = useState({});

  const getUserData = useCallback(async () => {
    const options = {
      method: "GET",
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
    };
    const response = await fetch(
      "http://localhost:8000/profile/employer",
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

  return (
    <div className="profile-page-bg-container">
      <div className="profile-page-container">
        <div>
          <h1>{userData.username}</h1>
        </div>
      </div>
    </div>
  );
};

export default EmployerProfile;
