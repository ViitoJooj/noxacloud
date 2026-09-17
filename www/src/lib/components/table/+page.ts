export interface TableColumn<Row> {
	key: keyof Row & string;
	header: string;
}
