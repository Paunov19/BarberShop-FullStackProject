import React, { useEffect, useState, useContext, useCallback } from "react";
import axios from "axios";
import { AuthContext } from "../services/AuthContext";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().substr(0, 10)
  );

  useEffect(() => {
    if (!user || !user.accessToken) {
      navigate("/login");
    } else if (!user.roles.includes("ROLE_ADMIN")) {
      navigate("/error");
    }
  }, [user, navigate]);

  const fetchAppointments = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/admin/appointments/${selectedDate}`,
        {
          headers: {
            Authorization: "Bearer " + user.accessToken,
          },
        }
      );
      setAppointments(response.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setAppointments([]);
      } else {
        console.error("Неуспешно извличане на резервациите", error);
      }
    }
  }, [selectedDate, user.accessToken]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const getAppointmentStatus = (appointmentDate, appointmentTime) => {
    const now = new Date();
    const appointmentDateTime = new Date(
      `${appointmentDate}T${appointmentTime}:00`
    );
    if (now >= appointmentDateTime) return "past";
    return "future";
  };

  const cancelAppointment = async (
    appointmentId,
    appointmentDate,
    appointmentTime
  ) => {
    const status = getAppointmentStatus(appointmentDate, appointmentTime);
    if (status === "past") {
      alert("Tази резервация вече е отминала.");
      return;
    }

    try {
      await axios.delete(
        `http://localhost:8080/api/admin/appointments/${appointmentId}`,
        {
          headers: {
            Authorization: "Bearer " + user.accessToken,
          },
        }
      );
      fetchAppointments();
      alert("Резервацията е успешно отменена.");
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 409:
            alert("Не може да се отмени вече отминала резервация.");
            break;
          case 401:
            alert("Неоторизиран потребител.");
            break;
          default:
            console.error("Неуспешно отменяне на резервацията:", error);
            alert("Неуспешно отменяне на резервацията:");
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
    <div className="container">
      <h1>График</h1>
      <div className="card p-3 border-0">
        <label>
          <strong>Дата:</strong>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="form-control"
          />
        </label>

        <table
          className="table"
          style={{ border: "2px solid black", textAlign: "center" }}
        >
          <thead>
            <tr style={{ borderBottom: "2px solid black" }}>
              <th
                style={{
                  borderRight: "2px solid black",
                  borderBottom: "2px solid black",
                }}
              >
                Име
              </th>
              <th
                style={{
                  borderRight: "2px solid black",
                  borderBottom: "2px solid black",
                }}
              >
                Телефон
              </th>
              <th
                style={{
                  borderRight: "2px solid black",
                  borderBottom: "2px solid black",
                }}
              >
                Тип подстригване
              </th>
              <th
                style={{
                  borderRight: "2px solid black",
                  borderBottom: "2px solid black",
                }}
              >
                Дата
              </th>
              <th
                style={{
                  borderRight: "2px solid black",
                  borderBottom: "2px solid black",
                }}
              >
                Час
              </th>
              <th style={{ borderBottom: "2px solid black" }}></th>
            </tr>
          </thead>
          <tbody>
            {appointments.length > 0 ? (
              appointments.map((appointment) => (
                <tr
                  key={appointment.id}
                  style={{ borderBottom: "1px solid lightgrey" }}
                >
                  <td style={{ borderBottom: "1px solid lightgrey" }}>
                    {appointment.firstName} {appointment.lastName}
                  </td>
                  <td style={{ borderBottom: "1px solid lightgrey" }}>
                    {appointment.phoneNumber}
                  </td>
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
                  <td style={{ borderBottom: "1px solid lightgrey" }}>
                    <button
                      onClick={() =>
                        cancelAppointment(
                          appointment.id,
                          appointment.date,
                          appointment.time
                        )
                      }
                      className="btn btn-dark w-100"
                      style={{
                        fontWeight: "bold",
                        backgroundColor: "#dc3545",
                        borderColor: "#212529",
                        borderWidth: "3px",
                      }}
                    >
                      Отмени
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "20px",
                  }}
                >
                  Няма запазени часове
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
