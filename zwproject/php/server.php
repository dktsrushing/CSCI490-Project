<?php

/*  *************************************************************************************************************************************
 * CONNECTING TO A DATABASE
 * *************************************************************************************************************************************
 * $dsn represents the connection string for the database source.
 *     It includes the host name (localhost for us) and the database name you are trying to connect.
 *     In our class, it is usually the same as your username.  Type your database name in the code where indicated.
 * $user represents the username.
 *     You have been given a username to use with our database.  Type your username where indicated.
 * $pass represents the password for the database.
 *     You have been provided with a password.  Type your password where indicated.
 * $pdo represents the code that establishes the connection by creating an instance of the PDO base class (this is a built-in PHP class)
 *      The constructor accepts the parameters for specifiying the database source (A.K.A. the DSN) and for the username and password.
 * $pdo->setAttribute sets and attribute on the database handle.
 *      See https://www.php.net/manual/en/pdo.setattribute.php
 */
$dsn= "mysql:host=localhost;dbname=CSCI490FA24";
$user = "CSCI490FA24";
$pass = "CSCI490Pass!";
$pdo = new PDO($dsn,$user,$pass);
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);