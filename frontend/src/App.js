import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import CandidateLogin from "./pages/Students/CandidateLogin";
import CandidateSignUp from "./pages/Students/CandidateSignUp";
import EmployerLogin from "./pages/Employees/EmployerLogin";
import EmployerSignUp from "./pages/Employees/EmployerSignUp";
import EmployerHome from "./pages/Employees/EmployerHome";
import StudentHome from "./pages/Students/StudentHome";
import Home from "./pages/Home";
import AddJob from "./pages/Employees/AddJobs";
import Profile from "./pages/Profile";
import DetailedJobDescription from "./pages/DetailedDescription";
import SalaryGuide from "./pages/Students/SalaryGuide";
import CompanyReviews from "./pages/Students/CompanyReviews";
import Footer from "./layouts/Footer";
import Header from "./layouts/Header";
import JobPostingHomePage from "./pages/Employees/JobPostingHomePage";

function App() {
  const location = useLocation();
  const hideHeaderRoutes = [
    "/login/student",
    "/signup/student",
    "/login/employer",
    "/signup/employer",
  ];

  return (
    <div>
      {/* {!hideHeaderRoutes.includes(location.pathname) && <Header />} */}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login/student" element={<CandidateLogin />} />
        <Route exact path="/signup/student" element={<CandidateSignUp />} />
        <Route exact path="/login/employer" element={<EmployerLogin />} />
        <Route exact path="/signup/employer" element={<EmployerSignUp />} />
        <Route exact path="/employer" element={<EmployerHome />} />
        <Route exact path="/student" element={<StudentHome />} />
        <Route exact path="/jobs/:id" element={<DetailedJobDescription />} />
        <Route exact path="/job/posting" element={<JobPostingHomePage />} />
        <Route exact path="/job/posting/post" element={<AddJob />} />
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
