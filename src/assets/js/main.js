(function ($) {
  "use strict";

  // Dropdown on mouse hover
  $(document).ready(function () {
    function toggleNavbarMethod() {
      if ($(window).width() > 992) {
        $(".navbar .dropdown")
          .on("mouseover", function () {
            $(".dropdown-toggle", this).trigger("click");
          })
          .on("mouseout", function () {
            $(".dropdown-toggle", this).trigger("click").blur();
          });
      } else {
        $(".navbar .dropdown").off("mouseover").off("mouseout");
      }
    }
    toggleNavbarMethod();
    $(".date-main").text(getArabicFormattedDate());
    $(window).resize(toggleNavbarMethod);
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });

  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });

  $("#insert-email").on("click", function () {
    const emailInput = $(this).parent().parent().find("input[type='email']");
    const emailAddress = emailInput.val();

    if (emailAddress) {
      $.ajax({
        url: "./mail/emails.php", // Replace with your PHP script URL
        method: "POST",
        data: {
          email: emailAddress,
        },
        success: function (response) {
          console.log(response);
        },
        error: function (error) {
          console.error("Error appending email:", error);
        },
      });
    }
  });
})(jQuery);
