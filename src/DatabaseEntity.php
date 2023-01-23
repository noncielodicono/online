<?php

include 'DatabaseManager.php';

class DatabaseEntity
{

    const INSERT = 'INSERT INTO ';

    private $notValidCharactersMap = [
        '\'' => ' ',
        '--' => '-',
    ];

    protected $tableName = '';

    protected $valueMap = [];

    private function getColumnNamesList(): string
    {
        $keys = array_keys($this->valueMap);
        return '(' . implode ( ',' , $keys ) . ')';
    }

    private function getValueList(): string 
    {
        $quotedValues = array_map(function ($value) {
            return '\'' . $value . '\'';
        }, array_values($this->valueMap));
        return '(' . implode ( ',' , $quotedValues ) . ')';
    }

    private function generateInsert(): string
    {
        return
            self::INSERT .
            $this->tableName .
            $this->getColumnNamesList() .
            ' VALUES ' .
            $this->getValueList()
        ;
    }

    public function insert(): bool
    {
        $dbManager = new DatabaseManager();
        return $dbManager->query( $this->generateInsert() );
    }

    protected function clearString($value): string
    {
        foreach ($this->notValidCharactersMap as $notValidCharacter => $validCharacter) {
            $value = str_replace($notValidCharacter, $validCharacter, $value);
        }
        return $value;
    }

}