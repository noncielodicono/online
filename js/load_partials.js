(function () {

    $(document).ready(function() {
        // carica il banner
        $('.header').load('partials/banner.html');
        // carica il menù nel footer
        $('.links').load( 'partials/links.html');
        // carica il pulsante "indietro"
        let back = $('.back');
        if( back ) {
            back.load( 'partials/back.html');
        }
        // carica Google Ads
        let ads = $('.ads');
        if( ads ) {
            ads.load( 'partials/ads.html');
        }
    });

})();
