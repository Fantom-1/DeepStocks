
  document.addEventListener("DOMContentLoaded", () => {
    const newsList = document.getElementById("dynamic-news-list");

    fetch("https://www.alphavantage.co/query?function=NEWS_SENTIMENT&time_from=20220410T0130&limit=1000&apikey=LGOEX0OWFN6FC833") // 🔁 Replace with your actual API endpoint
      .then(response => response.json())
      .then(data => {
        const feed = data.feed.slice(0, 7); // Top 5 items from the API response

        feed.forEach(item => {
          const timeAgo = formatTimeAgo(item.time_published);
          const tags = item.ticker_sentiment.map(t => `<div class="news-tag">${t.ticker}</div>`).join("");

          const li = document.createElement("li");
          li.className = "news-item";
          li.innerHTML = `
            <div class="news-source">
              <div class="news-source-name">${item.source}</div>
              <div class="news-time">${timeAgo}</div>
            </div>
            <div class="news-title">
              <a href="${item.url}" target="_blank" rel="noopener noreferrer">${item.title}</a>
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

    function formatTimeAgo(apiTime) {
      const time = new Date(
        apiTime.substring(0, 4), // year
        apiTime.substring(4, 6) - 1, // month (0-indexed)
        apiTime.substring(6, 8), // day
        apiTime.substring(9, 11), // hour
        apiTime.substring(11, 13), // min
        apiTime.substring(13, 15) // sec
      );
      const now = new Date();
      const diff = Math.floor((now - time) / (1000 * 60 * 60)); // in hours
      return diff < 1 ? "Just now" : `${diff} hour${diff > 1 ? "s" : ""} ago`;
    }
  });

