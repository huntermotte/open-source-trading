$('.registration-form').submit(function(event) {
  event.preventDefault();
  const username = $('.newUsername').val();
  const password = $('.newPassword').val();
  const payLoad = {username, password};
  $.ajax({
    type: 'POST',
    data: payLoad,
    contentType: 'application/x-www-form-urlencoded',
    url: 'https://gentle-peak-73337.herokuapp.com/users',
    success: function(data) {
      window.location.replace('https://gentle-peak-73337.herokuapp.com/loginPage.html')
    }
})
})
