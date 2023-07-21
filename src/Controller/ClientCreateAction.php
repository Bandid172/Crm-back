<?php

namespace App\Controller;

use App\Component\Client\ClientFactory;
use App\Component\Client\ClientManager;
use App\Entity\Client;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class ClientCreateAction extends AbstractController
{
    public function __construct(private ClientFactory $clientFactory, private ClientManager $clientManager)
    {
    }

    public function __invoke(Client $data): void
    {
        $client = $this->clientFactory->create($data->getEmail(),$data->getPassword(),$data->getName(),$data->getWorkplace());
        $this->clientManager->save($client,true);
        exit();
    }
}