import { Link } from "react-router-dom";
import styles from "./styles/Landing.module.css";

const Landing = () => {
  return (
    <div>
      <main className="container">
        <p>Welcome!</p>
        <h1 className={styles.title}>PUPPY CATALOG AND BEYOND</h1>
        <p>Find a puppy you like and add it to your collection</p>
        <div className={styles.nums}></div>
        <Link to="/dogs">Take Me!</Link>
      </main>
      <footer className="footer">Made with 💛 by Patricio Stickar</footer>
    </div>
  );
};

export default Landing;
