// Fonction pour créer la population initiale
function createPopulation() {
    for (var i = 0; i < populationSize; i++) {
        var newIndividu;
        do {
            newIndividu = new Individu();
        } while (newIndividu.phenotype.reduce((sum, d) => sum + d, 0) !== 100); // Vérifie la contrainte
        population.push(newIndividu);
    }
}

// Boucle principale de l'algorithme génétique
function lance() {
    getFormValues();
    validationForm();

    fitnessCalls();
    displayCalls();

    generation = 0;
    population = [];

    createPopulation();

    // Trie initial par fitness
    population.sort((a, b) => b.fitness - a.fitness);

    // Boucle principale
    while (generation < maxGeneration) {
        console.log(`Génération ${generation}`);
        console.log(`Meilleur individu : ${JSON.stringify(population[0].phenotype)}`);
        console.log(`Fitness du meilleur individu : ${population[0].fitness}`);
        console.log(`Fitness moyenne : ${
            population.reduce((sum, ind) => sum + ind.fitness, 0) / populationSize
        }`);

        var newPopulation = [];

        // Calcule la somme des fitness pour la sélection par roulette
        sumFitness = population.reduce((sum, ind) => sum + ind.fitness, 0);

        // Création de la nouvelle population par sélection, croisement et mutation
        for (var i = 0; i < NbCross; i++) {
            var parentA = selectParent();
            var parentB = selectParent();
            var children = crossover(parentA, parentB);

            children[0] = mutate(children[0]);
            children[1] = mutate(children[1]);

            newPopulation.push(children[0]);
            newPopulation.push(children[1]);
        }

        // Complétion de la population avec les meilleurs individus
        while (newPopulation.length < populationSize) {
            newPopulation.push(selectParent());
        }

        // Remplacement de la population
        population = newPopulation;

        // Tri par fitness
        population.sort((a, b) => b.fitness - a.fitness);

        generation++;
    }

    // Affichage des résultats finaux
    affichePopulation();
    afficheResultat();
}

// Fonction pour afficher les résultats finaux
function afficheResultat() {
    var txt = `Générations terminées : ${generation}.`;
    txt += `<br> Meilleur individu : ${JSON.stringify(population[0].phenotype)}.`;
    txt += `<br> Fitness : ${population[0].fitness}.`;
    document.getElementById("resultats").innerHTML = txt;
}
