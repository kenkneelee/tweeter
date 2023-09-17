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

// logic for new tweet form submission
const addFormEventHandler = function () {
  $("form").on("submit", function (event) {
    // prevent page redirect upon submission
    event.preventDefault();
    const $form = $(this);
    // hide error bar if it exists before running submit logic (callback)
    $("#error").slideUp(function () {
      const tweetLength = $("#tweet-text").val().trim().length;
      // Successful tweet logic
      if (tweetLength !== undefined && tweetLength > 0 && tweetLength <= 140) {
        const seralizedData = $form.serialize();
        $.ajax("/tweets/", { method: "POST", data: seralizedData })
          .then(function () {
            loadTweets();
            $("#tweet-text").val("");
            $("output.counter").val(140);
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        // Unsuccessful (error) logic
        // Set error message while it is hidden
        if (!tweetLength) {
          $("#errorText").text("Write some text!");
        } else if (tweetLength > 140) {
          $("#errorText").text("Tweet too long!");
        }
        // Show error message if applicable
        $("#error").stop().slideDown().css("display", "flex");
      }
    });
  });
};

// function to refresh tweets container with updated list of tweets (usually after new tweet)
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

// load existing tweets when page is loaded
loadTweets();

// add form event handler when DOM is ready to be modified
$(document).ready(function () {
  addFormEventHandler();
});
