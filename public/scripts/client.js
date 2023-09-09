/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac",
    },
    "content": {
      "text":
        "If I have seen further it is by standing on the shoulders of giants",
    },
    "created_at": 1461116232227,
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd",
    },
    "content": {
      "text": "Je pense , donc je suis",
    },
    "created_at": 1461113959088,
  },
];
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
        <div>${tweet.created_at}</div>
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

// render tweets when DOM is ready to be modified
$(document).ready(function () {
  renderTweets(data);
  $("form").on("submit", function () {
    event.preventDefault();
    const seralizedData = $(this).serialize();
    $.ajax("/tweets/", { method: "POST", data: seralizedData });
  });
});
