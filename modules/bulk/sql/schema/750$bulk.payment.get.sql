ALTER PROCEDURE [bulk].[payment.get] -- get batch info
    @paymentId [BIGINT], -- id of the batch
    @meta core.metaDataTT READONLY -- information for the user that makes the operation
AS
BEGIN TRY
DECLARE @userId BIGINT = (SELECT [auth.actorId] FROM @meta)
DECLARE @callParams XML = ( SELECT @paymentId paymentId, (SELECT * from @meta rows FOR XML AUTO, TYPE) meta FOR XML RAW('params'),TYPE)

-- checks if the user has a right to make the operation
DECLARE @actionID varchar(100) =  OBJECT_SCHEMA_NAME(@@PROCID) + '.' +  OBJECT_NAME(@@PROCID), @return int = 0
EXEC @return = [user].[permission.check] @actionId =  @actionID, @objectId = null, @meta = @meta
IF @return != 0
BEGIN
    RETURN 55555
END

SELECT 'payment' as resultSetName

SELECT p.paymentId, p.batchId, p.sequenceNumber, p.currency, p.customerName, p.account,p.amount,p.excutionDate,p.paymentStatusId,cibs.itemName as 'paymentStatus',p.statusNotes
FROM [bulk].[payment] p
JOIN [bulk].[paymentStatus] ps on ps.paymentStatusId = p.paymentStatusId
JOIN [core].[itemName] cibs ON cibs.itemNameId = ps.itemNameId
WHERE paymentId = @paymentId

EXEC core.auditCall @procid = @@PROCID, @params = @callParams

END TRY
BEGIN CATCH
    EXEC [core].[error]
END CATCH
