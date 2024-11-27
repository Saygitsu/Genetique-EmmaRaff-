// définition de la notion de gène

// creation du tableau de genes
var genes = [];

function Gene(bmin, bmax, precision ) {

    this.bmin = bmin;
    this.bmax = bmax;
    this.precision = precision;
    this.size = Math.ceil(Math.log2((bmax - bmin) / precision));

    // fonction de décodage
    this.decode = function(bits) {
        var entier = parseInt(bits.join(''), 2); // conversion d'un tableau de bits en entier
        var x = this.bmin + entier * (this.bmax - this.bmin) / (Math.pow(2, this.size) - 1);
        return x;
    }
    
}