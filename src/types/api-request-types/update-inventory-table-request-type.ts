export class UpdateInventoryTableRequestType {
    Id: string;
    Name: string;
    ColumnChanged: string;
    PreviousValue: string;
    CurrentValue: string;
    Items: any;

    constructor(
        id: string,
        name: string,
        columnChanged: string,
        previousValue: string,
        currentValue: string,
        items: any
    ) {
        this.Id = id;
        this.Name = name;
        this.ColumnChanged = columnChanged;
        this.PreviousValue = previousValue;
        this.CurrentValue = currentValue;
        this.Items = items;
    }
}