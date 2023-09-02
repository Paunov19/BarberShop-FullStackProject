import React, { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../services/AuthContext";
import { useNavigate } from "react-router-dom";
import img1 from "../assets/img-1.jpg";
import img2 from "../assets/img-2.jpg";
import img3 from "../assets/img-3.jpg";

const images = [img1, img2, img3];

const HomePage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const autoPlayRef = useRef();
  const phoneRef = useRef(null);
  const googleMapsURL =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2899.224516138957!2d23.3417383154768!3d42.65115987916929!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa850f0dd6239b%3A0x8d88aebfe6170c48!2sBARRNAT%20STYLE!5e0!3m2!1sen!2sus!4v1628589420655!5m2!1sen!2sus";

  useEffect(() => {
    autoPlayRef.current = nextSlide;
  });

  useEffect(() => {
    const play = () => {
      autoPlayRef.current();
    };

    const interval = setInterval(play, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleAppointmentClick = () => {
    if (user) {
      navigate("/makeAppointment");
    } else {
      navigate("/login");
    }
  };

  const nextSlide = () => {
    setActiveImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div
      className="container-flex"
      style={{
        maxWidth: "1600px",
        width: "100%",
        margin: "0 auto",
        backgroundColor: "white",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          style={{
            width: "100%",
            maxWidth: "1600px",
            height: "100%",
            maxHeight: "500px",
            objectFit: "cover",
          }}
          src={images[activeImageIndex]}
          alt=""
        />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            marginTop: "10px",
          }}
        >
          {images.map((_, index) => (
            <div
              key={index}
              onClick={() => setActiveImageIndex(index)}
              style={{
                height: "5px",
                width: "100px",
                background: activeImageIndex === index ? "#333" : "#ccc",
                cursor: "pointer",
              }}
            />
          ))}
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-lg-5 text-center">
          <button
            className="btn btn-primary mt-3"
            onClick={handleAppointmentClick}
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
            Запази час
          </button>
        </div>
      </div>
      <div
        className="row justify-content-center"
        style={{ maxWidth: "1600px", margin: "0 auto", marginTop: "20px" }}
      >
        <div className="col-xl-3 col-md-6">
          <div
            className="card border-0 d-flex flex-column justify-content-center align-items-center p-3"
            style={{ width: "400px" }}
          >
            <h4>За BARBERSHOP</h4>
            <p
              style={{
                textAlign: "justify",
                marginTop: "10px",
              }}
            >
              Ние предлагаме иновации в областта на бръснарството и мъжката
              стилизация за Вас. Създадохме място, с изключително модерна визия
              и завладяваща обстановка, с мисъл за Вашето незабравимо
              изживяване. Нашият екип от специалисти работи професионално и
              прецизно, според Вашия вкус. Всяка визия, която желаете е напълно
              постижима при нас. Нямаме търпение да Ви запознаем с нашата широка
              гама от услуги и техники, подбрани за Вас. Работим с висок клас
              продукти на реномирани марки, на които се доверяваме. Не се
              колебайте и запишете своя час при нас!
            </p>
          </div>
        </div>
        <div className="col-xl-3 col-md-6">
          <div
            className="card border-0 d-flex flex-column justify-content-center align-items-center p-3"
            style={{ width: "400px", backgroundColor: "transparent" }}
          >
            <h4>Работно време</h4>
            <div
              className="working-time d-flex justify-content-start"
              style={{ marginTop: "10px" }}
            >
              <div className="text-left mr-5">
                <p>Понеделник</p>
                <p>Вторник</p>
                <p>Сряда</p>
                <p>Четвъртък</p>
                <p>Петък</p>
                <p>Събота</p>
                <p>Неделя</p>
              </div>

              <div className="text-right">
                <p>09:00 - 19:00</p>
                <p>09:00 - 19:00</p>
                <p>09:00 - 19:00</p>
                <p>09:00 - 19:00</p>
                <p>09:00 - 19:00</p>
                <p>09:00 - 19:00</p>
                <p>Затворено</p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6 mt-md-3">
          <div
            className="card border-0 d-flex flex-column justify-content-center align-items-left p-3"
            style={{ width: "400px" }}
          >
            <h4 className="text-center" style={{ marginTop: "-15px" }}>
              Контакти
            </h4>
            <div className="text-left" style={{ marginTop: "10px" }}>
              <div className="row align-items-center mb-3">
                <div className="col-1">
                  <i className="fas fa-phone-alt"></i>
                </div>
                <div className="col-11" id="phone" ref={phoneRef}>
                  123 456 7890
                </div>
              </div>
              <div className="row align-items-center mb-3">
                <div className="col-1">
                  <i className="fas fa-envelope"></i>
                </div>
                <div className="col-11">info@barbershop.com</div>
              </div>
              <div className="row align-items-center mb-3">
                <div className="col-1">
                  <i className="fas fa-map-marker-alt"></i>{" "}
                </div>
                <div className="col-11">
                  ул. акад. Николай Стоянов 8, София, Студентски град
                </div>
              </div>
            </div>
            <div className="text-center">
              <button
                className="btn btn-dark"
                onClick={() => window.open(googleMapsURL, "_blank")}
                style={{
                  fontSize: "20px",
                  borderRadius: "50px",
                  width: "200px",
                  height: "50px",
                  backgroundColor: "#343a40",
                  borderColor: "#212529",
                  borderWidth: "4px",
                  lineHeight: "20px",
                  textAlign: `center`,
                  justifyContent: "center",
                }}
              >
                Заведи ме
              </button>
            </div>
          </div>
        </div>
        <div
          className="col-xl-3 col-md-6 mt-md-3 d-flex justify-content-right align-items-right"
          style={{ marginTop: "17px" }}
        >
          <iframe
            src={googleMapsURL}
            width="400"
            height="250"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
      <div style={{ height: "100px" }}></div>
    </div>
  );
};

export default HomePage;
