// Calcul du nombre de gènes
genNumber = genes.length;

// Taille d'un individu (somme des tailles des gènes)
individuSize = genes.reduce((accumulator, gene) => accumulator + gene.size, 0);

// Création aléatoire d'un génotype
function randomGenotype() {
    var genotype = [];
    for (var i = 0; i < individuSize; i++) {
        genotype.push(Math.round(Math.random())); // Génère des bits aléatoires (0 ou 1)
    }
    return genotype;
}

// Fonction pour décoder un génotype en phénotype (A, B, C)
function decodeGenotype(genotype) {
    return decodeDiameters(genotype); // Appelle la fonction définie dans `probleme.js`
}

// Définir un individu avec génotype, phénotype et fitness
function Individu() {
    do {
        this.genotype = randomGenotype();
        this.phenotype = decodeGenotype(this.genotype); // Décodage en [A, B, C]
    } while (this.phenotype.reduce((sum, d) => sum + d, 0) !== 100); // Vérifie la contrainte de somme
    this.fitness = fitness(this.phenotype); // Calcule la fitness
}
