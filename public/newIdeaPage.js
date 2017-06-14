$('.newIdeaForm').submit(function(event) {
  event.preventDefault();
  const security = $('.security').val();
  const trade = $('.trade').val();
  const description = $('.description').val();
  const payLoad = {security, trade, description};
  console.log(payLoad);
  console.log(security);
  $.ajax({
    type: 'PUT',
    data: payLoad,
    url: 'http://localhost:8080/users/ideas',
    success: function(data) {
      console.log(data);
      window.location.replace('http://localhost:8080/profile.html')
    }
})
})
