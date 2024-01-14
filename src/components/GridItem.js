import React from 'react';

const GridItem = ({ label, onSelectItem, selected }) => {
  // Logic for handling clicks on grid items

  return (
    <button 
      className={`border-2 ${
        selected ? 'border-blue-500 bg-blue-100' : 'border-gray-300'
      } text-center p-3 w-full aspect-square cursor-pointer hover:bg-gray-200`}
      onClick={() => onSelectItem(label)}
    >
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}

export default GridItem;
