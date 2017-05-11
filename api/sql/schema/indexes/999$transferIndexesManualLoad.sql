if not exists(select * from sys.indexes where name = 'bySettlementDate')
    CREATE NONCLUSTERED INDEX [bySettlementDate] ON [transfer].[transfer] ([settlementDate])
else 
begin
    if (select c.name from sys.indexes i
                    join sys.index_columns ic on i.object_id = ic.object_id  and i.index_id= ic.index_id
                    join sys.columns c  ON  C.object_id = I.object_id AND C.column_id = ic.column_id AND IC.is_included_column = 0
                    where i.name = 'bySettlementDate' and ic.index_column_id = 1) != 'settlementDate'
   AND
    (select COUNT(c.name) from sys.indexes i
                    join sys.index_columns ic on i.object_id = ic.object_id  and i.index_id= ic.index_id
                    join sys.columns c  ON  C.object_id = I.object_id AND C.column_id = ic.column_id AND IC.is_included_column = 0
                    where i.name = 'bySettlementDate' and ic.index_column_id = 2) <> 1
    begin
        DROP INDEX [bySettlementDate] ON [transfer].[transfer] 

        CREATE NONCLUSTERED INDEX [bySettlementDate] ON [transfer].[transfer] ([settlementDate])
    end
end   

if not exists(select * from sys.indexes where name = 'byTransferDateTime')
    CREATE NONCLUSTERED INDEX [byTransferDateTime] ON [transfer].[transfer] ([transferDateTime])
else 
begin
    if (select c.name from sys.indexes i
                    join sys.index_columns ic on i.object_id = ic.object_id  and i.index_id= ic.index_id
                    join sys.columns c  ON  C.object_id = I.object_id AND C.column_id = ic.column_id AND IC.is_included_column = 0
                    where i.name = 'byTransferDateTime' and ic.index_column_id = 1) != 'transferDateTime'
   AND
    (select COUNT(c.name) from sys.indexes i
                    join sys.index_columns ic on i.object_id = ic.object_id  and i.index_id= ic.index_id
                    join sys.columns c  ON  C.object_id = I.object_id AND C.column_id = ic.column_id AND IC.is_included_column = 0
                    where i.name = 'byTransferDateTime' and ic.index_column_id = 2) <> 1
    begin
        DROP INDEX [byTransferDateTime] ON [transfer].[transfer] 

        CREATE NONCLUSTERED INDEX [byTransferDateTime] ON [transfer].[transfer] ([transferDateTime])
    end
end   
