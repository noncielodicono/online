(function () {

    // Siccome per qualche motivo non funzionano le media query, e mi sono rotto di cercare, faccio tutto lato js
    if( window.screen.width <= 600 ) {
        $('#my-title').css({
            'font-size': '2.8em'
        });
        $('#content').css({
            'font-size': '2.6em'
        });
        $('.back').css({
            'font-size': '2.8em'
        });
        $('#fake-news').css({
            'font-size': '4.5em'
        });
        $('.links').css({
            'font-size': '4.5em'
        });
        $('#btn-reload').css({
            'font-size': '4.5em'
        });
    }

})();
