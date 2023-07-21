<?php

namespace App\Component\Company;

use App\Entity\Company;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class CompanyFactory
{
    public function __construct(private UserPasswordHasherInterface $passwordHasher)
    {
    }

    public function create(string $email, string $password, string $name)
    {
        $company = new Company();
        $company->setEmail($email);
        $hashedPassword = $this->passwordHasher->hashPassword($company, $password);
        $company->setPassword($hashedPassword);
        $company->setName($name);
        $company->setIsDeleted(false);

        return $company;
    }
}