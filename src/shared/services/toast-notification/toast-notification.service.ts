import { inject, Injectable } from '@angular/core';
import { IndividualConfig, ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toast = inject(ToastrService);

  config: Partial<IndividualConfig> = {
    positionClass: 'toast-bottom-right',
  };

  public toastError(msg: string) {
    return this.toast.error(msg, '', {
      ...this.config,
    });
  }

  public toastSuccess(msg: string) {
    return this.toast.success(msg, '', {
      ...this.config,
    });
  }
}
