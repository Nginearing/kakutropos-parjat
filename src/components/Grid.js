import React, { useState } from 'react';
import GridItem from './GridItem';

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

const itemGroups = {
  'AVERY': 'YELLOW', 'ELA': 'YELLOW', 'NATALIE': 'YELLOW', 'TARAN': 'YELLOW',
  'SINGAPORE': 'GREEN', 'CANADA': 'GREEN', 'GERMANY': 'GREEN', 'CHINA': 'GREEN',
  'BRAZILIAN JIU JITSU': 'BLUE', 'GAME OF THRONES': 'BLUE', 'SUSHI': 'BLUE', 'PROGRAMMING': 'BLUE',
  'KNIFE': 'PURPLE', 'ANACONDA': 'PURPLE', 'SCISSOR': 'PURPLE', 'BASEBALL': 'PURPLE'
};

const groupColors = {
  'YELLOW': 'bg-yellow-300',
  'GREEN': 'bg-green-300',
  'BLUE': 'bg-blue-300',
  'PURPLE': 'bg-purple-300'
};

const Grid = () => {
  // Themes
  // Yellow: Wankers with Bad Breath : avery, ela, natalie, marissa
  // Green: Really cool, funny, smart and amazing people: Rohan,  
  // Blue: Things Rohan Likes: BJJ, GOT, Sushi, Programming 
  // Purple: ___ Chokes (Brazilian Jiu Jitsu): Knife, Anaconda, Scissor, Baseball 
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
      setGroups([...groups, selectedItems]);
      setSelectedItems([]);
    } else {
      setMistakes(mistakes + 1);
    }
  };

  const validateGroup = (selectedItems) => {
    const firstItemGroup = itemGroups[selectedItems[0]];
    return selectedItems.every(item => itemGroups[item] === firstItemGroup);
  };

  return (
    <div className="flex flex-col items-center py-10">
      <h2 className="text-lg mb-5">Create four groups of four!</h2>
      <div className="grid grid-cols-4 gap-4 max-w-lg mb-5">
        {items.map((item, index) => (
          <GridItem key={index} label={item} onSelectItem={handleItemClick} selected={selectedItems.includes(item)} />
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
