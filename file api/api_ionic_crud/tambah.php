<?php
require 'koneksi.php';
$input = file_get_contents('php://input');
$data = json_decode($input,true);
//terima data dari mobile
$nama=trim($data['nama']);
$email=trim($data['email']);
$telepon=trim($data['telepon']);
http_response_code(201);
if($nama!='' && $email!='' && $telepon!=''){
 $query = mysqli_query($koneksi,"insert into kontak(nama,email,telepon) values('$nama','$email','$telepon')");
 $pesan = true;
}else{
 $pesan = false;
}
echo json_encode($pesan);
echo mysqli_error($koneksi);