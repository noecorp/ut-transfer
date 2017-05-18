CREATE TABLE [bulk].[paymentStatus] (
    paymentStatusId [TINYINT] IDENTITY(1,1) NOT NULL,
    itemNameId [BIGINT] NOT NULL,
    CONSTRAINT pkBulkPaymentStatus PRIMARY KEY CLUSTERED(paymentStatusId  ASC),
    CONSTRAINT [fkPaymentStatus_coreItemName] FOREIGN KEY([itemNameId]) REFERENCES [core].[itemName] ([itemNameId])
)
