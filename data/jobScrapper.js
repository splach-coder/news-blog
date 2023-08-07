const cheerio = require("cheerio");
const fs = require("fs");
const https = require("https");
const { v4: uuidv4 } = require("uuid");

const URL = "https://alwadifa-club.com/"; // Replace with the website URL you want to scrape

async function scrapeJobs() {
  try {
    https
      .get(URL, (response) => {
        let data = "";

        response.on("data", (chunk) => {
          data += chunk;
        });

        response.on("end", () => {
          const $ = cheerio.load(data);
          const jobs = [];
          const trends = [];

          $("article.jeg_post").each((index, element) => {
            const img = {};
            const src = $(element).find(".jeg_thumb img").attr("src");
            const alt = $(element).find(".jeg_thumb img").attr("alt");
            const decoding = $(element).find(".jeg_thumb img").attr("decoding");
            const dataSrc = $(element).find(".jeg_thumb img").attr("data-src");
            const dataSrcSet = $(element)
              .find(".jeg_thumb img")
              .attr("data-srcset");
            const dataLazyLoaded = $(element)
              .find(".jeg_thumb img")
              .attr("data-lazy-loaded");
            const loading = $(element).find(".jeg_thumb img").attr("loading");

            img.src = src;
            img.alt = alt;
            img.decoding = decoding;
            img.dataSrc = dataSrc;
            img.dataSrcSet = dataSrcSet;
            img.dataLazyLoaded = dataLazyLoaded;
            img.loading = loading;

            const title = $(element).find(".jeg_post_title a").text();
            const date = $(element).find(".jeg_meta_date a").text();
            const id = uuidv4(); // Generate a random unique ID

            jobs.push({ id, img, title, date });
          });

          $("div.jeg_news_ticker_item").each((index, element) => {
            const title = $(element).find("span:first-child a").text();
            const date = $(element).find("span.post-date").text();

            trends.push({ title, date });
          });

          const jobsJSON = { jobs, trends };
          const jsonData = JSON.stringify(jobsJSON, null, 2);

          fs.writeFile("data.json", jsonData, (err) => {
            if (err) throw err;
            console.log("Data has been written to jobs.json");
          });
        });
      })
      .on("error", (error) => {
        console.error("Error:", error);
      });
  } catch (error) {
    console.error("Error:", error);
  }
}

scrapeJobs();
