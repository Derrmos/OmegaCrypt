//JS de la fonction affine - Salomé Neuez, T4s

//définition des hypervariables
var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

//défintion des coefficients
var a = 1;
var b = 3;


//on créé la fonction pour chiffrer le texte à l'aide de la fonction affine
function chiffre_affine(x) {
    var result;
    
    result = (a * x + b) % 26;
    
    return result;
}


//on créé la fonction pour déchiffrer le texte à l'aide de la fonction affine
function dechiffre_affine(y) {
    var result;
    
    a_prime = euclide(a, 26)[1];
    if (a_prime < 0) a_prime += 26;

    result = (a_prime * (y - b)) % 26;
    
    if (result < 0) result += 26;

    return result;
}

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

//on créé la fonction pour crypter la chaine de caractère à l'aide du code ascii
function encrypt(ch) {
    var response = "";
    
    for (i=0 ; i<ch.length ; i++) {
        var c = ch.charCodeAt(i);
        
        var nc;
        
        //si la lettre est en minuscule
        if (c>=97 && c<=122) {
            c %= 97;
            nc = chiffre_affine(c);
            
            response += alphabet[nc];
        } 
        
        //si la lettre est en majuscule
        else if (c>=65 && c<=90){
            c %= 65;
            nc = chiffre_affine(c);
            
            response += alphabet[nc];
        }
    }
    
    return response;
}


//on créé la fonction pour décrypter la chaine de caractère à l'aide du code ascii
function decrypt(ch){
    var response = "";
    
    for (i=0 ; i<ch.length ; i++) {
        var c = ch.charCodeAt(i);
        
        var nc;
        
        //si la lettre est en minuscule
        if (c>=97 && c<=122) {
            c %= 97;
            nc = dechiffre_affine(c);
            
            response += alphabet[nc];
        } 
        
        //si la lettre est en majuscule
        else if (c>=65 && c<=90){
            c %= 65;
            nc = dechiffre_affine(c);
            
            response += alphabet[nc];
        }
    }
    
    return response;
}

//on vérifie si les coef a et b sont premiers à 26
function verif_coeff() {
    //on récupère a et b
    var A = document.getElementById("a").value;
    var B = document.getElementById("b").value;
    
    if (!a && !b) return;
    
    var e = euclide(a, 26);
    if (!e[0]) return;
    
    a = A % 26;
    b = B % 26;
    
    document.getElementById("resp").innerHTML = "<h2>Les coefficients ont été enregistrés</h2>";
}

//on affiche la phrase cryptée
function encryptUser() {
    var S = document.getElementById("encrypt").value;
    var resp = encrypt(S);
    document.getElementById("resp").innerHTML = "<h2>La phrase chiffée avec la fonction affine est : " + resp + "</h2>";
}

//on affiche la phrase décryptée
function decryptUser() {
    var S = document.getElementById("decrypt").value;
    var resp = decrypt(S);
    document.getElementById("resp").innerHTML = "<h2>La phrase déchiffée avec la fonction affine est : " + resp + "</h2>";
}

var setupEvents = function() {
    document.getElementById("encryptForm").addEventListener('submit', encryptUser);
    document.getElementById("decryptForm").addEventListener('submit', decryptUser);
    document.getElementById("coeffForm").addEventListener('submit', verif_coeff);
};
window.addEventListener('load', setupEvents);