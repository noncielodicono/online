(function () {

    let type = null;

    let next = {
        'predicate': null,
        'tags': {
            'value': []
        }
    };

    this.metadata = {
        getType: function () {
            return type ? type : 'singular_male';
        },
        setType: function(newType) {
            if( !type ) {
                type = newType;
            }
        },
        getNextPredicate: function () {
            return next.predicate ? next.predicate : 'the';
        },
        setNextPredicate: function(predicate) {
            if( predicate ) {
                next.predicate = predicate;
            }
        },
        getNextTags: function () {
            return next.tags;
        },
        setNextTags: function(tags) {
            if( tags && tags.length ) {
                next.tags = tags;
            }
        },
        reset: function () {
            type = null;
            next = {
                'predicate': null,
                'tags': {
                    'value': []
                }
            };
        }
    };
})();