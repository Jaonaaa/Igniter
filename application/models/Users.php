<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Users extends CI_Model
{

	public function verify_user($email, $password)
	{
		if ($email == 'paul@gmail.com' && $password == "popo") {
			return true;
		} 
        else if ( $email == 'tahiry@gmail.com' && $password == "kanto") 
        {
            return true;
        }
        else if ( $email == 'riana@gmail.com' && $password == "montoya")
        {
            return true;
        }
        else 
        {
			return false;
		}
	}

	public function getDetailCustomer($id)
	{
		$request = "SELECT * FROM customer_list WHERE id = %s ";
		$request = sprintf($request, $this->db->escape($id));
		$query = $this->db->query($request);
		$row = $query->row_array();
		$data = array(
			"name" => $row["name"],
			"address" => $row["address"],
			"zipCode" => $row["zip code"],
			"phone" => $row["phone"],
			"city" => $row["city"],
			"country" => $row["country"],
			"notes" => $row["notes"],
			"sid" => $row["SID"]
		);

		return $data;
	}
	
}
