<?php


header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

header('Content-Type: application/json');


$input = json_decode(file_get_contents('php://input'), true);

if (
    !isset($input['pointA']['latitude'], $input['pointA']['longitude'], 
            $input['pointB']['latitude'], $input['pointB']['longitude'])
) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid input']);
    exit;
}

function haversineDistance($lat1, $lon1, $lat2, $lon2): float {
    $earthRadius = 6371000; 

    $lat1 = deg2rad($lat1);
    $lon1 = deg2rad($lon1);
    $lat2 = deg2rad($lat2);
    $lon2 = deg2rad($lon2);

    $deltaLat = $lat2 - $lat1;
    $deltaLon = $lon2 - $lon1;

    $a = sin($deltaLat / 2) ** 2 +
         cos($lat1) * cos($lat2) * sin($deltaLon / 2) ** 2;

    $c = 2 * atan2(sqrt($a), sqrt(1 - $a));

    return $earthRadius * $c;
}

$distance = haversineDistance(
    $input['pointA']['latitude'], $input['pointA']['longitude'],
    $input['pointB']['latitude'], $input['pointB']['longitude']
);

echo json_encode(['distance'=> round($distance)]);

?>
