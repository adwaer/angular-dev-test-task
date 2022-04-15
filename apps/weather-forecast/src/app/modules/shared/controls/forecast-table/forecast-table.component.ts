import { Component, ChangeDetectionStrategy, Input, OnChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
	selector: 'bp-forecast-table',
	templateUrl: './forecast-table.component.html',
	styleUrls: ['./forecast-table.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForecastTableComponent implements OnChanges {
	@Input() rows!: unknown[];
	@Input() columns!: { id: string, display: string }[];

	dataSource = new MatTableDataSource<unknown>();
	columnNames: string[] = [];
	columnDisplays: string[] = [];

	ngOnChanges(): void {
		this.dataSource.data = this.rows;
		this.columnNames = this.columns.map(c => c.id);
		this.columnDisplays = this.columns.map(c => c.display);
	}

}
