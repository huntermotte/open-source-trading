$('.registration-form').submit(function(event) {
  event.preventDefault();
  const username = $('.newUsername').val();
  const password = $('.newPassword').val();
  const payLoad = {username, password};
  console.log(payLoad);
  console.log(username);
  $.ajax({
    type: 'POST',
    data: payLoad,
    contentType: 'application/x-www-form-urlencoded',
    url: 'http://localhost:8080/users',
    success: function(data) {
      window.location.replace('http://localhost:8080/loginPage.html')
    }
})
})
