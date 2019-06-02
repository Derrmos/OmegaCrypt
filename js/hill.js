// Initialisation de l'alphabet (Ici, la convention utilisée est A=0, B=1, C=2, ..., Z=25)
var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// Valeur par défaut de la matrice clé, défaut : matrice inversible modulo 26
var K = [[2, 3], [5, 7]];

// Fonction chiffrement de hill, avec la multiplication de deux matrices, l'une étant la matrice clé (qui sert au chiffrement), l'autre la matrice lettre (qui sont un couple de deux lettres)
function chiffre_hill(k, L) {
    // Déclaration de la matrice de sortie
    var M = new Array(1);
    M[0] = new Array(2);

    // Associe à la matrice colonne de sortie deux nouveaux nombres, après multiplication entre la matrice clé et la matrice lettre
    for (var i = 0; i < 2; i++) {
        M[0][i] = ((k[i][0] * L[0][0]) + (k[i][1] * L[0][1])) % 26;
    }

    // Retourne la matrice de sortie
    return M;
}

// Fonction vérifiant si une matrice est inversible modulo 26, calculant le PGCD et l'inverse modulaire de a
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

// Fonction permettant de récupérer une matrice lettre avec un couple de deux lettres
function getMatriceLetter(L) {
    // Déclaration de la matrice de sortie
    var M = new Array(1);
    M[0] = new Array(2);

    // Récupére les valeurs des lettres en code ASCII et les mets dans la matrice
    for (var i = 0; i < L.length; i++) {
        var char = L.charCodeAt(i);
        if (char >= 97 && char <= 122) {
            char %= 97;
        } else if (char >= 65 && char <= 90) {
            char %= 65;
        }

        M[0][i] = char;
    }

    // Retourne la matrice de sortie
    return M;
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

// Fonction permettant de récupérer chaque couple de lettres et de les chiffrer à l'aide du chiffre de Hill
function encrypt(S) {
    // Déclaration des variables
    var response = "";
    var letters = "";

    // Pour chaque couple de deux lettres, la transforme en matrice de la forme [[x, y]] et crypte par chiffrement de Hill ce couple de deux lettres et l'ajoute à la nouvelle chaîne de caractère
    for (var i = 0; i < (S.length / 2); i++) {
        var k = 0;
        while (letters.length < 2) {
            letters += S[k + (i * 2)];
            k++;
        }

        var L = getMatriceLetter(letters);
        var H = chiffre_hill(K, L);
            
        for (var j = 0; j < H[0].length; j++) {
            response += alphabet[H[0][j]];
        }

        letters = "";
    }

    // Retourne la réponse
    return response;
}

// Fonction permettant de récupérer chaque couple de lettres et de les déchiffrer à l'aide du chiffre de Hill et de la matrice inverse de la matrice clé fournie
function decrypt(S) {
    // Déclaration des variables
    var response = "";
    var letters = "";

    // Récupère l'inverse de la matrice clé pour le déchiffrement
    var K_reversed = getReversedMatrice(K);

    // Pour chaque couple de deux lettres, la transforme en matrice de la forme [[x, y]] et crypte par chiffrement de Hill ce couple de deux lettres et l'ajoute à la nouvelle chaîne de caractère
    for (var i = 0; i < (S.length / 2); i++) {
        var k = 0;
        while (letters.length < 2) {
            letters += S[k + (i * 2)];
            k++;
        }

        var L = getMatriceLetter(letters);
        var H = chiffre_hill(K_reversed, L);
            
        for (var j = 0; j < H[0].length; j++) {
            response += alphabet[H[0][j]];
        }

        letters = "";
    }

    // Retourne la réponse
    return response;
}

function encryptUser() {
    var S = document.getElementById("encrypt").value;

    // Retire les espaces de la châine de caractère
    var words = S.split(" ");
    var S = "";
    for (var i = 0; i < words.length; i++) {
        S += words[i];
    }

    var resp = encrypt(S);
    document.getElementById("resp").innerHTML = "<h2 class=\"greencolor\"><b>Phrase chiffrée par le Chiffrement de Hill : " + resp + "</b></h2>";
}

function decryptUser() {
    var S = document.getElementById("decrypt").value;

    // Retire les espaces de la châine de caractère
    var words = S.split(" ");
    var S = "";
    for (var i = 0; i < words.length; i++) {
        S += words[i];
    }

    var resp = decrypt(S);
    document.getElementById("resp").innerHTML = "<h2 class=\"greencolor\"><b>Phrase déchiffrée par le Chiffrement de Hill : " + resp + "</b></h2>";
}

function matriceUser() {
    // Récupère les différents coefficient
    var a = document.getElementById("a").value;
    var b = document.getElementById("b").value;
    var c = document.getElementById("c").value;
    var d = document.getElementById("d").value;

    // Si tous les coefficients ne sont pas indiqué par l'utilisateur, lui demande de les indiquer
    if (!a && !b && !c && !d && !m) return document.getElementById("resp").innerHTML = "<h2 class=\"redcolor\"><b>ERREUR : Veuillez entrer toute la matrice</b></h2>";
    var determinant = a * d - b * c;

    // Calcule le PGCD et l'inverse modulaire du déterminant de la matrice
    var e = euclide(determinant, 26);
    // Si la matrice n'est pas réversible ou que le déterminant est = 0, demande à l'utilisateur de changer de matrice
    if (determinant === 0) return document.getElementById("resp").innerHTML = "<h2 class=\"redcolor\"><b>ERREUR : Déterminant de la matrice clé = 0 ! Veuillez changer de matrice</b></h2>";
    else if (!e[0]) return document.getElementById("resp").innerHTML = "<h2 class=\"redcolor\"><b>ERREUR : Matrice non-inversible modulo 26 ! Veuillez changer de matrice</b></h2>";

    // Applique à la matrice les différents coefficient pour créer la matrice clé
    K[0][0] = a % 26;
    K[0][1] = b % 26;
    K[1][0] = c % 26;
    K[1][1] = d % 26;

    // Renvoie à l'utilisateur que la matrice à été correctement pris en compte et qu'il peut s'en servir pour chiffrer ses données
    document.getElementById("resp").innerHTML = "<h2 class=\"greencolor\"><b>Matrice correctement initialisée !</b></h2>";
}

var setupEvents = function() {
    document.getElementById("encryptForm").addEventListener('submit', encryptUser);
    document.getElementById("decryptForm").addEventListener('submit', decryptUser);
    document.getElementById("matriceForm").addEventListener('submit', matriceUser);
};
window.addEventListener('load', setupEvents);