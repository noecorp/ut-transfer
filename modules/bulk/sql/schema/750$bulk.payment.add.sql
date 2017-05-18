ALTER PROCEDURE [bulk].[payment.add] -- add new payment
    @payment [bulk].[paymentTT] READONLY, -- information about the payment
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

DECLARE @paymentStatusId TINYINT

SELECT @paymentStatusId = paymentStatusId
FROM [bulk].[paymentStatus] ps
JOIN [core].[itemName] ci ON ci.itemNameId = ps.itemNameId
WHERE ci.itemCode = 'new'

INSERT INTO [bulk].[payment] (batchId, paymentStatusId, currency, sequenceNumber, account, customerName, description, amount, createdOn, createdBy, updatedOn, updatedBy, statusNotes)
SELECT batchId, @paymentStatusId, currency, sequenceNumber, account, customerName, description, amount, GETDATE(), @userId, GETDATE(), @userId, statusNotes
FROM @payment

-- EXEC [bulk].[payment.get] @paymentId = SCOPE_IDENTITY(), @meta = @meta

EXEC core.auditCall @procid = @@PROCID, @params = @callParams

END TRY
BEGIN CATCH
    EXEC [core].[error]
END CATCH
