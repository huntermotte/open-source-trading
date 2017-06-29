$('.login').submit(function(event) {
  event.preventDefault();
  const username = $('.username').val();
  const password = $('.password').val();
  const payLoad = {username, password};
  $.ajax({
    type: 'GET',
    data: payLoad,
    contentType: 'application/x-www-form-urlencoded',
    url: 'https://gentle-peak-73337.herokuapp.com/users/me',
    success: function(data) {
      window.location.replace('https://gentle-peak-73337.herokuapp.com/explore.html')
    }
  })
})
