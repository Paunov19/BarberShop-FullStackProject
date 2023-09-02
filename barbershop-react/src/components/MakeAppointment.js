import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../services/AuthContext";

const MakeAppointment = () => {
  const [service, setService] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [availableTimes, setAvailableTimes] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (date && service) {
      fetchAvailableSlots(date, service);
    }
  }, [date, service]);

  const formatTimeForDisplay = (timeArray) => {
    const [hour, minute] = timeArray;
    return `${String(hour).padStart(2, "0")}:${String(minute).padStart(
      2,
      "0"
    )}`;
  };

  const fetchAvailableSlots = async (date, service) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/users/appointments/available`,
        { date: date, eBarberService: service }
      );
      if (response.status === 200 && response.data) {
        const formattedTimes = response.data.map(formatTimeForDisplay);
        setAvailableTimes(formattedTimes);
      }
    } catch (error) {
      console.error("Failed to fetch available slots:", error);
    }
  };

  const handleServiceChange = (event) => {
    setService(event.target.value);
    setTime("");
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
    const selectedDate = new Date(event.target.value);
    const currentDateStr = new Date().toISOString().substr(0, 10);
    if (selectedDate.toISOString().substr(0, 10) < currentDateStr) {
      alert("You cannot select a past date for appointment!");
      setDate("");
      return;
    }
    if (selectedDate.getDay() === 0) {
      alert("Салонът е затворен неделя!");
      setDate("");
    }
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/appointments/create",
        {
          service,
          date,
          time,
          userId: user.id,
        },
        {
          headers: {
            Authorization: "Bearer " + user.accessToken,
          },
        }
      );
      if (response.status === 201) {
        alert("Резервацията е направена успешно!");
        navigate("/appointments");
      } else {
        alert("Error creating appointment. Please try again.");
      }
    } catch (error) {
      console.error("Failed to create appointment:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        alert(error.response.data.message);
      } else {
        alert("Error creating appointment. Please try again.");
      }
    }
  };

  const handleCancel = () => {
    setService("");
    setDate("");
    setTime("");
    setAvailableTimes([]);
  };

  return (
    <div className="container">
      <p
        className="text-center"
        style={{ fontSize: "30px", fontWeight: "bolder" }}
      >
        Резервирай час
      </p>
      <div className="card p-5 border-0">
        <form onSubmit={handleSubmit}>
          <div className="card p-3">
            <p
              className="text-center"
              style={{ fontSize: "20px", fontWeight: "bold" }}
            >
              Тип подстригване:
            </p>
            <label
              className={`btn w-100 ${
                service === "HAIR" ? "btn-success" : "btn-dark"
              }`}
            >
              <input
                type="radio"
                name="service"
                value="HAIR"
                checked={service === "HAIR"}
                onChange={handleServiceChange}
                style={{ display: "none" }}
              />
              <div className="d-flex flex-column align-items-center">
                <span>Мъжко подстригване - 20лв.</span>
                <span>Времетраене - 30 мин.</span>
              </div>
            </label>
            <label
              className={`btn w-100 mt-2 ${
                service === "BEARD" ? "btn-success" : "btn-dark"
              }`}
            >
              <input
                type="radio"
                name="service"
                value="BEARD"
                checked={service === "BEARD"}
                onChange={handleServiceChange}
                style={{ display: "none" }}
              />
              <div className="d-flex flex-column align-items-center">
                <span>Оформяне на брада - 10лв.</span>
                <span>Времетраене - 30 мин.</span>
              </div>
            </label>
            <label
              className={`btn w-100 mt-2 ${
                service === "HAIR_AND_BEARD" ? "btn-success" : "btn-dark"
              }`}
            >
              <input
                type="radio"
                name="service"
                value="HAIR_AND_BEARD"
                checked={service === "HAIR_AND_BEARD"}
                onChange={handleServiceChange}
                style={{ display: "none" }}
              />
              <div className="d-flex flex-column align-items-center">
                <span>Мъжко подстригване и оформяне на брада - 25лв.</span>
                <span>Времетраене - 60 мин.</span>
              </div>
            </label>
          </div>
          <div className="card" style={{ marginTop: "5px" }}>
            <div className="card border-0 mt-3 p-3">
              <input
                type="date"
                value={date}
                onChange={handleDateChange}
                min={new Date().toISOString().substr(0, 10)}
                className="form-control"
              />
            </div>
            <div className="card border-0">
              <p
                className="text-center"
                style={{ fontSize: "20px", fontWeight: "bold" }}
              >
                Свободни часове:
              </p>
              {date ? (
                availableTimes.length > 0 ? (
                  <div className="row">
                    {availableTimes.map((availableTime, index) => (
                      <div className="col-md-3 col-sm-6" key={index}>
                        <label
                          className={`btn w-100 ${
                            time === availableTime ? "btn-success" : "btn-dark"
                          } mt-2 mb-2`}
                        >
                          <input
                            type="radio"
                            name="time"
                            value={availableTime}
                            checked={time === availableTime}
                            onChange={handleTimeChange}
                            style={{ display: "none" }}
                          />
                          {availableTime}
                        </label>
                      </div>
                    ))}
                  </div>
                ) : (
                  <strong
                    className="text-center"
                    style={{
                      textDecoration: `underline`,
                      marginBottom: "5px",
                    }}
                  >
                    Няма повече свободни места.
                  </strong>
                )
              ) : null}
            </div>
          </div>
          <div className="container" style={{ marginTop: "20px" }}>
            <div className="row">
              <div className="col-md-6">
                <button
                  type="submit"
                  className="btn w-100"
                  style={{
                    fontWeight: "bold",
                    backgroundColor:
                      service && date && time ? "#28a745" : "#343a40",
                    borderColor: "#212529",
                    borderWidth: "3px",
                  }}
                  disabled={!service || !date || !time}
                >
                  Резервирай
                </button>
              </div>
              <div className="col-md-6">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="btn btn-dark w-100"
                  style={{
                    fontWeight: "bold",
                    backgroundColor: "black",
                    borderColor: "#212529",
                    borderWidth: "3px",
                  }}
                >
                  Отмяна
                </button>
              </div>
            </div>
          </div>
          <div className="card mt-4 p-3">
            <div className="row align-items-center mb-3">
              <div className="col-md-1">
                <i className="fas fa-calendar-alt"></i>
              </div>
              <div className="col-md-11">
                Салонът води електронен график. Изберете от свободните дни и
                часове.
              </div>
            </div>

            <div className="row align-items-center mb-3">
              <div className="col-md-1">
                <i className="fas fa-money-bill-wave"></i>
              </div>
              <div className="col-md-11">
                Заплаща се в салона, след извършване на услугата.
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MakeAppointment;
