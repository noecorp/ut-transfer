declare @fromStatusName varchar(50) , @toStatusName varchar(50) , @actionName varchar(50), @module varchar(50)
declare @isFromStatusIdStart bit, @isToStatusIdEnd bit, @flagToConfirm bit
declare @actionOrder tinyint, @fromStatusId tinyint, @toStatusId tinyint, @actionId tinyint

--------------------------------------
set @fromStatusName ='uploading'
set @toStatusName ='new'
set @actionName ='newBatch'

set @fromStatusId = (select batchStatusId from [bulk].[batchStatus] bs
    JOIN [core].[itemName] ci on ci.itemNameId = bs.itemNameId
    where ci.itemCode=@fromStatusName)
set @toStatusId = (select batchStatusId from [bulk].[batchStatus] bs
    JOIN [core].[itemName] ci on ci.itemNameId = bs.itemNameId
    where ci.itemCode=@toStatusName)
set @actionId = (select batchActionId from [bulk].[batchAction] ba
    JOIN [core].[itemName] ci on ci.itemNameId = ba.itemNameId
    where ci.itemCode=@actionName)

if not exists (select * from [bulk].[batchStatusAction] where fromStatusId=@fromStatusId and toStatusId=@toStatusId)
insert into [bulk].[batchStatusAction] (fromStatusId, toStatusId, actionId, permission)
values (@fromStatusId, @toStatusId, @actionId, 'bulk.batch.add')

--------------------------------------
set @fromStatusName ='uploading'
set @toStatusName ='invalid'
set @actionName ='invalidBatch'

set @fromStatusId = (select batchStatusId from [bulk].[batchStatus] bs
    JOIN [core].[itemName] ci on ci.itemNameId = bs.itemNameId
    where ci.itemCode=@fromStatusName)
set @toStatusId = (select batchStatusId from [bulk].[batchStatus] bs
    JOIN [core].[itemName] ci on ci.itemNameId = bs.itemNameId
    where ci.itemCode=@toStatusName)
set @actionId = (select batchActionId from [bulk].[batchAction] ba
    JOIN [core].[itemName] ci on ci.itemNameId = ba.itemNameId
    where ci.itemCode=@actionName)

if not exists (select * from [bulk].[batchStatusAction] where fromStatusId=@fromStatusId and toStatusId=@toStatusId)
insert into [bulk].[batchStatusAction] (fromStatusId, toStatusId, actionId, permission)
values (@fromStatusId, @toStatusId, @actionId, NULL)

--------------------------------------
set @fromStatusName ='new'
set @toStatusName ='verifying'
set @actionName ='verifyBatch'

set @fromStatusId = (select batchStatusId from [bulk].[batchStatus] bs
    JOIN [core].[itemName] ci on ci.itemNameId = bs.itemNameId
    where ci.itemCode=@fromStatusName)
set @toStatusId = (select batchStatusId from [bulk].[batchStatus] bs
    JOIN [core].[itemName] ci on ci.itemNameId = bs.itemNameId
    where ci.itemCode=@toStatusName)
set @actionId = (select batchActionId from [bulk].[batchAction] ba
    JOIN [core].[itemName] ci on ci.itemNameId = ba.itemNameId
    where ci.itemCode=@actionName)

if not exists (select * from [bulk].[batchStatusAction] where fromStatusId=@fromStatusId and toStatusId=@toStatusId)
insert into [bulk].[batchStatusAction] (fromStatusId, toStatusId, actionId, permission)
values (@fromStatusId, @toStatusId, @actionId, 'bulk.batch.verify')

--------------------------------------
set @fromStatusName ='verifying'
set @toStatusName ='new'
set @actionName ='completeVerification'

set @isToStatusIdEnd = 0

set @fromStatusId = (select batchStatusId from [bulk].[batchStatus] bs
    JOIN [core].[itemName] ci on ci.itemNameId = bs.itemNameId
    where ci.itemCode=@fromStatusName)
set @toStatusId = (select batchStatusId from [bulk].[batchStatus] bs
    JOIN [core].[itemName] ci on ci.itemNameId = bs.itemNameId
    where ci.itemCode=@toStatusName)
set @actionId = (select batchActionId from [bulk].[batchAction] ba
    JOIN [core].[itemName] ci on ci.itemNameId = ba.itemNameId
    where ci.itemCode=@actionName)

if not exists (select * from [bulk].[batchStatusAction] where fromStatusId=@fromStatusId and toStatusId=@toStatusId)
insert into [bulk].[batchStatusAction] (fromStatusId, toStatusId, actionId, permission)
values (@fromStatusId, @toStatusId, @actionId, NULL)

--------------------------------------
set @fromStatusName ='new'
set @toStatusName ='deleted'
set @actionName ='deleteBatch'

