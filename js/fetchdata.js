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
        const jobs = data.jobs;

        console.log(jobs);

        $(".tranding-carousel").empty();
        $(".owl-carousel.carousel-item-1").empty();

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

        $(jobs).each(function () {
          const title = $(this)[0].title;
          const date = $(this)[0].date;
          const img = $(this)[0].img;

          if (img.src != undefined)
            $(".owl-carousel.carousel-item-1").append(
              `
                <div class="position-relative overflow-hidden" style="height: 435px">
                    <img class="img-fluid h-100" src="${img.dataSrc}"
                    alt="${img.alt}" decoding="${img.decoding}" data-src="${img.dataSrc}" data-srcset="${img.dataSrcSet}" data-lazy-loaded="${img.dataLazyLoaded}" loading="${img.loading}" style="object-fit: cover">
                    <div class="overlay">
                        <div class="mb-1">
                            <a class="text-white" href="">Technology</a>
                            <span class="px-2 text-white">/</span>
                            <a class="text-white" href="">${date}</a>
                        </div>
                        <a class="h2 m-0 text-white font-weight-bold" href="">${title}</a>
                    </div>
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

        // Carousel item 1
        $(".carousel-item-1").owlCarousel({
          autoplay: true,
          smartSpeed: 1500,
          items: 1,
          dots: false,
          loop: true,
          nav: true,
          navText: [
            '<i class="fa fa-angle-left" aria-hidden="true"></i>',
            '<i class="fa fa-angle-right" aria-hidden="true"></i>',
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
