import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const Applications = () => {
  const { id } = useParams();
  const jwtToken = Cookies.get("jwt_token");
  const [applicationsList, setApplicationsList] = useState([]);

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
    console.log(applications);
  };

  return (
    <div>
      <h1>Applications</h1>
      {applicationsList.length > 0 ? (
        applicationsList.map((application) => (
          <div key={application}>
            <h1>{application}</h1>
          </div>
        ))
      ) : (
        <h1>No applications found</h1>
      )}
    </div>
  );
};

export default Applications;