set @fromStatusId = (select batchStatusId from [bulk].[batchStatus] bs
    JOIN [core].[itemName] ci on ci.itemNameId = bs.itemNameId
    where ci.itemCode=@fromStatusName)
set @toStatusId = (select batchStatusId from [bulk].[batchStatus] bs
    JOIN [core].[itemName] ci on ci.itemNameId = bs.itemNameId
    where ci.itemCode=@toStatusName)
set @actionId = (select batchActionId from [bulk].[batchAction] ba
    JOIN [core].[itemName] ci on ci.itemNameId = ba.itemNameId
    where ci.itemCode=@actionName)

if not exists (select * from [bulk].[batchStatusAction] where fromStatusId=@fromStatusId and toStatusId=@toStatusId)
insert into [bulk].[batchStatusAction] (fromStatusId, toStatusId, actionId, permission)
values (@fromStatusId, @toStatusId, @actionId, 'bulk.batch.delete')

--------------------------------------
set @fromStatusName ='rejected'
set @toStatusName ='disabled'
set @actionName ='disableBatch'

set @fromStatusId = (select batchStatusId from [bulk].[batchStatus] bs
    JOIN [core].[itemName] ci on ci.itemNameId = bs.itemNameId
    where ci.itemCode=@fromStatusName)
set @toStatusId = (select batchStatusId from [bulk].[batchStatus] bs
    JOIN [core].[itemName] ci on ci.itemNameId = bs.itemNameId
    where ci.itemCode=@toStatusName)
set @actionId = (select batchActionId from [bulk].[batchAction] ba
    JOIN [core].[itemName] ci on ci.itemNameId = ba.itemNameId
    where ci.itemCode=@actionName)

if not exists (select * from [bulk].[batchStatusAction] where fromStatusId=@fromStatusId and toStatusId=@toStatusId)
insert into [bulk].[batchStatusAction] (fromStatusId, toStatusId, actionId, permission)
values (@fromStatusId, @toStatusId, @actionId, 'bulk.batch.disable')

--------------------------------------
set @fromStatusName ='new'
set @toStatusName ='disabled'
set @actionName ='disableBatch'

set @fromStatusId = (select batchStatusId from [bulk].[batchStatus] bs
    JOIN [core].[itemName] ci on ci.itemNameId = bs.itemNameId
    where ci.itemCode=@fromStatusName)
set @toStatusId = (select batchStatusId from [bulk].[batchStatus] bs
    JOIN [core].[itemName] ci on ci.itemNameId = bs.itemNameId
    where ci.itemCode=@toStatusName)
set @actionId = (select batchActionId from [bulk].[batchAction] ba
    JOIN [core].[itemName] ci on ci.itemNameId = ba.itemNameId
    where ci.itemCode=@actionName)

if not exists (select * from [bulk].[batchStatusAction] where fromStatusId=@fromStatusId and toStatusId=@toStatusId)
insert into [bulk].[batchStatusAction] (fromStatusId, toStatusId, actionId, permission)
values (@fromStatusId, @toStatusId, @actionId, 'bulk.batch.disable')

--------------------------------------

set @fromStatusName ='new'
set @toStatusName ='ready'
set @actionName ='readyBatch'

set @fromStatusId = (select batchStatusId from [bulk].[batchStatus] bs
    JOIN [core].[itemName] ci on ci.itemNameId = bs.itemNameId
    where ci.itemCode=@fromStatusName)
set @toStatusId = (select batchStatusId from [bulk].[batchStatus] bs
    JOIN [core].[itemName] ci on ci.itemNameId = bs.itemNameId
    where ci.itemCode=@toStatusName)
set @actionId = (select batchActionId from [bulk].[batchAction] ba
    JOIN [core].[itemName] ci on ci.itemNameId = ba.itemNameId
    where ci.itemCode=@actionName)

if not exists (select * from [bulk].[batchStatusAction] where fromStatusId=@fromStatusId and toStatusId=@toStatusId)
insert into [bulk].[batchStatusAction] (fromStatusId, toStatusId, actionId, permission)
values (@fromStatusId, @toStatusId, @actionId, 'bulk.batch.ready')

--------------------------------------

set @fromStatusName ='ready'
set @toStatusName ='processing'
set @actionName ='processBatch'

set @fromStatusId = (select batchStatusId from [bulk].[batchStatus] bs
    JOIN [core].[itemName] ci on ci.itemNameId = bs.itemNameId
    where ci.itemCode=@fromStatusName)
set @toStatusId = (select batchStatusId from [bulk].[batchStatus] bs
    JOIN [core].[itemName] ci on ci.itemNameId = bs.itemNameId
    where ci.itemCode=@toStatusName)
