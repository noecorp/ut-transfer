ALTER PROCEDURE [transfer].[push.failMerchant]
    @transferId bigint
AS
SET NOCOUNT ON

UPDATE
    [transfer].[transfer]
SET
    merchantTxState = 4
WHERE
    transferId = @transferId AND
    merchantTxState = 1

IF @@ROWCOUNT <> 1 RAISERROR('transfer.failMerchant', 16, 1);
