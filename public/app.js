$(document).ready(function() {
  getAndDisplayTradeIdeas()

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

function getUserIdeas(displayUserIdeas) {
    $.ajax({
      type: 'GET',
      url: 'http://localhost:8080/users/ideas',
      success: function(data) {
        displayUserIdeas(data)
    }
    });
};

function displayUserIdeas(data) {
  for (i=0; i<data.ideas.length; i++) {
    console.log(data.ideas[i])
      $('body').append(
        '<ul>' + '<li>' + data.ideas[i].security + '</li>' + '<li>' + data.ideas[i].trade + '</li>' + '<li>' + data.ideas[i].description + '</li>' + '</ul>'
      )
  }
}

function getAndDisplayTradeIdeas() {
  getUserIdeas(displayUserIdeas);
}

});
