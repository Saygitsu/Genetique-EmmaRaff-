// Définition des gènes (diamètres des cercles A, B, et C)
genes.push(new Gene(10, 80, 0.1)); // Gène pour le diamètre A
genes.push(new Gene(0, 1, 0.001)); // Gène pour le pourcentage de B
genes.push(new Gene(0, 1, 0.001)); // Gène pour le pourcentage de C

// Fonction de décodage pour calculer A, B, et C
function decodeDiameters(genotype) {
    var A = genes[0].decode(genotype.slice(0, genes[0].size)); // Diamètre A
    var remaining = 100 - A - 10; // Ce qu'il reste après A (au moins 10 pour C)

    var B_percentage = genes[1].decode(genotype.slice(genes[0].size, genes[0].size + genes[1].size));
    var B = 10 + B_percentage * remaining; // Diamètre B basé sur le pourcentage

    var C = 100 - A - B; // Calcul du diamètre C restant

    return [A, B, C];
}

// Fonction fitness : maximise la surface extérieure
function fitness(x) {
    var A = x[0];
    var B = x[1];
    var C = x[2];

    // Vérification des contraintes
    if (A < 10 || B < 10 || C < 10) return -1000; // Pénalité forte si une borne est violée
    if (A + B + C !== 100) return -1000; // Pénalité forte si la somme n'est pas respectée

    // Surface totale du disque D
    var totalSurface = Math.PI * Math.pow(50, 2);

    // Surface couverte par les cercles A, B, et C
    var coveredSurface = Math.PI * (Math.pow(A / 2, 2) + Math.pow(B / 2, 2) + Math.pow(C / 2, 2));

    // Surface extérieure à maximiser
    var externalSurface = totalSurface - coveredSurface;

    return externalSurface; // Fitness
}
