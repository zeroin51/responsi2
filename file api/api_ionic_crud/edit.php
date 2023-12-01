<?php
require 'koneksi.php';
$input = file_get_contents('php://input');
$data = json_decode($input,true);
//terima data dari mobile
$id=trim($data['id']);
$nama=trim($data['nama']);
$email=trim($data['email']);
$telepon=trim($data['telepon']);
http_response_code(201);
if($nama!='' && $nama!='' && $telepon!=''){
 $query = mysqli_query($koneksi,"update kontak set nama='$nama',email='$email',telepon='$telepon' where
id='$id'");
 $pesan = true;
}else{
 $pesan = false;
}
echo json_encode($pesan);
echo mysqli_error($koneksi);