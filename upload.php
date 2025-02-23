<?php
if ($_FILES['file']) {
    $targetDir = "uploads/"; // Ensure this folder exists and is writable
    $fileName = basename($_FILES["file"]["name"]);
    $targetFilePath = $targetDir . $fileName;

    if (move_uploaded_file($_FILES["file"]["tmp_name"], $targetFilePath)) {
        $fileUrl = "https://yourwebsite.com/" . $targetFilePath;
        echo json_encode(["fileUrl" => $fileUrl]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "File upload failed"]);
    }
}
?>
