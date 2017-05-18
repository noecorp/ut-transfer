 ALTER PROCEDURE [bulk].[batch.typeFetch] -- fetch the typees
     @meta core.metaDataTT READONLY -- information for the user that makes the operation
 AS
 DECLARE @userId BIGINT = (SELECT [auth.actorId] FROM @meta) 

-- checks if the user has a right to make the operation
DECLARE @actionID varchar(100) =  OBJECT_SCHEMA_NAME(@@PROCID) + '.' +  OBJECT_NAME(@@PROCID), @return int = 0
EXEC @return = [user].[permission.check] @actionId =  @actionID, @objectId = null, @meta = @meta
IF @return != 0
  BEGIN
     RETURN 55555
  END

SELECT 'batchTypes' AS resultSetName

SELECT batchTypeId as 'key', ci.itemCode as 'code', ci.itemname as name
FROM [bulk].[batchType] bt 
JOIN [core].[itemName] ci on ci.itemNameId = bt.itemNameId
