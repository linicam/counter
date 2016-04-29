<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Counter extends MY_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model('counter_model');
        $this->load->helper('url');
        $this->load->helper('url_helper');
    }

    public function index()
    {
        $data['lists'] = $this->counter_model->get_lists();
        $this->load->view('home', $data);
    }

    public function save()
    {
        $parsed_json_post_data = $this->parse_json_encoded_post_data();
        $result = [];
        if (isset($parsed_json_post_data)) {
            $this->counter_model->save($parsed_json_post_data);
            $result['success'] = true;
        } else {
            $result['error'] = true;
        }

        $this->generate_json_response($result);
    }

    public function get(){
        $parsed_json_post_data = $this->parse_json_encoded_post_data();
        if($parsed_json_post_data['date'] == 0){
            $parsed_json_post_data['date'] = date('Y-m-d');
        }
        $result = [];
        $result['lists'] = $this->counter_model->get_lists($parsed_json_post_data['date']);
        $result['success'] = true;
        $this->generate_json_response($result);
    }

    //
    public function addTime(){
        $parsed_json_post_data = $this->parse_json_encoded_post_data();
        $result = [];
        if (isset($parsed_json_post_data)) {
            $this->counter_model->add($parsed_json_post_data);
            $result['success'] = true;
        } else {
            $result['error'] = true;
        }

        $this->generate_json_response($result);
    }
}
