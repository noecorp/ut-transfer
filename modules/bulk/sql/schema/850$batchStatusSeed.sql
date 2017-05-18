DECLARE @itemNameTranslationTT core.itemNameTranslationTT
DECLARE @meta core.metaDataTT

DECLARE @enLanguageId [tinyint] = (SELECT languageId FROM [core].[language] WHERE iso2Code = 'en');

DECLARE @itemNameId bigint 
DECLARE @parentItemNameId bigint

IF NOT EXISTS (SELECT * FROM [core].[itemType] WHERE [name] = 'batchStatus')
BEGIN
    INSERT INTO [core].[itemType]([alias], [name],[description],[table],[keyColumn],[nameColumn])
    VALUES('batchStatus', 'batchStatus', 'batchStatus', '[bulk].[batchStatus]', 'itemNameId', 'itemName')
END

DELETE FROM @itemNameTranslationTT

INSERT INTO @itemNameTranslationTT(itemCode, itemName, itemNameTranslation) 
VALUES  ('uploading', 'Uploading', 'Batch is uploading'),
        ('invalid', 'Invalid', 'Batch file is invalid'),
        ('new', 'New', 'Batch is awating to be approved by maker'),
        ('verifying', 'Verifying', 'Batch file is in process of structure verification'),
        ('ready', 'Ready', 'Batch has been approved from the maker and it is ready for the checker'),
        ('rejected', 'Rejected', 'Batch has been rejected to the maker for additional modifications'),
        ('disabled', 'Disabled', 'Batch has been disabled'),
        ('processing', 'Processing', 'Batch is in process of processing the payments'),
        ('done', 'Done', 'All the necessary payments in the batch have been processedsa'),
        ('deleted', 'Deleted', 'Batch has been deleted and can not be edited anymore')

EXEC core.[itemNameTranslation.upload]
    @itemNameTranslationTT = @itemNameTranslationTT,
    @languageId = @enLanguageId,
    @organizationId = NULL,
    @itemType = 'batchStatus',
    @meta = @meta
