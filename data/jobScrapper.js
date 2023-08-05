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

          $("article.jeg_post").each((index, element) => {
            const img = $(element).find(".jeg_thumb img").attr("src");
            const title = $(element).find(".jeg_post_title a").text();
            const date = $(element).find(".jeg_meta_date a").text();
            const id = uuidv4(); // Generate a random unique ID

            jobs.push({ id, img, title, date });
          });

          const jobsJSON = { jobs };
          const jsonData = JSON.stringify(jobsJSON, null, 2);

          fs.writeFile("jobs.json", jsonData, (err) => {
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
