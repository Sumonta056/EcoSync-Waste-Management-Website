import styles from "./Dashboard.module.css";

import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className={styles.Dashboard}>
      <header>
        <div className={styles["welcome-text"]}>
          <h1>
            <span>EcoSync</span>
          </h1>
          <h2>
            Revolutionizing <span>Waste Management</span> in Dhaka
             {" "}<span>North City Corporation</span>
          </h2>

          <div className={styles["buttons-reg"]}>
            <Link to="/registration" className={styles["a"]}>
              Admin Registraton
            </Link>
            <Link to="/login" className={styles["a"]}>
              User Login
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Dashboard;