set @actionId = (select batchActionId from [bulk].[batchAction] ba
    JOIN [core].[itemName] ci on ci.itemNameId = ba.itemNameId
    where ci.itemCode=@actionName)

if not exists (select * from [bulk].[batchStatusAction] where fromStatusId=@fromStatusId and toStatusId=@toStatusId)
insert into [bulk].[batchStatusAction] (fromStatusId, toStatusId, actionId, permission)
values (@fromStatusId, @toStatusId, @actionId, 'bulk.batch.process')

--------------------------------------

set @fromStatusName ='ready'
set @toStatusName ='rejected'
set @actionName ='rejectBatch'

set @fromStatusId = (select batchStatusId from [bulk].[batchStatus] bs
    JOIN [core].[itemName] ci on ci.itemNameId = bs.itemNameId
    where ci.itemCode=@fromStatusName)
set @toStatusId = (select batchStatusId from [bulk].[batchStatus] bs
    JOIN [core].[itemName] ci on ci.itemNameId = bs.itemNameId
    where ci.itemCode=@toStatusName)
set @actionId = (select batchActionId from [bulk].[batchAction] ba
    JOIN [core].[itemName] ci on ci.itemNameId = ba.itemNameId
    where ci.itemCode=@actionName)

if not exists (select * from [bulk].[batchStatusAction] where fromStatusId=@fromStatusId and toStatusId=@toStatusId)
insert into [bulk].[batchStatusAction] (fromStatusId, toStatusId, actionId, permission)
values (@fromStatusId, @toStatusId, @actionId, 'bulk.batch.reject')

--------------------------------------

set @fromStatusName ='rejected'
set @toStatusName ='ready'
set @actionName ='readyBatch'

set @fromStatusId = (select batchStatusId from [bulk].[batchStatus] bs
    JOIN [core].[itemName] ci on ci.itemNameId = bs.itemNameId
    where ci.itemCode=@fromStatusName)
set @toStatusId = (select batchStatusId from [bulk].[batchStatus] bs
    JOIN [core].[itemName] ci on ci.itemNameId = bs.itemNameId
    where ci.itemCode=@toStatusName)
set @actionId = (select batchActionId from [bulk].[batchAction] ba
    JOIN [core].[itemName] ci on ci.itemNameId = ba.itemNameId
    where ci.itemCode=@actionName)

if not exists (select * from [bulk].[batchStatusAction] where fromStatusId=@fromStatusId and toStatusId=@toStatusId)
insert into [bulk].[batchStatusAction] (fromStatusId, toStatusId, actionId, permission)
values (@fromStatusId, @toStatusId, @actionId, 'bulk.batch.ready')

--------------------------------------

set @fromStatusName ='rejected'
set @toStatusName ='deleted'
set @actionName ='deleteBatch'

set @fromStatusId = (select batchStatusId from [bulk].[batchStatus] bs
    JOIN [core].[itemName] ci on ci.itemNameId = bs.itemNameId
    where ci.itemCode=@fromStatusName)
set @toStatusId = (select batchStatusId from [bulk].[batchStatus] bs
    JOIN [core].[itemName] ci on ci.itemNameId = bs.itemNameId
    where ci.itemCode=@toStatusName)
set @actionId = (select batchActionId from [bulk].[batchAction] ba
    JOIN [core].[itemName] ci on ci.itemNameId = ba.itemNameId
    where ci.itemCode=@actionName)

if not exists (select * from [bulk].[batchStatusAction] where fromStatusId=@fromStatusId and toStatusId=@toStatusId)
insert into [bulk].[batchStatusAction] (fromStatusId, toStatusId, actionId, permission)
values (@fromStatusId, @toStatusId, @actionId, 'bulk.batch.delete')

--------------------------------------

set @fromStatusName ='processing'
set @toStatusName ='done'
set @actionName ='completeBatch'

set @fromStatusId = (select batchStatusId from [bulk].[batchStatus] bs
    JOIN [core].[itemName] ci on ci.itemNameId = bs.itemNameId
    where ci.itemCode=@fromStatusName)
set @toStatusId = (select batchStatusId from [bulk].[batchStatus] bs
    JOIN [core].[itemName] ci on ci.itemNameId = bs.itemNameId
    where ci.itemCode=@toStatusName)
set @actionId = (select batchActionId from [bulk].[batchAction] ba
    JOIN [core].[itemName] ci on ci.itemNameId = ba.itemNameId
    where ci.itemCode=@actionName)

if not exists (select * from [bulk].[batchStatusAction] where fromStatusId=@fromStatusId and toStatusId=@toStatusId)
insert into [bulk].[batchStatusAction] (fromStatusId, toStatusId, actionId, permission)
values (@fromStatusId, @toStatusId, @actionId, 'bulk.batch.complete')
