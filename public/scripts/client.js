/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// converts each tweet object to html and adds it to the page
const renderTweets = function (tweets) {
  tweets.forEach((tweet) => {
    const $tweet = createTweetElement(tweet);
    $("#tweets-container").append($tweet);
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
    
      <div class="tweetContent">${tweet.content.text}</div>
    
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
  return $tweet;
};

const addFormEventHandler = function () {
  $("form").on("submit", function () {
    event.preventDefault();
    const seralizedData = $(this).serialize();
    $.ajax("/tweets/", { method: "POST", data: seralizedData });
  });
};

const loadTweets = function () {
  $.ajax("/tweets/", { method: "GET" }).then(function (moreTweets) {
    renderTweets(moreTweets);
  });
};

loadTweets();

// render tweets when DOM is ready to be modified
$(document).ready(function () {
  addFormEventHandler();
});
