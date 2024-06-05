import { useState } from "react";
import Modal from "react-bootstrap/Modal";

function EmailVerification() {
  const [show, setShow] = useState(true);
  const [email, setEmail] = useState("");
  const [displayOtp, setDisplayOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  const handleSendOtp = async () => {
    try {
      await fetch("http://localhost:8000/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      setDisplayOtp(true);
    } catch (error) {
      setMessage("Error sending OTP");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await fetch("http://localhost:8000/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });
      if (response.ok) setShow(false);
      else setMessage("*Invalid otp");
    } catch (error) {
      setMessage("Error verifying OTP");
    }
  };

  return (
    <>
      <Modal show={show} backdrop="static" keyboard={false}>
        <h3 className="m-3">
          Verify Your Identity with your Organization's Email
        </h3>
        <Modal.Body>
          <div>
            <h4>OTP Verification</h4>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
            />
            <button onClick={handleSendOtp} className="btn btn-primary mb-2">
              Send OTP
            </button>
            <br />
            {displayOtp && (
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="form-control"
              />
            )}
            {displayOtp && (
              <button
                onClick={handleVerifyOtp}
                className="btn btn-primary my-2"
              >
                Verify OTP
              </button>
            )}
            <p className="text-sm text-red-700">{message}</p>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EmailVerification;
