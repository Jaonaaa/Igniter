CREATE TABLE Utilisateur(
    idUtilisateur INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(50) NOT NULL ,
    motDePasse VARCHAR(50) NOT NULL ,
    nom VARCHAR(20) NOT NULL 
);

CREATE TABLE Categorie(
    idCategorie INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nomCategorie VARCHAR(50) NOT NULL
);

CREATE TABLE Objet(
    idObjet INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    idUtilisateur INT NOT NULL,
    nom VARCHAR(50) NOT NULL,
    idCategorie INT NOT NULL,
    description VARCHAR(200) NOT NULL,
    prixEstime DOUBLE NOT NULL,
    FOREIGN KEY (idUtilisateur) REFERENCES Utilisateur(idUtilisateur)
);

CREATE TABLE Photo(
    idPhoto INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    idObjet INT NOT NULL,
    source VARCHAR(100) NOT NULL,
    FOREIGN KEY (idObjet) REFERENCES Objet(idObjet)
);

CREATE TABLE Proposition(
    idProposition INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    idObjetPropose INT NOT NULL,
    idObjetVoulu INT NOT NULL,
    FOREIGN KEY (idObjetPropose) REFERENCES Objet(idObjet),
    FOREIGN KEY (idObjetVoulu) REFERENCES Objet(idObjet)
);

CREATE TABLE DetailProposition(
    idDetailProposition INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    idProposition INT NOT NULL,
    type VARCHAR(20) NOT NULL,
    date timestamp NOT NULL,
    FOREIGN KEY (idProposition) REFERENCES Proposition(idProposition)
);

INSERT INTO Utilisateur (email,motDePasse,nom) VALUES ('admin@gmail.com','admin','admin');
INSERT INTO Utilisateur (email,motDePasse,nom) VALUES ('riana@gmail.com','riana','riana');
INSERT INTO Utilisateur (email,motDePasse,nom) VALUES ('paul@gmail.com','paul','paul');
INSERT INTO Utilisateur (email,motDePasse,nom) VALUES ('tahiry@gmail.com','tahiry','tahiry');

INSERT INTO Categorie (nomCategorie) VALUES ('vetement');
INSERT INTO Categorie (nomCategorie) VALUES ('chaussure');
INSERT INTO Categorie (nomCategorie) VALUES ('smartphone');
INSERT INTO Categorie (nomCategorie) VALUES ('ordinateur');

INSERT INTO Objet (idUtilisateur,nom,idCategorie,description,prixEstime) VALUES (1,'tee shirt',1,'tee shirt nike neuf',20000);
INSERT INTO Objet (idUtilisateur,nom,idCategorie,description,prixEstime) VALUES (2,'air jordan 4',2,'air jordan 4 neuf',140000);
INSERT INTO Objet (idUtilisateur,nom,idCategorie,description,prixEstime) VALUES (3,'iphone 14 pro',3,'iphone 14 pro neuf',7000000);
INSERT INTO Objet (idUtilisateur,nom,idCategorie,description,prixEstime) VALUES (4,'victus',4,'hp victus',20000);

INSERT INTO Photo (idObjet,source) VALUES (1,'photos/vetement/teeshirt001.jpg');
INSERT INTO Photo (idObjet,source) VALUES (1,'photos/vetement/teeshirt002.jpg');
INSERT INTO Photo (idObjet,source) VALUES (2,'photos/chaussure/tenis001.jpg');
INSERT INTO Photo (idObjet,source) VALUES (2,'photos/chaussure/tenis002.jpg');
INSERT INTO Photo (idObjet,source) VALUES (3,'photos/smartphone/phone001.jpg');
INSERT INTO Photo (idObjet,source) VALUES (3,'photos/smartphone/phone002.jpg');
INSERT INTO Photo (idObjet,source) VALUES (4,'photos/ordinateur/ordi001.jpg');
INSERT INTO Photo (idObjet,source) VALUES (4,'photos/ordinateur/ordi002.jpg');

INSERT INTO Proposition (idObjetPropose,idObjetVoulu) VALUES (1,4);



--1)Insert utilisateur(email,motdepasse,nom)
INSERT INTO Utilisateur (email,motDePasse,nom) VALUES ('','','');

--2)check_login(email,motdepasse)
SELECT * FROM Utilisateur WHERE email='' AND motDePasse='';

--3)lister les objets d'un utilisateur(idUtilisateur)
SELECT * FROM Objet WHERE idUtilisateur=1 ;

--4)Proposition d'echange d'un objet(idObjetpropose,idObjetvoulu)
INSERT INTO Proposition (idObjetPropose,idObjetVoulu) VALUES ( , );

--5)liste de tous les propositions recues d'un utilisateur (idUtlisateur)
SELECT riana.idProposition,riana.idObjetPropose,riana.idObjetVoulu FROM
(SELECT idProposition,Proposition.idObjetPropose,Proposition.idObjetVoulu,idUtilisateur FROM Proposition
JOIN Objet ON Proposition.idObjetVoulu=Objet.idObjet) riana
WHERE riana.idUtilisateur= ;

