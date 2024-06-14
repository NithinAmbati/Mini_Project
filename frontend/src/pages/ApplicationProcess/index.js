import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const ApplicationProcess = () => {
  const { id } = useParams();
  const jwtToken = Cookies.get("jwt_token");
  const [applicationsList, setApplicationsList] = useState([]);

  useEffect(() => {
    getApplicationsList();
  }, []);

  const getApplicationsList = () => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("jwt_token")}`,
      },
    };
  };

  return (
    <div>
      <h1>Application Process</h1>
    </div>
  );
};

export default ApplicationProcess;
