<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class My_Controller extends CI_Controller {
    /**
     * parse json encoded post body data into an array
     * @return null
     */
    protected function parse_json_encoded_post_data()
    {
        $json_encoded_data = file_get_contents('php://input');
        if (!empty($json_encoded_data))
        {
            return json_decode($json_encoded_data, true);
        }
        else
        {
            return array();
        }
    }

    public function generate_json_response($data)
    {
        $this->output->set_content_type('application/json; charset=utf-8');
        $this->output->set_output(json_encode($data));
    }

}
