$(document).ready(function() {
  getAndDisplayDifferentUsersIdeas()

$('.logout').click(function(event) {
  event.preventDefault();
  $.ajax({
    type: 'GET',
    url: 'https://gentle-peak-73337.herokuapp.com/users/logout',
    success: function(data) {
      if (data.loggedOut) {
        window.location.replace('https://gentle-peak-73337.herokuapp.com/index.html')
      }
    }
  })
})

function getDifferentUserIdeas(displayDifferentUserIdeas) {
    $.ajax({
      type: 'GET',
      url: 'https://gentle-peak-73337.herokuapp.com/users/ideas/explore',
      success: function(data) {
        displayDifferentUserIdeas(data)
    }
    });
};

function displayDifferentUserIdeas(data) {
  for (i=0; i<data.users.length; i++) {
    if (data.users[i].ideas.length > 0) {
      $('.row').append(
        '<div class="col-md-4 column">' + '<h3 class="page-header">An Idea From ' + data.users[i].username + '</h3>' + '<ul>' + '<li>Security: ' + data.users[i].ideas[0].security + '</li>' + '<li>Trade: ' + data.users[i].ideas[0].trade + '</li>' + '<li>Description: ' + data.users[i].ideas[0].description + '</li>' + '<input type="hidden" class="ideaID" value="' + data.users[i].id + '"</input>' + '</ul>' + '</div>'
      )
    }
  }
}

function getAndDisplayDifferentUsersIdeas() {
  getDifferentUserIdeas(displayDifferentUserIdeas);
}

});
