import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, Grid, Button, Box } from '@mui/material';
import { userService } from '../../services/userService';
import { useNavigate } from 'react-router-dom';
import '..//../App.css';
import RouteCard from '..//routes/RouteCard';
import RouteList from '..//routes/RouteList';
import ProductList from '..//products/ProductList';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import ContactInfo from '..//ContactInfo'

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await userService.getCurrentUser();
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError(error.message);
        if (error.response?.status === 401) {
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  if (loading) {
    return (
      <Container>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container>
        <Typography>No user data available</Typography>
      </Container>
    );
  }

  return (
          <div>
                  <div className="elements-box row-box header-box" style={{ background: "black" }}>
                    <div className="header-box-lists">
                      <h1 href="" className="font-text">Контакты</h1>
                      <h1 className="font-text">Корзина</h1>
                      <a href="#routes" className="font-text"
                        style={{fontWeight: "bold", alignSelf: "center", textDecoration: "none"}}>Маршруты
                      </a>
                      <a href="#lending" className="font-text"
                        style={{fontWeight: "bold", alignSelf: "center", textDecoration: "none"}}>Прокат
                      </a>
                              <h1 className="font-text">О нас</h1>
                              <h1 className="font-text">Фотогалерея</h1>
                            </div>
                            <div className="header-box-auth">
                              <h1 className="font-text">Добро пожаловать, {user.username}!</h1>
                            </div>
                          </div>
                          <div className="elements-box half-box"
                          style={{ background:"linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 31%), url(IMG_20240713_164135.jpg) center",
                            backgroundSize: "cover"}}>
                            <div style={{ paddingLeft: "5vw", paddingTop: "10vh" }}>
                              <h1 className="font-header light-shadow">Сплавы на байдарках</h1>
                              <div className="font-button button dark-shadow">Some button</div>
                            </div>
                          </div>
                        <div
                          className="elements-box text-box"
                          style={{ height: "auto", background: "black" }}
                        >
                          <p
                            style={{
                              paddingTop: 50,
                              paddingLeft: "5%",
                              paddingRight: "5%",
                              fontSize: 22,
                              color: "grey",
                              textAlign: "justify",
                              margin: 0,
                              textIndent: 30
                            }}
                          >
                            Устав от работы и ежедневной рутины, решили отдохнуть на природе? Или
                            хотите активно провести время с друзьями или коллегами вдали от городской
                            суеты? А может Вы просто любите приключения? В любом из этих случаев наша
                            команда профессионалов поможет Вам получить незабываемые впечатления от
                            живописных пейзажей, встречающихся тут и там на протяжении всего маршрута,
                            а также от увлекательного прохождения выбранной вами дистанции.
                          </p>
                        </div>
                        <div
                          className="elements-box row-box spacer-box"
                          style={{ height: "auto", background: "black" }}
                          >
                            <div className="spacer-box-line" />
                             <div className="spacer-box-text">
                                 <h1 id="routes" style={{ color: "#149ff9" }}>
                                    Наши маршруты
                                 </h1>
                              </div>
                             <div className="spacer-box-line" />
                        </div>
                        <div className="elements-box auto-box card-box" >
                          <RouteList/>
                        </div>
                        <div
                          className="elements-box row-box spacer-box"
                          style={{ height: "auto", background: "black" }}
                        >
                          <div className="spacer-box-line" />
                          <div className="spacer-box-text" style={{margin: 10}}>
                            <h1 id="lending" style={{ color: "#A6B6A4" }}>
                              Услуги и товары для проката
                            </h1>
                          </div>
                          <div className="spacer-box-line" />
                        </div>
                        <div className="elements-box auto-box card-box">
                          <ProductList/>
                        </div>
                        <div
                          className="elements-box row-box spacer-box"
                          style={{ height: "auto", background: "black" }}
                        >
                          <div className="spacer-box-line" />
                          <div className="spacer-box-text" style={{margin: 10}}>
                            <h1 id="shplau organisation" style={{ color: "#A6B6A4" }}>
                              Организация сплава
                            </h1>
                          </div>
                          <div className="spacer-box-line" />
                        </div>
                        <div
                          className="elements-box half-box spacer-box"
                          style={{ height: "auto", background: "#333" }}
                        >
                          <div className=" half-wide-box">
                            <h1 style={{ fontSize: 40, margin: 0, color: "grey" }}>
                              Вам нужно
                            </h1>
                            <ul style={{ paddingInlineStart: 0 }}>
                              <li>Забронировать сплав</li>
                              <li>Собрать необходимые вещи</li>
                              <li>Прибыть на место встречи</li>
                            </ul>
                          </div>
                          <div className=" half-wide-box">
                            <h1 style={{ fontSize: 40, margin: 0, color: "grey" }}>
                              Нам нужно
                            </h1>
                            <ul style={{ paddingInlineStart: 0 }}>
                              <li>Встретить Вас на месте встречи</li>
                              <li>Доставить на место сплава Вас и всё снаряжение</li>
                              <li>Транспортировать ваши вещи от начала маршрута к месту прибытия</li>
                              <li>Возвратить Вас домой после сплава</li>
                            </ul>
                          </div>
                        </div>
                        <div
                          className="elements-box row-box spacer-box"
                          style={{ background: "black" }}
                        >
                          <div className="spacer-box-line" />
                          <div className="spacer-box-text">
                            <h1 id="about us" style={{ color: "orange" }}>
                              О нас
                            </h1>
                          </div>
                          <div className="spacer-box-line" />
                        </div>
                        <div
                          className="elements-box auto-box card-box"
                          style={{ background: "#333" }}
                        >
                          <div
                            className="card"
                            style={{
                              width: 390,
                              height: 220,
                              border: 0,
                              background: "url(maxresdefault.jpg)",
                              backgroundSize: "cover"
                            }}
                          />
                          <div
                            className="card"
                            style={{
                              width: 320,
                              height: 220,
                              border: 0,
                              background: "url(1603804640_hqdefault.jpg)",
                              backgroundSize: "cover"
                            }}
                          />
                          <div
                            className="card"
                            style={{
                              width: 390,
                              height: 220,
                              border: 0,
                              background: "url(i.webp)",
                              backgroundSize: "cover"
                            }}
                          />
                        </div>
                        <div
                          className="elements-box row-box spacer-box"
                          style={{ background: "black" }}
                        >
                          <div className="spacer-box-line" />
                          <div className="spacer-box-text">
                            <h1 id="photos" style={{ color: "#A6B6A4" }}>
                              Фотогалерея
                            </h1>
                          </div>
                          <div className="spacer-box-line" />
                        </div>
                        <div
                          className="elements-box auto-box card-box"
                          style={{ background: "#333" }}
                        >
                          <div className="card" />
                          <div className="card" />
                          <div className="card" />
                          <div className="card" />
                        </div>
                        <div
                          className="elements-box half-box header-box"
                          style={{
                            height: "20vh",
                            backgroundColor: "black",
                            justifyContent: "left"
                          }}
                        >
                          <div className="header-box-lists" style={{ display: "flex", paddingLeft: 0, width: "50vw" }}>
                            <h1 className="font-text">Маршруты</h1>
                            <h1 className="font-text">Прокат</h1>
                            <h1 className="font-text">О нас</h1>
                            <h1 className="font-text">Корзина</h1>
                          </div>
                          <div className="header-box-lists" style={{ display: "flex", paddingLeft: 0, width: "50vw" }}>
                            <ContactInfo/>
                          </div>
                        </div>
          </div>
  );
};

export default Profile;