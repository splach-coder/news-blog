const id = getIdFromUrl();

console.log(id);

$.ajax({
  url: "./data/data.json",
  type: "GET",
  dataType: "json",
  success: function (data) {
    const item = findObjectById(data, id);
    console.log(item);
    $("#main-image").attr("src", item.img.dataSrc);
    $("#main-image").attr("alt", item.img.alt);
    $("#main-image").attr("decoding", item.img.decoding);
    $("#main-date").text(item.date);
    $("#main-news").html(item.text);
  },
  error: (jqXHR, textStatus, errorThrown) => console.log(errorThrown),
});
