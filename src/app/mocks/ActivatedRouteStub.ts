import { Observable, of, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { convertToParamMap, ParamMap } from '@angular/router';

@Injectable()
export class ActivatedRouteStub {


    public params = of({
        id: 1
    });

    public paramMap = of({
        get: (id) => {
            return 1;
        }
    });
}
