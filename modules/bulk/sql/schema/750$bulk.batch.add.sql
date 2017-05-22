ALTER PROCEDURE [bulk].[batch.add] -- add new batch
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

DECLARE @name VARCHAR(100), @batchId BIGINT, @batchTypeId TINYINT, @batchStatusId TINYINT

SELECT @name = name, @batchTypeId = batchTypeId FROM @batch

IF (@name IS NULL)
    RAISERROR('bulk.batchNameMissing', 16, 1)

IF NOT EXISTS (SELECT * FROM [bulk].[batchType] WHERE batchTypeId = @batchTypeId)
    RAISERROR('bulk.batchTypeMissing', 16, 1)

SELECT @batchStatusId = batchStatusId
FROM [bulk].[batchStatus] bs
JOIN [core].[itemName] ci ON ci.itemNameId = bs.itemNameId
WHERE ci.itemCode = 'uploading'

INSERT INTO [bulk].[batch] (name, batchStatusId, batchTypeId, description, account, updatedOn, updatedBy, createdBy, createdOn, validatedOn, originalFilename, fileName)
SELECT name, @batchStatusId, batchTypeId, description, account, GETDATE(), @userId, @userId, GETDATE(), validatedOn, originalFilename, fileName
FROM @batch

SET @batchId = SCOPE_IDENTITY()

EXEC [bulk].[batch.get] @batchId = @batchId, @meta = @meta

EXEC core.auditCall @procid = @@PROCID, @params = @callParams

END TRY
BEGIN CATCH
    EXEC [core].[error]
END CATCH
