(function () {

    let objects = {};

    let reloadFakeNews = function () {
        objects.fakeNews.hide();
        fakes.reset();
        fakes.generate();
        objects.fakeNews.show();
    };

    let init = function() {
        // Container delle fake news
        objects.fakeNews = $('#fake-news');
        // Pulsante per il reload delle fake news
        objects.reloadPageBtn = $('#btn-reload');
        // Container dei pulsanti
        objects.buttonsContainer = $('#buttons-container');

        // Animazione d'ingresso
        fakes.init();
        objects.fakeNews.show();

        // Aggiunge dei dettagli al pulsante di reload delle fake news
        objects.reloadPageBtn
            .click(function () {
                reloadFakeNews();
            })
        ;
    };

    this.home = {
        init: init
    };

})();
