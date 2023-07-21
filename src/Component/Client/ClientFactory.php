<?php

namespace App\Component\Client;

use App\Entity\Client;
use App\Entity\Company;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class ClientFactory
{
    public function __construct(private UserPasswordHasherInterface $passwordHasher)
    {
    }

    public function create(string $email, string $password, string $name, Company $workplace): Client
    {
        $client = new Client();
        $client->setEmail($email);
        $hashedPassword = $this->passwordHasher->hashPassword($client,$password);
        $client->setPassword($hashedPassword);
        $client->setName($name);
        $client->setWorkplace($workplace);
        $client->setIsDeleted(false);

        return $client;
    }
}