--6)liste de tous les propositions envoyees d'un utilisateur (idUtilisateur)
SELECT riana.idProposition,riana.idObjetPropose,riana.idObjetVoulu FROM
(SELECT idProposition,Proposition.idObjetPropose,Proposition.idObjetVoulu,idUtilisateur FROM Proposition
JOIN Objet ON Proposition.idObjetPropose=Objet.idObjet) riana
WHERE riana.idUtilisateur= ;

--7)Accepter proposition(idProposition)
INSERT INTO DetailProposition (idProposition,type) VALUES ( ,'accepte');

--8)Refuser proposition(idProposition)
INSERT INTO DetailProposition (idProposition,type) VALUES ( ,'refuse');

--9)Changer proprietaire d'un objet(idUtilisateur,idObjet)
UPDATE Objet SET idUtilisateur=  WHERE idObjet=;


--10)Afficher objets des autres utilisateurs(idUtilisateur)
SELECT * FROM
(SELECT Objet.idObjet,Objet.idUtilisateur,Objet.idCategorie,Objet.nom,Objet.description,Objet.prixEstime,Utilisateur.nom nomU FROM Objet
JOIN Utilisateur ON Objet.idUtilisateur=Utilisateur.idUtilisateur) riana
WHERE riana.idUtilisateur!=1;


--10-2)Afficher objets des autres utilisateurs(idUtilisateur) with pic
SELECT * FROM
(SELECT * FROM
(SELECT Objet.idObjet,Objet.idUtilisateur,Objet.idCategorie,Objet.nom,Objet.description,Objet.prixEstime,Utilisateur.nom nomU FROM Objet
JOIN Utilisateur ON Objet.idUtilisateur=Utilisateur.idUtilisateur) riana
WHERE riana.idUtilisateur!=1)riana1
JOIN Photo ON riana1.idObjet=Photo.idObjet


--14)tous les images d'un objet(idObjet)
SELECT * FROM
(SELECT Objet.idObjet,Objet.idUtilisateur,Objet.nom,Objet.idCategorie,Objet.description,Objet.prixEstime,Photo.source FROM Objet
JOIN Photo ON Objet.idObjet=Photo.idObjet) riana
WHERE idObjet=1;


--15)recherche par categorie(idCategorie)
SELECT * FROM
(SELECT * FROM
(SELECT Objet.idObjet,Objet.idUtilisateur,Objet.idCategorie,Objet.nom,Objet.description,Objet.prixEstime,Utilisateur.nom nomU FROM Objet
JOIN Utilisateur ON Objet.idUtilisateur=Utilisateur.idUtilisateur) riana
WHERE riana.idUtilisateur!=1)riana1
JOIN Photo ON riana1.idObjet=Photo.idObjet
WHERE riana1.idCategorie=2;


--17)tous les echanges+date+proprietaires historique

SELECT riana6.idProposition,riana6.nomPropose,riana6.nomVoulu,riana6.proprietaireOP,riana6.proprietaireOV,DetailProposition.date FROM
(SELECT riana5.idProposition,riana5.idObjetPropose,riana5.idObjetVoulu,riana5.nomPropose,riana5.nomVoulu,riana5.idProprietaireOP,
riana5.idProprietaireOV,riana5.proprietaireOP,Utilisateur.nom proprietaireOV FROM
(SELECT riana4.idProposition,riana4.idObjetPropose,riana4.idObjetVoulu,riana4.nomPropose,riana4.nomVoulu,riana4.idProprietaireOP,riana4.idProprietaireOV,Utilisateur.nom proprietaireOP FROM
(SELECT riana3.idProposition,riana3.idObjetPropose,riana3.idObjetVoulu,riana3.nomPropose,riana3.nomVoulu,riana3.idProprietaireOP,Objet.idUtilisateur idProprietaireOV FROM
(SELECT riana2.idProposition,riana2.idObjetPropose,riana2.idObjetVoulu,riana2.nomPropose,riana2.nomVoulu,Objet.idUtilisateur idProprietaireOP FROM
(SELECT riana1.idProposition,riana1.idObjetPropose,riana1.idObjetVoulu,riana1.nomPropose,Objet.nom nomVoulu FROM 
(SELECT riana.idProposition,riana.idObjetPropose,riana.idObjetVoulu,Objet.nom nomPropose FROM
(SELECT Proposition.idProposition,proposition.idObjetpropose,proposition.idObjetVoulu FROM Proposition WHERE idProposition IN 
(SELECT idProposition FROM DetailProposition WHERE type='accepte')) riana
JOIN Objet ON Objet.idObjet=riana.idObjetPropose) riana1
JOIN Objet ON Objet.idObjet=riana1.idObjetVoulu) riana2
JOIN Objet ON riana2.idObjetPropose=Objet.idUtilisateur) riana3
JOIN Objet ON riana3.idObjetVoulu=Objet.idUtilisateur) riana4
JOIN Utilisateur ON riana4.idProprietaireOP=Utilisateur.idUtilisateur)riana5
JOIN Utilisateur ON riana5.idProprietaireOV=Utilisateur.idUtilisateur)riana6
JOIN DetailProposition ON riana6.idProposition=DetailProposition.idProposition
;