ALTER PROCEDURE [transfer].[transfer.get]
    @transferIdAcquirer NVARCHAR (50) = NULL, -- the front end transfer id
    @transferId BIGINT = NULL, -- the transfer id
    @acquirerCode varchar(50) = NULL, -- acquirer code
    @cardId bigint = NULL, -- card Id
    @localDateTime varchar(14) = NULL, -- local datetime of the transaction
    @meta core.metaDataTT READONLY -- information for the user that makes the operation

AS

    -- checks if the user has a right to make the operation
DECLARE @actionID varchar(100) =  OBJECT_SCHEMA_NAME(@@PROCID) + '.' +  OBJECT_NAME(@@PROCID), @return int = 0
EXEC @return = [user].[permission.check] @actionId =  @actionID, @objectId = null, @meta = @meta
IF @return != 0
BEGIN
    RETURN 55555
END

IF (isnull(@transferID, 0) = 0 AND isnull(@transferIdAcquirer, '') = '')
BEGIN
    RAISERROR('transfer.missingParameter', 16, 1);
    RETURN 55555
END

DECLARE @transfer AS TABLE (transferId bigint, transferTypeId bigint, acquirerCode varchar(50), transferIdAcquirer varchar(50), transferIdLedger varchar(50),
                            transferIdIssuer varchar(50), transferIdMerchant varchar(50), transferDateTime datetime, localDateTime varchar(14), issuerSettlementDate date, channelId bigint,
                            channelType varchar(50), ordererId bigint, merchantId varchar(50), merchantInvoice varchar(50), merchantPort varchar(50), merchantType varchar(50),
                            cardId bigint, sourceAccount varchar(50), destinationAccount varchar(50), expireTime datetime, expireCount int, reversed bit, retryTime datetime,
                            retryCount int, ledgerTxState smallint, issuerTxState smallint, acquirerTxState smallint, merchantTxState smallint, issuerId varchar(50), ledgerId varchar(50),
                            transferCurrency varchar(3), transferAmount money,  acquirerFee money, issuerFee money, transferFee money,[description] varchar(250), issuerPort varchar(50),
                            ledgerPort varchar(50),udfAcquirer xml, pendingId int, pullTransactionId bigint, pushTransactionId bigint, pendingExpireTime datetime, params nvarchar(max), dueDate date)

-- get by pull transaction id
INSERT INTO
    @transfer
SELECT TOP 1
    t.transferId,
    t.transferTypeId,
    t.acquirerCode,
    t.transferIdAcquirer,
    t.transferIdLedger,
    t.transferIdIssuer,
    t.transferIdMerchant,
    t.transferDateTime,
    t.localDateTime,
    t.settlementDate,
    t.channelId,
    t.channelType,
    t.ordererId,
    t.merchantId,
    t.merchantInvoice,
    t.merchantPort,
    t.merchantType,
    t.cardId,
    t.sourceAccount,
    t.destinationAccount,
    t.expireTime,
    t.expireCount,
    t.reversed,
    t.retryTime,
    t.retryCount,
    t.ledgerTxState,
    t.issuerTxState,
    t.acquirerTxState,
    t.merchantTxState,
    t.issuerId,
    t.ledgerId,
    t.transferCurrency,
    t.transferAmount,
    t.acquirerFee,
    t.issuerFee,
    t.transferFee,
    t.[description],
    pi.port,
    pl.port,
    e.udfDetails,
    tp.pendingId,
    tp.pullTransactionId,
    tp.pushTransactionId,
    tp.expireTime,
    tp.params,
    tp.dueDate
FROM
    [transfer].[transfer] t
JOIN
    [transfer].[partner] pi ON pi.partnerId = t.issuerId
LEFT JOIN
    [transfer].[partner] pl ON pl.partnerId = t.ledgerId
LEFT JOIN
    [transfer].[event] e ON e.transferId = t.transferId AND e.source = 'acquirer' AND e.type = 'transfer.push'
LEFT JOIN
    [transfer].[pending] tp ON tp.pullTransactionId = t.transferId
