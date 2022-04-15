import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
	selector: 'bp-table-loader',
	templateUrl: './table-loader.component.html',
	styleUrls: ['./table-loader.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableLoaderComponent implements OnInit {
	@Input() rows!: number;
	@Input() cols!: number;

	displayedColumns!: string[];
	dataSource = new MatTableDataSource<unknown>();

	ngOnInit(): void {
		this.displayedColumns = [];
		for (let i = 0; i < this.cols; i++) {
			this.displayedColumns.push(`col_${i}`);
		}

		const data = [];
		for (let i = 0; i < this.rows; i++) {
			data.push({});
		}
		this.dataSource.data = data;
	}
}
