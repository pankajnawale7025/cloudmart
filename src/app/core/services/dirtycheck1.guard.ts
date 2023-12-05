import { CanDeactivateFn } from '@angular/router';
import { ComponentCanDeactive } from 'src/app/shared/component-can-deactive';
import Swal from 'sweetalert2';

export const dirtycheck1Guard: CanDeactivateFn<ComponentCanDeactive> = (component: ComponentCanDeactive) => {
  if (component.canDeactivate()) {
    return true;
  }
  else {
    //return confirm("You have unsaved changes! Do you really want to go?")


    return Swal.fire({
      title: 'You have unsaved changes!',
      text: 'Do you really want to leave?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, leave!',
      cancelButtonText: 'No, stay!'
    }).then((result) => {
      return result.isConfirmed;
    });
  }

  }
 
