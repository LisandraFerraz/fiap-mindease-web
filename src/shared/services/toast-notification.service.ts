import { inject, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToastNotification {
  toastr = inject(ToastrService);

  config = {
    positionClass: 'toast-bottom-center',
    timeOut: 3000,
    progressBar: true,
  };

  public toastError(msg: string) {
    return this.toastr.error(msg, '', this.config);
  }

  public toastSuccess(msg: string) {
    return this.toastr.success(msg, '', this.config);
  }
}
