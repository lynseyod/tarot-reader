$(function(){
  // doc ready!

  //initializing smooth scroll!
  $('a').smoothScroll();

  let cardName;
  let cardDescription;
  let cardMeaning;

  $(".card-container").on("click", function(){

    //had to put in this if statement because apparently the 'remove class' wasn't enough to stop it from letting me 'add' more html. Rude.
    if ($(this).hasClass("card-container")) {
      $(this).removeClass("card-container");
      $(this).addClass("card-flipped");
      
      const currentCard = this;
      
      $.ajax({
        url: 'https://proxy.hackeryou.com',
        dataType: 'json',
        method:'GET',
        data: {
          reqUrl: 'https://rws-cards-api.herokuapp.com/api/v1/cards/random',
        }
      }).then(function(result) {
        const cardArray = result.cards
        cardArray.forEach((card) => {
          cardName = card.name;
          cardDescription = card.desc;
          cardMeaning = card.meaning_up;
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
          $(currentCard).html(cardHtml);
        })
      });
    }
  })
})