import "bootstrap/dist/css/bootstrap.min.css";
import "./css/Footer.css";

function Footer() {
  return (
    <footer
      id="sticky-footer"
      className="flex-shrink-0 py-4 bg-dark text-white-50 mt-auto"
    >
      <div className="container text-center">
        <small>Copyright &copy; User Management System</small>
      </div>
    </footer>
  );
}

export default Footer;
