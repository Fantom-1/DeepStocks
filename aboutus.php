<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>About Us - Team Cards</title>
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    body {
      background: #1e1e2f;
      color: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 50px 20px;
    }

    h1 {
      margin-bottom: 40px;
      font-size: 3em;
      color: #3B82F6;
    }

    .card-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 30px;
    }

    .card {
      width: 250px;
      height: 350px;
      background: linear-gradient(145deg, #222238, #1b1b29);
      border-radius: 20px;
      box-shadow: 0 0 20px rgba(255, 79, 145, 0.3);
      overflow: hidden;
      transition: 0.3s ease;
      cursor: pointer;
      position: relative;
    }

    .card:hover {
      transform: scale(1.05);
      box-shadow: 0 0 30px #3B82F6;
    }

    .card img {
      width: 100%;
      height: 60%;
      object-fit: cover;
    }

    .card h2 {
      text-align: center;
      margin: 10px 0;
      font-size: 1.4em;
      color: #3B82F6;
    }

    .card p {
      text-align: center;
      font-size: 0.9em;
      color: #bbb;
    }

    .popup {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0, 0, 0, 0.8);
      backdrop-filter: blur(8px);
      display: none;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .popup-content {
      background: #2b2b3d;
      padding: 30px;
      border-radius: 20px;
      width: 80%;
      max-width: 500px;
      text-align: center;
      color: #fff;
      position: relative;
    }

    .popup-content h2 {
      color:#3B82F6;
      margin-bottom: 10px;
    }

    .popup-content p {
      font-size: 1em;
    }

    .close-btn {
      position: absolute;
      top: 15px;
      right: 20px;
      font-size: 1.5em;
      cursor: pointer;
      color: #fff;
    }
  </style>
</head>
<body>
  <h1>Meet Our Team</h1>
  <div class="card-container">
    <div class="card" onclick="showPopup(0)">
      <img src="member1.jpg" alt="Member 1">
      <h2>Neeraj</h2>
      <p>Market Research</p>
    </div>
    <div class="card" onclick="showPopup(1)">
      <img src="member2.jpg" alt="Member 2">
      <h2>Pratyum</h2>
      <p>UI/UX Designer</p>
    </div>
    <div class="card" onclick="showPopup(2)">
      <img src="member3.jpg" alt="Member 3">
      <h2>Ashwin</h2>
      <p>Frontend Developer</p>
    </div>
    <div class="card" onclick="showPopup(3)">
      <img src="member4.jpg" alt="Member 4">
      <h2>Yash</h2>
      <p>Backend Developer</p>
    </div>
    <div class="card" onclick="showPopup(4)">
      <img src="member5.jpg" alt="Member 5">
      <h2>Prayag</h2>
      <p>Database Handler</p>
    </div>
  </div>

  <div class="popup" id="popup">
    <div class="popup-content">
      <span class="close-btn" onclick="closePopup()">&times;</span>
      <h2 id="popupName"></h2>
      <p id="popupDesc"></p>
    </div>
  </div>

  <script>
    const members = [
      { name: "Neeraj", desc: "Neeraj focuses on gathering relevant stock market data and trends. He ensures our analysis is based on accurate and up-to-date information." },
      { name: "Pratyum", desc: "Pratyum designs clean and intuitive interfaces that make our platform easy to navigate. He focuses on user experience and visual clarity in stock data presentation." },
      { name: "Ashwin", desc: "Ashwin creates interactive frontend interfaces for Login/Sign Up/Support. He also uses PHP to smoothly connect the MySQL database with the frontend, ensuring seamless data flow." },
      { name: "Yash", desc: "Yash handles server-side development and API integration for real-time stock data. He connects the frontend with powerful backend logic for seamless performance." },
      { name: "Prayag", desc: "Prayag manages our MySQL database, storing all stock information securely. He structures the data for fast and reliable access during analysis" }
    ];

    function showPopup(index) {
      document.getElementById('popupName').innerText = members[index].name;
      document.getElementById('popupDesc').innerText = members[index].desc;
      document.getElementById('popup').style.display = 'flex';
    }

    function closePopup() {
      document.getElementById('popup').style.display = 'none';
    }
  </script>
</body>
</html>
