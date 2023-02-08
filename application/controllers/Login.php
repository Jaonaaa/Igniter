<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Login extends CI_Controller
{

    public function index()
    {
        $this->load->helper('url');
        $this->loadLogin();
    }

    public function loadLogin()
    {
        if ($this->session->has_userdata('user')) {
            redirect(base_url() . "index.php/Login/goHome");
        } else {
            $this->load->view('Login');
        }
    }

    public function loginUser($password = "", $email = "")
    {
        $this->load->helper('url');
        //
        if ($email == "adminX") {
            $email = "admin@gmail.com";
        } else {
            $email = $this->input->post('email');
            $password = $this->input->post('password');
        }
        //

        $this->load->model('Modele_takalo', 'user');
        $response = $this->user->check_login($email, $password);
        //
        if ($response) {
            // admin

            if ($password == "admin" && $email == "admin@gmail.com") {
                $this->session->set_userdata('admin', $email);
            }
            //
            $this->session->unset_userdata('wrongEmail');
            redirect(base_url() . "index.php/Login/goHome");
        } else {
            $this->session->set_userdata('wrongEmail', $email);
            redirect(base_url() . "?error");
        }
    }

    public function signUp()
    {
        $this->load->helper('url');
        //
        $email = $this->input->post('email');
        $password = $this->input->post('password');
        $username = $this->input->post('username');
        $this->load->model('Modele_takalo', 'user');
        $noDoublon = $this->user->check_inscription($email, $password);
        $this->session->unset_userdata('wrongEmail');

        echo $email . $password;
        if ($noDoublon) {
            $this->user->insert_utlisateur($email, $password, $username);
            redirect(base_url() . "?inscrit");
        } else {
            redirect(base_url() . "?error=doublon");
        }
    }


    public function goHome()
    {
        $this->load->helper('url');

        if ($this->session->has_userdata('user')) {
            $this->load->view('Home');
        } else {
            redirect(base_url());
        }
    }

    public function deconnexion()
    {
        $this->load->helper('url');
        // $this->session->unset_userdata('user');
        // $this->session->unset_userdata('admin');
        $this->session->sess_destroy();
        redirect(base_url());
    }
}