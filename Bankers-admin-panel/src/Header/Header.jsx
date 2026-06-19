import logo from "../assets/logo2.png";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg py-3 navbar-light bg-primary-darker">
      <div className="container d-flex justify-content-center align-items-center">
        <a
          className="navbar-brand d-flex align-items-center gap-2"
          href="#home"
        >
          <img
            src={logo}
            alt="Company Logo"
            style={{ height: "80px", width: "auto" }}
          />
        </a>
      </div>
    </nav>
  );
};

export default Header;
