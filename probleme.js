// définition du problème



// définition des genes
genes.push(new Gene(0, 15, 1));

genes.push(new Gene(0, 7, 1));

genes.push(new Gene(0, 7, 1));

// fonction fitness : fonction à optimiser
function fitness(x) {
    return (x[0] * x[1] *x[2])/(x[0] + x[1] + x[2] + 1);
}


