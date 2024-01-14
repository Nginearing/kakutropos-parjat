import React from 'react';

const CompletedItem = ({ theme, items, colorClass }) => {
  return (
    <div className={`flex justify-center items-center ${colorClass} p-4 mb-2 rounded shadow-md h-28 max-w-5xl`}>
      <div className="text-center">
        <h1 className="font-bold">{theme}</h1>
        <h2 className="text-sm">{items}</h2>
      </div>
    </div>
  );
};

export default CompletedItem;
