import React from "react";

const ContactInfo = () => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText('+375295597754');
    alert('Номер скопирован!');
  };

  return (
    <div className="header-box-lists" style={{ paddingLeft: 0, width: "50vw" }}>
      <h1 className="font-text" style={{ display: "inline-block", marginRight: "10px" }}>Контакты:</h1>
      <div style={{ display: "inline-block", cursor: "pointer", color: "blue", textDecoration: "underline" }} onClick={copyToClipboard}>
        +375295597754 (Олег)
      </div>
      <div style={{ marginTop: "10px" }}>
        <a
          href="https://t.me/zh0r1k0r1k"  // Замените на ваш реальный URL телеграм-профиля
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "blue", textDecoration: "underline" }}
        >
          Связаться в Телеграм
        </a>
      </div>
    </div>
  );
};

export default ContactInfo;
