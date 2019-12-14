const tarotReader = {};

tarotReader.displayCards = () => {
  $('button').on("click", (e) => {
    e.preventDefault();
    $('main').removeClass("hidden");
    $('html, body').animate({
      scrollTop: $('#main').offset().top
  }, 2000);
  })
}

tarotReader.flipCards = function() {
  $(".card-container").on("click", function(){
    const currentCard = this;
    //had to put in this if statement because apparently the 'remove class' wasn't enough to stop it from letting me 'add' more html. Rude.
    if ($(this).hasClass("card-container")) {
      $(this).removeClass("card-container");
      $(this).addClass("card-flipped");
    }
    tarotReader.getCardInfo(currentCard);
  })
}

tarotReader.getCardInfo = function(cardIClicked) {
  $(cardIClicked).html(`<div class="loading"><p><i class="fas fa-star"></i></p><p><i class="fas fa-moon"></i></p><p><i class="fas fa-sun"></i></p></div>`)
  $.ajax({
    url: 'https://proxy.hackeryou.com',
    dataType: 'json',
    method:'GET',
    data: {
      reqUrl: 'https://rws-cards-api.herokuapp.com/api/v1/cards/random',
    }
  }).then(function(result) {
    console.log(result);
    const cardArray = result.cards
    cardArray.forEach(function(card) {
      const cardName = card.name;
      const cardDescription = card.desc;
      const cardMeaning = card.meaning_up;
      const cardHtml = `
        <h2>${cardName}</h2>
        <h3>Description:</h3>
        <p>${cardDescription}</p>
        <h3>Meaning:</h3>
        <p>${cardMeaning}</p>
        `
        $(cardIClicked).html(cardHtml)
      })
  });
}

tarotReader.init = () => {
  tarotReader.displayCards();
  tarotReader.flipCards();
}

$(function(){
  tarotReader.init();
})