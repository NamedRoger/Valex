<?php 

$result = [];
try{

}catch(Exception $exception){
    $result['success'] = false;
    $result['error'] = $exception->getMessage();
    
    http_response_code(400);
    echo json_encode($result);
}