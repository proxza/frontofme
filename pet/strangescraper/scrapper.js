const puppeteer = require("puppeteer");
const fs = require("node:fs");
const DB = "playlist.txt";

async function webScrapper(url) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", '--user-agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"'],
  });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle0" }); // Ожидание завершения загрузки сетевых запросов
  // Select all the titles of the news items based on their class and extract their text.

  // Эмуляция прокрутки до конца страницы для подгрузки всего контента
  await autoScroll(page);

  try {
    const tracks = await page.evaluate(() => {
      // Находим все контейнеры треков
      const trackContainers = document.querySelectorAll(".flex-columns.style-scope.ytmusic-responsive-list-item-renderer");
      const tracksInfo = Array.from(trackContainers).map((container) => {
        //counter++;
        // В каждом контейнере ищем название трека
        const trackNameElement = container.querySelector(".title-column .title.style-scope.ytmusic-responsive-list-item-renderer.complex-string a");
        const trackName = trackNameElement ? trackNameElement.innerText : "Название трека не найдено";

        // А также ищем имя артиста
        const artistNameElement = container.querySelector(".secondary-flex-columns .flex-column.style-scope.ytmusic-responsive-list-item-renderer.complex-string a");
        const artistName = artistNameElement ? artistNameElement.innerText : "Имя артиста не найдено";

        return { artistName, trackName };
      });

      return tracksInfo;
    });
    saveToDb(tracks);
    console.log(tracks.length);
  } catch (error) {
    console.error("Ошибка при извлечении треков:", error);
  }

  //console.log(tracks.length);

  browser.close();
}

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve, reject) => {
      var totalHeight = 0;
      var distance = 150; // Измените, если нужно больше или меньше прокрутки за раз
      var timer = setInterval(() => {
        var scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100); // Интервал между прокрутками
    });
  });
}

function saveToDb(obj) {
  const content = JSON.stringify(obj, null, 2);
  console.log(content);
  fs.writeFile(DB, content, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("File written successfully");
    }
  });
}

webScrapper("https://music.youtube.com/playlist?list=PLgOHOHjGdyVLzkmUets2IV_eJaWuOjYQV");
