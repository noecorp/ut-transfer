CREATE TABLE [bulk].[batchStatus] (
    batchStatusId [TINYINT] IDENTITY(1,1) NOT NULL,
    itemNameId [BIGINT] NOT NULL,
    CONSTRAINT pkBulkBatchStatus PRIMARY KEY CLUSTERED(batchStatusId  ASC),
    CONSTRAINT [fkBatchStatus_coreItemName] FOREIGN KEY([itemNameId]) REFERENCES [core].[itemName] ([itemNameId])
)
