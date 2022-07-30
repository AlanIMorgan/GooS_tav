<?php

    if (isset($_POST['targetF']) && !empty($_POST['targetF']) && isset($_POST['file']) && !empty($_POST['file'])) {

        $target_file = filter_var(htmlspecialchars($_POST['targetF'], ENT_QUOTES, 'UTF-8'), FILTER_SANITIZE_STRING);

        $file = filter_var(htmlspecialchars($_POST['file'], ENT_QUOTES, 'UTF-8'), FILTER_SANITIZE_STRING);

        $trash_dir = "trash/";

        rename($target_file, $trash_dir.$file);
    }
?>