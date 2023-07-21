<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230715193932 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE client DROP FOREIGN KEY FK_C7440455AC25FB46');
        $this->addSql('DROP INDEX IDX_C7440455AC25FB46 ON client');
        $this->addSql('ALTER TABLE client DROP workplace_id');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE client ADD workplace_id INT NOT NULL');
        $this->addSql('ALTER TABLE client ADD CONSTRAINT FK_C7440455AC25FB46 FOREIGN KEY (workplace_id) REFERENCES company (id)');
        $this->addSql('CREATE INDEX IDX_C7440455AC25FB46 ON client (workplace_id)');
    }
}
