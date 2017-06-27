$('.login').submit(function(event) {
  event.preventDefault();
  const username = $('.username').val();
  const password = $('.password').val();
  const payLoad = {username, password};
  console.log(payLoad);
  $.ajax({
    type: 'GET',
    data: payLoad,
    contentType: 'application/x-www-form-urlencoded',
    url: 'http://localhost:8080/users/me',
    success: function(data) {
      window.location.replace('http://localhost:8080/explore.html')
    }
  })
})
