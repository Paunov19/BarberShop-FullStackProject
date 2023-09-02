import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../services/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Appointments = () => {
  const { user } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/users/appointments`,
        {
          headers: {
            Authorization: "Bearer " + user.accessToken,
          },
        }
      );
      setAppointments(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const getAppointmentStatus = (appointmentDate, appointmentTime) => {
    const now = new Date();
    const appointmentDateTime = new Date(
      `${appointmentDate}T${appointmentTime}:00`
    );
    if (now >= appointmentDateTime) return "past";

    const threeHoursBeforeAppointment = new Date(
      appointmentDateTime.getTime() - 5 * 60 * 60 * 1000
    );
    if (now >= threeHoursBeforeAppointment) return "imminent";

    return "future";
  };

  const cancelAppointment = async (appointmentId, status) => {
    if (status === "past") {
      alert("Не може да се отмени вече отминала резервация.");
      return;
    }

    if (status === "imminent") {
      alert("Не може да се отмени резервация 5 часа преди началото и.");
      return;
    }

    try {
      await axios.delete(
        `http://localhost:8080/api/users/appointments/${appointmentId}`,
        {
          headers: {
            Authorization: "Bearer " + user.accessToken,
          },
        }
      );
      fetchData();
      alert("Резервацията е успешно отменена.");
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 409:
            alert(error.response.data);
            break;
          case 403:
            alert(
              "Не можете да отмените резервацията по-малко от 5 часа преди началото и."
            );
            break;
          case 401:
            alert("Unauthorized user.");
            break;
          default:
            console.error("Failed to cancel appointment:", error);
            alert("An unexpected error occurred. Please try again later.");
        }
      } else {
        console.error("Failed to cancel appointment:", error);
      }
    }
  };

  const formatTime = (timeArray) => {
    if (!Array.isArray(timeArray)) {
      console.error("timeString is not an array:", timeArray);
      return "";
    }

    const [hour, minute] = timeArray;
    return `${hour}:${String(minute).padStart(2, "0")}`;
  };

  const getLocalizedService = (serviceType) => {
    switch (serviceType) {
      case "HAIR":
        return "Мъжко подстригване";
      case "BEARD":
        return "Оформяне на брада";
      case "HAIR_AND_BEARD":
        return "Мъжко подстригване и оформяне на брада";
      default:
        return serviceType;
    }
  };

  return (
    <div>
      <h1>История на запазените часове:</h1>
      <div className="card p-4 border-0">
        <div className="row">
          <div className="col-md-12">
            <p className="border p-3">
              <i className="fas fa-info-circle"></i> Може да отмените
              резервацията си{" "}
              <strong style={{ textDecoration: `underline` }}>
                най-късно до 5 часа преди запазения час.
              </strong>{" "}
              В повечето случаи специалистите работят за себе си и претърпяват
              сериозни загуби при всяка ненавременна отмяна на час или неявяване
              на клиент.
            </p>
          </div>
        </div>
        <table className="table" style={{ border: "2px solid black" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid black" }}>
              <th
                style={{
                  textAlign: "center",
                  borderRight: "2px solid black",
                  borderBottom: "2px solid black",
                }}
              >
                Тип подстригване:
              </th>
              <th
                style={{
                  textAlign: "center",
                  borderRight: "2px solid black",
                  borderBottom: "2px solid black",
                }}
              >
                Дата:
              </th>
              <th
                style={{
                  textAlign: "center",
                  borderRight: "2px solid black",
                  borderBottom: "2px solid black",
                }}
              >
                Час:
              </th>
              <th
                style={{ textAlign: "center", borderBottom: "2px solid black" }}
              ></th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(appointments) && appointments.length > 0 ? (
              appointments.map((appointment) => {
                const status = getAppointmentStatus(
                  appointment.date,
                  appointment.time
                );
                console.log(
                  `Status for appointment ${appointment.id}:`,
                  status
                );

                const isPastAppointment = status === "past";

                return (
                  <tr
                    key={appointment.id}
                    style={{
                      borderBottom: "1px solid lightgrey",
                      backgroundColor: isPastAppointment ? "grey" : "white",
                      textAlign: "center",
                    }}
                  >
                    <td style={{ borderBottom: "1px solid lightgrey" }}>
                      {appointment.service &&
                        getLocalizedService(appointment.service)}
                    </td>
                    <td style={{ borderBottom: "1px solid lightgrey" }}>
                      {new Date(appointment.date).toLocaleDateString(`en-GB`)}
                    </td>
                    <td style={{ borderBottom: "1px solid lightgrey" }}>
                      {appointment.time ? formatTime(appointment.time) : `N/A`}
                    </td>
                    <td>
                      <button
                        onClick={() =>
                          cancelAppointment(appointment.id, status)
                        }
                        disabled={isPastAppointment}
                        style={{
                          fontWeight: "bold",
                          backgroundColor: isPastAppointment
                            ? "gray"
                            : "#dc3545",
                          borderColor: "#212529",
                          borderWidth: "3px",
                        }}
                        className="btn btn-dark w-100"
                      >
                        Отмени
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan="4"
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "20px",
                  }}
                >
                  Няма запазени часове.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Appointments;
