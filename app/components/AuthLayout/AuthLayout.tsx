import React from "react";
import "./AuthLayout.css";

interface AuthLayoutProps {
  title: string;
  children: React.ReactNode;
  imageSrc: string;
  imageAlt?: string;
  footerText: string;
  footerLinkText: string;
  footerLinkHref: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  title,
  children,
  imageSrc,
  imageAlt = "Illustration",
  footerText,
  footerLinkText,
  footerLinkHref,
}) => {
  return (
    <div className="auth-layout">
      <div className="auth-layout__container">
        {/* Logo Flutuante (Mobile/Desktop) */}
        <div className="auth-layout__logo-container">
          <img
            src="/favicon.svg"
            alt="LearnGami Logo"
            className="auth-layout__logo"
          />
          <h1 className="auth-layout__logo-title">LearnGami</h1>
        </div>

        {/* Card do Formulário */}
        <div className="auth-layout__card">
          <h1 className="auth-layout__title title">{title}</h1>

          <div className="auth-layout__form-wrapper">{children}</div>

          <div className="auth-layout__footer">
            <p>
              {footerText}{" "}
              <a href={footerLinkHref} className="auth-layout__link">
                {footerLinkText}
              </a>
            </p>
          </div>
        </div>

        {/* Imagem Lateral */}
        <div className="auth-layout__image-container">
          <div className="auth-layout__image-overlay"></div>
          <img src={imageSrc} alt={imageAlt} className="auth-layout__image" />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
