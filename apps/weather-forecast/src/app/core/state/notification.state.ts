import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { NotificationModel } from './notification.model';
import { Notify } from './notification.actions';

@State<NotificationModel>({
	name: 'Notifications',
	defaults: {
		message: ''
	},
})
@Injectable()
export class NotificationState {
	@Selector()
	static message(state: NotificationModel): string {
		const { message } = state;
		return message;
	}

	@Action(Notify)
	notify(ctx: StateContext<NotificationModel>, { payload }: Notify): void {
		ctx.setState({
			message: payload
		});
		setTimeout(() => {
			ctx.setState({
				message: ''
			});
		});
	}
}
