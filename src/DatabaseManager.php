<?php

include 'CnfFileManager.php';

class DatabaseManager
{

    /** @var object $cnfFileManager */
    private $content;

    public function __construct()
    {
        $cnfFileManager = new CnfFileManager();
        $error = $cnfFileManager->getError();
        if( !empty($error) ) {
            throw new Exception($error);
        } else {
            $this->content = $cnfFileManager->getContent();
        }
    }

    public function query(string $sql): bool
    {

        try {
            $connection = new mysqli(
                $this->content['host'],
                $this->content['username'],
                $this->content['password'],
                $this->content['database_name']
            );
            $connection->query($sql);
            $connection->close();
            return true;
        } catch (\Throwable $exception) {
            return false;
        }
    }

}
