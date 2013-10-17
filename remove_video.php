<?

include "php/library_handling.php";

$id = $_GET['id'];
$user = $_GET['user'];
echo remove_video_from_library($user, $id);

?>