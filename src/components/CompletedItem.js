import React from 'react';

const CompletedItem = ({ theme, items, colorClass }) => {
  return (
    <div className={`p-4 mb-2 rounded shadow-md ${colorClass}`}>
      <h1 className="font-bold">{theme}</h1>
      <h2>{items}</h2>
    </div>
  );
};

export default CompletedItem;
