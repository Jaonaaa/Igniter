<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Treatement extends CI_Model
{

	
    


function uploadFile($file,$repository)
{
$target_file = $repository . basename($file["name"]);
$uploadOk = 1;
$imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));

// Check if image file is a actual image or fake image
  $check = getimagesize($file["tmp_name"]);
  if($check !== false) {
   // echo "File is an image - " . $check["mime"] . ".";
    $uploadOk = 1;
  } else {
   // echo "File is not an image.";
    $uploadOk = 0;
  
}

// Check if file already exists
if (file_exists($target_file)) {
 //echo "Sorry, file already exists.";
  $uploadOk = 0;
  echo json_encode(array("img"=>$target_file)) ;
}

// Check file size
if ($file["size"] > 1000000) {
  echo "Sorry, your file is too large.";
  $uploadOk = 0;
}

// Allow certain file formats
if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
&& $imageFileType != "gif" ) {
  echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
  $uploadOk = 0;
}

// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
//   echo "Sorry, your file was not uploaded.";
//   return 1;
// if everything is ok, try to upload file
} else {
  if (move_uploaded_file($file["tmp_name"], $target_file)) {
   // echo "The file ". htmlspecialchars( basename( $file["name"])). " has been uploaded.";
    echo json_encode(array("img"=>$target_file)) ;
  } else {
    return 1;
    echo "Sorry, there was an error uploading your file.";
  }
}
}
	
}
