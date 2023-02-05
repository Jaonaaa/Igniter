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
        if($this->session->has_userdata('login'))
        {
            redirect(base_url()."index.php/Login/goHome");
        }
        else
        {
            $this->load->view('Login');
        }
    }

    public function loginUser()
    {
        $this->load->helper('url');
        //
        $email = $this->input->post('email');
        $password = $this->input->post('password');
        $this->load->model('Users','user');
        $response =$this->user->verify_user($email, $password);
        if($response)
        {
            $this->session->set_userdata('login',$email);
            redirect(base_url()."index.php/Login/goHome");
        }
        else
        {
            redirect(base_url());
        }
    }   


    public function goHome()
    {
       
        $this->load->helper('url');

        if(  $this->session->has_userdata('login'))
        {
            $this->load->view('Home');
        }
        else
        {
            redirect(base_url());
        }
    }

    public function deconnexion()
    {
        $this->load->helper('url');
        $this->session->unset_userdata('login');
        redirect(base_url());
    }
}
