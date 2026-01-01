# Snake Game

---

# 🐍 Snake Game – JavaScript

A classic Snake Game built using **HTML, CSS, and Vanilla JavaScript**.
The game features real-time movement, score tracking, high score persistence using `localStorage`, and a clean modern UI.

---

## 🎮 Features

* Dynamic grid generation
* Smooth snake movement
* Random food generation
* Wall collision detection
* Score & High Score system
* High Score saved using `localStorage`
* Start & Restart Game Modal
* Real-time Timer

---

## 🛠 Tech Stack

* HTML5
* CSS3
* JavaScript (ES6)

---

## 📂 Project Structure

```
/snake-game
 ├── index.html
 ├── style.css
 └── script.js
```

---

## 🚀 How to Run the Game

1. Download or clone the repository
2. Open `index.html` in any modern browser
3. Click **Start Game** to begin

---

## 🎯 Controls

| Key           | Action     |
| ------------- | ---------- |
| ⬅ Arrow Left  | Move Left  |
| ➡ Arrow Right | Move Right |
| ⬆ Arrow Up    | Move Up    |
| ⬇ Arrow Down  | Move Down  |

---

## 🧠 Game Logic

* The snake moves every **300ms**
* Food appears randomly on the grid
* On eating food:

  * Snake grows
  * Score increases by **10 points**
* If snake hits the wall → Game Over
* High Score is stored permanently in browser

---

## 🏆 High Score System

High score is saved using:

```js
localStorage.setItem('highScore', score);
```

So it remains even after page reload.

---

## ⏱ Timer

The timer starts when the game begins and updates every second.



Happy Coding! 🎉
