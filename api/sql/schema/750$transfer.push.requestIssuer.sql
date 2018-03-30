ALTER PROCEDURE [transfer].[push.requestIssuer]
    @transferId BIGINT
AS
SET NOCOUNT ON

UPDATE
    [transfer].[transfer]
SET
    issuerTxState = 1,
    issuerRequestedDateTime = GETUTCDATE()
OUTPUT
    INSERTED.issuerRequestedDateTime
WHERE
    transferId = @transferId AND issuerTxState IS NULL

IF @@ROWCOUNT <> 1 RAISERROR('transfer.requestIssuer', 16, 1);
