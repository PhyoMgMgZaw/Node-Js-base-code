-- CreateTable
CREATE TABLE `Project` (
    `projectId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `platforms` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`projectId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Release` (
    `releaseId` VARCHAR(191) NOT NULL,
    `projectId` VARCHAR(191) NOT NULL,
    `versionNumber` VARCHAR(191) NOT NULL,
    `releaseType` VARCHAR(191) NOT NULL,
    `environment` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `releaseDate` DATETIME(3) NULL,
    `releaseNotesUrl` VARCHAR(191) NULL,
    `reviewedBy` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`releaseId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ChangelogItem` (
    `changeId` VARCHAR(191) NOT NULL,
    `releaseId` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`changeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ReleaseFile` (
    `fileId` VARCHAR(191) NOT NULL,
    `releaseId` VARCHAR(191) NOT NULL,
    `fileName` VARCHAR(191) NOT NULL,
    `filePath` VARCHAR(191) NOT NULL,
    `fileType` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`fileId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EnvironmentRequirement` (
    `envId` VARCHAR(191) NOT NULL,
    `releaseId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `versionRequired` VARCHAR(191) NOT NULL,
    `notes` VARCHAR(191) NULL,

    PRIMARY KEY (`envId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Developer` (
    `devId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL,
    `team` VARCHAR(191) NULL,
    `joinedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Developer_email_key`(`email`),
    PRIMARY KEY (`devId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ReleaseDeveloper` (
    `releaseId` VARCHAR(191) NOT NULL,
    `devId` VARCHAR(191) NOT NULL,
    `contributions` VARCHAR(191) NULL,

    PRIMARY KEY (`releaseId`, `devId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EcosystemRelease` (
    `ecosystemId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `tag` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `releaseDate` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`ecosystemId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EcosystemReleaseLink` (
    `ecosystemId` VARCHAR(191) NOT NULL,
    `releaseId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`ecosystemId`, `releaseId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `KnowledgeDoc` (
    `docId` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NULL,
    `visibility` VARCHAR(191) NULL,
    `docUrl` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`docId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RelatedDoc` (
    `docId` VARCHAR(191) NOT NULL,
    `relatedType` VARCHAR(191) NOT NULL,
    `relatedId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`docId`, `relatedType`, `relatedId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Release` ADD CONSTRAINT `Release_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`projectId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChangelogItem` ADD CONSTRAINT `ChangelogItem_releaseId_fkey` FOREIGN KEY (`releaseId`) REFERENCES `Release`(`releaseId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReleaseFile` ADD CONSTRAINT `ReleaseFile_releaseId_fkey` FOREIGN KEY (`releaseId`) REFERENCES `Release`(`releaseId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EnvironmentRequirement` ADD CONSTRAINT `EnvironmentRequirement_releaseId_fkey` FOREIGN KEY (`releaseId`) REFERENCES `Release`(`releaseId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReleaseDeveloper` ADD CONSTRAINT `ReleaseDeveloper_releaseId_fkey` FOREIGN KEY (`releaseId`) REFERENCES `Release`(`releaseId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReleaseDeveloper` ADD CONSTRAINT `ReleaseDeveloper_devId_fkey` FOREIGN KEY (`devId`) REFERENCES `Developer`(`devId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EcosystemReleaseLink` ADD CONSTRAINT `EcosystemReleaseLink_ecosystemId_fkey` FOREIGN KEY (`ecosystemId`) REFERENCES `EcosystemRelease`(`ecosystemId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EcosystemReleaseLink` ADD CONSTRAINT `EcosystemReleaseLink_releaseId_fkey` FOREIGN KEY (`releaseId`) REFERENCES `Release`(`releaseId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RelatedDoc` ADD CONSTRAINT `RelatedDoc_docId_fkey` FOREIGN KEY (`docId`) REFERENCES `KnowledgeDoc`(`docId`) ON DELETE RESTRICT ON UPDATE CASCADE;
