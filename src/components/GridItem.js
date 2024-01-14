import React from 'react';

const GridItem = ({ label, onSelectItem, selected }) => {
  // Logic for handling clicks on grid items

  return (
    <button 
      className={`border-2 ${
        selected ? 'bg-neutral-600 text-white bg-blue-100' : 'bg-stone-200 text-black'
      } text-center p-3  w-full aspect-square cursor-pointer rounded-lg border-none`}
      onClick={() => onSelectItem(label)}
    >
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}

export default GridItem;
