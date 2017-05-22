ALTER PROCEDURE [bulk].[payment.fetch] -- fetch payments of the batch
    @batchId BIGINT, -- id of the batch
    @paymentStatusId TINYINT, -- id of the status
    @customerName VARCHAR(50), -- name of customer
    @sequenceNumber BIGINT, -- sequence number of batch line
    @account VARCHAR(50), -- account of the batch line payment
    @pageSize INT = 25, -- how many rows will be returned per page
    @pageNumber INT = 1, -- which page number to display
    @sortBy VARCHAR(50) = '', -- on which column results to be sorted
    @sortOrder VARCHAR(4) = 'ASC', --what kind of sort to be used ascending or descending
	@meta core.metaDataTT READONLY -- information for the user that makes the operation
AS
BEGIN TRY

SET NOCOUNT ON
DECLARE @userId BIGINT = (SELECT [auth.actorId] FROM @meta)
DECLARE @startRow INT = (@pageNumber - 1) * @pageSize + 1
DECLARE @endRow INT = @startRow + @pageSize - 1
DECLARE @callParams XML 

-- checks if the user has a right to make the operation
DECLARE @actionID varchar(100) =  OBJECT_SCHEMA_NAME(@@PROCID) + '.' +  OBJECT_NAME(@@PROCID), @return int = 0
EXEC @return = [user].[permission.check] @actionId =  @actionID, @objectId = null, @meta = @meta
IF @return != 0
BEGIN
    RETURN 55555
END

IF OBJECT_ID('tempdb..#payment') IS NOT NULL
    DROP TABLE #payment

CREATE TABLE #payment ( 
    [paymentId] [BIGINT],
    [batchId] [BIGINT],
    [sequenceNumber] [INT],
    [account] [NVARCHAR](100),
    [customerName] [NVARCHAR](100),
    [amount] [DECIMAL](18,2),
    [currency] [NVARCHAR](3),
    [excutionDate] [DATETIME2](0),
    [paymentStatusId] [TINYINT],
    [paymentStatus] [NVARCHAR](50),
    [rowNum] INT, 
    [recordsTotal] INT
    )

DECLARE @sequenceNumString  VARCHAR(20) =  '%' + CONVERT(VARCHAR(20), @sequenceNumber) + '%'
SET	@account = '%' + @account + '%'
SET @customerName = '%' + @customerName + '%'

;WITH CTE AS(
    SELECT p.paymentId, b.batchId, p.sequenceNumber, p.customerName, p.paymentStatusId,
    ci.itemName as 'paymentStatus',p.account, p.amount, p.excutionDate, p.currency,
    ROW_NUMBER() OVER(ORDER BY
            CASE WHEN @sortOrder = 'ASC' THEN
                CASE
                    WHEN @sortBy = 'customerName' THEN p.customerName
                    WHEN @sortBy = 'paymentStatus' THEN ci.itemName
                    WHEN @sortBy = 'sequenceNumber' THEN CONVERT(VARCHAR(50), p.sequenceNumber)
                    WHEN @sortBy = 'amount' THEN CONVERT(VARCHAR(50), p.amount)
                    WHEN @sortBy = 'account' THEN CONVERT(VARCHAR(50), p.account)
                    WHEN @sortBy = 'currency' THEN p.currency

                END
            END,
            CASE WHEN @sortOrder = 'DESC' THEN
                CASE
                    WHEN @sortBy = 'customerName' THEN p.customerName
                    WHEN @sortBy = 'paymentStatus' THEN ci.itemName
                    WHEN @sortBy = 'sequenceNumber' THEN CONVERT(VARCHAR(50), p.sequenceNumber)
                    WHEN @sortBy = 'amount' THEN CONVERT(VARCHAR(50), p.amount)
                    WHEN @sortBy = 'account' THEN CONVERT(VARCHAR(50), p.account)
                    WHEN @sortBy = 'currency' THEN p.currency
                END
            END DESC) rowNum,
            COUNT(*) OVER(PARTITION BY 1) AS recordsTotal
    FROM [bulk].[payment] p
    JOIN [bulk].[batch] b on p.batchId = b.batchId
    JOIN [bulk].[paymentStatus] ps ON ps.paymentStatusId= p.paymentStatusId
    JOIN [core].[itemName] ci on ci.itemNameId = ps.itemNameId
    WHERE b.batchId = @batchId
        AND (@paymentStatusId IS NULL OR p.paymentStatusId = @paymentStatusId)
        AND (@customerName IS NULL OR p.customerName LIKE @customerName)
        AND (@sequenceNumber IS NULL OR p.sequenceNumber LIKE @sequenceNumString)
        AND (@account IS NULL OR p.account LIKE @account)
)

INSERT INTO #payment(paymentId, batchId, sequenceNumber, customerName, amount, currency, paymentStatusId, paymentStatus, account, excutionDate, rowNum, recordsTotal)
SELECT paymentId, batchId, sequenceNumber, customerName, amount, currency, paymentStatusId, paymentStatus, account, excutionDate, rowNum, recordsTotal
FROM CTE
WHERE @pageNumber IS NULL OR @pageSize IS NULL OR rowNum BETWEEN ((@pageNumber - 1) * @pageSize) + 1 AND @pageSize * (@pageNumber)


SELECT 'payments' as resultSetName 

SELECT paymentId, batchId, sequenceNumber, customerName, amount, currency, paymentStatusId, paymentStatus, account, excutionDate, rowNum, recordsTotal
FROM #payment
ORDER BY rowNum

SELECT 'pagination' as resultSetName

SELECT TOP 1 @pageSize AS pageSize, recordsTotal AS recordsTotal, @pageNumber AS pageNumber, (recordsTotal - 1) / @pageSize + 1 AS pagesTotal
FROM #payment

DROP TABLE #payment

EXEC core.auditCall @procid = @@PROCID, @params = @callParams

END TRY
BEGIN CATCH
    EXEC [core].[error]
END CATCH
