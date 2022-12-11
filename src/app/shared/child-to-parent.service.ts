import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ChildToParentService {

    deliver$ = new Subject<any>();
    constructor() { }

}
