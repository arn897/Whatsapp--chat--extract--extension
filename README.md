# Whatsapp--chat--extract--extension
# 📊 WhatsApp Data to Excel - Chrome Extension

This Chrome Extension helps users **analyze WhatsApp group expenses or transactions** by uploading an exported `.txt` chat file and exporting the aggregated payment data to an Excel file.

---

## 🚀 Features

- 📂 Upload `.txt` file exported from WhatsApp chats  
- 📅 Filter messages by date and time range  
- 🔎 Detect payment-related messages (like `1 = ₹100`, `2,3 = ₹50`, etc.)  
- ➕ Automatically sum total paid amounts per person ID  
- 📤 Export results to `.xlsx` format using SheetJS  
- 💯 Supports up to 100 participants per group

---

## 🧠 How It Works

1. Export your WhatsApp group chat as a **`.txt` file** (without media).
2. Load the file in the extension popup.
3. Set a **start and end date/time** for message filtering.
4. The extension parses and aggregates amounts like:

1 = ₹100
2,3 = ₹150

5. Download the results as an **Excel spreadsheet**.

---

## 📦 Installation

1. Clone or download this repository.
2. Open **Chrome** and go to `chrome://extensions/`.
3. Enable **Developer Mode** (top-right toggle).
4. Click **Load Unpacked** and select the `whatsapp-chat-extention` folder.
5. The extension icon will appear in your Chrome toolbar.

---

## 📁 File Structure


whatsapp-chat-extention/
├── manifest.json # Chrome extension config
├── popup.html # Extension popup UI
├── popup.js # Parsing and aggregation logic
└── xlsx.full.min.js # SheetJS for Excel export


---

## 📷 Screenshots

*(Add screenshots here to show the UI and output Excel if desired)*

---

## 🔐 Permissions

This extension does **not** request any special permissions. All processing is done **locally** in the browser. No data is sent externally.

---

## 📄 Exported Chat Format Example

To work correctly, the `.txt` file should follow WhatsApp's default format:

12/05/24, 10:15 am - User: 1 = ₹100
12/05/24, 11:30 am - User: 2,3 = ₹50


---

## 📥 Output Excel Example

| ID  | Amount |
|-----|--------|
| 1   | 100    |
| 2   | 50     |
| 3   | 50     |

---

## 🙋‍♂️ Contributing

Pull requests and feedback are welcome! If you find a bug or want a new feature, feel free to open an issue or submit a PR.

---

