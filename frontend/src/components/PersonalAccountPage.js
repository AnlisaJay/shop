// PersonalAccountPage.js

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function PersonalAccountPage() {
  const [userData, setUserData] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const { userId } = useParams();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9001/user/${userId}`
        );
        setUserData(response.data.user);
      } catch (error) {
        setError("Ошибка при загрузке данных пользователя");
      }
    };

    fetchUserData();
  }, [userId]);

  const handleChangePassword = async () => {
    try {
      await axios.post(`http://localhost:9001/user/${userId}/change-password`, {
        newPassword
      });
      setSuccessMessage("Пароль успешно изменен");
    } catch (error) {
      setError("Ошибка при смене пароля");
    }
  };

  return (
    <div>
      <h2>Личный кабинет</h2>
      {userData ? (
        <div className="user-info">
          <p>Логин: {userData.login}</p>
          <p>Email: {userData.email}</p>
        </div>
      ) : (
        <p>Загрузка данных...</p>
      )}

      <div className="change-password-form">
        <h2>Смена пароля</h2>
        <input
          type="password"
          placeholder="Новый пароль"
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
        />
        <button onClick={handleChangePassword}>Изменить пароль</button>
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
}

export default PersonalAccountPage;
