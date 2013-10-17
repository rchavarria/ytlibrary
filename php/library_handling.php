<?

/*
    Reads the contents of a user's library. 
    If the user is null, it returns a 'default' user.
    If there is no library yet for this user, it creates an empty library and returns it
*/
function read_user_library($user) {
    $user = check_user($user);
    $libraryFile = "libraries/" . $user . ".lib";

    $content = file_get_contents($libraryFile);
    if($content == FALSE) {
        $h = fopen($libraryFile, "w");
        file_put_contents($libraryFile, '{"name": "' . $user . '", "videos": []}');
        fclose($h);

        return read_user_library($user);
    }
    
    return $content;
};

/*
    Returns a valid name for a user
*/
function check_user($user) {
    if($user == NULL or $user == "") return "default";
    return $user;
}

/*
    Adds a video to the user's library
*/
function add_video_to_library($user, $id, $title) {
    $content = read_user_library($user);
    $library = json_decode($content);

    // add a video to the end of the array (don't check for duplicated videos)
    $last = count($library->videos);
    $library->videos[$last]->id = $id;
    $library->videos[$last]->title = $title;

    return update_library($user, $library);
};

/*
    Updates the content of the file containing the user's library
*/
function update_library($user, $library) {
    $user = check_user($user);
    $libraryFile = "libraries/" . $user . ".lib";
    
    $newContent = json_encode($library);
    file_put_contents($libraryFile, $newContent);

    return file_get_contents($libraryFile);
}

/*
    Removes a video from the user's library
*/
function remove_video_from_library($user, $id) {
    $content = read_user_library($user);
    $library = json_decode($content);

    // find and remove video
    foreach ($library->videos as $key => $value) {
        if($library->videos[$key]->id == $id) {
            unset($library->videos[$key]);
            $library->videos = array_values($library->videos);
            break;
        }
    }

    return update_library($user, $library);
}

?>