# 🚀 LeetCode GTA: SUBMISSION STATUS++

Bring the iconic GTA-style overlays to your LeetCode journey!  
See "SUBMISSION REJECTED" for failed runs (Wrong Answer, TLE, Compile Error) and  
"MISSION PASSED: Respect ++" for accepted solutions — complete with immersive visuals and sound effects.

---

## ⭐ Star and Fork the Repository ⭐

If you enjoy this extension, please star ⭐ and fork 🍴 the repository!

- Starring shows support and helps others discover the project  
- Forking lets you customize it and even contribute improvements

---

## 🎮 Features

**Visual Feedback**

- ❌ "SUBMISSION REJECTED" overlay for:
  - Wrong Answer
  - Time Limit Exceeded (TLE)
  - Compile Error

- ✅ "MISSION PASSED: Respect ++" overlay for Accepted submissions

**Audio Cues**

- GTA-style jingle for rejection  
- Celebration jingle for acceptance

**Customizable**

- Replace images/audio in `assets/` with your own

**Improved Styling**

- Cleaner overlays with better positioning and animations

**Usable Cursor**

- You can still click and interact with the page even while the overlay is showing

**Lightweight**

- Runs efficiently with minimal performance impact

---

## 🛠️ How It Works

The extension injects a content script into LeetCode problem pages.  
It listens for submission results and shows the appropriate GTA-style overlay.

**Key Files**

- `manifest.json` – Configures the extension (name, permissions, scripts)  
- `content_script.js` – Core logic. Detects submission results and triggers the overlay  
- `submission.css` – Overlay styling (polished and cursor-friendly)  
- `assets/` – Images and sounds used:
  - `wasted.png` → "SUBMISSION REJECTED" image  
  - `mission_passed.png` → "MISSION PASSED: Respect ++" image  
  - `wasted.mp3` → Jingle for rejection  
  - `mission_passed.mp3` → Jingle for acceptance  
  - `icon16.png`, `icon32.png`, `icon48.png`, `icon128.png` → Extension icons

---

## 👨‍💻 Installation and Usage (Local Setup)

**1. Download the Code**

Clone or download this repository to your local machine.

**2. Prepare Your Assets**

Place your chosen files in the `assets/` folder:

- `wasted.png`  
- `mission_passed.png`  
- `wasted.mp3`  
- `mission_passed.mp3`

**3. Load the Extension in Chrome**

- Open Chrome and go to `chrome://extensions`  
- Enable Developer mode (toggle in top-right)  
- Click "Load unpacked"  
- Select the folder where you downloaded this repository

**4. Verify Assets**

- Open any LeetCode problem page  
- Open Developer Tools → Console  
- You should see URLs for `wasted.png`, `mission_passed.png`, etc.  
- Test them by pasting each `chrome-extension://<ID>/assets/...` URL into a new tab

**5. Test It Out**

- Submit a wrong solution → You’ll see "SUBMISSION REJECTED"  
- Submit a correct solution → You’ll see "MISSION PASSED: Respect ++"

---

## ⚠️ Disclaimer

Do not use copyrighted assets from Rockstar Games or GTA if you plan to publish this extension publicly.  
Always use royalty-free or your own original art/audio.

---

## 📜 License

You are free to use, modify, and distribute this project under the terms of the MIT License.  
See the [LICENSE](LICENSE) file for full details.

---

## 🎥 Demo GIFs

### Accepted Submission
![Accepted Submission](assets/success.png)

### Rejected / Wasted Submission
![Rejected Submission](assets/wasted.png)