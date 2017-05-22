CREATE TABLE [bulk].[batchStatusAction] -- in this table is put the configuration of the statuses and actions, i.e. from which status with which action the object goes in the the next status
(
    fromStatusId tinyint NOT NULL, --the status in which the object is currently
    actionId tinyint NOT NULL, --what action can be performed
    toStatusId tinyint NOT NULL, --in which status the object will be after the action is performed
    permission varchar(100), -- which SP is called or some "dummy" permission in order to check what actions can perform the logged user
    CONSTRAINT [pkbatchStatusAction] PRIMARY KEY CLUSTERED (fromStatusId, actionId, toStatusId),
    CONSTRAINT fkbatchStatusAction_actionId FOREIGN KEY(actionId) REFERENCES [bulk].[batchAction] (batchActionId),
    CONSTRAINT fkbatchStatusAction_fromStatusId FOREIGN KEY(fromStatusId) REFERENCES [bulk].[batchStatus] (batchStatusId),
    CONSTRAINT fkbatchStatusAction_toStatusId FOREIGN KEY(toStatusId) REFERENCES [bulk].[batchStatus] (batchStatusId)
)
