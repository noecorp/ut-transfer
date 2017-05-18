DECLARE @itemNameTranslationTT core.itemNameTranslationTT
DECLARE @meta core.metaDataTT

DECLARE @enLanguageId [tinyint] = (SELECT languageId FROM [core].[language] WHERE iso2Code = 'en');

DECLARE @itemNameId bigint 
DECLARE @parentItemNameId bigint

IF NOT EXISTS (SELECT * FROM [core].[itemType] WHERE [name] = 'paymentStatus')
BEGIN
    INSERT INTO [core].[itemType]([alias], [name],[description],[table],[keyColumn],[nameColumn])
    VALUES('paymentStatus', 'paymentStatus', 'paymentStatus', '[bulk].[paymentStatus]', 'itemNameId', 'itemName')
END

DELETE FROM @itemNameTranslationTT

INSERT INTO @itemNameTranslationTT(itemCode, itemName, itemNameTranslation) 
VALUES  ('new', 'New', 'payment is newly created' ),
        ('modified', 'Modified', 'payment has been modified - need additional checks'),
        ('disabled', 'Disabled', 'payment has been disabled - will not be processed'),
        ('verified', 'Verified', 'payment has been verified and it is ready to be processed'),
        ('paid', 'Paid', 'payment is paid'),
        ('failed', 'Failed', 'payment failed'),
        ('mismatch', 'Mismatch', 'payment has mismatching properties')

EXEC core.[itemNameTranslation.upload]
    @itemNameTranslationTT = @itemNameTranslationTT,
    @languageId = @enLanguageId,
    @organizationId = NULL,
    @itemType = 'paymentStatus',
    @meta = @meta
