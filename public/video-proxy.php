<?php
// The URL of the video you want to proxy
$videoUrl = 'https://vidrsc.pm/path/to/your/video.mp4'; // You might need to find the direct .mp4 link

// Fetch the video headers first
$headers = get_headers($videoUrl, 1);

// Set the appropriate headers for the browser
foreach ($headers as $header => $value) {
    // Ignore the host header, as it will be set by the webserver
    if (strtolower($header) !== 'host') {
        if (is_array($value)) {
            foreach ($value as $val) {
                header("$header: $val");
            }
        } else {
            header("$header: $value");
        }
    }
}

// Read the file and output it directly to the browser
readfile($videoUrl);
exit;
?>
