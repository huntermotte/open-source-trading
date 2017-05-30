const users = {
"users": [
  {
    "firstName": "Bob",
    "lastName": "Smith",
    "idea": {
      "security": "Facebook",
      "trade": "Long common stock",
      "description": "Revenue has grown steadily every quarter of 2016"
    }
  }
]
};

function getUserIdeas(callbackFunction) {
  setTimeout(function() {callbackFunction(users)}, 100);
}

function displayUserIdeas(data) {
  for (index in data.users.idea) {
    $('body').append(
      '<ul>' + '<li>' + data.users.idea[index].security + '</li>' + '<li>' + data.users.idea[index].trade + '</li>' + '<li>' + data.users.idea[index].description + '</li>' + '</ul>'
    )
  }
}

function getAndDisplayTradeIdeas() {
  getUserIdeas(displayUserIdeas);
}

$(function() {
  getAndDisplayTradeIdeas();
})
