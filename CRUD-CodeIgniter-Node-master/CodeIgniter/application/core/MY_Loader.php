<?php
/**
 * @Author: Miguel González Aravena
 * @Email: miguel.gonzalez.93@gmail.com
 * @Github: https://github.com/MiguelGonzalezAravena
 * @Date: 2016-10-27 18:50:42
 * @Last Modified by: Miguel GonzÃ¡lez Aravena
 * @Last Modified time: 2016-12-06 00:34:12
 */
class MY_Loader extends CI_Loader {
  public function template($template_name, $vars = array(), $return = false) {
    if($return):
      $content .= $this->view('templates/header', $vars, $return);
      $content .= $this->view($template_name, $vars, $return);
      $content .= $this->view('templates/footer', $vars, $return);
      return $content;
    else:
      $this->view('templates/header', $vars);
      $this->view($template_name, $vars);
      $this->view('templates/footer', $vars);

    endif;
  }
}
?>
