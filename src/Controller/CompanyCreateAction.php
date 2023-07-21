<?php

namespace App\Controller;

use App\Component\Company\CompanyFactory;
use App\Component\Company\CompanyManager;
use App\Entity\Company;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class CompanyCreateAction extends AbstractController
{
    public function __construct(private CompanyFactory $companyFactory, private CompanyManager $companyManager)
    {}

    public function __invoke(Company $data): void
    {
        $company = $this->companyFactory->create($data->getEmail(),$data->getPassword(),$data->getName());
        $this->companyManager->save($company, true);

        exit();
    }
}