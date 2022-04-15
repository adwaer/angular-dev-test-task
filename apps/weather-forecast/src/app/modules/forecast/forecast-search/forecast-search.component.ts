import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Disposable } from '@domain/helpers';
import { Store } from '@ngxs/store';
import { ForecastSetSearch } from '../state/forecast.actions';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { first, takeUntil } from 'rxjs';

@Component({
	selector: 'bp-forecast-search',
	templateUrl: './forecast-search.component.html',
	styleUrls: ['./forecast-search.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForecastSearchComponent extends Disposable {
	formGroup: FormGroup;
	formControl: FormControl;

	constructor(private formBuilder: FormBuilder, private store: Store, private router: Router, private route: ActivatedRoute) {
		super();
		this.formGroup = this.formBuilder.group({
			city: ['', [Validators.required, Validators.minLength(2)]],
		});
		this.formControl = this.formGroup.get('city') as FormControl;

		router.events.subscribe((val) => {
			if (val instanceof NavigationStart) {
				this.store.dispatch(new ForecastSetSearch(''));
			}
		});

		this.route.queryParams
			.pipe(
				first(),
				takeUntil(this.disposed$),
			)
			.subscribe(params => {
				const { search } = params;
				this.formControl.setValue(search);
			});
	}

	submit(): void {
		if (this.formGroup.invalid) {
			return;
		}

		const { city } = this.formGroup.value;
		this.store.dispatch(new ForecastSetSearch(city));
		this.router.navigate([], { relativeTo: this.route, queryParams: { search: city } }).then();
	}
}
