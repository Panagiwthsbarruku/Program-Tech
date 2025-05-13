<?php
// Επιστρέφει JSON
header('Content-Type: application/json');

// Λήψη JSON δεδομένων από POST
$data = json_decode(file_get_contents('php://input'), true);

// Έλεγχος αν υπάρχουν όλα τα απαιτούμενα πεδία
if (
    !isset($data['storeNumber'], $data['name'], $data['code'], $data['category'], 
             $data['quantity'], $data['fromDate'], $data['toDate'])
) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Λείπουν δεδομένα.']);
    exit;
}

// Σύνδεση με SQLite βάση
try {
    $db = new PDO('sqlite:orders.db');
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Εισαγωγή στην βάση
    $stmt = $db->prepare('INSERT INTO orders 
        (store_number, name, code, category, quantity, from_date, to_date)
        VALUES (?, ?, ?, ?, ?, ?, ?)');
    $stmt->execute([
        $data['storeNumber'],
        $data['name'],
        $data['code'],
        $data['category'],
        $data['quantity'],
        $data['fromDate'],
        $data['toDate']
    ]);

    echo json_encode(['success' => true]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Σφάλμα βάσης: ' . $e->getMessage()]);
}
?>
