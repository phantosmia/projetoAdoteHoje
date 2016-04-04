<?php

$con = mysqli_connect("localhost","root","","projetorenzo");
$sql = "SELECT* FROM ANIMAIS ORDER BY ID DESC LIMIT 1";
$result = $con->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {

        $id_imagem = $row['id']+1;
    }
} else {
    echo "0 results";
  }
if(!$con)
  die(mysql_error());
  switch ($_REQUEST['acao']) {
          case 'add' :
          $estado = urldecode($_REQUEST['estado']);
          //$valor2 = urldecode($_REQUEST['email']);
          $cidade = urldecode($_REQUEST['cidade']);
          $endereco = urldecode($_REQUEST['endereco']);
          //$valor2 = urldecode($_REQUEST['email']);
          $nomeAnimal = urldecode($_REQUEST['nomeAnimal']);
          $tipoAnimal = urldecode($_REQUEST['tipoAnimal']);
          //$valor2 = urldecode($_REQUEST['email']);
          $descricao = urldecode($_REQUEST['descricao']);
          $genero = urldecode($_REQUEST['genero']);
          $q=mysqli_query($con,"insert into animais (caminhoImagem, Estado, Cidade, Endereco, Nome, Tipo, Descricao, Sexo) values('a','".$estado."','".$cidade."','".$endereco."','".$nomeAnimal."','".$tipoAnimal."','".$descricao."','".$genero."')");
          if(!$q)
          {
         echo("Error description: " . mysqli_error($con));
          }
          break;
}
        ?>
