CREATE TABLE [bulk].[batchAction] (  --table for bulk payment actions
    batchActionId tinyint IDENTITY(1, 1) NOT NULL, -- the id of the action
    itemNameId bigint NOT NULL, --the link to the action's name, translated
    CONSTRAINT [pkbatchAction] PRIMARY KEY CLUSTERED (batchActionId),
    CONSTRAINT [fkbatchAction_CoreItemName] FOREIGN KEY(itemNameId) REFERENCES [core].[itemName] (itemNameId)
)
