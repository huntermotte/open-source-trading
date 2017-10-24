$('.login').submit(function(event) {
  event.preventDefault();
  const username = $('.username').val();
  const password = $('.password').val();
  const payLoad = {username, password};
  $.ajax({
    type: 'GET',
    data: payLoad,
    contentType: 'application/x-www-form-urlencoded',
    url: '/users/me',
    success: function(data) {
      window.location.replace('/explore.html')
    },
    error: (err) => {
      console.log(err)
      alert('Incorrect username and password! Please try again')
    }
  })
})
