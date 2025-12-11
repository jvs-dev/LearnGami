import React from 'react';
import './StatusBadge.css';

interface StatusBadgeProps {
  isActive: boolean;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ isActive }) => {
  return (
    <span className={`status-badge ${isActive ? 'status-badge--active' : 'status-badge--inactive'}`}>
      {isActive ? 'Ativo' : 'Inativo'}
    </span>
  );
};

export default StatusBadge;