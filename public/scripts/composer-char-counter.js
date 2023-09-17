$(document).ready(function () {
  $("#tweet-text").on("input", function () {
    // assign character counter div to variable
    const newTweetCounter = $(this).siblings().find(".counter");
    // update value on input
    newTweetCounter.text(140 - this.value.length);
    // color check (text vs number type coercion)
    if (newTweetCounter.text() < 0) {
      newTweetCounter.addClass("red");
    } else {
      newTweetCounter.removeClass("red");
    }
  });
});
