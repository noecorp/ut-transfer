ALTER PROCEDURE [transfer].[push.checkLastTransaction]
    @channelId bigint,
    @sernum char(4),
    @status char(1),
    @notes1 int,
    @notes2 int,
    @notes3 int,
    @notes4 int
AS
SET NOCOUNT ON
DECLARE @callParams XML

BEGIN TRY

    DECLARE
        @lastTx int,
        @lastSernum varchar(4),
        @lastNotes1 int,
        @lastNotes2 int,
        @lastNotes3 int,
        @lastNotes4 int,
        @lastAcquirerState int,
        @lastIssuerState int

    SELECT TOP 1
        @lastTx = t.transferId,
        @lastSernum = e.udfDetails.value('(/root/sernum)[1]', 'varchar(4)'),
        @lastAcquirerState = t.acquirerTxState,
        @lastIssuerState = t.issuerTxState,
        @lastNotes1 = e.udfDetails.value('(/root/type1Notes)[1]', 'int'),
        @lastNotes2 = e.udfDetails.value('(/root/type2Notes)[1]', 'int'),
        @lastNotes3 = e.udfDetails.value('(/root/type3Notes)[1]', 'int'),
        @lastNotes4 = e.udfDetails.value('(/root/type4Notes)[1]', 'int')
    FROM
        [transfer].[transfer] t
    JOIN
        [transfer].[event] e ON e.transferId = t.transferId AND e.source = 'acquirer' AND e.type = 'transfer.requestAcquirer'
    WHERE
        t.channelId = @channelId
    ORDER BY
        t.transferId DESC

    IF @lastAcquirerState=1 AND @lastIssuerState=2
    BEGIN
        if @lastSernum != @sernum
        BEGIN
            EXEC [transfer].[push.failAcquirer]
                @transferId = @lastTx,
                @type = 'atm.lastTransactionNoReply',
                @message = 'ATM did not receive transaction reply',
                @details = NULL
        END else
        IF @lastNotes1 != @notes1 OR @lastNotes2 != @notes2 OR @lastNotes3 != @notes3 OR @lastNotes4 != @notes4
        BEGIN
            IF @notes1 = 0 AND @notes2 = 0 AND @notes3 = 0 AND @notes4 = 0
                EXEC [transfer].[push.failAcquirer]
                    @transferId = @lastTx,
                    @type = 'atm.lastTransactionZero',
                    @message = 'ATM did not dispense any money',
                    @details = NULL
            else
                EXEC [transfer].[push.errorAcquirer]
                    @transferId = @lastTx,
                    @type = 'atm.lastTransactionDifferent',
                    @message = 'ATM dispensed different amount',
                    @details = NULL
        END else
        BEGIN
            EXEC [transfer].[push.confirmAcquirer]
                @transferId = @lastTx,
                @transferIdAcquirer = NULL,
                @type = NULL,
                @message = NULL,
                @details = NULL
        END
    end

    EXEC core.auditCall @procid = @@PROCID, @params = @callParams
END TRY
BEGIN CATCH
    if @@TRANCOUNT > 0 ROLLBACK TRANSACTION
    EXEC core.error
    RETURN 55555
END CATCH
