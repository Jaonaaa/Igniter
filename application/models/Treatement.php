<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Treatement extends CI_Model
{

  function uploadFile($file, $repository)
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