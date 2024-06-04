import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import {
  BrowserRouter,
  Switch as Routes,
  Route,
  useLocation,
} from "react-router-dom";
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

function App() {
  const location = useLocation();
  const hideHeaderRoutes = ["/login", "/sign-up"];

  return (
    <div>
      {!hideHeaderRoutes.includes(location.pathname) && <Header />}
      <Routes>
        <Route exact path="/login" component={Login} />
        <Route exact path="/sign-up" component={SignUp} />
        <Route exact path="/" component={Home} />
        <Route exact path="/jobs/:id" component={DetailedJobDescription} />
        <Route exact path="/post-jobs" component={AddJob} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/salary-guide" component={SalaryGuide} />
        <Route exact path="/company-reviews" component={CompanyReviews} />
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
