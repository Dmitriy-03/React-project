import React, { useState, useEffect, useRef } from "react";
import ModalWindow from "./ModalWindow";
import AllGallery from "./AllGallery";
import Layouts from "./Layouts";
import WebApplications from "./WebApplications";
import Sites from "./Sites";
import LandingPages from "./LandingPages";
import Review from "./Review";
import Theme from "./Theme";
import ModalMenu from "./ModalMenu";
import Resize from "./Resize";

function Main() {
  const isPortrait = Resize();
  const { theme, setTheme } = Theme();
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });

  const toggleTheme = () => {
    if (isDarkTheme) {
      lightTheme();
    } else {
      darkTheme();
    }
    setIsDarkTheme(!isDarkTheme);
  };

  const lightTheme = () => {
    setTheme("light");
  };

  const darkTheme = () => {
    setTheme("dark");
  };

  const renderComponent = () => {
    switch (selectedCategory) {
      case "All":
        return <AllGallery />;
      case "Sites":
        return <Sites />;
      case "LandingPages":
        return <LandingPages />;
      case "Layouts":
        return <Layouts />;
      case "WebApplications":
        return <WebApplications />;
      default:
        return <AllGallery />;
    }
  };

  const [showModal, setShowModal] = useState(false);
  const [showModalMenu, setShowModalMenu] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenModalMenu = () => {
    setShowModalMenu(true);
  };

  const handleCloseModalMenu = () => {
    setShowModalMenu(false);
  };

  const containerRef = useRef(null);
  const reviewWidthRef = useRef(0);

  const reviews = [
    <Review
      key={1}
      name="Михаил Л."
      link="/"
      text="Сайт очень понравился, всё понятно и всё на своих местах!"
    />,
    <Review
      key={2}
      name=" Татьяна К."
      link="/"
      text="Заказала сайт для своего бизнесса в сфере оказания бьюти услуг для привлечения клиентов. 
      Работа выполнена быстро и со вкусом;)"
    />,
    <Review
      key={3}
      name="Семён Н."
      link="/"
      text="Понравилось то, что работа выполнена быстро и это никак не отразилось на качестве выполненной работы! "
    />,
  ];

  const visibleReviews = 3;

  const handleScroll = () => {
    const box = containerRef.current;
    const width = reviewWidthRef.current * visibleReviews;

    if (box.scrollLeft <= 0) {
      box.style.scrollBehavior = "auto";
      box.scrollLeft = box.scrollWidth - 2 * width;
      box.style.scrollBehavior = "smooth";
    }

    if (box.scrollLeft >= box.scrollWidth - width) {
      box.style.scrollBehavior = "auto";
      box.scrollLeft = width;
      box.style.scrollBehavior = "smooth";
    }
  };

  const btnPrevReview = () => {
    const box = containerRef.current;
    box.scrollLeft -= reviewWidthRef.current;
  };

  const btnNextReview = () => {
    const box = containerRef.current;
    box.scrollLeft += reviewWidthRef.current;
  };

  useEffect(() => {
    const box = containerRef.current;
    const firstReview = box.querySelector(".review-card");
    reviewWidthRef.current = firstReview.clientWidth;
    const width = reviewWidthRef.current * visibleReviews;

    box.scrollLeft = (box.scrollWidth - width) / 2;
    box.addEventListener("scroll", handleScroll);

    return () => {
      box.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [scroll, setScroll] = useState(0);

  const scrollUp = () => {
    setScroll(window.scrollY);
  };

  const upButton = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollUp);
  }, []);

  const toBlock = (height) => {
    window.scrollTo({ top: height, left: 0, behavior: "smooth" });
  };

  return (
    <div>
      <header>
        {isPortrait ? (
          <div className="navigation">
            <div className="menu">
              <a onClick={upButton}>Обо мне</a>
              <a
                onClick={(e) => toBlock(e.target.getAttribute("height"))}
                height="700"
              >
                Навыки
              </a>
              <a
                onClick={(e) => toBlock(e.target.getAttribute("height"))}
                height="1230"
              >
                Портфолио
              </a>
              <a
                onClick={(e) => toBlock(e.target.getAttribute("height"))}
                height="1920"
              >
                Отзывы
              </a>
              <a
                onClick={(e) => toBlock(e.target.getAttribute("height"))}
                height="2600"
              >
                Гарантии
              </a>
            </div>

            <div className="header-buttons">
              <button onClick={handleOpenModal} className="btn">
                Связаться
              </button>

              <a
                href="/"
                target="_blank"
                className={
                  theme === "light"
                    ? "icon telegram light"
                    : "icon telegram dark"
                }
                rel="noreferrer"
              />
              <a
                href="/"
                target="_blank"
                className={
                  theme === "light"
                    ? "icon instagram light"
                    : "icon instagram dark"
                }
                rel="noreferrer"
              />

              <div className="switch" onClick={toggleTheme}>
                <div
                  className={theme === "light" ? "theme light" : "theme dark"}
                  style={{
                    transform: isDarkTheme
                      ? "translateX(38px)"
                      : "translate(0)",
                  }}
                ></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="navigation">
            <div className="switch switch-mobile" onClick={toggleTheme}>
              <div
                className={
                  theme === "light"
                    ? "theme theme-mobile light"
                    : "theme theme-mobile dark"
                }
                style={{
                  transform: isDarkTheme ? "translateX(8.6vw)" : "translate(0)",
                }}
              ></div>
            </div>

            <div className="header-buttons-mobile">
              <a
                href="/"
                target="_blank"
                className={
                  theme === "light"
                    ? "icon icon-mobile telegram light"
                    : "icon icon-mobile telegram dark"
                }
                rel="noreferrer"
              />
              <a
                href="/"
                target="_blank"
                className={
                  theme === "light"
                    ? "icon icon-mobile instagram light"
                    : "icon icon-mobile instagram dark"
                }
                rel="noreferrer"
              />

              <a
                onClick={handleOpenModalMenu}
                className={
                  theme === "light" ? "icon-menu light" : "icon-menu dark"
                }
              />
            </div>
          </div>
        )}
      </header>

      <ModalMenu show={showModalMenu} onClose={handleCloseModalMenu}>
        <a onClick={upButton}>Обо мне</a>
        <a
          onClick={(e) => toBlock(e.target.getAttribute("height"))}
          height="700"
        >
          Навыки
        </a>
        <a
          onClick={(e) => toBlock(e.target.getAttribute("height"))}
          height="1230"
        >
          Портфолио
        </a>
        <a
          onClick={(e) => toBlock(e.target.getAttribute("height"))}
          height="1920"
        >
          Отзывы
        </a>
        <a
          onClick={(e) => toBlock(e.target.getAttribute("height"))}
          height="2600"
        >
          Гарантии
        </a>
      </ModalMenu>

      <ModalWindow show={showModal} onClose={handleCloseModal}>
        <h2
          style={{
            color: "#4824ff",
            fontSize: isPortrait ? "40px" : "15vw",
            marginTop: isPortrait ? "" : "0",
          }}
        >
          Контакты
        </h2>
        {isPortrait ? (
          <p style={{ fontSize: "22px" }}>
            Вы можете связаться со мной в Телеграмм <br /> или Инстаграм
          </p>
        ) : (
          <p style={{ fontSize: "33px" }}>
            Вы можете связаться со мной в Телеграмм <br /> или Инстаграм
          </p>
        )}
      </ModalWindow>

      {isPortrait ? (
        <div className="welcome-block">
          <div className="first-block">
            <h1 className="title">Frontend-разработчик</h1>
            <h2 style={{ marginBottom: "7%", marginTop: "7%" }}>
              Создаю <span style={{ color: "#4824ff" }}>продаваемый</span>
              <br /> и <span style={{ color: "#4824ff" }}>
                уникальный
              </span> сайт <br /> под ваши запросы
            </h2>
            <h3>
              Занимаюсь веб-разработкой <br /> на протяжении{" "}
              <span style={{ color: "#4824ff" }}>2 лет</span>
            </h3>
          </div>

          <div className="main-image-box">
            <img src="./images/1.png" draggable="false" alt="image1" />
          </div>
        </div>
      ) : (
        <div className="welcome-block mobile">
          <div className="main-image-box mobile">
            <img src="./images/1.png" draggable="false" alt="image1" />
          </div>

          <div className="first-block mobile">
            <h1 className="title">Frontend-разработчик</h1>
            <h2 style={{ marginBottom: "7%", marginTop: "7%" }}>
              Создаю <span style={{ color: "#4824ff" }}>продаваемый</span>
              <br /> и <span style={{ color: "#4824ff" }}>
                уникальный
              </span> сайт <br /> под ваши запросы
            </h2>
            <h3>
              Занимаюсь веб-разработкой <br /> на протяжении{" "}
              <span style={{ color: "#4824ff" }}>2 лет</span>
            </h3>

            <button onClick={handleOpenModal} className="btn mobile">
              Связаться
            </button>
          </div>
        </div>
      )}

      <div
        className={isPortrait ? "service-block" : "service-block mobile"}
        draggable="false"
      >
        <h1 style={{ fontSize: isPortrait ? "52px" : "10vw" }}>НАВЫКИ</h1>
        <p style={{ fontSize: isPortrait ? "27px" : "6vw" }}>
          При создании
          <span style={{ color: "#4824ff" }}> неповторимого сайта</span>{" "}
          использую следующий стек технологий:
        </p>

        <div style={{ display: isPortrait ? "flex" : "" }}>
          <p className={isPortrait ? "tag" : "tag mobile"}>
            <span
              className={`tag-icon ${
                theme === "light" ? "tag-icon icon-dark" : "tag-icon icon-light"
              } ${isPortrait ? "" : "mobile"}`}
            />
            HTML
          </p>
          <p className={isPortrait ? "tag" : "tag mobile"}>
            <span
              className={`tag-icon ${
                theme === "light" ? "tag-icon icon-dark" : "tag-icon icon-light"
              } ${isPortrait ? "" : "mobile"}`}
            />
            CSS
          </p>
          <p className={isPortrait ? "tag" : "tag mobile"}>
            <span
              className={`tag-icon ${
                theme === "light" ? "tag-icon icon-dark" : "tag-icon icon-light"
              } ${isPortrait ? "" : "mobile"}`}
            />
            JavaScript
          </p>
          <p className={isPortrait ? "tag" : "tag mobile"}>
            <span
              className={`tag-icon ${
                theme === "light" ? "tag-icon icon-dark" : "tag-icon icon-light"
              } ${isPortrait ? "" : "mobile"}`}
            />
            TypeScript
          </p>
          <p className={isPortrait ? "tag" : "tag mobile"}>
            <span
              className={`tag-icon ${
                theme === "light" ? "tag-icon icon-dark" : "tag-icon icon-light"
              } ${isPortrait ? "" : "mobile"}`}
            />
            React
          </p>
        </div>
        <div
          style={{
            display: isPortrait ? "flex" : "",
            marginTop: isPortrait ? "16px" : "",
          }}
        >
          <p className={isPortrait ? "tag" : "tag mobile"}>
            <span
              className={`tag-icon ${
                theme === "light" ? "tag-icon icon-dark" : "tag-icon icon-light"
              } ${isPortrait ? "" : "mobile"}`}
            />
            Sass/SCSS
          </p>
          <p className={isPortrait ? "tag" : "tag mobile"}>
            <span
              className={`tag-icon ${
                theme === "light" ? "tag-icon icon-dark" : "tag-icon icon-light"
              } ${isPortrait ? "" : "mobile"}`}
            />
            БЭМ
          </p>
          <p className={isPortrait ? "tag" : "tag mobile"}>
            <span
              className={`tag-icon ${
                theme === "light" ? "tag-icon icon-dark" : "tag-icon icon-light"
              } ${isPortrait ? "" : "mobile"}`}
            />
            Адаптивная и кроссбраузерная вёрстка
          </p>
        </div>

        <p style={{ fontSize: isPortrait ? "27px" : "6vw" }}>
          Открыт для обсуждения создания сайта по определенным технологиям.{" "}
          <br /> Детальней готов обсудить при{" "}
          <span
            style={{ color: "#4824ff", cursor: "pointer" }}
            onClick={handleOpenModal}
          >
            личной переписке
          </span>
          .
        </p>
      </div>

      <div className="portfolio-block">
        <div className={isPortrait ? "first-block" : "first-block mobile"}>
          <h1 className={isPortrait ? "main-title" : "main-title mobile"}>
            Портфолио
          </h1>
          <div
            style={{
              position: "absolute",
              marginLeft: isPortrait ? "-660px" : "-75vw",
            }}
          >
            <p
              className={
                isPortrait ? "gradient-part-one" : "gradient-part-one mobile"
              }
            ></p>
            {isPortrait ? (
              <p className="title-border">Портф</p>
            ) : (
              <p className="title-border mobile">Пор</p>
            )}
          </div>
          <div
            style={{
              position: "absolute",
              marginLeft: isPortrait ? "620px" : "75vw",
            }}
          >
            <p
              className={
                isPortrait ? "gradient-part-two" : "gradient-part-two mobile"
              }
            ></p>
            {isPortrait ? (
              <p className="title-border">фолио</p>
            ) : (
              <p className="title-border mobile">лио</p>
            )}
          </div>
          <img
            className={isPortrait ? "array-icon" : "array-icon mobile"}
            src="./icons/array.png"
            draggable="false"
            alt="array"
          />
        </div>

        <div className={isPortrait ? "" : "filter-scrollbar"}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            <p
              className={`tag ${selectedCategory === "All" ? "selected" : ""}
                ${isPortrait ? "" : "mobile"}`}
              onClick={() => setSelectedCategory("All")}
            >
              Все работы
            </p>
            <p
              className={`tag ${
                selectedCategory === "Banners" ? "selected" : ""
              } 
                ${isPortrait ? "" : "mobile"}`}
              onClick={() => setSelectedCategory("Banners")}
            >
              Сайты
            </p>
            <p
              className={`tag ${
                selectedCategory === "YouTubeThumbnails" ? "selected" : ""
              } ${isPortrait ? "" : "mobile"}`}
              onClick={() => setSelectedCategory("YouTubeThumbnails")}
            >
              Лендинги
            </p>
            <p
              className={`tag ${
                selectedCategory === "YouTubeDesign" ? "selected" : ""
              } ${isPortrait ? "" : "mobile"}`}
              onClick={() => setSelectedCategory("YouTubeDesign")}
            >
              Макеты
            </p>
            <p
              className={`tag ${
                selectedCategory === "InstagramStories" ? "selected" : ""
              } ${isPortrait ? "" : "mobile"}`}
              onClick={() => setSelectedCategory("InstagramStories")}
            >
              Веб-приложения
            </p>
          </div>
        </div>

        <div
          className="content"
          style={{ marginLeft: "-5vw", marginRight: "-5vw" }}
        >
          {renderComponent()}
        </div>
      </div>

      <div className={isPortrait ? "review-block" : "review-block mobile"}>
        <h1 style={{ fontSize: isPortrait ? "50px" : "10vw" }}>ОТЗЫВЫ</h1>
        <p className={isPortrait ? "description" : "description mobile"}>
          Отзывы клиентов, написанные со своих
          <span className="selecting"> личных аккаунтов </span>Телеграм. Всё
          прозрачно! <br /> Любой отзыв можно{" "}
          <span className="selecting"> открыть </span>в Телеграм и
          <span className="selecting"> спросить </span>об впечатлениях работы со
          мной <br />у создателя отзыва лично.
        </p>

        <div
          className={isPortrait ? "review-carausel" : "review-carausel mobile"}
        >
          <div
            className={
              isPortrait ? "review-container" : "review-container mobile"
            }
            ref={containerRef}
          >
            {reviews.slice(-visibleReviews)}
            {reviews}
            {reviews.slice(0, visibleReviews)}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <p
            className={isPortrait ? "next-button" : "next-button mobile"}
            style={{ transform: "rotate(180deg)" }}
          >
            <span className="array-next-icon" onClick={btnPrevReview}></span>
          </p>
          <p className={isPortrait ? "next-button" : "next-button mobile"}>
            <span className="array-next-icon" onClick={btnNextReview}></span>
          </p>
        </div>
      </div>

      <div
        className={isPortrait ? "guarantees-block" : "guarantees-block mobile"}
      >
        <h1
          style={{
            fontSize: isPortrait ? "52px" : "10vw",
            paddingBottom: isPortrait ? "20px" : "0",
          }}
        >
          ГАРАНТИИ
        </h1>

        <ol
          className={
            isPortrait ? "guarantees-points" : "guarantees-points mobile"
          }
        >
          <li className="point">
            Оплату принимаю через платёжную систему{" "}
            <span style={{ color: "#4824ff" }}>Название*</span>, которая
            контролирует <br />
            безопасность денежных переводов.
          </li>
          <li className="point">
            Убедится в моей ответственности и профессионализме можно
            <span style={{ color: "#4824ff" }}> написав клиентам</span>, <br />
            оставивших отзывы <span style={{ color: "#4824ff" }}>лично</span> в
            любой момент (отзывы клиентов выше).
          </li>
          <li className="point">
            Все <span style={{ color: "#4824ff" }}>авторские права</span> на
            работу переходят заказчику после выполнения заказа.
          </li>
          <li className="point">
            В своих работах использую материалы строго{" "}
            <span style={{ color: "#4824ff" }}>
              разрешённые для личного <br /> и коммерческого использования
            </span>
            .
          </li>
        </ol>
      </div>

      <div className="footer">Frontend</div>

      <button
        className={scroll < 1960 ? "" : isPortrait ? "btn-up" : "btn-up mobile"}
        onClick={upButton}
      ></button>
    </div>
  );
}

export default Main;
