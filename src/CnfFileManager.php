<?php

class CnfFileManager
{

    /** @var string $error */
    private $error;

    /** @var string $content */
    private $content;

    public function __construct()
    {
        $content = file_get_contents( '../app/config/my.cnf' );
        if( empty($content) ) {
            $this->error = 'Unable to read configuration file';
        } else {
            $this->content = json_decode($content, true);
            if( empty($this->content) || $this->getContent() == 'NULL' ) {
                $this->error = 'Configuration file is not well formatted';
            }
        }
    }

    public function getError()
    {
        return $this->error;
    }

    public function getContent()
    {
        return $this->content;
    }

}