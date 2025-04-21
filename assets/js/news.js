
  document.addEventListener("DOMContentLoaded", () => {
    const newsList = document.getElementById("dynamic-news-list");

    fetch("https://finnhub.io/api/v1/news?category=general&token=c5akqsiad3idkroh5png")
      .then(response => response.json())
      .then(data => {
        const feed = data.slice(0, 7); // Top 7 general news items

        feed.forEach(item => {
          const timeAgo = formatTimeAgo(item.datetime * 1000); // Convert UNIX timestamp to ms
          const tags = `<div class="news-tag">General</div>`; // Static tag as Finnhub general news doesn't include tickers

          const li = document.createElement("li");
          li.className = "news-item";
          li.innerHTML = `
            <div class="news-source">
              <div class="news-source-name">${item.source || "Unknown Source"}</div>
              <div class="news-time">${timeAgo}</div>
            </div>
            <div class="news-title">
              <a href="${item.url}" target="_blank" rel="noopener noreferrer">${item.headline}</a>
            </div>
            <div class="news-description">${item.summary || "No description available."}</div>
            <div class="news-tags">${tags}</div>
          `;

          newsList.appendChild(li);
        });
      })
      .catch(error => {
        console.error("Error fetching news:", error);
        newsList.innerHTML = "<li class='news-item'>Failed to load news.</li>";
      });

    function formatTimeAgo(unixTimeMs) {
      const time = new Date(unixTimeMs);
      const now = new Date();
      const diff = Math.floor((now - time) / (1000 * 60 * 60)); // in hours
      return diff < 1 ? "Just now" : `${diff} hour${diff > 1 ? "s" : ""} ago`;
    }
  });

