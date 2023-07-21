<?php

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use App\Controller\ClientCreateAction;
use App\Repository\ClientRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: ClientRepository::class)]
#[ApiResource(
    operations: [
        new Get(),
        new Post(
            uriTemplate: '/clients/my',
            controller: ClientCreateAction::class,
            name: 'createClient'
        ),
        new GetCollection(),
        new Delete(),
        new Patch()
    ],
    normalizationContext: ['groups' => ['client:read']],
    denormalizationContext: ['groups' => ['client:write']]
)]
#[ApiFilter(SearchFilter::class, properties: ['id' => 'exact', 'name' => 'partial', 'email' => 'partial', 'workplace' => 'partial'])]
class Client implements PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['client:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['client:read','client:write'])]
    private ?string $email = null;

    #[ORM\Column(length: 255)]
    #[Groups(['client:write'])]
    private ?string $password = null;

    #[ORM\Column(length: 255)]
    #[Groups(['client:read','client:write'])]
    private ?string $name = null;

    #[ORM\ManyToOne(inversedBy: 'clients')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['client:read','client:write'])]
    private ?Company $workplace = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['client:read','client:write'])]
    private ?bool $isDeleted = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): static
    {
        $this->password = $password;

        return $this;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getWorkplace(): ?Company
    {
        return $this->workplace;
    }

    public function setWorkplace(?Company $workplace): static
    {
        $this->workplace = $workplace;

        return $this;
    }

    public function isIsDeleted(): ?bool
    {
        return $this->isDeleted;
    }

    public function setIsDeleted(bool $isDeleted): static
    {
        $this->isDeleted = $isDeleted;

        return $this;
    }
}
