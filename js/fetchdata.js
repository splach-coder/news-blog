(function ($) {
  "use strict";

  $(document).ready(function () {
    $.ajax({
      url: "./data/data.json",
      type: "GET",
      dataType: "json",
      success: function (data) {
        // 'data' contains the JSON data retrieved from the server

        const trends = data.trends;

        $(".tranding-carousel").empty();

        $(trends).each(function () {
          const title = $(this)[0].title;
          $(".tranding-carousel").append(
            `
                <div class="text-truncate">
                    <a class="text-secondary" href=""> ${title}</a>
                </div>
                `
          );
        });

        // Tranding carousel
        $(".tranding-carousel").owlCarousel({
          autoplay: true,
          smartSpeed: 2000,
          items: 1,
          dots: false,
          loop: true,
          nav: true,
          navText: [
            '<i class="fa fa-angle-left"></i>',
            '<i class="fa fa-angle-right"></i>',
          ],
        });

        //console.log(data.trends);
      },
      error: function (xhr, status, error) {
        console.error("Error fetching JSON data:", status, error);
      },
    });
  });
})(jQuery);
