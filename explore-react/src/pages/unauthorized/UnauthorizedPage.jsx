import { Link } from "react-router-dom";

const Unauthorized = () => (
  <div>
    <h1>Unauthorized page</h1>
    <Link to="/login">Go back to login.</Link>
  </div>
);

export default Unauthorized;
