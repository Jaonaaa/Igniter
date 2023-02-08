<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Home extends CI_Controller
{

    public function __construct()
    {
        parent::__construct();
        $this->load->helper("url");
        if (!$this->session->has_userdata("user")) {
            redirect(base_url() . "index.php/Login/deconnexion");
        }
    }
    public function index()
    {

    }

    public function uploadFile()
    {
        if (!$this->session->has_userdata("pathPics")) {
            $this->session->set_userdata("pathPics", array());
        }
        $this->load->model("Treatement", "upload");
        $file = $_FILES['fileToUpload'];
        $this->upload->uploadFile($file, "assets/img/upload/");
    }

    public function getCategories()
    {
        $this->load->model("Modele_takalo", "data");
        $dataCategories = $this->data->getAllCategories();
        echo json_encode($dataCategories);
        $this->session->unset_userdata("pathPics");

    }

    public function addProduct()
    {
        $this->load->model("Modele_takalo", "data");
        $description = $_POST["description"];
        $idCategory = $_POST["idCategory"];
        $prix = $_POST["price"];
        $name = $_POST["name"];
        $this->data->registerObject($name, $idCategory, $description, $prix);
        echo json_encode(array("status" => "good", "add" => 0));
    }

    public function getFeeds()
    {
        $user = $this->session->userdata("user");
        $idUser = $user['idUtilisateur'];
        $this->load->model("Modele_takalo", "data");
        $data = $this->data->getObjectOtherUser($idUser);
        echo json_encode($data);
    }
    public function getMyProduct()
    {
        $user = $this->session->userdata("user");
        $idUser = $user['idUtilisateur'];
        $this->load->model("Modele_takalo", "data");
        $data = $this->data->getMyObject($idUser);
        echo json_encode($data);
    }


}