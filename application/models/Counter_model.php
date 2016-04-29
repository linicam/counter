<?php
/**
 * Created by PhpStorm.
 * User: ibm
 * Date: 2016/4/22
 * Time: 14:14
 */
defined('BASEPATH') OR exit('No direct script access allowed');

class Counter_model extends CI_Model
{
    public function __construct()
    {
        $this->load->database();
    }

    public function get_lists($date = 0)
    {
        if($date == 0){
            $query = $this->db->get('lists');
            return $query->result_array();
        } else {
            $query = $this->db->get_where('lists', array('date' => $date));
            return $query->result_array();
        }
    }

    public function save($parsed_json_post_data)
    {
        $parsed_json_post_data['date'] = date('Y-m-d');
        $this->rest($parsed_json_post_data);
        $this->db->insert('lists', $parsed_json_post_data);
    }

    public function add($parsed_json_post_data)
    {
        $parsed_json_post_data['date'] = date('Y-m-d');
        $this->rest($parsed_json_post_data['time'], true);
        $this->db->insert('add_his', $parsed_json_post_data);
    }

    public function rest($rest, $add = false)
    {
        $sFlag = false;
        $mFlag = false;
        $restTime = $this->db->get('rest');
        $restTime = $restTime->result_array()[0];
        if($add){
            $restTime['m'] += $rest;
            if($restTime['m'] > 60){
                $restTime['m'] -= 60;
                $restTime['h'] += 1;
            }
        } else {
            if($restTime['s'] < $rest['s']){
                $sFlag = true;
                $restTime['s'] = $restTime['s'] + 60 - $rest['s'];
            } else {
                $restTime['s'] -= $rest['s'];
            }
            if($sFlag){
                $restTime['m'] -= 1;
            }
            if($restTime['m'] < $rest['m']){
                $mFlag = true;
                $restTime['m'] = $restTime['m'] + 60 - $rest['m'];
            } else {
                $restTime['m'] -= $rest['m'];
            }
            if($mFlag){
                $restTime['h'] -= 1;
            }
            $restTime['m'] -= $rest['m'];
        }
        $this->db->replace('rest', $restTime);
    }
}