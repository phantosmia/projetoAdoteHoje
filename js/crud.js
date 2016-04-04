count = 0;

function ajax() {
};
var closeModal = function()
{
  modalWrapper.className = "";

};
ajax.prototype.iniciar = function() {

        try{
                this.xmlhttp = new XMLHttpRequest();
        }catch(ee){
                try{
                        this.xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
                }catch(e){
                        try{
                                this.xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
                        }catch(E){
                                this.xmlhttp = false;
                        }
                }
        }
        return true;
}

ajax.prototype.ocupado = function() {
        estadoAtual = this.xmlhttp.readyState;
        return (estadoAtual && (estadoAtual < 4));
}

ajax.prototype.processa = function() {
        if (this.xmlhttp.readyState == 4 && this.xmlhttp.status == 200) {
                return true;
        }
}

ajax.prototype.enviar = function(url, metodo, modo) {
        if (!this.xmlhttp) {
                this.iniciar();
        }
        if (!this.ocupado()) {
                if(metodo == "GET") {
                        this.xmlhttp.open("GET", url, modo);
                        this.xmlhttp.send(null);
                } else {
                        this.xmlhttp.open("POST", url, modo);
                        this.xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
                        this.xmlhttp.setRequestHeader("Cache-Control", "no-store, no-cache, must-revalidate");
                        this.xmlhttp.setRequestHeader("Cache-Control", "post-check=0, pre-check=0");
                        this.xmlhttp.setRequestHeader("Pragma", "no-cache");
                        this.xmlhttp.send(url);

                }

                if (this.processa) {
                        return unescape(this.xmlhttp.responseText.replace(/\+/g," "));
                }
        }
        return false;
}
function adicionarItem(id) {

        div = document.getElementById('carousel');
        reader  = new FileReader();

        div.innerHTML = div.innerHTML + "<li id = "+count+" class='span3'><div class='thumbnail'><a href='#'><img width='360' id=\"image"+count+"\" height='240'src=''></a><div class='caption' width='360' height='240'> <h4>" + nomeAnimal + "</h4><p>"+descricao+"</p> <button type='submit' name='remover' onclick='apagar("+count+")' class='btn btn-danger btn-mini' >&raquo; REMOVER</a> </div></div></li>";
        preview = document.getElementById('image'+count);
        reader.readAsDataURL(file);
        reader.onloadend = function () {
          preview.src = reader.result;
        }


}

function add() {
        count += 1;
        estado = document.getElementById('estado').value;
        estadoE = escape(estado);
        cidade = document.getElementById('cidade').value;
        cidadeE = escape(cidade);
        endereco = document.getElementById('endereco').value;
        enderecoE = escape(endereco);
        nomeAnimal = document.getElementById('nomeAnimal').value;
         if(document.getElementById('nomeAnimal').value == ""){
           nomeAnimal = "Sem nome";
         }
        file = document.querySelector('input[type=file]').files[0];
        nomeAnimalE = escape(nomeAnimal);
        tipoAnimal = document.getElementById('animalSelectCadastro').value;
        tipoAnimalE = escape(tipoAnimal);
        descricao = document.getElementById('descricao').value;
        descricaoE = escape(descricao);
        var radios = document.getElementsByName('sexo');
        for (var i = 0, length = radios.length; i < length; i++) {
            if (radios[i].checked) {
                genero = radios[i].value;

                break;
            }
        }
        xmlhttp = new ajax();

       id = xmlhttp.enviar('crud.php?acao=add&estado='+ estadoE + '&cidade=' + cidadeE + '&endereco='+ enderecoE + '&nomeAnimal='+nomeAnimalE+'&tipoAnimal='+tipoAnimalE +'&descricao='+descricaoE+'&genero='+genero, "POST", false); //manda adicionar
        if(document.getElementById('descricao').value == ""){
          descricaoErro = document.getElementById("noDescriptionSupplied");
          descricaoErro.innerHTML =  "<font color='red'> Você precisa fornecer uma descrição sobre o animal!</font>";

          document.getElementById("noCitySupplied").innerHTML="";
          document.getElementById("noStateSupplied").innerHTML="";
          document.getElementById("noAddressSupplied").innerHTML="";
        }
        else if(document.getElementById('endereco').value == ""){
          enderecoErro = document.getElementById("noAddressSupplied");
          enderecoErro.innerHTML = "<font color='red'> * Você precisa fornecer um endereço!</font>";
          document.getElementById("noDescriptionSupplied").innerHTML="";
          document.getElementById("noCitySupplied").innerHTML="";
          document.getElementById("noStateSupplied").innerHTML="";
        }
        else if(document.getElementById('estado').value == ""){
          estadoErro = document.getElementById("noStateSupplied");
          estadoErro.innerHTML = "<font color='red'> * Você precisa informar o estado que o animal se encontra!</font>";
          document.getElementById("noDescriptionSupplied").innerHTML="";
          document.getElementById("noCitySupplied").innerHTML="";
          document.getElementById("noAddressSupplied").innerHTML="";
        }
        else if(document.getElementById('cidade').value == ""){
          cidadeErro = document.getElementById("noCitySupplied");
          cidadeErro.innerHTML = "<font color='red'> * Você precisa informar a cidade que o animal se encontra!</font>";
          document.getElementById("noDescriptionSupplied").innerHTML="";
          document.getElementById("noStateSupplied").innerHTML="";
          document.getElementById("noAddressSupplied").innerHTML="";
        }
        else{
              adicionarItem(id); //adiciona a linha com os campos
              document.getElementById('descricao').value = "";
              document.getElementById('nomeAnimal').value = "";
              document.getElementById('endereco').value = "";
              document.getElementById('estado').value = "";
              document.getElementById('cidade').value = "";
              document.getElementById("noDescriptionSupplied").innerHTML="";
              document.getElementById("noCitySupplied").innerHTML="";
              document.getElementById("noStateSupplied").innerHTML="";
              document.getElementById("noAddressSupplied").innerHTML="";
              document.getElementById("exampleInputFile").value = "";
              document.getElementById("outputdiv").innerHTML = '<img id = "output" width="360px" height="240px"/>';
              closeModal();


    }
}

function apagar(id)
{
  swal({   title: "Você tem certeza?",
           text: "Este animal será excluido permanentemente!",
           type: "warning",   showCancelButton: true,
           confirmButtonColor: "#DD6B55",
           confirmButtonText: "Sim!",
           cancelButtonText: "Cancelar",
           closeOnConfirm: false,
           closeOnCancel: false },
           function(isConfirm){
           if (isConfirm) {
                  var element = document.getElementById(id);
                  element = element.parentNode.removeChild(element);
                  swal("Deletado!", "O Animal foi removido.", "success");

                }
                   else {
                          swal("Cancelado", "O animal não foi removido.", "error");   }
                         }
                       );
      }
