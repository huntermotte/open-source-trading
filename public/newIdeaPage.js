$('.newIdeaForm').submit(function(event) {
  event.preventDefault();
  const security = $('.security').val();
  const trade = $('.trade').val();
  const description = $('.description').val();
  const created = new Date();
  const id = Math.random();
  const payLoad = {security, trade, description, id, created};
  $.ajax({
    type: 'PUT',
    data: payLoad,
    url: 'https://gentle-peak-73337.herokuapp.com/users/ideas',
    success: function(data) {
      window.location.replace('https://gentle-peak-73337.herokuapp.com/profile.html')
    }
})
})
