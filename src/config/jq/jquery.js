
import $ from "jquery";




$(window).scroll(function () {
    if ($(this).scrollTop() >= 50) {
      // If page is scrolled more than 50px
      $(".return-to-top").fadeIn(200);  // Fade in the arrow
      $(".min-nav").css("opacity", 0.9)
    } else {
      $(".return-to-top").fadeOut(200); // Else fade out the arrow
      $(".min-nav").css("opacity", 1)
    }
  });
  $(".return-to-top").click(function () {
    // When arrow is clicked
    $("body,html").animate(
      {
        scrollTop: 0, // Scroll to top of body
      },
      500
    );
  });
  