CREATE TABLE [bulk].[batch] (
    [batchId] [BIGINT] IDENTITY(1000,1) NOT NULL, -- id of the batch
    [name] [NVARCHAR](100) NOT NULL, -- name of the batch
    [batchStatusId] [TINYINT] NOT NULL, -- id of the batch status
    [batchTypeId] [TINYINT] NOT NULL, -- id of the batch type
    [account] [NVARCHAR](50)  NULL, -- id of the account
    [description] [NVARCHAR](MAX) NULL, -- description of the batch
    [transactionType] [NVARCHAR](50) NULL,-- type of transaction
    [fileName] [NVARCHAR](250) NOT NULL, -- name of the batch file in the syatem
    [originalFilename] [NVARCHAR](250) NOT NULL, -- name of the batch file
    [reason] [NVARCHAR](1000), -- reaason for the batch delete/reject
    [createdBy] BIGINT NOT NULL, -- id of the actor-maker
    [createdOn] [DATETIME2](0) NOT NULL, -- date of the file upload
    [validatedOn] [DATETIMEOFFSET](7) NULL, -- validated on timestamp
    [updatedBy] BIGINT NOT NULL, -- id of the actor
    [updatedOn] [DATETIME2](0) NOT NULL, -- date of the status change
    CONSTRAINT [pkBatch_batchId] PRIMARY KEY CLUSTERED ([batchId]),
    CONSTRAINT [fkBulkBatch_batchStatus_batchStatusId] FOREIGN KEY([batchStatusId]) REFERENCES [bulk].[batchStatus] ([batchStatusId]),
    CONSTRAINT [fkBulkBatch_batchType_batchTypeId] FOREIGN KEY([batchTypeId]) REFERENCES [bulk].[batchType] ([batchTypeId]),
    CONSTRAINT [fkBulkBatch_coreActor_createdBy] FOREIGN KEY([createdBy]) REFERENCES [core].[actor] ([actorId]),
    CONSTRAINT [fkBulkBatch_coreActor_updatedBy] FOREIGN KEY([updatedBy]) REFERENCES [core].[actor] ([actorId])
)
