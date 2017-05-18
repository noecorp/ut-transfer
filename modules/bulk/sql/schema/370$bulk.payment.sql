CREATE TABLE [bulk].[payment] (
    [paymentId] [BIGINT] IDENTITY(1,1) NOT NULL, -- id of the payment
    [batchId] [BIGINT] NOT NULL, -- id of the batchId
    [sequenceNumber] [INT] NOT NULL, -- A unique number that represents the order in which the individual payment will be executed
    [account] [NVARCHAR](50) NOT NULL, -- the account based on the account type
    [customerName] [NVARCHAR](100) NOT NULL, -- name of the customer
    [description] [NVARCHAR](1000), -- The description of the transaction provided by the intiator
    [amount] [DECIMAL] NOT NULL, -- amount to debit/credit
    [currency] [NVARCHAR](3) NOT NULL, -- ISO 4217 currency code
    [excutionDate] [DATETIME2](0), -- when the payment was attempted
    [paymentStatusId] [TINYINT] NOT NULL, -- id of the status
    [statusNotes] [NVARCHAR](MAX), -- status notes about errors If any
    [createdOn] [datetime2](0) NOT NULL, -- timestamp of the payment created
    [updatedOn] [datetime2](0) NOT NULL, -- timestamp of the payment updated
    [createdBy] [BIGINT] NOT NULL, -- timestamp of the payment created
    [updatedBy] [BIGINT] NOT NULL, -- timestamp of the payment updated
    CONSTRAINT [pkPayment_paymentId] PRIMARY KEY CLUSTERED ([paymentId]),
    CONSTRAINT [fkBulkPayment_batch_batchId] FOREIGN KEY([batchId]) REFERENCES [bulk].[batch] ([batchId]),
    CONSTRAINT [fkBulkPayment_paymentStatus_paymentStatusId] FOREIGN KEY([paymentStatusId]) REFERENCES [bulk].[paymentStatus] ([paymentStatusId]),
    CONSTRAINT [fkBulkPayment_coreActor_createdBy] FOREIGN KEY([createdBy]) REFERENCES [core].[actor] ([actorId]),
    CONSTRAINT [fkBulkPayment_coreActor_updatedBy] FOREIGN KEY([updatedBy]) REFERENCES [core].[actor] ([actorId])
)