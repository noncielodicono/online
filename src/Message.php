<?php

include 'DatabaseEntity.php';

class Message extends DatabaseEntity
{

    protected $tableName = 'messages';

    public function __construct($username, $message)
    {
        $this->valueMap = [
            'username' => $this->clearString($username),
            'message' => $this->clearString($message),
            'created_at' => (new \DateTime())->format('Y-m-d H:i:s'),
            'readed' => 0,
        ];
    }

}