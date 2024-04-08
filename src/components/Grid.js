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
  'YELLOW': 'Roman Gods',
  'GREEN': 'Constellations',
  'BLUE': 'Gas Giants',
  'PURPLE': 'Things associated with the Sith'
}

const itemGroups = {
  'JUPITER': 'BLUE', 'PLUTO': 'YELLOW', 'NEPTUNE': 'BLUE', 'URANUS': 'BLUE',

   'VENUS': 'YELLOW', 'ORION': 'GREEN', 'ARIES': 'GREEN',  'SIDIOUS': 'PURPLE',

  'SCORPIUS': 'GREEN', 'CYGNUS': 'GREEN',  'RULE OF TWO': 'PURPLE', 'MARS': 'YELLOW',

  'ELECTRICITY': 'PURPLE', 'SATURN': 'BLUE', 'MERCURY': 'YELLOW', 'RED': 'PURPLE',
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
      alert("Already Guessed!");
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
    setGroups(prevGroups => {
      const newGroups = [...prevGroups, completedGroup];
      if (newGroups.length === Object.keys(themes).length) { 
        setGameFinished(true); // This will now check against the updated groups
      }
      return newGroups;
    });
    setItems(items.filter(item => !completedGroup.includes(item)));
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
        <h2 className="text-lg mb-5 font-semibold">Your Results:</h2>
        {guesses.map((guess, index) => (
          <div key={index} className="mb-2 flex items-center">
            <div className="flex">{renderGuessColors(guess)}</div>
          </div>
        ))}
        
        <button 
        onClick={() => copyToClipboard(formatGuessesForSharing())}
        className="mt-5 px-4 py-2 font-semibold border border-black rounded-lg bg-white text-black hover:bg-black hover:text-white transition-colors duration-300"
        >
          Copy & Share
        </button>

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


  const MistakesRemaining = ({ mistakes }) => {
    const totalMistakesAllowed = 4;
    // Calculate the index from which the circles should be visible (black)
    const firstVisibleCircleIndex = totalMistakesAllowed - mistakes;
  
    return (
      <div className="flex items-center text-center text-lg mb-5">
        <span className="mr-2">Mistakes remaining:</span>
        {[...Array(totalMistakesAllowed)].map((_, index) => (
          <div
            key={index}
            className={`ml-1 w-4 h-4 rounded-full ${
              index >= firstVisibleCircleIndex ? 'bg-transparent' : 'bg-black'
            }`}
          />
        ))}
      </div>
    );
  };

  const formatGuessesForSharing = () => {
    const emojiMap = {
      'YELLOW': '🟨',
      'GREEN': '🟩',
      'BLUE': '🟦',
      'PURPLE': '🟪'
    };
    
    const formattedGuesses = guesses.map(guess => {
      return guess.split(",").map(item => emojiMap[itemGroups[item]]).join('');
    }).join('\n');
    
    const shareText = `Rohan Connections\nPuzzle #1\n${formattedGuesses}`;
    return shareText;
  };
  
  const copyToClipboard = (text) => {
    if (navigator.clipboard) { 
      navigator.clipboard.writeText(text).then(() => {
        alert("Copied to clipboard!");
      }).catch(err => {
        console.error("Could not copy text: ", err);
      });
    } else {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      alert("Copied to clipboard!");
    }
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
  
          <MistakesRemaining mistakes={mistakes} />
  
          <div className="flex justify-center items-center space-x-5 text-black">
            <button 
              onClick={handleShuffle} 
              className="bg-white border border-black font-medium py-2 px-6 rounded-full hover:bg-neutral-300">
              Shuffle
            </button>
            <button 
              onClick={handleSubmit} 
              disabled={!isGuessValid()}
              className={`bg-white border text-black border-black font-medium py-2 px-6 rounded-full ${
                isGuessValid() ? 'hover:text-white bg-black hover:bg-neutral-700' : ''
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
