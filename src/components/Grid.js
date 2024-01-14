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
  const [guesses, setGuesses] = useState([]);
  const [gameFinished, setGameFinished] = useState(false);


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
    const guessString = selectedItems.sort().join(",");
    const newGuesses = [...guesses, guessString];
    if (guesses.includes(guessString)) {
      alert("You have already made this guess.");
      return;
    }
    
    setGuesses(newGuesses);
  
    // Check if the user is one item away from a correct group
    if (selectedItems.length === 4) {
      const closeGuess = selectedItems.some((selectedItem, _, arr) => {
        const otherItems = arr.filter(item => item !== selectedItem); // Remove one item
        return items.some(item => {
          if (!otherItems.includes(item) && !selectedItems.includes(item)) {
            return validateGroup([...otherItems, item]); // Check if the new combination is valid
          }
          return false;
        });
      });
  
      if (closeGuess) {
        alert("One Away...");
      }
    }
  
    if (validateGroup(selectedItems)) {
      handleGroupCompletion(selectedItems);
      setSelectedItems([]);
    } else {
      setMistakes(prevMistakes => {
        const newMistakes = prevMistakes + 1;
        if (newMistakes === 4) {
          alert("Here are all your guesses: " + newGuesses.join(" | "));
          setGameFinished(true);
        }
        return newMistakes;
      });
    }
  };
  
  

  const validateGroup = (selectedItems) => {
    const firstItemGroup = itemGroups[selectedItems[0]];
    return selectedItems.every(item => itemGroups[item] === firstItemGroup);
  };

  const handleGroupCompletion = (completedGroup) => {
    setGroups(prevGroups => [...prevGroups, completedGroup]);
    setItems(items.filter(item => !completedGroup.includes(item)));
    if (groups.length === 4) {
      setGameFinished(true);
    }
  };

  const isGuessValid = () => {
    const guessString = selectedItems.sort().join(",");
    return selectedItems.length === 4 && !guesses.includes(guessString) && mistakes<4;
  };

  const renderGameResults = () => {
    const renderGuessColors = (guess) => {
      return guess.split(",").map((item, index) => (
        <div key={index} className={`inline-block w-6 h-6 ${groupColors[itemGroups[item]]} mx-1`}></div>
      ));
    };
  
    return (
      <div className="flex flex-col items-center w-full max-w-lg mx-auto mt-5">
        <h2 className="text-lg mb-5">Your Results:</h2>
        {guesses.map((guess, index) => (
          <div key={index} className="mb-2 flex items-center">
            <div className="flex">{renderGuessColors(guess)}</div>
          </div>
        ))}
        <div className='mt-5'>
          {Object.keys(themes).map((themeKey, index) => {
            const items = Object.keys(itemGroups).filter(item => itemGroups[item] === themeKey);
            return (
              <CompletedItem
                key={index}
                theme={themes[themeKey]}
                items={items.join(", ")}
                colorClass={groupColors[themeKey]}
              />
            );
          })}
        </div>
      </div>
    );
  };
  
  


  return (
    <div className="flex flex-col items-center py-5">
      
  
      {!gameFinished ? (
        <>
          {/* Render completed groups */}
          <h2 className="text-lg mb-5">Create four groups of four!</h2>
          <div className="w-full max-w-lg mx-auto">
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
  
          <div className="flex justify-center items-center space-x-5 text-black">
            <button 
              onClick={handleShuffle} 
              className="bg-white border border-black font-medium py-2 px-6 rounded-full hover:bg-neutral-300">
              Shuffle
            </button>
            <button 
              onClick={handleSubmit} 
              disabled={!isGuessValid()}
              className={`bg-white border border-black font-medium py-2 px-6 rounded-full ${
                isGuessValid() ? 'text-white bg-black hover:bg-neutral-700' : ''
              }`}>
              Submit
            </button>
          </div>
        </>
      ) : ( renderGameResults())}
    </div>
  );
  
}

export default Grid;
