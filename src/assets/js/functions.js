function getArabicFormattedDate() {
  const arabicDays = [
    "الأحد",
    "الاثنين",
    "الثلاثاء",
    "الأربعاء",
    "الخميس",
    "الجمعة",
    "السبت",
  ];
  const arabicMonths = [
    "يناير",
    "فبراير",
    "مارس",
    "أبريل",
    "مايو",
    "يونيو",
    "يوليو",
    "أغسطس",
    "سبتمبر",
    "أكتوبر",
    "نوفمبر",
    "ديسمبر",
  ];

  const today = new Date();
  const dayIndex = today.getDay();
  const day = arabicDays[dayIndex];

  const date = today.getDate();
  const monthIndex = today.getMonth();
  const month = arabicMonths[monthIndex];

  const year = today.getFullYear();

  const formattedDate = `${day} ، ${date} ${month} ${year}`;
  return formattedDate;
}

function getIdFromUrl(url) {
  try {
    const urlObject = new URL(window.location.href);
    const id = urlObject.searchParams.get("id");
    return id;
  } catch (error) {
    console.error("Error extracting ID from URL:", error);
    return null;
  }
}

function findObjectById(data, id) {
  return data.jobs.find((item) => item.id === id);
}

function isArabic(text) {
  // Regular expression to match Arabic characters
  const arabicPattern = /[\u0600-\u06FF]/;
  return arabicPattern.test(text);
}

function truncateWordsAndAddEllipsis(text, maxWords) {
  const words = text.split(" ");

  if (words.length <= maxWords) {
    return text;
  } else {
    const truncatedText = words.slice(0, maxWords).join(" ");
    if (isArabic(truncatedText)) {
      return truncatedText + "...";
    }
    return truncatedText + "...";
  }
}
