ALTER PROCEDURE [bulk].[batch.statusUpdate] -- to do status action
    @batchId BIGINT, -- id of the Batch
    @actionName VARCHAR(100), -- name of the Batch action to do
    @reason VARCHAR(1000), -- reason for of the status update
    @meta core.metaDataTT READONLY -- information for the user that makes the operation
AS
BEGIN TRY
    DECLARE @callParams XML
    DECLARE @userId BIGINT = (SELECT [auth.actorId] FROM @meta)

    DECLARE @currentStatusId TINYINT

    SELECT @currentStatusId = batchStatusId
    FROM [bulk].[batch] b 
    WHERE batchId = @batchId 

    if @currentStatusId is null
        RAISERROR('bulk.batchNotFound', 16, 1);

    DECLARE @actionId VARCHAR(100), @toStatusId tinyint
    
    SELECT @actionId = bsa.permission, @toStatusId = toStatusId
    from [bulk].[batchStatusAction] bsa
    JOIN [bulk].[batchAction] ba on ba.batchActionId = bsa.actionId
    JOIN [core].[itemName] ci on ci.itemNameId = ba.itemNameId
    WHERE ci.itemCode = @actionName and bsa.fromStatusId = @currentStatusId


    DECLARE @return INT = 0
    EXEC @return = [user].[permission.check] @actionId = @actionId, @objectId = null, @meta = @meta
    IF @return != 0
        BEGIN
            RETURN 55555
        END

    IF @toStatusId is not null
        BEGIN
            UPDATE b
            SET
                b.batchStatusId = @toStatusId,
                b.reason = ISNULL(@reason, b.reason),
                b.updatedOn = GETDATE(),
                b.validatedOn = CASE WHEN @actionName='completeVerification' THEN GETDATE() ELSE b.validatedOn END,
                b.updatedBy = @userId
            FROM [bulk].[batch] b
            WHERE batchId = @batchId
        END
    ELSE 
        RAISERROR('bulk.bulkStatusInvalidAction', 16, 1);

END TRY
BEGIN CATCH
    EXEC [core].[error]
END CATCH
