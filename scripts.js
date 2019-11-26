const tarotReader = {};

tarotReader.displayCards = () => {
  $('a').on("click", () => {
    $('main').removeClass("hidden");
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
  $.ajax({
    url: 'https://proxy.hackeryou.com',
    dataType: 'json',
    method:'GET',
    data: {
      reqUrl: 'https://rws-cards-api.herokuapp.com/api/v1/cards/random',
    }
  }).then(function(result) {
    const cardArray = result.cards
    cardArray.forEach(function(card) {
      const cardName = card.name;
      const cardDescription = card.desc;
      const cardMeaning = card.meaning_up;
      const cardHtml = `
        <h2>${cardName}</h2>
        <h3>Description:</h3>
        <div ss-container class="description-container">
          <p>${cardDescription}</p>
        </div>
        <h3>Meaning:</h3>
        <div class="meaning-container" ss-container>
          <p>${cardMeaning}</p>
        </div>
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