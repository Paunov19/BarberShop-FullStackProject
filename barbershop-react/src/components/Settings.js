import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../services/AuthContext";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const { user, getUser, logoutUser } = useContext(AuthContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const [isConfirmPasswordVisible, setConfirmPasswordVisibility] =
    useState(false);
  const [isCurrentPasswordVisible, setCurrentPasswordVisibility] =
    useState(false);

  const [focusedField, setFocusedField] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setPhoneNumber(user.phoneNumber);
    }
  }, [user]);

  const updateUserInfo = async () => {
    const nameRegex = /^[a-zA-Zа-яА-Я\s]{2,255}$/;
    const phoneNumberRegex = /^\d{10}$/;
    const passwordRegex = /^[a-zA-Z0-9]{6,}$/;

    if (firstName && !nameRegex.test(firstName)) {
      alert("Невалидно име.");
      return;
    }

    if (lastName && !nameRegex.test(lastName)) {
      alert("Невалидна фамилия.");
      return;
    }

    if (phoneNumber && !phoneNumberRegex.test(phoneNumber)) {
      alert("Невалиден телефонен номер");
      return;
    }

    if (password && !passwordRegex.test(password)) {
      alert("Невалидна парола.");
      return;
    }

    if (password && password !== confirmPassword) {
      alert("Новите пароли не съвпадат.");
      return;
    }

    try {
      await axios.put(
        "http://localhost:8080/api/users/updateProfile",
        {
          firstName: firstName ? firstName : undefined,
          lastName: lastName ? lastName : undefined,
          phoneNumber: phoneNumber ? phoneNumber : undefined,
          newPassword:
            password && confirmPassword && password === confirmPassword
              ? password
              : undefined,

          currentPassword: currentPassword ? currentPassword : undefined,
        },
        {
          headers: {
            Authorization: "Bearer " + user.accessToken,
          },
        }
      );
      alert("Потребителските данни са променени успешно");
      getUser();
      if (password && confirmPassword && password === confirmPassword) {
        logoutUser();
        navigate("/login");
      }
    } catch (error) {
      if (error.response) {
        if (
          error.response.status === 401 &&
          error.response.data.message === "Current password is incorrect."
        ) {
          alert("Грешна текуща парола.");
        } else if (error.response.status === 409) {
          alert("Телефонният номер вече съществува.");
        } else {
          alert("Неуспешно актуализиране на потребителските данни");
        }
      } else {
        alert("Неуспешно актуализиране на потребителските данни");
      }
    }
  };

  const toggleCurrentPasswordVisibility = () => {
    setCurrentPasswordVisibility((prevVisibility) => !prevVisibility);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisibility((prevVisibility) => !prevVisibility);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisibility((prevVisibility) => !prevVisibility);
  };

  return (
    <div className="container">
      <h1 className="text-center">Твоят профил</h1>
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}
      <div className="card p-4 border-0">
        <form>
          <div className="form-group">
            <label>Име:</label>
            <input
              type="text"
              className="form-control"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              onFocus={() => setFocusedField("firstName")}
              onBlur={() => setFocusedField("")}
              autoComplete="off"
            />
            {focusedField === "firstName" && (
              <small style={{ color: "gray" }}>
                *Името трябва да съдържа само букви и поне 3 символа
              </small>
            )}
          </div>

          <div className="form-group">
            <label>Фамилия:</label>
            <input
              type="text"
              className="form-control"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              onFocus={() => setFocusedField("lastName")}
              onBlur={() => setFocusedField("")}
              autoComplete="off"
            />
            {focusedField === "lastName" && (
              <small style={{ color: "gray" }}>
                *Името трябва да съдържа само букви и поне 3 символа
              </small>
            )}
          </div>

          <div className="form-group">
            <label>Телефон:</label>
            <input
              type="text"
              className="form-control"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              onFocus={() => setFocusedField("phoneNumber")}
              onBlur={() => setFocusedField("")}
              autoComplete="off"
            />
            {focusedField === "phoneNumber" && (
              <small style={{ color: "gray" }}>
                *Телефонният номер трябва да съдържа само цифри.
              </small>
            )}
          </div>
          <div className="form-group">
            <label>Текуща парола:</label>
            <div className="input-group">
              <input
                type={isCurrentPasswordVisible ? "text" : "password"}
                className="form-control"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                onFocus={() => setFocusedField("currentPassword")}
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
                    onClick={toggleCurrentPasswordVisibility}
                    className="btn"
                    style={{
                      textDecoration: `none`,
                      background: "transparent",
                    }}
                  >
                    {isCurrentPasswordVisible ? (
                      <i className="fa fa-eye-slash"></i>
                    ) : (
                      <i className="fa fa-eye"></i>
                    )}
                  </button>
                </span>
              </div>
            </div>
            {focusedField === "currentPassword" && (
              <small style={{ color: "gray" }}>*Въведете текущата парола</small>
            )}
          </div>

          <div className="form-group">
            <label>Нова парола:</label>
            <div className="input-group">
              <input
                type={isPasswordVisible ? "text" : "password"}
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField("")}
                autoComplete="off"
              />{" "}
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
            {focusedField === "password" && (
              <small style={{ color: "gray" }}>
                *Паролата може да съдържа само букви и/или цифри и да е минимум
                6 символа
              </small>
            )}
          </div>

          <div className="form-group">
            <label>Потвърди нова парола:</label>
            <div className="input-group">
              <input
                type={isConfirmPasswordVisible ? "text" : "password"}
                className="form-control"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
            {focusedField === "confirmPassword" && (
              <small style={{ color: "gray" }}>
                *Трябва да съвпада с новата парола
              </small>
            )}
          </div>
          <div className="container" style={{ marginTop: "20px" }}>
            <div className="row justify-content-center">
              <div className="col-md-6">
                <button
                  type="button"
                  className="btn btn-primary w-100"
                  onClick={updateUserInfo}
                  style={{
                    fontWeight: "bold",
                    backgroundColor: "black",
                    borderColor: "#212529",
                    borderWidth: "3px",
                  }}
                >
                  Запази
                </button>
              </div>
            </div>
            <div className="card mt-4 p-3">
              <div className="row align-items-center mb-3">
                <div className="col-md-1">
                  <i className="fas fa-info-circle"></i>
                </div>
                <div className="col-md-11">
                  Тук може да направите промени по вашите данни.
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
