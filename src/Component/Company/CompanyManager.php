<?php

namespace App\Component\Company;

use App\Entity\Company;
use Doctrine\ORM\EntityManagerInterface;

class CompanyManager
{
    public function __construct(private EntityManagerInterface $entityManager)
    {
    }

    public function save(Company $company, bool $isNeedFlush = false)
    {
        $this->entityManager->persist($company);

        if($isNeedFlush) {
            $this->entityManager->flush($company);
        }
    }
}