ALTER PROCEDURE [bulk].[payment.edit] -- edit the batch
    @payment [bulk].[paymentTT] READONLY, -- batch infromation
    @meta core.metaDataTT READONLY -- information for the user that makes the operation
AS
BEGIN TRY
DECLARE @userId BIGINT = (SELECT [auth.actorId] FROM @meta)
DECLARE @callParams XML = ( SELECT (SELECT * from @payment rows FOR XML AUTO, TYPE) batch, (SELECT * from @meta rows FOR XML AUTO, TYPE) meta FOR XML RAW('params'),TYPE)

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
WHERE ci.itemCode = 'modified'

UPDATE p
SET
    p.account = ub.account,
    p.customerName = ub.customerName,
    p.[description] = ub.[description],
    p.amount = ub.amount,
    p.updatedOn = GETDATE(),
    p.updatedBy = @userId,
    p.paymentStatusId = @paymentStatusId
FROM [bulk].[payment] p
JOIN @payment ub on ub.paymentId = p.paymentId

EXEC core.auditCall @procid = @@PROCID, @params = @callParams

END TRY
BEGIN CATCH
    EXEC [core].[error]
END CATCH
