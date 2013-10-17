<?

include "php/library_handling.php";

$id = $_GET['id'];
$title = $_GET['title'];
$user = $_GET['user'];
echo add_video_to_library($user, $id, $title);

?>