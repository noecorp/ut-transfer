ALTER PROCEDURE [bulk].[payment.statusUpdate] -- to do status action
    @paymentId BIGINT, -- id of the Batch
    @paymentStatusID tinyint, -- name of the Batch action to do
    @meta core.metaDataTT READONLY -- information for the user that makes the operation
AS
BEGIN TRY
    DECLARE @callParams XML
    DECLARE @userId BIGINT = (SELECT [auth.actorId] FROM @meta)
    DECLARE @actionId VARCHAR(100)    

    DECLARE @return INT = 0
    EXEC @return = [user].[permission.check] @actionId = @actionId, @objectId = null, @meta = @meta
    IF @return != 0
        BEGIN
            RETURN 55555
        END

    IF @paymentStatusID is not null
        BEGIN
            UPDATE p
            SET
                p.paymentStatusId = @paymentStatusID,
                p.updatedOn = GETDATE(),
                p.updatedBy = @userId
            FROM [bulk].[payment] p
            WHERE paymentId = @paymentId
        END
    ELSE 
        RAISERROR('bulk.paymentStatusInvalidAction', 16, 1);

END TRY
BEGIN CATCH
    EXEC [core].[error]
END CATCH
