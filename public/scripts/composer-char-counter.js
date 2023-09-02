$(document).ready(function () {
  $("#tweet-text").on("input", function () {
    // assign div to variable
    const newTweetCounter = $(this).siblings().find(".counter");
    // update value
    newTweetCounter.text(140 - this.value.length);
    // color check
    if (newTweetCounter.text() < 0) {
      newTweetCounter.addClass("red");
    } else {
      newTweetCounter.removeClass("red");
    }
  });
});
