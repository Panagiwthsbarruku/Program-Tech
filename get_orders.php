<?php
header('Content-Type: application/json');

try {
    $db = new PDO('sqlite:orders.db');
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Φίλτρα από query string
    $storeNumber = $_GET['storeNumber'] ?? null;
    $category = $_GET['category'] ?? null;
    $fromDate = $_GET['fromDate'] ?? null;
    $toDate = $_GET['toDate'] ?? null;

    $conditions = [];
    $params = [];

    if ($storeNumber) {
        $conditions[] = 'store_number = ?';
        $params[] = $storeNumber;
    }

    if ($category) {
        $conditions[] = 'category = ?';
        $params[] = $category;
    }

    if ($fromDate && $toDate) {
        $conditions[] = 'from_date >= ? AND to_date <= ?';
        $params[] = $fromDate;
        $params[] = $toDate;
    }

    $sql = 'SELECT * FROM orders';
    if (!empty($conditions)) {
        $sql .= ' WHERE ' . implode(' AND ', $conditions);
    }
    $sql .= ' ORDER BY id DESC';

    $stmt = $db->prepare($sql);
    $stmt->execute($params);
    $orders = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($orders);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Σφάλμα βάσης: ' . $e->getMessage()]);
}
?>
