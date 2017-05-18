DECLARE @itemNameTranslationTT core.itemNameTranslationTT
DECLARE @meta core.metaDataTT

DECLARE @enLanguageId [tinyint] = (SELECT languageId FROM [core].[language] WHERE iso2Code = 'en');

DECLARE @itemNameId bigint 
DECLARE @parentItemNameId bigint

IF NOT EXISTS (SELECT * FROM [core].[itemType] WHERE [name] = 'batchAction')
BEGIN
    INSERT INTO [core].[itemType]([alias], [name],[description],[table],[keyColumn],[nameColumn])
    VALUES('batchAction', 'batchAction', 'batchAction', '[bulk].[batchAction]', 'itemNameId', 'itemName')
END


DELETE FROM @itemNameTranslationTT

INSERT INTO @itemNameTranslationTT(itemCode, itemName, itemNameTranslation) 
VALUES  ('newBatch', 'newBatch', 'New Batch'),
        ('invalidBatch', 'invalidBatch', 'Verifiy batch'),
        ('verifyBatch', 'verifyBatch', 'Verifiy batch'),
        ('completeVerification', 'completeVerification', 'Complete verification'),
        ('deleteBatch', 'deleteBatch', 'Delete batch '),
        ('disableBatch', 'disableBatch', 'Disable batch'),
        ('readyBatch', 'readyBatch', 'Batch has been approved from the maker and it is ready for the checker approval'),
        ('processBatch', 'processBatch', 'Batch has been approved by checker and it is in the processing state'),
        ('rejectBatch', 'rejectBatch', 'Reject batch'),
        ('completeBatch', 'completeBatch', 'Payment process is completed')

EXEC core.[itemNameTranslation.upload]
    @itemNameTranslationTT = @itemNameTranslationTT,
    @languageId = @enLanguageId,
    @organizationId = NULL,
    @itemType = 'batchAction',
    @meta = @meta