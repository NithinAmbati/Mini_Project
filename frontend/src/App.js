import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Switch as Routes, Route } from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";
import Home from "./Home";
import Jobs from "./Jobs";
import AddJob from "./AddJobs";
import Profile from "./Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" component={Login} />
        <Route exact path="/sign-up" component={SignUp} />
        <Route exact path="/" component={Home} />
        <Route exact path="/jobs" component={Jobs} />
        <Route exact path="/add-jobs" component={AddJob} />
        <Route exact path="/profile" component={Profile}/>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
