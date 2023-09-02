import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../services/AuthContext";

const RegisterPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { registerUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [focusedField, setFocusedField] = useState("");
  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const [isConfirmPasswordVisible, setConfirmPasswordVisibility] =
    useState(false);

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const errors = {};

    if (!/^[a-zA-Zа-яА-Я]{3,255}$/.test(firstName))
      errors.firstName = "Невалидно име";
    if (!/^[a-zA-Zа-яА-Я]{3,255}$/.test(lastName))
      errors.lastName = "Невалидна фамилия";
    if (!/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)*(\.[a-zA-Z]{2,})$/.test(email))
      errors.email = "Невалиден имейл";
    if (!/^\d{10}$/.test(phoneNumber))
      errors.phoneNumber = "Невалиден телефонен номер";
    if (!/^[a-zA-Z0-9]{6,20}$/.test(password))
      errors.password = "Невалидна парола";
    if (password !== confirmPassword)
      errors.confirmPassword = "Паролите не съвпадат";

    setFirstNameError(errors.firstName || "");
    setLastNameError(errors.lastName || "");
    setEmailError(errors.email || "");
    setPhoneNumberError(errors.phoneNumber || "");
    setPasswordError(errors.password || "");
    setConfirmPasswordError(errors.confirmPassword || "");

    if (Object.keys(errors).length === 0) {
      try {
        await registerUser(firstName, lastName, email, phoneNumber, password);
        alert("Регистрацията е направена успешно");
        navigate("/login");
      } catch (error) {
        console.error(error);

        if (error.message.includes("Имейлът вече е регистриран")) {
          alert("Имейлът вече е регистриран");
        } else if (
          error.message.includes("Телефонният номер вече е регистриран")
        ) {
          alert("Телефонният номер вече е регистриран");
        } else {
          alert("Грешка при регистрацията. Моля, опитайте отново.");
        }
      }
    }
  };

  const handleInputChange = (setter, errorSetter, value) => {
    setter(value);
    errorSetter("");
  };

  const inputStyle = (error) => ({
    borderColor: error ? "red" : "initial",
  });

  const errorMessages = {
    firstName: "*Името трябва да съдържа само букви и поне 3 символа",
    lastName: "*Фамилията трябва да съдържа само букви и поне 3 символа",
    email: "*Въведете валиден имейл адрес",
    phoneNumber: "*Телефонният номер трябва да съдържа само цифри.",
    password:
      "*Паролата може да съдържа само букви и/или цифри и да е минимум 6 символа",
    confirmPassword: "*Трябва да съвпада с паролата",
  };

  const togglePasswordVisibility = () => {
    setPasswordVisibility((prevVisibility) => !prevVisibility);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisibility((prevVisibility) => !prevVisibility);
  };

  return (
    <div className="container">
      <div className="card p-5 border-0">
        <div className="d-flex justify-content-center align-items-center">
          <h2>Регистрирай се</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstName">Име</label>
            <input
              style={inputStyle(firstNameError)}
              type="text"
              className="form-control"
              id="firstName"
              value={firstName}
              onChange={(e) =>
                handleInputChange(
                  setFirstName,
                  setFirstNameError,
                  e.target.value
                )
              }
              onFocus={() => setFocusedField("firstName")}
              onBlur={() => setFocusedField("")}
              autoComplete="off"
            />
            <small style={{ color: firstNameError ? "red" : "gray" }}>
              {focusedField === "firstName"
                ? errorMessages.firstName
                : firstNameError}
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Фамилия</label>
            <input
              style={inputStyle(lastNameError)}
              type="text"
              className="form-control"
              id="lastName"
              value={lastName}
              onChange={(e) =>
                handleInputChange(setLastName, setLastNameError, e.target.value)
              }
              onFocus={() => setFocusedField("lastName")}
              onBlur={() => setFocusedField("")}
              autoComplete="off"
            />
            <small style={{ color: lastNameError ? "red" : "gray" }}>
              {focusedField === "lastName"
                ? errorMessages.lastName
                : lastNameError}
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="email">Имейл</label>
            <input
              style={inputStyle(emailError)}
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) =>
                handleInputChange(setEmail, setEmailError, e.target.value)
              }
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField("")}
              autoComplete="off"
            />
            <small style={{ color: emailError ? "red" : "gray" }}>
              {focusedField === "email" ? errorMessages.email : emailError}
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="phoneNumber">Телефон</label>
            <input
              style={inputStyle(phoneNumberError)}
              type="text"
              className="form-control"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) =>
                handleInputChange(
                  setPhoneNumber,
                  setPhoneNumberError,
                  e.target.value
                )
              }
              onFocus={() => setFocusedField("phoneNumber")}
              onBlur={() => setFocusedField("")}
              autoComplete="off"
            />
            <small style={{ color: phoneNumberError ? "red" : "gray" }}>
              {focusedField === "phoneNumber"
                ? errorMessages.phoneNumber
                : phoneNumberError}
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="password">Парола</label>
            <div className="input-group">
              <input
                style={inputStyle(passwordError)}
                type={isPasswordVisible ? "text" : "password"}
                className="form-control"
                id="password"
                value={password}
                onChange={(e) =>
                  handleInputChange(
                    setPassword,
                    setPasswordError,
                    e.target.value
                  )
                }
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField("")}
                autoComplete="off"
              />
              <div
                className="input-group-append"
                style={{ height: `38px`, borderColor: "black" }}
              >
                <span className="input-group-text bg-white border-left-0">
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="btn"
                    style={{
                      textDecoration: `none`,
                      background: "transparent",
                    }}
                  >
                    {isPasswordVisible ? (
                      <i className="fa fa-eye-slash"></i>
                    ) : (
                      <i className="fa fa-eye"></i>
                    )}
                  </button>
                </span>
              </div>
            </div>
            <small style={{ color: passwordError ? "red" : "gray" }}>
              {focusedField === "password"
                ? errorMessages.password
                : passwordError}
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Потвърди парола</label>
            <div className="input-group">
              <input
                style={inputStyle(confirmPasswordError)}
                type={isConfirmPasswordVisible ? "text" : "password"}
                className="form-control"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) =>
                  handleInputChange(
                    setConfirmPassword,
                    setConfirmPasswordError,
                    e.target.value
                  )
                }
                onFocus={() => setFocusedField("confirmPassword")}
                onBlur={() => setFocusedField("")}
                autoComplete="off"
              />
              <div
                className="input-group-append"
                style={{ height: `38px`, borderColor: "black" }}
              >
                <span className="input-group-text bg-white border-left-0">
                  <button
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                    className="btn"
                    style={{
                      textDecoration: `none`,
                      background: "transparent",
                    }}
                  >
                    {isConfirmPasswordVisible ? (
                      <i className="fa fa-eye-slash"></i>
                    ) : (
                      <i className="fa fa-eye"></i>
                    )}
                  </button>
                </span>
              </div>
            </div>
            <small style={{ color: confirmPasswordError ? "red" : "gray" }}>
              {focusedField === "confirmPassword"
                ? errorMessages.confirmPassword
                : confirmPasswordError}
            </small>
          </div>
          <button
            type="submit"
            disabled={
              !firstName ||
              !lastName ||
              !email ||
              !phoneNumber ||
              !password ||
              !confirmPassword ||
              firstNameError ||
              lastNameError ||
              emailError ||
              phoneNumberError ||
              passwordError ||
              confirmPasswordError
            }
            className="btn btn-primary"
            style={{
              fontSize: "25px",
              borderRadius: "50px",
              padding: "10px 20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#343a40",
              borderColor: "#212529",
              borderWidth: "5px",
            }}
          >
            Регистрирай се
          </button>

          <p
            className="text-center"
            style={{ marginTop: "10px", fontSize: "20px" }}
          >
            Вече имаш регистрация?
            <Link
              to="/login"
              style={{
                color: "black",
                textDecoration: "underline",
                marginLeft: "5px",
              }}
            >
              Влез тук
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
