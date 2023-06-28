import React from 'react';
import fs from 'fs';

const MyComponent = () => {
  const readFile = () => {
    const matches = fs.readFileSync('WAR ROOM - Highlight Stores (1)', { encoding: 'utf-8' }).split('\n');
    // Process the matches array or perform any desired operations
    console.log(matches);
  };

  return (
    <div>
      <button onClick={readFile}>Read File</button>
    </div>
  );
};

export default MyComponent;
