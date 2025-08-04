let targetRoom;
let rooms = [];

fetch('data/rooms.json')
  .then(res => res.json())
  .then(data => {
    rooms = data;
    targetRoom = rooms[Math.floor(Math.random() * rooms.length)];
  });

function handleGuess(input) {
  alert(input);
  const guess = rooms.find(room => room.name.toLowerCase() === input.toLowerCase());
  if (!guess) {
    alert("Room not found");
    return;
  }

  const feedback = compareRooms(guess, targetRoom);
  displayFeedback(guess.name, feedback);
}

function compareRooms(guess, target) {
  let feedback = {};
  ['height', 'width', 'room_number', 'floor', 'difficulty'].forEach(stat => {
    if (guess[stat] === target[stat]) {
      feedback[stat] = '✅';
    } else if (guess[stat] > target[stat]) {
      feedback[stat] = '⬆️';
    } else {
      feedback[stat] = '⬇️';
    }
  });
  return feedback;
}

function displayFeedback(roomName, feedback) {
  const guessesDiv = document.getElementById('guesses');

  // Create a new row for this guess
  const row = document.createElement('div');
  row.classList.add('guess-row');

  // Add room name
  const nameEl = document.createElement('span');
  nameEl.textContent = roomName + ": ";
  nameEl.classList.add('room-name');
  row.appendChild(nameEl);

  // For each stat, add the feedback emoji
  for (const stat of ['height', 'width', 'room_number', 'floor', 'difficulty']) {
    const statEl = document.createElement('span');
    statEl.textContent = feedback[stat];
    statEl.title = stat; // Tooltip for clarity
    statEl.classList.add('stat-icon');
    row.appendChild(statEl);
  }

  // Add the row to the guess list
  guessesDiv.appendChild(row);
}
