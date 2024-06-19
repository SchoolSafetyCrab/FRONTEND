import React from 'react';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        display: 'flex',
        alignItems: 'center',
        padding: '10px',
        backgroundColor: 'white',
        height: '3rem',
        zIndex: 1000,
      }}
    >
      <h1 style={{ margin: 0, fontSize: '1.5rem' }}>{title}</h1>
    </div>
  );
};

export default Header;
