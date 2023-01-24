(function () {

    this.common = {
        'jsonPaths': [
            'json/do_something_does_what.json',
            'json/do_to_yourself.json',
            'json/do_with.json',
            'json/evil_organization.json',
            'json/evil_people_does_what.json',
            'json/evil_person_does_what.json',
            'json/is_possible_to_do.json',
            'json/people_does_what.json',
            'json/what.json',
            'json/who.json',
            'json/who_evil.json'
        ],
        'paths': [
            ['do_with', 'what', 'do_something_does_what', 'what'],
            ['do_to_yourself', 'do_something_does_what', 'what'],
            ['is_possible_to_do', 'what'],
            ['who', 'people_does_what', 'what'],
            ['who_evil', 'evil_person_does_what', 'what'],
            ['evil_organization', 'evil_people_does_what', 'what'],
        ],
        'pathsWeight': [],
        'totalPathsWeight': 0,
        /*
         * Estrae un numero random in un range
         */
        getRandomNumber: function (min, max) {
            return Math.round(Math.random() * (max - min) + min);
        },
        /*
         * Questa funzione estrae randomicamente l'indice di un path, basandosi sulla struttura pathsWeight
         */
        getRandomPath: function () {
            // Estrae un numero tra 0 e la il peso cumulato di ogni percorso
            let randomNumber = common.getRandomNumber( 0, common.totalPathsWeight );
            let tempSum = 0;
            for(let index in common.pathsWeight) {
                tempSum += common.pathsWeight[index];
                if( tempSum >= randomNumber ) {
                    return index;
                }
            }
            return 0;
        },
        /*
         * Filtra la struttura estraendo solo i nodi associati a un determinato tag
         */
        intersect: function(array1, array2) {
            let arrayTemp;
            if (array2.length > array1.length) {
                arrayTemp = array2;
                array2 = array1;
                array1 = arrayTemp;
            }
            return array1.filter(function (e) {
                return array2.indexOf(e) > -1;
            });
        },
        /*
         * Calcolo del "peso" di ogni percorso, come la somma del numero dei nodi presenti nei file json.
         * La struttura risultante (pathsWeight) avrà alla posizione i-esima il peso del percorso i-esimo.
         */
        calculatePathsWeight: function (nodes) {
            // itera su tutti i percorsi possibili
            for (let pathIndex in common.paths) {
                // per ogni percorso possibile, aggiunge un elemento all'array pathsWeight
                common.pathsWeight[pathIndex] = 0;
                let currentPath = common.paths[pathIndex];
                // itera su tutti i nodi presenti nel path
                for(let currentNodeLabel of currentPath) {
                    // per ogni nodo, somma il numero di elementi di quel tipo presenti nei file json
                    common.pathsWeight[pathIndex] += nodes[currentNodeLabel].length;
                    common.totalPathsWeight += nodes[currentNodeLabel].length;
                }
            }
        },
        // Sceglie un percorso da seguire
        choosePath: function () {
            let pathIndex = common.getRandomPath();
            return common.paths[pathIndex];
        }
    }
})();
