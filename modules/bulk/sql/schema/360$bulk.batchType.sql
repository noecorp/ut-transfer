CREATE TABLE [bulk].[batchType] (
    batchTypeId [TINYINT] IDENTITY(1,1) NOT NULL,
    itemNameId [BIGINT] NOT NULL,
    CONSTRAINT pkBulkBatchType PRIMARY KEY CLUSTERED(batchTypeId  ASC),
    CONSTRAINT [fkBatchType_coreItemName] FOREIGN KEY([itemNameId]) REFERENCES [core].[itemName] ([itemNameId])
)
