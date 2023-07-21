<?php

namespace App\Controller;

use App\Component\User\UserFactory;
use App\Component\User\UserManager;
use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class UserCreateAction extends AbstractController
{
    public function __construct(private UserFactory $userFactory, private UserManager $userManager)
    {
    }

    public function __invoke(User $data):void
    {
        $user = $this->userFactory->create($data->getEmail(), $data->getPassword(), $data->getName());
        $this->userManager->save($user, true);
        exit();
    }
}