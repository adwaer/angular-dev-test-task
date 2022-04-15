import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Select, Store } from '@ngxs/store';
import { filter, Observable, takeUntil } from 'rxjs';
import { NotificationState } from '../state/notification.state';
import { Disposable } from '@domain/helpers';
import { WeatherForecastApiService } from '@services/weather-forecast-api.service';
import { Notify } from '../state/notification.actions';

@Component({
	selector: 'bp-notifications',
	templateUrl: './notifications.component.html',
	styleUrls: ['./notifications.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationsComponent extends Disposable implements OnInit {
	@Select(NotificationState.message) message$!: Observable<string>;

	constructor(private snackBar: MatSnackBar, private service: WeatherForecastApiService, store: Store) {
		super();
		this.service.error$
			.pipe(
				takeUntil(this.disposed$),
			)
			.subscribe(error => {
				store.dispatch(new Notify(error));
			});
	}

	ngOnInit(): void {
		this.message$
			.pipe(
				filter(msg => !!msg),
				takeUntil(this.disposed$),
			)
			.subscribe(message => {
				this.snackBar.open(message, 'Error', {
					duration: 5000,
				});
			});
	}

}
