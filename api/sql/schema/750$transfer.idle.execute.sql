ALTER PROCEDURE [transfer].[idle.execute]
    @issuerPort varchar(50)
AS
DECLARE @callParams XML
DECLARE
    @txid bigint = NULL,
    @mtid varchar(4),
    @opcode varchar(20)
BEGIN TRY
    -- forward stored
    DECLARE @transferId BIGINT
    SET  @transferId = 
    (
        SELECT TOP 1
            t.transferId
        FROM
            [transfer].[transfer] t
        JOIN
            [transfer].[partner] p ON p.port = @issuerPort AND 
            ((
                (t.issuerTxState = 2 AND ISNULL(t.acquirerTxState, 0) IN (0 , 3, 4, 5) AND p.mode = 'online') OR                --tx succeeded at issuer during online but failed at acquirer and current mode is online
                (t.issuerTxState = 8 AND ISNULL(t.acquirerTxState, 0) IN (0 , 3, 4, 5) AND p.mode IN ('online', 'offline')) OR --tx succeeded at issuer during offline but failed at acquirer and current mode is online/offline
                (ISNULL(t.merchantTxState, 0) IN (1, 3)) OR                                                               --tx failed at merchant (succeeded at issuer implicitly)
                (t.issuerTxState IN (1,4) AND p.mode = 'online') OR                                                    --tx timed out at issuer during online and current mode is online
                (t.issuerTxState IN (7,9) AND p.mode IN ('online', 'offline'))                                        --tx timed out during offline and current mode is online/offline
            ) AND p.partnerId = t.issuerId) 
        WHERE
            t.reversed = 0 AND
            20 > ISNULL(t.expireCount, 0) AND
            GETDATE() >= t.expireTime AND
            t.transferDateTime > DATEADD(DAY, -1, GETDATE())
        ORDER
            BY t.expireTime, t.transferId   )

    IF @transferId IS NOT NULL
    BEGIN 
        UPDATE
            [transfer].[transfer]
        SET
            expireTime = CASE
                WHEN 5 > ISNULL(expireCount, 0) THEN DATEADD(SECOND, 30, GETDATE())
                WHEN 10 > expireCount THEN DATEADD(SECOND, 60, GETDATE())
                WHEN 15 > expireCount THEN DATEADD(MINUTE, 30, GETDATE())
                WHEN 20 > expireCount THEN DATEADD(HOUR, 1, GETDATE())
            END,
            @txid = transferId,
            expireCount = ISNULL(expireCount, 0) + 1,
            @mtid = '420',
            @opcode = 'reverse'
        WHERE
            transferId = @transferId 
    END

    IF @txid IS NULL
    BEGIN
        SELECT 0 result WHERE 1 = 2
    END ELSE
    BEGIN
        SELECT 'transferInfo' AS resultSetName

        SELECT TOP 1
            @mtid mti,
            @opcode operation,
            @issuerPort issuerPort,
            p.port ledgerPort,
            t.cardId,
            'push' transferType,
            -- CASE
            --     WHEN channelType='ISO' THEN STAN
            --     ELSE RIGHT('000000' + CAST(id % 1000000 AS VARCHAR),6)
            -- END stan,
            t.transferAmount,
            t.transferCurrency,
            t.localDateTime,
            t.settlementDate issuerSettlementDate,
            t.merchantType,
            e.udfDetails udfAcquirer,
            t.transferId,
            t.transferIdAcquirer,
            t.transferIdIssuer,
            t.sourceAccount,
            t.destinationAccount,
            cin.itemCode
        FROM
            [transfer].[transfer] t
        JOIN
            core.itemName cin ON cin.itemNameId = t.transferTypeId
        LEFT JOIN
            [transfer].[event] e ON e.transferId = t.transferId AND e.source = 'acquirer' AND e.type = 'transfer.push'
        LEFT JOIN
            [transfer].[partner] p ON p.partnerId = t.ledgerId
        WHERE
            t.transferId = @txid
        ORDER BY
            e.eventDateTime, e.eventId

        SELECT 'split' AS resultSetName

        SELECT
            splitId,
            transferId,
            conditionId,
            splitNameId,
            debit,
            credit,
            amount,
            [description],
            tag,
            debitActorId,
            creditActorId,
            debitItemId,
            creditItemId,
            [state],
            transferIdPayment
        FROM
            [transfer].[split]
        WHERE
            transferId = @txid
    END

    EXEC core.auditCall @procid = @@PROCID, @params = @callParams
END TRY
BEGIN CATCH
    IF @@TRANCOUNT > 0 ROLLBACK TRANSACTION
    EXEC core.error
    RETURN 55555
END CATCH
