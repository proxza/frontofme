import { Telegraf } from "telegraf";
import fetch from "node-fetch";
import cheerio from "cheerio";
import cron from "node-cron";

async function fetchDataAndSendToChannel() {
  const response = await fetch("https://dtf.ru/");
  const body = await response.text();
  const $ = cheerio.load(body);
  // Вам нужно знать структуру сайта, чтобы выбрать правильные селекторы
  $("content__body").each((i, element) => {
    const likes = parseInt($(element).find("reaction-root content-footer__item content-footer__item--like").text());
    if (likes >= 70) {
      // Фильтрация постов по количеству лайков
      const message = formatMessage(element);
      bot.telegram.sendMessage("@smilevault", message, { parse_mode: "HTML" });
    }
  });
}

function formatMessage(element) {
  const title = $(element).find("content-title content-title--low-indent").text();
  const image = $(element).find("YOUR_IMAGE_SELECTOR").attr("src");
  const content = $(element).find("content__blocks").text();
  return `<b>${title}</b>\n${content}\n<img src="${image}" />`;
}

bot.launch();
console.log("Bot started!");
