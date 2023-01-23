(function() {

    let nodes = undefined;

    let promises = [];

    let fakeNews = [];

    // Importa i json con tutti i nodi
    let importNodes = function () {
        nodes = [];
        for(jsonPath of common.jsonPaths) {
            // estrae i nodi
            let promise = $.getJSON(jsonPath, function (jsonNode) {
                nodes[jsonNode.label] = jsonNode.value;
            });
            // creazione delle promise
            promises.push(promise);
        }
    };

    let isLastNode = function(node) {
        if( node == undefined ) {
            return false;
        } else if(node.next == undefined) {
            return false;
        } else if( node.next.predicate == 'end') {
            return true;
        } else if ( node.next.tags.length == 1 && node.next.tags[0] == 'end' ) {
            return true;
        } else {
            return false;
        }
    };

    // Stampa il contenuto dei nodi e memorizza le informazioni necessarie a renderizzare il successivo
    let nodeRender = function(node, nodeType) {
        if( !node ) {
            return '';
        } else if (
            nodeType === 'do_with' ||
            nodeType === 'is_possible_to_do'
        ) {
            metadata.setType('singular_male');
            metadata.setNextPredicate(node.next.predicate);
            metadata.setNextTags(node.next.tags);
            return node.label;
        } else if( nodeType === 'do_to_yourself' ) {
            metadata.setType('singular_male');
            return node.label;
        } else if(
            nodeType === 'evil_person_does_what' ||
            nodeType === 'evil_people_does_what' ||
            nodeType === 'do_something_does_what' ||
            nodeType === 'people_does_what'
        ) {
            let type = metadata.getType();
            metadata.setType( type );
            metadata.setNextPredicate( node.next.predicate );
            metadata.setNextTags( node.next.tags );
            return node[metadata.getType()];
        } else if(
            nodeType === 'what' ||
            nodeType === 'who' ||
            nodeType === 'who_evil' ||
            nodeType === 'evil_organization'
        ) {
            metadata.setType( node.type );
            return node[metadata.getNextPredicate()];
        }
    };

    // Estrae un nodo random a partire da una specifica tipologia
    let getRandomNode = function(nodeType) {
        let nodeTypes = nodes[nodeType];
        // filtro per tag
        if(  nodeType === 'what' ) {
            nodeTypes = $.map(nodeTypes, function (node) {
                if( common.intersect(node.tags, metadata.getNextTags()).length > 0 ) {
                    return node;
                }
            });
        }

        if( metadata.getNextTags().length == 1 && metadata.getNextTags()[0] == 'end' ) {
            return null;
        } else if( nodeTypes.length === 0) {
            throw 'no nodes founded';
        }

        return nodeTypes[ common.getRandomNumber(0, nodeTypes.length-1) ];
    };

    // Genera le fake news
    let generate = function () {
        try {
            // Sceglie il percorso da seguire, basandosi sulla tipologia del primo nodo. La lista dei percorsi è in common.js
            let path = common.choosePath();
            // Itera su tutti i nodi del percorso, e di volta in volta sceglie degli elementi da mostrare
            for(let pathIndex=0;pathIndex<path.length;pathIndex++) {
                // Estrae la tipologia del nodo da ricercare
                let nodeType = path[pathIndex];
                // Estrae un nodo a caso
                let node = getRandomNode(nodeType);
                // Aggiunge il nodo alla lista
                fakeNews.push( nodeRender(node, nodeType) );
                if( isLastNode( node ) ) {
                    break;
                }
            }
            let newFakeNews = fakeNews.join(' ');
            $('#fake-news').text( newFakeNews.charAt(0).toUpperCase() + newFakeNews.slice(1) + '.' );
        } catch (e) {
            console.log(e);
            reset();
            // generate();
        }
    };

    let reset = function () {
        metadata.reset();
        fakeNews = [];
    };

    // Riempie tutte le strutture
    let init = function () {
        importNodes();
        $.when.apply($, promises).then(function (data) {
            // Calcola il "peso" di ogni percorso
            common.calculatePathsWeight(nodes);
            fakes.generate();
        });
    };

    this.fakes = {
        generate: generate,
        reset: reset,
        init: init
    };

})();