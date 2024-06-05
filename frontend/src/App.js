import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";
import Home from "./Home";
import AddJob from "./AddJobs";
import Profile from "./Profile";
import DetailedJobDescription from "./DetailedDescription";
import SalaryGuide from "./SalaryGuide";
import CompanyReviews from "./CompanyReviews";
import Footer from "./Footer";
import Header from "./Header";
import JobPostingHomePage from "./JobPostingHomePage";

function App() {
  const location = useLocation();
  const hideHeaderRoutes = ["/login", "/sign-up"];

  return (
    <div>
      {!hideHeaderRoutes.includes(location.pathname) && <Header />}
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/sign-up" element={<SignUp />} />
        <Route exact path="/" element={<Home />} />
        <Route exact path="/jobs/:id" element={<DetailedJobDescription />} />
        <Route exact path="/job-posting" element={<JobPostingHomePage />} />
        <Route exact path="/post-jobs" element={<AddJob />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/salary-guide" element={<SalaryGuide />} />
        <Route exact path="/company-reviews" element={<CompanyReviews />} />
      </Routes>
      {!hideHeaderRoutes.includes(location.pathname) && <Footer />}
    </div>
  );
}

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default AppWrapper;
