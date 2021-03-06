$(document).ready(function() {
  getAndDisplayTradeIdeas()

$('.logout').click(function(event) {
  event.preventDefault();
  $.ajax({
    type: 'GET',
    url: '/users/logout',
    success: function(data) {
      console.log(data);
      if (data.loggedOut) {
        window.location.replace('/index.html')
      }
    }
  })
})

$('body').on('click', '.delete', function(event) {
  event.preventDefault();
  const ideaID = $(this).parent().children('input').val();
  const payLoad = {ideaID};
  $.ajax({
    type: 'POST',
    data: payLoad,
    url: '/users/ideas/delete',
    success: function(data) {
      console.log(data);
      window.location.replace('/profile.html')
    }
  })
})

function getUserIdeas(displayUserIdeas) {
    $.ajax({
      type: 'GET',
      url: '/users/ideas',
      success: function(data) {
        displayUserIdeas(data)
    }
    });
};

function displayUserIdeas(data) {
  for (i=0; i<data.ideas.length; i++) {
    console.log(data.ideas[i])
      $('.row').append(
        '<div class="col-md-12">' + '<p class="page-header">Opportunity</p>' + '<ul>' + '<li>Security: ' + data.ideas[i].security + '</li>' + '<li>Trade: ' + data.ideas[i].trade + '</li>' + '<li>Description: ' + data.ideas[i].description + '</li>' + '<input type="hidden" class="ideaID" value="' + data.ideas[i].id + '"</input>' + '<button type="button" class="delete btn btn-danger">' + 'Delete Idea <i class="fa fa-trash fa-lg" aria-hidden="true"></i>' + '</button>' + '</ul>' + '</div>'
      )
  }
}

function getAndDisplayTradeIdeas() {
  getUserIdeas(displayUserIdeas);
}

});
