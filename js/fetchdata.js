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
        $(".owl-carousel.carousel-item-3").empty();
        $(".owl-carousel.carousel-item-4").empty();
        $(".owl-carousel.carousel-item-2").empty();

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
          const id = $(this)[0].id;
          const title = $(this)[0].title;
          const date = $(this)[0].date;
          const img = $(this)[0].img;

          if (img.src != undefined) {
            $(".owl-carousel.carousel-item-1").append(
              `
                <div class="position-relative overflow-hidden" style="height: 435px">
                    <img class="img-fluid h-100" src="${img.dataSrc}"
                    alt="${img.alt}" decoding="${img.decoding}" data-src="${img.dataSrc}" data-srcset="${img.dataSrcSet}" data-lazy-loaded="${img.dataLazyLoaded}" loading="${img.loading}" style="object-fit: cover; width: 100%; height: 100%;">
                    <div class="overlay">
                        <div class="mb-1">
                            <a class="text-white" href="">عمل</a>
                            <span class="px-2 text-white">/</span>
                            <a class="text-white" href="single.html?id=${id}">${date}</a>
                        </div>
                        <a class="h2 m-0 text-white font-weight-bold" href="single.html?id=${id}">${title}</a>
                    </div>
              </div>
                  `
            );

            $(".owl-carousel.carousel-item-3").append(
              `
              <div class="d-flex">
                <img
                src="${img.dataSrc}"
                alt="${img.alt}" decoding="${img.decoding}" data-src="${img.dataSrc}" data-srcset="${img.dataSrcSet}" data-lazy-loaded="${img.dataLazyLoaded}" loading="${img.loading}"
                style="width: 80px; height: 80px; object-fit: cover" />
                <div class="d-flex align-items-center bg-light px-3" style="height: 80px">
                <a class="text-secondary font-weight-semi-bold" href="single.html?id=${id}">
                ${title} </a>
              </div>
            </div>
              `
            );

            $(".owl-carousel.carousel-item-4").append(
              `
              <div class="position-relative overflow-hidden" style="height: 300px">
                  <img class="img-fluid w-100 h-100" src="${img.dataSrc}"
                  alt="${img.alt}" decoding="${img.decoding}" data-src="${img.dataSrc}" data-srcset="${img.dataSrcSet}" data-lazy-loaded="${img.dataLazyLoaded}" loading="${img.loading}" style="object-fit: cover" />
                  <div class="overlay">
                    <div class="mb-1" style="font-size: 13px">
                      <a class="text-white" href="">عمل</a>
                      <span class="px-1 text-white">/</span>
                      <a class="text-white" href="single.html?id=${id}">${date}</a>
                    </div>
                    <a class="h4 m-0 text-white" href="single.html?id=${id}">${title}</a>
                    </div>
              </div>
              `
            );

            $(".owl-carousel.carousel-item-2").append(
              `
              <div class="position-relative">
                <img
                  class="img-fluid w-100"
                  src="${img.dataSrc}"
                  alt="${img.alt}" decoding="${img.decoding}" data-src="${img.dataSrc}" data-srcset="${img.dataSrcSet}" data-lazy-loaded="${img.dataLazyLoaded}" loading="${img.loading}" 
                  style="object-fit: cover" />
                <div class="overlay position-relative bg-light">
                  <div class="mb-2" style="font-size: 13px">
                    <a href="">عمل</a>
                    <span class="px-1">/</span>
                    <span>${date}</span>
                  </div>
                  <a class="h4 m-0" href="single.html?id=${id}">${title}</a>
                </div>
              </div>
              `
            );
          }
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

        // Carousel item 3
        $(".carousel-item-3").owlCarousel({
          autoplay: true,
          smartSpeed: 1000,
          margin: 30,
          dots: false,
          loop: true,
          nav: true,
          navText: [
            '<i class="fa fa-angle-left" aria-hidden="true"></i>',
            '<i class="fa fa-angle-right" aria-hidden="true"></i>',
          ],
          responsive: {
            0: {
              items: 1,
            },
            576: {
              items: 1,
            },
            768: {
              items: 2,
            },
            992: {
              items: 3,
            },
          },
        });

        // Carousel item 4
        $(".carousel-item-4").owlCarousel({
          autoplay: true,
          smartSpeed: 1000,
          margin: 30,
          dots: false,
          loop: true,
          nav: true,
          navText: [
            '<i class="fa fa-angle-left" aria-hidden="true"></i>',
            '<i class="fa fa-angle-right" aria-hidden="true"></i>',
          ],
          responsive: {
            0: {
              items: 1,
            },
            576: {
              items: 1,
            },
            768: {
              items: 2,
            },
            992: {
              items: 3,
            },
            1200: {
              items: 4,
            },
          },
        });

        // Carousel item 2
        $(".carousel-item-2").owlCarousel({
          autoplay: true,
          smartSpeed: 1000,
          margin: 30,
          dots: false,
          loop: true,
          nav: true,
          navText: [
            '<i class="fa fa-angle-left" aria-hidden="true"></i>',
            '<i class="fa fa-angle-right" aria-hidden="true"></i>',
          ],
          responsive: {
            0: {
              items: 1,
            },
            576: {
              items: 1,
            },
            768: {
              items: 2,
            },
          },
        });

        //console.log(data.trends);
      },
      error: function (xhr, status, error) {
        console.error("Error fetching JSON data:", status, error);
      },
    });
  });
})(jQuery);
