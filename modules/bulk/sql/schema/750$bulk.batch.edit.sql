ALTER PROCEDURE [bulk].[batch.edit] -- edit the batch
    @batch [bulk].[batchTT] READONLY, -- batch infromation
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

UPDATE b
    SET
    b.name = ub.name,
    b.account= ub.account,
    b.description = ISNULL(ub.description, b.description),
    b.updatedOn= GETDATE(),
    b.reason= ub.reason,
    b.updatedBy= @userId
FROM [bulk].[batch] b
JOIN @batch ub on ub.batchId = b.batchId

EXEC core.auditCall @procid = @@PROCID, @params = @callParams

END TRY
BEGIN CATCH
    EXEC [core].[error]
END CATCH