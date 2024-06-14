import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const Profile = () => {
  const jwtToken = Cookies.get("jwt_token");
  const [userData, setUserData] = useState({});

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const options = {
      method: "GET",
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
    };
    const response = await fetch("http://localhost:8000/profile", options);
    console.log(response);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setUserData(data);
    }
  };

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

export default Profile;
