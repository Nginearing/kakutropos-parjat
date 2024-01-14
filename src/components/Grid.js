import React, { useState } from 'react';
import GridItem from './GridItem';
import CompletedItem from './CompletedItem';

// Function to shuffle an array
// Utilizes the Fisher-Yates (aka Knuth) Shuffle
function shuffleArray(array) {
  let shuffledArray = array.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; // Swap elements
  }
  return shuffledArray;
}

const themes = {
  'YELLOW': 'Wankers with Bad Breath',
  'GREEN': 'Bangers',
  'BLUE': 'Rohan\'s favorites',
  'PURPLE': '____ Choke (BJJ)'
}
const itemGroups = {
  'AVERY': 'YELLOW', 'ELA': 'YELLOW', 'NATALIE': 'YELLOW', 'TARAN': 'YELLOW',
  'PIANOMAN': 'GREEN', 'ROBBERY PT.2': 'GREEN', '4PM IN CALABASAS': 'GREEN', 'YEAR 3000': 'GREEN',
  'BRAZILIAN JIU JITSU': 'BLUE', 'GAME OF THRONES': 'BLUE', 'SUSHI': 'BLUE', 'CODING': 'BLUE',
  'KNIFE': 'PURPLE', 'ANACONDA': 'PURPLE', 'SCISSOR': 'PURPLE', 'BASEBALL': 'PURPLE'
};

const groupColors = {
  'YELLOW': 'bg-yellow-400',
  'GREEN': 'bg-emerald-400',
  'BLUE': 'bg-blue-400',
  'PURPLE': 'bg-purple-400'
};

const Grid = () => {
  const [items, setItems] = useState(Object.keys(itemGroups));
  const [selectedItems, setSelectedItems] = useState([]);
  const [groups, setGroups] = useState([]);
  const [mistakes, setMistakes] = useState(0);


  // Shuffle items when the button is clicked
  const handleShuffle = () => {
    setItems(shuffleArray(items));
  };

  const handleItemClick = (item) => {
    const currentIndex = selectedItems.indexOf(item);
    if (currentIndex !== -1) {
      // Deselect the item
      setSelectedItems(selectedItems.filter((_, index) => index !== currentIndex));
    } else {
      // Select the item, but only if less than four have been selected
      if (selectedItems.length < 4) {
        setSelectedItems([...selectedItems, item]);
      }
    }
  };

  const handleSubmit = () => {
    if (selectedItems.length === 4 && validateGroup(selectedItems)) {
      handleGroupCompletion(selectedItems);
      setSelectedItems([]);
    } else {
      setMistakes(prevMistakes => prevMistakes + 1);
    }
  };

  const validateGroup = (selectedItems) => {
    const firstItemGroup = itemGroups[selectedItems[0]];
    return selectedItems.every(item => itemGroups[item] === firstItemGroup);
  };

  const handleGroupCompletion = (completedGroup) => {
    setGroups(prevGroups => [...prevGroups, completedGroup]);
    setItems(items.filter(item => !completedGroup.includes(item)));
  };

  return (
    <div className="flex flex-col items-center py-10">
      <h2 className="text-lg mb-5">Create four groups of four!</h2>

      {/* Render completed groups */}
      <div className="w-full max-w-lg mx-auto"> {/* Container for CompletedItems */}
        {groups.map((group, index) => {
          const groupTheme = themes[itemGroups[group[0]]];
          const groupColorClass = groupColors[itemGroups[group[0]]];
          return (
            <CompletedItem
              key={index}
              theme={groupTheme}
              items={group.join(", ")}
              colorClass={groupColorClass}
            />
          );
        })}
      </div>

      {/* Render grid items that are not yet completed */}
      <div className="grid grid-cols-4 gap-4 max-w-lg mb-5">
        {items.map((item) => (
          <GridItem
            key={item}
            label={item}
            onSelectItem={handleItemClick}
            selected={selectedItems.includes(item)}
          />
        ))}
      </div>

      <div className="text-center text-lg mb-5">Mistakes remaining: {4 - mistakes}</div>
      <button 
        onClick={handleSubmit} 
        className="text-white bg-purple-600 hover:bg-purple-700 font-medium py-2 px-6 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50"
      >
        Submit
      </button>
      <button 
        onClick={handleShuffle} 
        className="text-white bg-blue-500 hover:bg-blue-700 font-medium py-2 px-6 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mt-3"
      >
        Shuffle
      </button>
    </div>
  );
}

export default Grid;
