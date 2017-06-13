var users = {
"users": [
  {
    "firstName": "Bob",
    "lastName": "Smith",
    "ideas": [
      {
      "security": "Facebook (FB)",
      "trade": "Long common stock",
      "description": "Revenue has grown steadily every quarter of 2016"
    },
    {
      "security": "Bitcoin Investment Trust (GBTC)",
      "trade": "Long straddle",
      "description": "High volatility, high volume, strong movements made within the past month"
    },
    {
      "security": "Nvidia (NVDA)",
      "trade": "Short term put option",
      "description": "Up over 200% last 52 weeks, considered overvalued. Long term bullish but opportunity for short term dip"
    }
  ]
  }
]
};

function getUserIdeas(callbackFunction) {
  setTimeout(function() { callbackFunction(users)}, 100);
}

function displayUserIdeas(data) {
  for (i=0; i<data.users.length; i++) {
    for (a=0; a<data.users[i].ideas.length; a++) {
      $('body').append(
        '<ul>' + '<li>' + data.users[i].ideas[a].security + '</li>' + '<li>' + data.users[i].ideas[a].trade + '</li>' + '<li>' + data.users[i].ideas[a].description + '</li>' + '</ul>'
      )
    }
  }
}

function getAndDisplayTradeIdeas() {
  getUserIdeas(displayUserIdeas);
}

$('.logout').click(function(event) {
  event.preventDefault();
  $.ajax({
    type: 'GET',
    url: 'http://localhost:8080/users/logout',
    success: function(data) {
      console.log(data);
      if (data.loggedOut) {
        window.location.replace('http://localhost:8080/index.html')
      }
    }
  })
})

$(function() {
  getAndDisplayTradeIdeas();
})
