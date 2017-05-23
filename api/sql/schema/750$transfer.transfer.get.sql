ALTER PROCEDURE [transfer].[transfer.get]
    @transferIdAcquirer NVARCHAR (50) = NULL, -- the front end transfer id
    @transferId BIGINT = NULL, -- the transfer id
    @acquirerCode varchar(50) = NULL, -- acquirer code
    @cardId bigint = NULL, -- card Id
    @localDateTime varchar(14) = NULL, -- local datetime of the transaction
    @meta core.metaDataTT READONLY -- information for the user that makes the operation

AS

     -- checks if the user has a right to make the operation
    DECLARE @actionID VARCHAR(100) =  OBJECT_SCHEMA_NAME(@@PROCID) + '.' +  OBJECT_NAME(@@PROCID), @return INT = 0
--    EXEC @return = [user].[permission.check] @actionId =  @actionID, @objectId = NULL, @meta = @meta

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
                                ledgerPort varchar(50),udfAcquirer xml)
    
    INSERT INTO @transfer
    SELECT TOP 1 t.transferId, t.transferTypeId, t.acquirerCode, t.transferIdAcquirer, t.transferIdLedger, t.transferIdIssuer, t.transferIdMerchant, 
            t.transferDateTime, t.localDateTime, t.settlementDate, t.channelId, t.channelType, t.ordererId, t.merchantId, t.merchantInvoice, 
            t.merchantPort, t.merchantType, t.cardId, t.sourceAccount, t.destinationAccount, t.expireTime, t.expireCount, t.reversed, t.retryTime, 
            t.retryCount, t.ledgerTxState, t.issuerTxState, t.acquirerTxState, t.merchantTxState, t.issuerId, t.ledgerId, t.transferCurrency, t.transferAmount, 
            t.acquirerFee, t.issuerFee, t.transferFee, t.[description], pi.port, pl.port, e.udfDetails
    FROM  [transfer].[transfer] t
    JOIN  [transfer].[partner] pi on pi.partnerId = t.issuerId
    LEFT JOIN [transfer].[partner] pl on pl.partnerId = t.ledgerId
    LEFT JOIN [transfer].[event] e ON e.transferId = t.transferId AND e.source = 'acquirer' AND e.type = 'transfer.push'
    WHERE (@transferIdAcquirer IS NULL OR t.[transferIdAcquirer] = @transferIdAcquirer)
        AND (@transferId IS NULL OR t.[transferId] = @transferId)
        AND (@cardId IS NULL OR t.cardId = @cardId)
        AND (@localDateTime IS NULL OR t.localDateTime LIKE '%' + @localDateTime)
        AND (@acquirerCode IS NULL OR t.acquirerCode = @acquirerCode)
    ORDER BY t.transferDateTime DESC
   
    SELECT 'transfer' AS resultSetName

    SELECT * FROM @transfer

    SELECT 'transferSplit' AS resultSetName

    SELECT ts.splitId, ts.transferId, ts.conditionId, ts.splitNameId, ts.debit, ts.credit, ts.amount, 
            ts.[description], ts.tag, ts.debitActorId, ts.creditActorId, ts.debitItemId, ts.creditItemId, 
            ts.[state], ts.[transferIdPayment]
    FROM [transfer].[split] ts 
    JOIN @transfer t ON ts.transferId = t.transferId
    