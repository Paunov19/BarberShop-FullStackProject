import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../services/AuthContext";

const isAdmin = (user) => user && user.roles.includes("ROLE_ADMIN");
const isUser = (user) => user && user.roles.includes("ROLE_USER");

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-dark"
      style={{ borderBottom: "5px solid #000" }}
    >
      <Link
        className="navbar-brand"
        to="/"
        style={{ fontSize: "2em", fontWeight: "bold" }}
      >
        BARBERSHOP
      </Link>

      <div className="ml-auto">
        <div className="dropdown">
          <button
            className="btn btn-dark dropdown-toggle"
            style={{ backgroundColor: "transparent", border: "none" }}
            type="button"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="dropdown-menu dropdown-menu-right text-center"
            aria-labelledby="dropdownMenuButton"
            style={{
              backgroundColor: "#343a40",
              border: "3px solid black",
            }}
          >
            <Link
              className="dropdown-item"
              to="/"
              style={{ color: "white", fontSize: "1.3em" }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "black")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#343a40")}
            >
              Начало
            </Link>

            <>
              {isAdmin(user) && (
                <>
                  <Link
                    className="dropdown-item"
                    to="/admin"
                    style={{ color: "white", fontSize: "1.3em" }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "black")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "#343a40")
                    }
                  >
                    График
                  </Link>
                  <Link
                    className="dropdown-item"
                    to="/settings"
                    style={{ color: "white", fontSize: "1.3em" }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "black")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "#343a40")
                    }
                  >
                    Профил
                  </Link>
                  <Link
                    className="dropdown-item"
                    to="/"
                    onClick={logoutUser}
                    style={{ color: "white", fontSize: "1.3em" }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "black")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "#343a40")
                    }
                  >
                    Изход
                  </Link>
                </>
              )}

              {isUser(user) && (
                <>
                  <Link
                    className="dropdown-item"
                    to="/appointments"
                    style={{ color: "white", fontSize: "1.3em" }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "black")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "#343a40")
                    }
                  >
                    Запазени часове
                  </Link>
                  <Link
                    className="dropdown-item"
                    to="/settings"
                    style={{ color: "white", fontSize: "1.3em" }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "black")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "#343a40")
                    }
                  >
                    Профил
                  </Link>
                  <Link
                    className="dropdown-item"
                    to="/"
                    onClick={logoutUser}
                    style={{ color: "white", fontSize: "1.3em" }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "black")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "#343a40")
                    }
                  >
                    Изход
                  </Link>
                </>
              )}

              {!user && (
                <Link
                  className="dropdown-item"
                  to="/login"
                  style={{ color: "white", fontSize: "1.3em" }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "black")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "#343a40")
                  }
                >
                  Вход
                </Link>
              )}
            </>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
