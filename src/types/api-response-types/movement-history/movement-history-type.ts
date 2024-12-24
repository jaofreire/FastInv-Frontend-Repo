export class MovementHistoryType {
    id: string;
    companyId: string;
    userId: string;
    userName: string;
    inventoryTableId: string;
    inventoryTableName: string;
    eventType: string;
    occurredOn: string;
    columnChanged: string;
    previousValue: string;
    currentValue: string;

    constructor(
        id: any,
        companyId: any,
        userId: any,
        userName: any,
        inventoryTableId: any,
        inventoryTableName: any,
        eventType: any,
        occurredOn: any,
        columnChanged: any,
        previousValue: any,
        currentValue: any
    ) {
        this.id = id;
        this.companyId = companyId;
        this.userId = userId;
        this.userName = userName;
        this.inventoryTableId = inventoryTableId;
        this.inventoryTableName = inventoryTableName;
        this.eventType = eventType;
        this.occurredOn = occurredOn;
        this.columnChanged = columnChanged;
        this.previousValue = previousValue;
        this.currentValue = currentValue;
    }

}
