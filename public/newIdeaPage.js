$('.newIdeaForm').submit(function(event) {
  event.preventDefault();
  const security = $('.security').val();
  const trade = $('.trade').val();
  const description = $('.description').val();
  const id = Math.random();
  const payLoad = {security, trade, description, id};
  console.log(payLoad);
  console.log(security);
  $.ajax({
    type: 'PUT',
    data: payLoad,
    url: 'https://gentle-peak-73337.herokuapp.com/users/ideas',
    success: function(data) {
      console.log(data);
      window.location.replace('https://gentle-peak-73337.herokuapp.com/profile.html')
    }
})
})
