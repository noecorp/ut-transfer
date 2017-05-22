ALTER PROCEDURE [bulk].[batch.fetch] -- get list of batches
    @fromDate date, --filter by from date
    @toDate date, --filter by from date
    @batchTypeId TINYINT, -- id of the batch type
    @batchStatusId TINYINT,--id of the bathc status
    @batchName VARCHAR(100), --filter by batch name
    @account VARCHAR(50), --filte by batch account
    @pageSize INT = 25, -- how many rows will be returned per page
    @pageNumber INT = 1, -- which page number to display
    @sortBy VARCHAR(50) = '', -- ON which column results to be sorted
    @sortOrder VARCHAR(4) = 'ASC', --what kind of sort to be used AScending or descending
    @meta core.metaDataTT READONLY -- informatiON for the user that makes the operatiON
AS
BEGIN TRY

SET NOCOUNT ON
DECLARE @userId BIGINT = (SELECT [auth.actorId] FROM @meta)
DECLARE @startRow INT = (@pageNumber - 1) * @pageSize + 1
DECLARE @endRow INT = @startRow + @pageSize - 1
DECLARE @callParams XML 
DECLARE @currency VARCHAR(3) 

-- checks if the user hAS a right to make the operatiON
DECLARE @actiONID VARCHAR(100) =  OBJECT_SCHEMA_NAME(@@PROCID) + '.' +  OBJECT_NAME(@@PROCID), @return int = 0
EXEC @return = [user].[permissiON.check] @actiONId =  @actiONID, @objectId = null, @meta = @meta
IF @return != 0
BEGIN
    RETURN 55555
END

IF NOT EXISTS(SELECT batchTypeId FROM [bulk].[batchType] WHERE batchTypeId = @batchTypeId)
    RAISERROR('bulk.batchTypeNotFound', 16, 1)

IF OBJECT_ID('tempdb..#batch') IS NOT NULL
    DROP TABLE #batch

CREATE TABLE #batch( 
    [batchId] [BIGINT],
    [name] [NVARCHAR](100), 
    [batchStatusId] [TINYINT],
    [status] [VARCHAR](50),
    [currency] [VARCHAR] (3),
    [batchTypeId] [TINYINT],
    [account] [BIGINT],
    [createdON] [DATETIME2](0),
    [validatedON] [DATETIMEOFFSET](7),
    [paymentsCount] [INT],
    [rowNum] [INT], 
    [recordsTotal] [INT],
    [totalAmount] [decimal](18, 0),
    [updatedON] [datetime2](0))



SET @batchName = '%' + @batchName + '%'
SET @account = '%' + @account + '%'

;WITH CTE1 AS(
    SELECT b.batchId,b.batchName, b.batchStatusId, ci.itemName AS [status],
    b.batchTypeId, b.batchAccount, b.createdON, b.validatedON, b.updatedON, 
    (SELECT COUNT(paymentId) FROM [bulk].[payment] WHERE batchId = b.batchId) AS paymentsCount,
    (SELECT SUM(amount) FROM [bulk].[payment] WHERE batchId = b.batchId)  AS totalAmount,
    COUNT(*) OVER(PARTITION BY 1) AS recordsTotal,
    @currency AS currency
    FROM [bulk].[batch] b
    JOIN [bulk].[batchStatus] bs ON bs.batchStatusId= b.batchStatusId
    JOIN [core].[itemName] ci ON ci.itemNameId = bs.itemNameId
    JOIN [bulk].[batchType] bt ON bt.batchTypeId = b.batchTypeId
    LEFT JOIN [ledger].[account] AS la ON la.accountNumber = b.batchAccount
    LEFT JOIN [ledger].[product] AS lp ON lp.productId = la.productId
    LEFT JOIN [core].[currency] AS cc  ON cc.currencyId = lp.currencyId
    
    WHERE b.batchTypeId = @batchTypeId
          AND (@batchStatusId IS NULL OR b.batchStatusId = @batchStatusId)
          AND (@batchName IS NULL OR b.batchName LIKE @batchName)
          AND (@account IS NULL OR b.batchAccount LIKE  @account)
          AND (@fromDate IS NULL OR @toDate IS NULL  OR (b.createdON >= @fromDate AND b.createdON <= @toDate) )
)
,CTE2 AS (SELECT * ,
            ROW_NUMBER() OVER(ORDER BY
            CASE WHEN @sortOrder = 'ASC' THEN
                CASE
                    WHEN @sortBy = 'name'    THEN CTE1.batchName
                    WHEN @sortBy = 'status'       THEN CTE1.[status]
                    WHEN @sortBy = 'updatedON'  THEN CONVERT(VARCHAR(100), CTE1.updatedON)
                    WHEN @sortBy = 'paymentsCount' THEN CONVERT(VARCHAR(100), CTE1.paymentsCount)
                    WHEN @sortBy = 'totalAmount'  THEN CONVERT(VARCHAR(100), CTE1.totalAmount)
                    WHEN @sortBy = 'currency' THEN CTE1.currency
                    WHEN @sortBy = 'batchId' THEN CONVERT(VARCHAR(100), CTE1.batchId)
                END
            END,
            CASE WHEN @sortOrder = 'DESC' THEN
                CASE
                    WHEN @sortBy = 'name'    THEN CTE1.batchName
                    WHEN @sortBy = 'status'       THEN CTE1.[status]
                    WHEN @sortBy = 'updatedON'  THEN CONVERT(VARCHAR(100), CTE1.updatedON)
                    WHEN @sortBy = 'paymentsCount' THEN CONVERT(VARCHAR(100), CTE1.paymentsCount)
                    WHEN @sortBy = 'totalAmount'  THEN CONVERT(VARCHAR(100), CTE1.totalAmount)
                    WHEN @sortBy = 'currency' THEN CTE1.currency
                    WHEN @sortBy = 'batchId' THEN CONVERT(VARCHAR(100), CTE1.batchId)
                END
            END DESC) rowNum
            FROM CTE1
            )

INSERT INTO #batch(batchId, name, batchStatusId, [status], currency, batchTypeId, account, createdON, validatedON, paymentsCount, rowNum, recordsTotal, totalAmount, updatedON)
SELECT batchId, batchName, batchStatusId, [status], currency, batchTypeId, batchAccount, createdON, validatedON, paymentsCount, rowNum, recordsTotal, totalAmount ,updatedON
FROM CTE2
WHERE @pageNumber IS NULL OR @pageSize IS NULL OR rowNum BETWEEN ((@pageNumber - 1) * @pageSize) + 1 AND @pageSize * (@pageNumber)

SELECT 'batches' AS resultSetName

SELECT batchId, name, batchStatusId, [status], currency, batchTypeId, account, createdON, validatedON, paymentsCount, rowNum, recordsTotal, totalAmount, updatedON 
FROM #batch
ORDER BY rowNum

SELECT 'paginatiON' AS resultSetName

SELECT TOP 1 @pageSize AS pageSize, recordsTotal AS recordsTotal, @pageNumber AS pageNumber, (recordsTotal - 1) / @pageSize + 1 AS pagesTotal
FROM #batch

DROP TABLE #batch

EXEC core.auditCall @procid = @@PROCID, @params = @callParams

END TRY
BEGIN CATCH
    EXEC [core].[error]
END CATCH
