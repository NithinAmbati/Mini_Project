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
import StudentProfile from "./pages/Students/StudentProfile";
import DetailedJobDescription from "./pages/DetailedDescription";
import SalaryGuide from "./pages/Students/SalaryGuide";
import CompanyReviews from "./pages/Students/CompanyReviews";
import Footer from "./layouts/Footer";
import JobPostingHomePage from "./pages/Employees/JobPostingHomePage";
import EmployerProfile from "./pages/Employees/Employerprofile";
import Header from "./layouts/Header";

const EmployerHeaderContent = [
  {
    title: "Post Job",
    link: "/jobs/posting",
  },
  {
    title: "Company Reviews",
    link: "/employer/company-reviews",
  },
  {
    title: "Profile",
    link: "/employer/profile",
  },
  {
    title: "Logout",
    link: "/",
  },
];

const StudentHeaderContent = [
  {
    title: "Company Reviews",
    link: "/student/company-reviews",
  },
  {
    title: "Salary Guide",
    link: "/salary-guide",
  },
  {
    title: "Profile",
    link: "/student/profile",
  },
  {
    title: "Logout",
    link: "/",
  },
];

const headerContent = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "Employer Login",
    link: "/employer/login",
  },
  {
    title: "Candidate Login",
    link: "/student/login",
  },
];

function App() {
  const location = useLocation();

  const employerRoutes = [
    "/employer/login",
    "/employer/signup",
    "/employer",
    "/jobs/posting",
    "/jobs/posting/post",
    "/employer/profile",
    "/employer/company-reviews",
  ];

  const studentRoutes = [
    "/student/login",
    "/student/signup",
    "/student",
    "/student/profile",
    "/student/salary-guide",
  ];

  const AuthenticateRoutes = [
    "/student/login",
    "/student/signup",
    "/employer/login",
    "/employer/signup",
  ];

  const isEmployerRoute = employerRoutes.includes(location.pathname);
  const isStudentRoute = studentRoutes.includes(location.pathname);

  return (
    <div>
      {isEmployerRoute && <Header headerContent={EmployerHeaderContent} />}
      {isStudentRoute && <Header headerContent={StudentHeaderContent} />}
      {!isEmployerRoute && !isStudentRoute && (
        <Header headerContent={headerContent} />
      )}

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/student/login" element={<CandidateLogin />} />
        <Route exact path="/student/signup" element={<CandidateSignUp />} />
        <Route exact path="/employer/login" element={<EmployerLogin />} />
        <Route exact path="/employer/signup" element={<EmployerSignUp />} />
        <Route exact path="/employer" element={<EmployerHome />} />
        <Route exact path="/student" element={<StudentHome />} />
        <Route exact path="/jobs/:id" element={<DetailedJobDescription />} />
        <Route exact path="/jobs/posting" element={<JobPostingHomePage />} />
        <Route exact path="/jobs/posting/post" element={<AddJob />} />
        <Route exact path="/employer/profile" element={<EmployerProfile />} />
        <Route exact path="/student/profile" element={<StudentProfile />} />
        <Route exact path="/student/salary-guide" element={<SalaryGuide />} />
        <Route
          exact
          path="/student/company-reviews"
          element={<CompanyReviews />}
        />
        <Route
          exact
          path="/employer/company-reviews"
          element={<CompanyReviews />}
        />
      </Routes>
      {!AuthenticateRoutes.includes(location.pathname) && <Footer />}
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
