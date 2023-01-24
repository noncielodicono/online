(function() {

    let nodes = [];

    let promises = [];

    let fakeNews = [];

    // Importa i json con tutti i nodi
    let importNodes = function () {
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
        return
            (node && node.next) &&
            (
                node.next.predicate == 'end' ||
                ( node.next.tags.length == 1 && node.next.tags[0] == 'end' )
            )
        ;
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
            nodeType === 'who_evil_does_what' ||
            nodeType === 'do_something_does_what' ||
            nodeType === 'people_does_what'
        ) {
            metadata.setNextPredicate( node.next.predicate );
            metadata.setNextTags( node.next.tags );
            return node[metadata.getType()];
        } else if(
            nodeType === 'who' ||
            nodeType === 'who_evil'
        ) {
            metadata.setType( node.type );
            return node['label'];
        } else if( nodeType === 'what' ) {
            metadata.setType( node.type );
            return node[metadata.getNextPredicate()];
        }
    };

    // Estrae un nodo random a partire da una specifica tipologia
    let getRandomNode = function(nodeType) {
        if( metadata.getNextTags().length == 1 && metadata.getNextTags()[0] == 'end' ) {
            return null;
        }

        let availableNodes;
        // filtro per tag
        if(  nodeType === 'what' ) {
            availableNodes = $.map(nodes[nodeType], function (node) {
                if( common.intersect(node.tags, metadata.getNextTags()).length > 0 ) {
                    return node;
                }
            });
        } else {
            availableNodes = nodes[nodeType];
        }

        // Se non è stato trovato nessun percorso
        if( availableNodes.length === 0) {
            throw 'no nodes founded';
        }

        return availableNodes[ common.getRandomNumber(0, availableNodes.length-1) ];
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
            newFakeNews = newFakeNews.trim();
            $('#fake-news').text( newFakeNews.charAt(0).toUpperCase() + newFakeNews.slice(1) + '.' );
        } catch (e) {
            console.log(e);
            reset();
        }
    };

    let reset = function () {
        metadata.reset();
        fakeNews = [];
    };

    // Riempie tutte le strutture
    let init = function () {
        importNodes();
        $.when.apply($, promises).then(() => {
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
