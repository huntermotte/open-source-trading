$(document).ready(function() {
  getAndDisplayDifferentUsersIdeas()

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

function getDifferentUserIdeas(displayDifferentUserIdeas) {
    $.ajax({
      type: 'GET',
      url: 'http://localhost:8080/users/ideas/explore',
      success: function(data) {
        displayDifferentUserIdeas(data)
    }
    });
};

function displayDifferentUserIdeas(data) {
  for (i=0; i<data.users.length; i++) {
    console.log(data.users[i].ideas[0])
    if (data.users[i].ideas.length > 0) {
      $('.row').append(
        '<div class="col-md-4">' + '<h3 class="page-header">An Idea From ' + data.users[i].username + '</h3>' + '<ul>' + '<li>Security: ' + data.users[i].ideas[0].security + '</li>' + '<li>Trade: ' + data.users[i].ideas[0].trade + '</li>' + '<li>Description: ' + data.users[i].ideas[0].description + '</li>' + '<input type="hidden" class="ideaID" value="' + data.users[i].id + '"</input>' + '</ul>' + '</div>'
      )
    }
  }
}

function getAndDisplayDifferentUsersIdeas() {
  getDifferentUserIdeas(displayDifferentUserIdeas);
}

});
