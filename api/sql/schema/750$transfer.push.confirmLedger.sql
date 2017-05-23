ALTER PROCEDURE [transfer].[push.confirmLedger]
    @transferId bigint,
    @transferIdLedger varchar(50),
    @type varchar(50),
    @message varchar(250),
    @details XML
AS
SET NOCOUNT ON

UPDATE
    [transfer].[transfer]
SET
    transferIdledger = @transferIdledger,
    ledgerTxState = 2
WHERE
    transferId = @transferId AND
    ledgerTxState = 1

DECLARE @COUNT int = @@ROWCOUNT

SET @type = ISNULL (@type, 'transfer.push.confirmLedger')

EXEC [transfer].[push.event]
    @transferId = @transferId,
    @type = @type,
    @state = 'confirm',
    @source = 'ledger',
    @message = @message,
    @udfDetails = @details

IF @COUNT <> 1 RAISERROR('transfer.confirmLedger', 16, 1);

