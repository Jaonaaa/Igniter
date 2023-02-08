<?php
if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Modele_takalo extends CI_Model
{

    public function insert_utlisateur($email, $motdepasse, $nom)
    {

        $sql = "INSERT INTO Utilisateur (email,motDePasse,nom) VALUES (%s,%s,%s)";
        $sql = sprintf($sql, $this->db->escape($email), $this->db->escape($motdepasse), $this->db->escape($nom));
        $this->db->query($sql);
    }

    public function check_inscription($email, $motdepasse)
    {

        $sql = "SELECT * FROM Utilisateur WHERE email=%s AND motDePasse=%s";
        $sql = sprintf($sql, $this->db->escape($email), $this->db->escape($motdepasse));
        $query = $this->db->query($sql);
        $row = $query->row_array();
        if (count($row) == 0) {
            return true; // valide
        } else {
            return false; //invalide
        }
    }


    public function getObjectOtherUser($idUser)
    {
        $sql = "SELECT * FROM
        (SELECT * FROM
        (SELECT Objet.idObjet,Objet.idUtilisateur,Objet.idCategorie,Objet.nom,Objet.description,Objet.prixEstime,Utilisateur.nom nomU FROM Objet
        JOIN Utilisateur ON Objet.idUtilisateur=Utilisateur.idUtilisateur) riana
        WHERE riana.idUtilisateur!= %s)riana1
        JOIN Photo ON riana1.idObjet=Photo.idObjet";

        $sql = sprintf($sql, $this->db->escape($idUser));
        $query = $this->db->query($sql);

        $array = array();
        foreach ($query->result_array() as $row) {
            $objets = array();
            $objets['idObjet'] = $row['idObjet'];
            $objets['idUtilisateur'] = $row['idUtilisateur'];
            $objets['nom'] = $row['nom'];
            $objets['idCategorie'] = $row['idCategorie'];
            $objets['description'] = $row['description'];
            $objets['prixEstime'] = $row['prixEstime'];
            $objets['nomProprio'] = $row['nomU'];
            $objets['pathPic'] = $row['source'];
            array_push($array, $objets);
        }

        return $array;
    }

    public function getMyObject($idUser)
    {
        $sql = "SELECT * FROM
        (SELECT * FROM
        (SELECT Objet.idObjet,Objet.idUtilisateur,Objet.idCategorie,Objet.nom,Objet.description,Objet.prixEstime,Utilisateur.nom nomU FROM Objet
        JOIN Utilisateur ON Objet.idUtilisateur=Utilisateur.idUtilisateur) riana
        WHERE riana.idUtilisateur = %s)riana1
        JOIN Photo ON riana1.idObjet=Photo.idObjet";

        $sql = sprintf($sql, $this->db->escape($idUser));
        $query = $this->db->query($sql);

        $array = array();
        foreach ($query->result_array() as $row) {
            $objets = array();
            $objets['idObjet'] = $row['idObjet'];
            $objets['idUtilisateur'] = $row['idUtilisateur'];
            $objets['nom'] = $row['nom'];
            $objets['idCategorie'] = $row['idCategorie'];
            $objets['description'] = $row['description'];
            $objets['prixEstime'] = $row['prixEstime'];
            $objets['nomProprio'] = $row['nomU'];
            $objets['pathPic'] = $row['source'];
            array_push($array, $objets);
        }

        return $array;
    }


    public function check_login($email, $motdepasse)
    {

        $sql = "SELECT * FROM Utilisateur WHERE email=%s AND motDePasse=%s ";
        $sql = sprintf($sql, $this->db->escape($email), $this->db->escape($motdepasse));
        $query = $this->db->query($sql);
        $row = $query->row_array();
        if ($row != null) {
            $this->session->set_userdata('user', $row);
            return true;
        } else {
            return false;
        }
    }


    public function registerObject($nom, $idCategory, $description, $prix)
    {
        $pathPics = $this->session->userdata("pathPics");
        $user = $this->session->userdata("user");
        $idUser = $user['idUtilisateur'];
        $sql = "INSERT INTO Objet (idUtilisateur,nom,idCategorie,description,prixEstime) VALUES (%s,%s,%s,%s,%s) ";
        $sql = sprintf($sql, $this->db->escape($idUser), $this->db->escape($nom), $this->db->escape($idCategory), $this->db->escape($description), $this->db->escape($prix));
        $this->db->query($sql);
        /// geeting the last object added
        $sql = "SELECT idObjet FROM Objet ORDER BY idObjet DESC LIMIT 1 ";
        $query = $this->db->query($sql);
        $row = $query->row_array();
        //
        foreach ($pathPics as $path) {
            $sql = "INSERT INTO Photo (idObjet,source) VALUES (%s,%s)";
            $sql = sprintf($sql, $this->db->escape($row['idObjet']), $this->db->escape($path));
            $this->db->query($sql);
        }
    }
    public function afficher_objets($idUtilisateur)
    {

        $sql = "SELECT * FROM Objet WHERE idUtilisateur=%s ";
        $sql = sprintf($sql, $this->db->escape($idUtilisateur));
        $query = $this->db->query($sql);

        $array = array();

        foreach ($query->result_array() as $row) {
            $objets = array();
            $objets['idObjet'] = $row['idObjet'];
            $objets['idUtilisateur'] = $row['idUtilisateur'];
            $objets['nom'] = $row['nom'];
            $objets['idCategorie'] = $row['idCategorie'];
            $objets['description'] = $row['description'];
            $objets['prixEstime'] = $row['prixEstime'];
            array_push($array, $objets);
        }

        return $array;
    }
    public function getAllCategories()
    {
        $sql = "SELECT * FROM Categorie ";
        $query = $this->db->query($sql);
        $array = array();
        foreach ($query->result_array() as $row) {
            $objets = array();
            $objets['id'] = $row['idCategorie'];
            $objets['nom'] = $row['nomCategorie'];
            array_push($array, $objets);
        }
        return $array;
    }

    public function proposer_echange($idObjetPropose, $idObjetVoulu)
    {

        $sql = "INSERT INTO Proposition (idObjetPropose,idObjetVoulu) VALUES (%s,%s)";
        $sql = sprintf($sql, $this->db->escape($idObjetPropose), $this->db->escape($idObjetVoulu));
        $this->db->query($sql);
    }

    public function propositions_recues($idUtilisateur)
    {

        $sql = "SELECT riana.idProposition,riana.idObjetPropose,riana.idObjetVoulu FROM
            (SELECT idProposition,Proposition.idObjetPropose,Proposition.idObjetVoulu,idUtilisateur FROM Proposition
            JOIN Objet ON Proposition.idObjetVoulu=Objet.idObjet) riana
            WHERE riana.idUtilisateur= %s";
        $sql = sprintf($sql, $this->db->escape($idUtilisateur));
        $query = $this->db->query($sql);
        $array = array();
        foreach ($query->result_array() as $row) {
            $propositions_recues = array();
            $propositions_recues['idProposition'] = $row['idProposition'];
            $propositions_recues['idObjetPropose'] = $row['idObjetPropose'];
            $propositions_recues['idObjetVoulu'] = $row['idObjetVoulu'];
            $propositions_recues['nom'] = $row['nom'];
            array_push($array, $propositions_recues);
        }

        return $array;
    }

    public function propositions_envoyees($idUtilisateur)
    {

        $sql = "SELECT riana.idProposition,riana.idObjetPropose,riana.idObjetVoulu FROM
            (SELECT idProposition,Proposition.idObjetPropose,Proposition.idObjetVoulu,idUtilisateur FROM Proposition
            JOIN Objet ON Proposition.idObjetPropose=Objet.idObjet) riana
            WHERE riana.idUtilisateur= %s";
        $sql = sprintf($sql, $this->db->escape($idUtilisateur));
        $query = $this->db->query($sql);
        $array = array();
        foreach ($query->result_array() as $row) {
            $propositions_envoyees = array();
            $propositions_envoyees['idProposition'] = $row['idProposition'];
            $propositions_envoyees['idObjetPropose'] = $row['idObjetPropose'];
            $propositions_envoyees['idObjetVoulu'] = $row['idObjetVoulu'];
            array_push($array, $propositions_envoyees);
        }

        return $array;
    }

    public function accepter_proposition($idProposition)
    {

        $sql = "INSERT INTO DetailProposition (idProposition,type) VALUES ( %s,'accepte')";
        $sql = sprintf($sql, $this->db->escape($idProposition));
        $this->db->query($sql);
    }

    public function refuser_proposition($idProposition)
    {

        $sql = "INSERT INTO DetailProposition (idProposition,type) VALUES ( %s,'refuse')";
        $sql = sprintf($sql, $this->db->escape($idProposition));
        $this->db->query($sql);
    }

    public function changer_proprietaire_objet($idNewProprietaire, $idObjet)
    {

        $sql = "UPDATE Objet SET idUtilisateur=%s  WHERE idObjet=%s";
        $sql = sprintf($sql, $this->db->escape($idNewProprietaire), $this->db->escape($idObjet));
        $this->db->query($sql);
    }
}
?>