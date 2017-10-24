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
    url: '/users/ideas',
    success: function(data) {
      window.location.replace('/profile.html')
    }
})
})
