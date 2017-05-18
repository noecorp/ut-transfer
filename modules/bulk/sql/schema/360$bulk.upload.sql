CREATE TABLE [bulk].[upload](
    [uploadId] [BIGINT] IDENTITY(1,1) NOT NULL,
    [batchId] [BIGINT] NOT NULL,
    [fileName] [NVARCHAR](250) NOT NULL,
    [originalFileName] [NVARCHAR](250) NOT NULL,
    CONSTRAINT [pkBulkUpload] PRIMARY KEY CLUSTERED([uploadId]),
    CONSTRAINT [fkFileUpload_batch_batchId] FOREIGN KEY([batchId]) REFERENCES [bulk].[batch] ([batchId])
)
