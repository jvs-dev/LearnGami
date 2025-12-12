import React from "react";
import Link from "next/link";
import "./ContinueWatchingCard.css";

interface ContinueWatchingCardProps {
  courseId: number | string;
  courseTitle: string;
  lessonName: string;
  onDismiss?: () => void;
}

const ContinueWatchingCard: React.FC<ContinueWatchingCardProps> = ({
  courseId,
  courseTitle,
  lessonName,
  onDismiss,
}) => {
  return (
    <div className="continue-watching-card">
      <div className="continue-watching-card__content">
        <div className="continue-watching-card__text">
          <h3 className="continue-watching-card__title">Continue de onde parou</h3>          
          <p className="continue-watching-card__lesson">Aula: {lessonName}</p>
        </div>
        <div className="continue-watching-card__actions">
          <Link 
            href={`/curso/${courseId}`} 
            className="continue-watching-card__button continue-watching-card__button--continue"
          >
            Continuar
          </Link>
          {onDismiss && (
            <button 
              onClick={onDismiss}
              className="continue-watching-card__button continue-watching-card__button--dismiss"
              aria-label="Dispensar sugestão"
            >
              <i className="bi bi-x"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContinueWatchingCard;