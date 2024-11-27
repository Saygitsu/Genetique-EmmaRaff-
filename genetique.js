// Author: Pascal Chatonnay
// Date: 2019/11/20
// Description: les script pour un algorithme génétique simple

// Variables globales
var population = [];
var populationSize = 100;
var maxGeneration = 100;
var crossoverRate = 0.5;
var mutationRate = 0.01;
var generation = 0;

var calls = 0;
var sumFitness = 0;
var NbCross = 0;

var parentA;
var parentB;
var child = []
var child1;
var child2;

// variable pour l'analyse
var nbMutation = 0;
var nbMutationLocus =[0, 0, 0, 0, 0, 0, 0, 0, 0, 0];


// fonction pour récuperer les valeurs des inputs
function getFormValues() {
    populationSize = parseInt(document.getElementById("populationSize").value);
    mutationRate = parseFloat(document.getElementById("mutationRate").value);
    crossoverRate = parseFloat(document.getElementById("crossoverRate").value);
    maxGeneration = parseInt(document.getElementById("maxGenerations").value);

}

// fonction pour valider les valeurs du formulaire et calculer les variables induites
function validationForm() {
        // validation des valeurs et calcul des variables induites
        if (populationSize < 2) {
            alert("La taille de la population doit être supérieure à 1");
            exit(0);
            return;
        }
        if (mutationRate < 0 || mutationRate > 1) {
            alert("Le taux de mutation doit être compris entre 0 et 1");
            exit(0);
            return;
        }
        if (crossoverRate < 0 || crossoverRate > 1) {
            alert("Le taux de crossover doit être compris entre 0 et 1");
            exit(0);
            return;
        }
        if (maxGeneration < 1) {
            alert("Le nombre de générations doit être supérieur à 0");
            exit(0);
            return;
        }
    
        // calcul du nombre d'itérations de la fonction de crossover
        NbCross = populationSize * crossoverRate;
        NbCross = Math.round(NbCross/2); // on veut un nombre pair de nouveaux individus (2 par crossover)
    
        if (NbCross < 2) {
            alert("Le taux de crossover est trop faible pour créer une nouvelle population");
            exit(0);
            return;
        }
}


// ********************************************************************************************************************
// ****************************    nombre d'appel à la fonction fitness   *********************************************
// ********************************************************************************************************************
/*
Trois fonctions pour mettre à jour le nombree d'appel à la fonction fitness

changementForm() est appelée depuis le formulaire lors d'un changement
fitnessCalls() est appelée pour calculer le nombre d'appel
displayCalls() est appelée pour afficher le nombre d'appel

*/
// fonction affiche le nombre d'appel dans le champ de foumulaire "calls
function displayCalls() {
    document.getElementById("calls").value = calls;
}

// fonction pour calculer le nombre d'appel de la fonction fitness
function fitnessCalls() {
    calls = populationSize*(1 + (maxGeneration *crossoverRate));
}

// fonction appeler lors d'un changement dans le formulaire afin de mettre à jour le nombre d'appel à la fonction dévaluation
function changementForm() {
 getFormValues();
 fitnessCalls();
 displayCalls();
}

// ********************************************************************************************************************
// ********************************************************************************************************************
// ********************************************************************************************************************



// ********************************************************************************************************************
// ****************************    Affichage des résultats   **********************************************************
// ********************************************************************************************************************



// fonction pour afficher les resultats
function afficheResultat() {
    var txt = "Bravo, vous avez réussi à faire fonctionner l'algorithme génétique. Vous avez fait " + calls + " appels à la fonction fitness.";
    document.getElementById("resultats").innerHTML = txt;
}

// fonction pour afficher la population
function affichePopulation() {
    populationSize = population.length;
    // console.log("Taille de la population " + populationSize);
    // console.log("---  " + population);

    var txt = "<table>";
    txt += "<tr><th>Individu</th><th>Genotype</th><th>Phenotype</th><th>Fitness</th></tr>";
    for (var i = 0; i < populationSize; i++) {
        txt += "<tr>";
        txt += "<td>" + i + "</td>";
        txt += "<td>" + population[i].genotype + "</td>";
        txt += "<td>" + population[i].phenotype + "</td>";
        txt += "<td>" + population[i].fitness + "</td>";
        txt += "</tr>";
    }
    txt += "</table>";
    document.getElementById("population").innerHTML = txt;
    return null;
}

// ********************************************************************************************************************
// ********************************************************************************************************************
// ********************************************************************************************************************


// ********************************************************************************************************************
// ********************************      Mécanique Génétique      *****************************************************
// ********************************************************************************************************************

// fonction pour créer la population initiale
function createPopulation() {
     for (var i = 0; i < populationSize; i++) {
        population.push(new Individu());
    }
}

// fonction de crossover
function crossover(parentA, parentB) {
    var child1 = new Individu();
    var child2 = new Individu();

    var crossoverPoint = Math.floor(Math.random() * (individuSize-1))+1; // Point de croisement aléatoire (ni le premier ni le dernier locus)

    for (var i = 0; i < individuSize; i++) {
        if (i < crossoverPoint) {
            child1.genotype[i] = parentA.genotype[i];
            child2.genotype[i] = parentB.genotype[i];
        } else {
            child1.genotype[i] = parentB.genotype[i];
            child2.genotype[i] = parentA.genotype[i];
        }
    }

    // console.log("Crossover point :" + crossoverPoint + " " + parentA.genotype + " " + parentB.genotype + " " + child1.genotype + " " + child2.genotype);
    // console.log("Crossover result " + child1.genotype + " " + child2.genotype);
    return [child1, child2];
}

// fonction de mutation
function mutate(indiv) {
    for (var i = 0; i < individuSize; i++) {
        if (Math.random() < mutationRate) {
            indiv.genotype[i] = 1 - indiv.genotype[i];
            nbMutation++;
            nbMutationLocus[i]++;
            // console.log("Mutation " + nbMutation + " au locus " + i + " " + indiv.genotype + "\nrépartition des mutations " + nbMutationLocus );
        }
    }
    return indiv;
}


// fonction de sélection d'un parent
function selectParent() {
    var index = 0;
    var r = Math.random();
    while (r > 0) {
        r -= population[index].fitness / sumFitness;
        index++;
    }
    index--;
    return population[index];
}


// ********************************************************************************************************************
// ***************************************      Algorithme Principal     **********************************************
// ********************************************************************************************************************

// fonction de lancement de l'algorithme génétique
function lance() {
    // récupère les valeurs du formulaire et vlidation
    getFormValues();
    validationForm();

    // affiche le nombre d'appel à la fonction fitness
    fitnessCalls();
    displayCalls();

    // initialisation de la population vide
    generation = 0;
    population = [];
    
    // création de la population initiale
    createPopulation();
    
    // premier tri de la population par fitness
    population.sort(function(a, b) {
        return b.fitness - a.fitness;
    });

    // Boucle principale de l'algo Génétique
    while (generation < maxGeneration) { //maxGeneration 
        var newPopulation = [];

        // Réalisation de --> selection, crossover, and mutation
        
        // calcule la somme des fitness
        sumFitness = 0;
        for (var i = 0; i < populationSize; i++) {
            sumFitness += population[i].fitness;
        }

        for (var i = 0; i < NbCross; i++) {
            parentA = selectParent();
            parentB = selectParent();

            child = crossover(parentA, parentB); // on recoit un tableau de deux enfants
            var nbChild = child.length;
            if (nbChild != 2) {
                alert("Erreur dans la fonction de crossover");
                exit(0);
                return;
            }

            // Mutation
            child1 = mutate(child[0]);
            child2 = mutate(child[1]);        
            
            // decodage et calcul du fitness
            child1.phenotype = decodeGenotype(child1.genotype);
            child2.phenotype = decodeGenotype(child2.genotype);

            // evaluation
            child1.fitness = fitness(child1.phenotype);
            child2.fitness = fitness(child2.phenotype);

            // insertion des enfants dans la nouvelle population
            newPopulation.push(child1);
            newPopulation.push(child2);
        }

        // Completion de la population pour maintenir la taille
        for (var i = 0; i < populationSize - (2*NbCross); i++) {
            var indivSauve = selectParent();
            newPopulation.push(indivSauve);
        }

        // Remplacement de la population par la nouvelle
        population = newPopulation;

        // trie de la population par fitness
        population.sort(function(a, b) {
            return b.fitness - a.fitness;
        });

        // Increment the generation counter
        generation++;
    }
  
    // affichage des résultats
    affichePopulation();
    afficheResultat();
}   
