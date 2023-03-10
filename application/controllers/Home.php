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
        $this->uploadFileTo($file, "assets/img/upload/");
    }

    public function getCategories()
    {
        $this->load->model("Modele_takalo", "data");
        $dataCategories = $this->data->getAllCategories();
        echo json_encode($dataCategories);
        $this->session->unset_userdata("pathPics");
    }

    public function sendExchange()
    {
        $this->load->model("Modele_takalo", "data");
        $user = $_POST["idObjectUser"];
        $other = $_POST["idObjectWanted"];
        $this->data->proposer_echange($user, $other);
        echo json_encode(array("status" => "good"));
    }

    public function addCategory()
    {
        $this->load->model("Modele_takalo", "data");
        $name = $_POST["nameCategory"];
        $this->data->insert_category($name);
        echo json_encode(array("status" => "good"));

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

    function uploadFileTo($file, $repository)
    {
        $details = "";
        $target_file = $repository . basename($file["name"]);
        $uploadOk = 1;
        $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

        // Check if image file is a actual image or fake image
        $check = getimagesize($file["tmp_name"]);
        if ($check !== false) {
            // echo "File is an image - " . $check["mime"] . ".";
            $uploadOk = 1;
        } else {
            $details = "File is not an image.";
            $uploadOk = 0;
        }

        // Check if file already exists
        if (file_exists($target_file)) {
            // $detail = "Sorry, file already exists.";
            // $uploadOk = 0;
        }

        // Check file size
        if ($file["size"] > 100000000) {
            $detail = "Sorry, your file is too large.";
            $uploadOk = 0;
        }

        // Allow certain file formats
        if (
            $imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
            && $imageFileType != "gif" && $imageFileType != "jpeg"
        ) {
            $detail = "Sorry, only JPG, PNG & GIF files are allowed.";
            $uploadOk = 0;
        }

        // Check if $uploadOk is set to 0 by an error
        if ($uploadOk == 0) {
            //$detail = "Sorry, your file was not uploaded.";
            echo json_encode(array("status" => "error", "detail" => $detail));

            //   return 1;
// if everything is ok, try to upload file
        } else {
            if (move_uploaded_file($file["tmp_name"], $target_file)) {
                // echo "The file ". htmlspecialchars( basename( $file["name"])). " has been uploaded.";
                echo json_encode(array("img" => $target_file));
                $picsArray = $this->session->userdata("pathPics");
                array_push($picsArray, $target_file);
                $this->session->set_userdata("pathPics", $picsArray);
            } else {
                echo json_encode(array("status" => "error", "detail" => $detail));
            }
        }
    }


}