$('.newIdeaForm').submit(function(event) {
  event.preventDefault();
  const security = $('.security').val();
  const trade = $('.trade').val();
  const description = $('.description').val();
  const payLoad = {security, trade, description};
  console.log(payLoad);
  console.log(security);
  $.ajax({
    type: 'POST',
    data: payLoad,
    contentType: 'application/x-www-form-urlencoded',
    beforeSend: function(xhr){
       xhr.withCredentials = true;
    },
    crossDomain: true,
    url: 'http://localhost:8080/ideas',
    success: function(data) {
      console.log('success');
      // window.location.replace('http://localhost:8080/profile.html')
    }
})
})
