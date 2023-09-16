/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// converts each tweet object to html and adds it to the page
const renderTweets = function (tweets) {
  tweets.forEach((tweet) => {
    const $tweet = createTweetElement(tweet);
    $("#tweets-container").prepend($tweet);
  });
};

// converts individual tweet object into html
const createTweetElement = function (tweet) {
  const $tweet = $(
    `<article class="tweet">
      <header>
        <div>
          <img src=${tweet.user.avatars} alt="tweeter's profile photo">
          <span>${tweet.user.name}</span>
        </div>
        <span>${tweet.user.handle}</span>
      </header>
    
      <div class="tweetContent"></div>
    
      <footer>
        <div>${timeago.format(tweet.created_at)}</div>
        <div class="tweetActions">
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
        </div>
      </footer>
    </article>`
  );
  // XSS prevention using jquery
  $tweet.find(".tweetContent").text(tweet.content.text);
  return $tweet;
};

const addFormEventHandler = function () {
  $("form").on("submit", function (event) {
    event.preventDefault();
    const $form = $(this);
    $("#error").slideUp(function () {
      const tweetLength = $("#tweet-text").val().trim().length;
      if (tweetLength !== undefined && tweetLength > 0 && tweetLength <= 140) {
        const seralizedData = $form.serialize();
        $.ajax("/tweets/", { method: "POST", data: seralizedData })
          .then(function () {
            loadTweets();
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        if (tweetLength === undefined) {
          $("#errorText").text("Invalid tweet");
        } else if (tweetLength === 0) {
          $("#errorText").text("Write some text!");
        } else if (tweetLength > 140) {
          $("#errorText").text(
            "Too long. Conform to expectations or suffer the consequences."
          );
        }
        $("#error").stop().slideDown().css("display", "flex");
      }
    });
  });
};

const loadTweets = function () {
  $.ajax("/tweets/", { method: "GET" })
    .then(function (moreTweets) {
      $("#tweets-container").empty();
      renderTweets(moreTweets);
    })
    .catch(function (error) {
      console.log(error);
    });
};

loadTweets();

// render tweets when DOM is ready to be modified
$(document).ready(function () {
  addFormEventHandler();
});
