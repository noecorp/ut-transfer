ALTER PROCEDURE [bulk].[batch.fetch] -- get list of batches
    @batchTypeId TINYINT, -- id of the batch type
    @batchStatusId TINYINT,--id of the bathc status
    @batchName VARCHAR(100), --filter by batch name
    @account VARCHAR(50), --filte by batch account
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
DECLARE @currency VARCHAR(3) 

-- checks if the user has a right to make the operation
DECLARE @actionID VARCHAR(100) =  OBJECT_SCHEMA_NAME(@@PROCID) + '.' +  OBJECT_NAME(@@PROCID), @return int = 0
EXEC @return = [user].[permission.check] @actionId =  @actionID, @objectId = null, @meta = @meta
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
    [createdOn] [DATETIME2](0),
    [validatedOn] [DATETIMEOFFSET](7),
    [paymentsCount] [INT],
    [rowNum] [INT], 
    [recordsTotal] [INT],
    [totalAmount] [decimal](18, 0),
    [updatedOn] [datetime2](0))

IF @account is not null        
    select @currency = ci.itemName    --get the appropirate currency for the given account
    from [bulk].[batch] as bb
    join [ledger].[account] as la on la.accountNumber = bb.account
    join [ledger].[product] as lp on lp.productId = la.productId
    join [core].[currency] as cc  on cc.currencyId = lp.currencyId
    join [core].[itemName] as ci  on ci.itemNameId = cc.itemNameId
    WHERE bb.account = @account

SET @batchName = '%' + @batchName + '%'
SET @account = '%' + @account + '%'

;WITH CTE1 AS(
    SELECT b.batchId,b.name, b.batchStatusId, ci.itemName as [status],
    b.batchTypeId, b.account, b.createdOn, b.validatedOn, b.updatedOn,
    (SELECT COUNT(paymentId) FROM [bulk].[payment] WHERE batchId = b.batchId) AS paymentsCount,
    (SELECT SUM(amount) FROM [bulk].[payment] WHERE batchId = b.batchId)  AS totalAmount,
    COUNT(*) OVER(PARTITION BY 1) AS recordsTotal,
    @currency as currency
    FROM [bulk].[batch] b
    JOIN [bulk].[batchStatus] bs ON bs.batchStatusId= b.batchStatusId
    JOIN [core].[itemName] ci on ci.itemNameId = bs.itemNameId
    JOIN [bulk].[batchType] bt ON bt.batchTypeId = b.batchTypeId
    WHERE b.batchTypeId = @batchTypeId
          AND (@batchStatusId IS NULL OR b.batchStatusId = @batchStatusId)
          AND (@batchName IS NULL OR b.name LIKE @batchName)
          AND (@account IS NULL OR b.account LIKE  @account)
)
,CTE2 as (SELECT * ,
            ROW_NUMBER() OVER(ORDER BY
            CASE WHEN @sortOrder = 'ASC' THEN
                CASE
                    WHEN @sortBy = 'name'    THEN CTE1.name
                    WHEN @sortBy = 'status'       THEN CTE1.[status]
                    WHEN @sortBy = 'updatedOn'  THEN CONVERT(VARCHAR(100), CTE1.updatedOn)
                    WHEN @sortBy = 'paymentsCount' THEN CONVERT(VARCHAR(100), CTE1.paymentsCount)
                    WHEN @sortBy = 'totalAmount'  THEN CONVERT(VARCHAR(100), CTE1.totalAmount)
                    WHEN @sortBy = 'currency' THEN CTE1.currency
                    WHEN @sortBy = 'batchId' THEN CONVERT(VARCHAR(100), CTE1.batchId)
                END
            END,
            CASE WHEN @sortOrder = 'DESC' THEN
                CASE
                    WHEN @sortBy = 'name'    THEN CTE1.name
                    WHEN @sortBy = 'status'       THEN CTE1.[status]
                    WHEN @sortBy = 'updatedOn'  THEN CONVERT(VARCHAR(100), CTE1.updatedOn)
                    WHEN @sortBy = 'paymentsCount' THEN CONVERT(VARCHAR(100), CTE1.paymentsCount)
                    WHEN @sortBy = 'totalAmount'  THEN CONVERT(VARCHAR(100), CTE1.totalAmount)
                    WHEN @sortBy = 'currency' THEN CTE1.currency
                    WHEN @sortBy = 'batchId' THEN CONVERT(VARCHAR(100), CTE1.batchId)
                END
            END DESC) rowNum
            FROM CTE1
            )

INSERT INTO #batch(batchId, name, batchStatusId, [status], currency, batchTypeId, account, createdOn, validatedOn, paymentsCount, rowNum, recordsTotal, totalAmount, updatedOn)
SELECT batchId, name, batchStatusId, [status], currency, batchTypeId, account, createdOn, validatedOn, paymentsCount, rowNum, recordsTotal, totalAmount ,updatedOn
FROM CTE2
WHERE @pageNumber IS NULL OR @pageSize IS NULL OR rowNum BETWEEN ((@pageNumber - 1) * @pageSize) + 1 AND @pageSize * (@pageNumber)

SELECT 'batches' as resultSetName

SELECT batchId, name, batchStatusId, [status], currency, batchTypeId, account, createdOn, validatedOn, paymentsCount, rowNum, recordsTotal, totalAmount, updatedOn 
FROM #batch
ORDER BY rowNum

SELECT 'pagination' AS resultSetName

SELECT TOP 1 @pageSize AS pageSize, recordsTotal AS recordsTotal, @pageNumber AS pageNumber, (recordsTotal - 1) / @pageSize + 1 AS pagesTotal
FROM #batch

DROP TABLE #batch

EXEC core.auditCall @procid = @@PROCID, @params = @callParams

END TRY
BEGIN CATCH
    EXEC [core].[error]
END CATCH
