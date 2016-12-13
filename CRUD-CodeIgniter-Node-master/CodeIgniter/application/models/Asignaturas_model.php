<?php
if(!defined('BASEPATH')) exit('No direct script access allowed');

class Asignaturas_model extends CI_Model {
  
  public function __construct() {
    parent::__construct();
  }

  public function set_asignatura($nom, $cod, $sinop, $fecha) {
    $data = array(
      'nombre' => $nom,
      'codigo' => $cod,
      'sinopsis' => $sinop,
      'fecha' => $fecha
    );

    $this->db->insert('asignaturas', $data);
  }

  public function delete_asignatura($nom) {
    $data = array(
      'nombre' => $nom
    );

    $this->db->delete('asignaturas', $data);
  }

  public function update_asignatura($cod, $nom,$sinop,$fecha) {
    $this->db->set('nombre', $nom);
    $this->db->set('sinopsis', $sinop);
    $this->db->set('fecha', $fecha);
    $this->db->where('codigo', $cod);
    $this->db->update('asignaturas');
  }

  public function get_asignaturas() {
    $this->db->select('*');
    $this->db->from('asignaturas');
    $this->db->order_by('codigo DESC');
    $query = $this->db->get();

    if($query->num_rows() > 0) {
      return $query;
    } else {
      return false;
    }
  }
}

?>