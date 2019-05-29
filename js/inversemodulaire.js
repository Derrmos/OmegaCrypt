//JS de la fonction affine - Salomé Neuez, T4s

// Fonction vérifiant si une matrice est inversible modulo 26
function euclide(a, b) {
    p = 1; q = 0;
    r = 0; s = 1;

    while (b != 0) { 
        c = a % b;
        quotient = Math.floor(a/b);
        a = b;
        b = c;
        var nouveau_r = p - quotient * r, nouveau_s = q - quotient * s;
        p = r; q = s;
        r = nouveau_r; s = nouveau_s;
    }

    if (a < 0) {
        a = -a;
        p = -p;
        q = -q;
    }

    // Retourne la valeur de a = PGCM(a, b) et p = inverse modulaire du déterminant
    return [a === 1, p];
}

// Fonction permettant d'inverser une matrice 2*2
function getReversedMatrice() {
    var a = K[0][0], b = K[0][1], c = K[1][0], d = K[1][1];
    var determinant = a * d - b * c;

    // Récupère l'inverse modulaire du déterminant de la matrice
    var e = euclide(determinant, 26);

    // Déclaration de la matrice de sortie
    var M = new Array(2);
    M[0] = new Array(2);
    M[1] = new Array(2);

    // Créer la matrice inverse avec les différentes valeurs de la matrices clé modulo 26 multiplié par l'inverse modulaire du déterminant de la matrice clé
    M[0][0] = (e[1] * d) % 26;
    if (M[0][0] < 0) M[0][0] +=26;

    M[0][1] = (e[1] * (-b)) % 26;
    if (M[0][1] < 0) M[0][1] +=26;

    M[1][0] = (e[1] * (-c)) % 26;
    if (M[1][0] < 0) M[1][0] +=26;

    M[1][1] = (e[1] * a) % 26;
    if (M[1][1] < 0) M[1][1] +=26;

    // Retourne la matrice de sortie
    return M;
}

function coeff() {
    var a = document.getElementById("a").value;
    var b = document.getElementById("modulo").value;

    if (!a && !b) return document.getElementById("resp").innerHTML = "<h2><b>Veuillez entrer le coefficient A et/ou le modulo</b></h2>";
    
    var e = euclide(a, b);
    if (!e[0]) return document.getElementById("resp").innerHTML = "<h2><b>" + a + " n'est pas inversible modulo " + b + "</b></h2>";
    
    document.getElementById("resp").innerHTML = "<h2><b>" + a + " est inversible modulo " + b + ". Son inverse est : A' = " + e[1] + "</b></h2>";
}

function matrice() {
    // Récupère les différents coefficient
    var a = document.getElementById("c").value;
    var b = document.getElementById("d").value;
    var c = document.getElementById("e").value;
    var d = document.getElementById("f").value;
    var m = document.getElementById("m").value;

    // Si tous les coefficients ne sont pas indiqué par l'utilisateur, lui demande de les indiquer
    if (!a && !b && !c && !d && !m) return document.getElementById("resp").innerHTML = "<h2 class=\"redcolor\"><b>Veuillez entrer toute la matrice et/ou le modulo</b></h2>";
    var determinant = (a * d) - (b * c);

    // Calcule le PGCD et l'inverse modulaire du déterminant de la matrice
    var e = euclide(determinant, m);
    // Si la matrice n'est pas réversible ou que le déterminant est = 0, demande à l'utilisateur de changer de matrice
    if (determinant === 0) return document.getElementById("resp").innerHTML = "<h2 class=\"redcolor\"><b>Déterminant de la matrice = 0 ! Veuillez changer de matrice</b></h2>";
    else if (!e[0]) return document.getElementById("resp").innerHTML = "<h2 class=\"redcolor\"><b>Matrice non-inversible modulo " + m + "</b></h2>";

    // Renvoie à l'utilisateur que la matrice à été correctement pris en compte et qu'il peut s'en servir pour chiffrer ses données
    document.getElementById("resp").innerHTML = "<h2 class=\"greencolor\"><b>Matrice inversible modulo " + m + "</b></h2>";
}

var setupEvents = function() {
    document.getElementById("coeffForm").addEventListener('submit', coeff);
    document.getElementById("matriceForm").addEventListener('submit', matrice);
};
window.addEventListener('load', setupEvents);