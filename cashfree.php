<?php
/**
 * Plugin Name: Cashfree Payment
 * Description: Cashfree payment mechanism.
 * 
 */

add_action('rest_api_init', function () {
    register_rest_route('cashfree/v1', '/create-token', array(
        'methods' => 'POST',
        'callback' => 'create_cashfree_order_token',
    ));
});

function create_cashfree_order_token($request) {
    $appId = 'TEST10335102b7a62b5743e3f0c8ce0620153301';
    $secret_key = 'cfsk_ma_test_50fe31df044336cd63d62da407dd73be_97adaa87';

    $params = $request->get_json_params();
    $amount = $params['amount'];
    $email = $params['email'];
    $phone = $params['phone'];
    $order_id = wp_generate_password(20, false, false);

    $data = [
        'order_id' => $order_id,
        'order_amount' => $amount,
        'order_currency' => 'INR',
        'customer_details' => [
            'customer_email' => $email,
            'customer_phone' => $phone,
            'customer_id' => preg_replace('/[^a-zA-Z0-9_\-]/', '_', $email),
        ],
    ];

    $signature = hash_hmac( 'sha256', $appId . $order_id . $amount . 'INR', $secret_key );
    $data['signature'] = $signature;

    // Make API request to Cashfree to create an order and get a token
    $response = wp_remote_post('https://sandbox.cashfree.com/pg/orders', [
        'body' => json_encode($data),
        'headers' => [
            'x-api-version' => '2023-08-01',
            'x-client-id' => $appId,
            'x-client-secret' => $secret_key,
            'Content-Type' => 'application/json',
        ],
    ]);

    return json_decode(wp_remote_retrieve_body($response));
}
