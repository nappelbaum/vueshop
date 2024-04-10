https://vc.ru/u/22269-aleksandr-shulepov/641004-chto-takoe-wp-rest-api-zhivye-primery

Что такое WP REST API. Живые примеры php

Вот несколько примеров использования WP REST API с живыми примерами кода:

1. Получение списка всех постов:
// Подключаемся к API WordPress
$url = 'https://example.com/wp-json/wp/v2/posts';
$response = wp_remote_get( $url );

// Если запрос успешен, обрабатываем данные
if( is_array( $response ) ) {
  $posts = json_decode( $response['body'] );
  foreach( $posts as $post ) {
    echo $post->title->rendered;
    echo $post->content->rendered;
  }
}
2. Создание нового поста:
// Подготавливаем данные для отправки
$data = array(
  'title' => 'Название нового поста',
  'content' => 'Текст нового поста',
  'status' => 'publish'
);
// Отправляем POST-запрос на API WordPress
$url = 'https://example.com/wp-json/wp/v2/posts';
$response = wp_remote_post( $url, array(
  'method' => 'POST',
  'headers' => array(
    'Content-Type' => 'application/json',
    'Authorization' => 'Basic ' . base64_encode( 'username:password' )
  ),
  'body' => json_encode( $data )
) );
// Если пост успешно создан, выводим сообщение
if( is_array( $response ) && !is_wp_error( $response ) ) {
  echo 'Пост успешно создан!';
}
3. Обновление существующего поста:
// Подготавливаем данные для отправки
$data = array(
  'title' => 'Новое название поста',
  'content' => 'Новый текст поста'
);
// Отправляем PUT-запрос на API WordPress
$url = 'https://example.com/wp-json/wp/v2/posts/123';
$response = wp_remote_post( $url, array(
  'method' => 'PUT',
  'headers' => array(
    'Content-Type' => 'application/json',
    'Authorization' => 'Basic ' . base64_encode( 'username:password' )
  ),
  'body' => json_encode( $data )
) );
// Если пост успешно обновлен, выводим сообщение
if( is_array( $response ) && !is_wp_error( $response ) ) {
  echo 'Пост успешно обновлен!';
}
4. Удаление поста:
// Отправляем DELETE-запрос на API WordPress
$url = 'https://example.com/wp-json/wp/v2/posts/123';
$response = wp_remote_request( $url, array(
  'method' => 'DELETE',
  'headers' => array(
    'Authorization' => 'Basic ' . base64_encode( 'username:password' )
  )
) );
// Проверяем статус ответа
$status_code = wp_remote_retrieve_response_code( $response );
// Если пост успешно удален, выводим сообщение
if( $status_code === 200 ) {
  echo 'Пост успешно удален!';
} else {
  echo 'Ошибка удаления поста. Код ошибки: ' . $status_code;
}

add: 1c-bitrix API:

https://gendalf.ru/news/marketing/programmirovanie-1sbirtriks-integratsiya/