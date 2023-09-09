/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
const tweetData = {
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
};

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
        <div>
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
        </div>
      </footer>
    </article>`
  );
  // ...
  return $tweet;
};

const $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
$(document).ready(function () {
  console.log($tweet); // to see what it looks like
  $("#tweets-container").append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
  console.log($("#tweets-container"));
});