WHERE
    (@transferIdAcquirer IS NULL OR t.[transferIdAcquirer] = @transferIdAcquirer) AND
    (@transferId IS NULL OR t.[transferId] = @transferId) AND
    (@cardId IS NULL OR t.cardId = @cardId) AND
    (@localDateTime IS NULL OR t.localDateTime LIKE '%' + @localDateTime) AND
    (@acquirerCode IS NULL OR t.acquirerCode = @acquirerCode) AND
    pullTransactionId IS NOT NULL
ORDER BY
    t.transferDateTime DESC

IF @@ROWCOUNT = 0 -- get by push transaction id
BEGIN
    INSERT INTO @transfer
    SELECT TOP 1
        t.transferId,
        t.transferTypeId,
        t.acquirerCode,
        t.transferIdAcquirer,
        t.transferIdLedger,
        t.transferIdIssuer,
        t.transferIdMerchant,
        t.transferDateTime,
        t.localDateTime,
        t.settlementDate,
        t.channelId,
        t.channelType,
        t.ordererId,
        t.merchantId,
        t.merchantInvoice,
        t.merchantPort,
        t.merchantType,
        t.cardId,
        t.sourceAccount,
        t.destinationAccount,
        t.expireTime,
        t.expireCount,
        t.reversed,
        t.retryTime,
        t.retryCount,
        t.ledgerTxState,
        t.issuerTxState,
        t.acquirerTxState,
        t.merchantTxState,
        t.issuerId,
        t.ledgerId,
        t.transferCurrency,
        t.transferAmount,
        t.acquirerFee,
        t.issuerFee,
        t.transferFee,
        t.[description],
        pi.port,
        pl.port,
        e.udfDetails,
        tp.pendingId,
        tp.pullTransactionId,
        tp.pushTransactionId,
        tp.expireTime,
        tp.params,
        tp.dueDate
    FROM
        [transfer].[transfer] t
    JOIN
        [transfer].[partner] pi on pi.partnerId = t.issuerId
    LEFT JOIN
        [transfer].[partner] pl on pl.partnerId = t.ledgerId
    LEFT JOIN
        [transfer].[event] e ON e.transferId = t.transferId AND e.source = 'acquirer' AND e.type = 'transfer.push'
    LEFT JOIN
        [transfer].[pending] tp ON tp.pushTransactionId = t.transferId
    WHERE
        (@transferIdAcquirer IS NULL OR t.[transferIdAcquirer] = @transferIdAcquirer) AND
        (@transferId IS NULL OR t.[transferId] = @transferId) AND
        (@cardId IS NULL OR t.cardId = @cardId) AND
        (@localDateTime IS NULL OR t.localDateTime LIKE '%' + @localDateTime) AND
        (@acquirerCode IS NULL OR t.acquirerCode = @acquirerCode)
    ORDER BY
        t.transferDateTime DESC
END

SELECT 'transfer' AS resultSetName
SELECT
    transferId,
    transferTypeId,
    acquirerCode,
    transferIdAcquirer,
    transferIdLedger ,
    transferIdIssuer,
    transferIdMerchant,
    transferDateTime,
    localDateTime,
    issuerSettlementDate,
    channelId,
    channelType,
    ordererId,
    merchantId,
    merchantInvoice,
    merchantPort,
    merchantType,
    cardId,
    sourceAccount,
    destinationAccount,
    expireTime,
    expireCount,
    reversed,
    retryTime,
    retryCount,
    ledgerTxState,
    issuerTxState,
    acquirerTxState,
    merchantTxState,
    issuerId,
    ledgerId,
    transferCurrency,
    transferAmount,
    acquirerFee,
    issuerFee,
    transferFee,
    [description],
    issuerPort,
    ledgerPort,
    udfAcquirer
FROM
    @transfer

SELECT 'transferSplit' AS resultSetName
SELECT
    ts.splitId,
    ts.transferId,
    ts.conditionId,
    ts.splitNameId,
    ts.debit,
    ts.credit,
    ts.amount,
    ts.[description],
    ts.tag,
    ts.debitActorId,
    ts.creditActorId,
    ts.debitItemId,
    ts.creditItemId,
    ts.[state],
    ts.[transferIdPayment]
FROM
    [transfer].[split] ts
JOIN
    @transfer t ON ts.transferId = t.transferId

SELECT 'transferPending' AS resultSetName
SELECT
    pendingId,
    pullTransactionId,
    pushTransactionId,
    expireTime,
    params,
    dueDate
FROM
    @transfer