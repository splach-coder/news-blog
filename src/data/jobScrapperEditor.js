const cheerio = require("cheerio");
const fs = require("fs");
const https = require("https");

// Function to scrape the specified text from the URL
function scrapeTextFromUrl(URL) {
  return new Promise((resolve, reject) => {
    https.get(URL, (response) => {
      let data = "";

      response.on("data", (chunk) => {
        data += chunk;
      });

      response.on("end", () => {
        const $ = cheerio.load(data);

        const text = $(".jeg_inner_content .content-inner").html();

        resolve(text); // Resolve the Promise with the scraped text
      });

      response.on("error", (error) => {
        reject(error); // Reject the Promise if there's an error
      });
    });
  });
}

// Read the JSON data from data.json
fs.readFile(
  "C:/xampp/htdocs/jobhub/src/data/data.json",
  "utf8",
  async (err, data) => {
    if (err) {
      console.error("Error reading data.json:", err.message);
      return;
    }

    const jsonData = JSON.parse(data);

    // Iterate through each object in the JSON array
    for (const obj of jsonData.jobs) {
      // Scrape the text from the URL and update the JSON object
      if (obj.url != undefined) {
        await scrapeTextFromUrl(obj.url)
          .then((text) => {
            const Text = filterHTML(obj.url, text);
            obj.text = Text; // Output the scraped text
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    }

    //Write the updated JSON data back to data.json
    const updatedData = JSON.stringify(jsonData, null, 2);
    fs.writeFile("data.json", updatedData, (err) => {
      if (err) {
        console.error("Error writing to data.json:", err.message);
      } else {
        console.log("Text has been scraped and added to data.json");
      }
    });
  }
);

function filterHTML(url, htmlCode) {
  const cheerio = require("cheerio");

  // Load the HTML code using Cheerio
  const $ = cheerio.load(htmlCode);

  $("p[style*='text-align: justify;']").each(function () {
    const span = $(this).find("span").first();

    if (span.length > 0) {
      const content = span.text().trim();
      const isArabicLang = isArabic(content);

      // Set text-align based on language
      const parentP = $(this);
      span.css({
        "font-size": "16pt",
      });

      if (isArabicLang) {
        parentP.css({
          "text-align": "right",
        });
      } else {
        parentP.css({
          "text-align": "left",
        });
      }
    } else {
      const content = $(this).text().trim();
      const isArabicLang = isArabic(content);

      // Set text-align based on language
      const parentP = $(this);
      if (isArabicLang) {
        parentP.css({
          "text-align": "right",
          "font-size": "16pt",
        });
      } else {
        parentP.css({
          "text-align": "left",
          "font-size": "16pt",
        });
      }
    }
  });

  // Filter images
  $("img").each((index, element) => {
    $(element).removeAttr("srcset"); // Remove srcset attribute
    $(element).attr("width", "100%"); // Set width attribute to 100%
    $(element).attr("height", "500px"); // Set height attribute to 500px
  });

  // Filter anchor tags
  $("a").each((index, element) => {
    const href = $(element).attr("href");
    if (
      !href ||
      (!href.startsWith("https") && href.includes("alwadifa-club.com"))
    ) {
      const parent = $(element).parent();
      if (parent.is("p")) {
        parent.remove(); // Remove the parent <p> tag
      } else if (parent.parent().is("p")) {
        parent.parent().remove(); // Remove the grandparent <p> tag
      }
    }
  });

  $(".jeg_post_tags a").each(function () {
    $(this).attr("href", "#");
  });

  const tags = tgs();
  tags.forEach((element) => {
    $(".jeg_post_tags").append(`
        <a href="#" rel="tag"> ${element} </a>
    `);
  });

  // Remove divs with class "jeg_ad"
  $("div.jeg_ad").remove();

  $("body").append(`<a href="${url}" class="source">Source</a>`);

  // Return the filtered HTML code
  return $.html();
}

function isArabic(text) {
  // Regular expression to match Arabic characters
  const arabicPattern = /[\u0600-\u06FF]/;
  return arabicPattern.test(text);
}

function tgs() {
  const tags = [
    "emploi public",
    "offres d'emploi",
    "place emploi public gouv",
    "concours d'emploi",
    "الوظيفة العمومية نيفو باك",
    "الوظيفة العمومية المغرب ",
    "مباريات التوظيف ",
    "مستجدات الوظيفة ",
    "maroc emploi public",
    "depot emploi public",
  ];

  return tags;
}
