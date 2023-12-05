import { Observable } from "rxjs/internal/Observable";

export interface ComponentCanDeactive {
    canDeactivate:()=> boolean |Observable <boolean>
}
