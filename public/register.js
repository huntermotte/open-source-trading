$('.registration-form').submit(function(event) {
  event.preventDefault();
  const username = $('.newUsername').val();
  const password = $('.newPassword').val();
  const payLoad = {username, password};
  $.ajax({
    type: 'POST',
    data: payLoad,
    contentType: 'application/x-www-form-urlencoded',
    url: '/users',
    success: function(data) {
      window.location.replace('/loginPage.html')
    },
    error: (err) => {
      console.log(err)
      alert('Please enter a unique username and/or password')
    }
  })
})
