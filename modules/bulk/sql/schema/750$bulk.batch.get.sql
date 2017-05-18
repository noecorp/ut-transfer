ALTER PROCEDURE [bulk].[batch.get] -- get batch info
    @batchId [BIGINT], -- id of the batch
    @meta core.metaDataTT READONLY -- information for the user that makes the operation
AS
BEGIN TRY
DECLARE @userId BIGINT = (SELECT [auth.actorId] FROM @meta)
DECLARE @callParams XML

-- checks if the user has a right to make the operation
DECLARE @actionID varchar(100) =  OBJECT_SCHEMA_NAME(@@PROCID) + '.' +  OBJECT_NAME(@@PROCID), @return int = 0
EXEC @return = [user].[permission.check] @actionId =  @actionID, @objectId = null, @meta = @meta
IF @return != 0
BEGIN
    RETURN 55555
END

SELECT 'batch' as resultSetName

SELECT b.batchId, b.name, b.batchStatusId, cibs.itemName as status, cibt.itemName as batchType, b.batchTypeId, b.account, b.updatedOn, b.reason, b.createdBy, b.createdOn, b.validatedOn,
        (SELECT COUNT(paymentId) FROM [bulk].[payment] WHERE batchId= @batchId) AS paymentsCount
FROM [bulk].[batch] b
JOIN [bulk].[batchStatus] bs on bs.batchStatusId = b.batchStatusId
JOIN [bulk].[batchType] bt on bt.batchTypeId = b.batchTypeId
JOIN [core].[itemName] cibs ON cibs.itemNameId = bs.itemNameId
JOIN [core].[itemName] cibt ON cibt.itemNameId = bt.itemNameId
WHERE batchId = @batchId

SELECT 'upload' as resultSetName

SELECT batchId, fileName, originalFileName, uploadId
FROM [bulk].[upload]
WHERE batchId = @batchId

EXEC core.auditCall @procid = @@PROCID, @params = @callParams

END TRY
BEGIN CATCH
    EXEC [core].[error]
END CATCH
