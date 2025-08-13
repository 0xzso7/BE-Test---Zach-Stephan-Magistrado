const express = require('express');
const app = express();
const PORT = 8000;

app.use(express.json());

let lettersDB = [
  { letter: "A", value: 1, strokes: 2, vowel: true },
  { letter: "B", value: 2, strokes: 1, vowel: false }
];

function validateUsername(username) {
  username = username.toLowerCase();
  if (username.length < 4) return false;
  let aIndex = username.indexOf('a');
  let bIndex = username.indexOf('b', aIndex + 1);
  let cIndex = username.indexOf('c', bIndex + 1);
  return aIndex !== -1 && bIndex !== -1 && cIndex !== -1;
}

function shuffleArray(arr) {
  let array = [...arr];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

//  Routes 

// 1. Login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (!validateUsername(username)) {
    return res.status(400).json({ error: "Invalid username" });
  }
  if (password !== username.split("").reverse().join("")) {
    return res.status(400).json({ error: "Invalid password" });
  }
  res.json({ status: "Login successful" });
});

// 2. List letters
app.get('/api/letters', (req, res) => {
  const sorted = [...lettersDB].sort((a, b) => a.value - b.value);
  res.json({ letters: sorted.map(l => l.letter) });
});

// 3. Add letter
app.post('/api/letter/add', (req, res) => {
  const { letter, value, strokes, vowel } = req.body;

  if (lettersDB.some(l => l.letter === letter)) {
    return res.json({ status: 1 });
  }
  if (value === strokes) {
    return res.json({ status: 1 });
  }

  lettersDB.push({ letter, value, strokes, vowel });
  res.json({ status: 0 });
});

// 5. Shuffle letters
app.get('/api/letter/shuffle', (req, res) => {
  const shuffled = shuffleArray(lettersDB.map(l => l.letter));
  res.json({ shuffled: shuffled.join('') });
});

// 6. Filter letters
app.get('/api/letter/filter/:val', (req, res) => {
  const val = parseInt(req.params.val, 10);
  const filtered = lettersDB.filter(l => l.value <= val);
  res.json({ letters: filtered.map(l => l.letter) });
});

// 4. Get letter
app.get('/api/letter/:letter', (req, res) => {
  const found = lettersDB.find(l => l.letter === req.params.letter);
  if (!found) return res.status(404).json({ error: "Letter not found" });
  res.json(found);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
 