<?php

    require 'index.html';
    
    if (isset($_POST['lang']) && !empty($_POST['lang'])) {

        $lang = filter_var(htmlspecialchars($_POST['lang'], ENT_QUOTES, 'UTF-8'), FILTER_SANITIZE_STRING);

        date_default_timezone_set('America/Mexico_City');
        
        $date = date("d-m-Y_H:i:s"); /* 
        
        $vars = get_defined_vars(); print_r($vars); */

        $target_dir = "uploads/";
        
        $file_uploaded = filter_var(htmlspecialchars(basename($_FILES["imageSelected"]["name"]), ENT_QUOTES, 'UTF-8'), FILTER_SANITIZE_STRING);
        
        $target_file = $target_dir . $file_uploaded;
        
        $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));

        $ff = $_FILES["imageSelected"]["tmp_name"];
        
        $check = getimagesize($ff);

        if ($check !== false) {

            $nFile = $date.'.'.$imageFileType;

            $target_file = $target_dir.$nFile;

            rename($ff, $target_file);

            ?>
                
                <!--  TESSERACT -->
                <script src='https://unpkg.com/tesseract.js@v2.1.0/dist/tesseract.min.js'></script>
                
                <!--  JQUERY -->
                <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>

                <script>

                    txtCont = document.getElementById("text-div");

                    txtCont.innerHTML = '<textarea id="txt_area" cols="30" rows="10" readonly> Cargando... Esto puede tardar... </textarea>';

                    cp = '<br><br><a id="cp_btn"> Copiar </a>';

                    function copy() {

                        txtArea = document.getElementById("txt_area");
                        
                        txtArea.focus();
                        txtArea.select();
                        document.execCommand('copy');
                    }

                    Tesseract.recognize(

                        <?php echo "'$target_file'"; ?>,

                        <?php echo "'$lang'"; ?>,
                        
                        { logger: m => console.log(m) }

                    ).then(({ data: { text } }) => {

                        console.log(text);

                        txtCont.innerHTML = '<textarea id="txt_area" cols="30" rows="10" readonly>' + text + '</textarea>';

                        txtCont.innerHTML += cp;

                        document.getElementById("cp_btn").addEventListener("click", copy);

                        function remove() {

                            var parametros = {

                                "targetF": <?php echo "'$target_file'"; ?>,

                                "file": <?php echo "'$nFile'"; ?>
                            };

                            $.ajax({

                                data: parametros,
                                url: 'remove_img.php',
                                type: 'post',

                                beforeSend: function() {},
                                success: function(response) {}
                            });
                        }

                        remove();
                    });
                </script>

            <?php
        }
        
        else { 
            
            ?>
            
                <script>

                    txtCont = document.getElementById("text-div");

                    txtCont.innerHTML = "El archivo seleccionado no es una imagen";
                </script>
            <?php
        }
    }
?>

<script>

    document.getElementById("ft").innerHTML = '<a href="../ocr/"> Repetir </a>';
</script>