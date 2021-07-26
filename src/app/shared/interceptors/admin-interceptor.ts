import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { LoadingService } from "../components/loading/services/loading.service";

@Injectable()
export class AdminInterceptor implements HttpInterceptor {

    constructor(private _loadSvc: LoadingService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this._loadSvc.toggle(true);

        return next.handle(req).pipe(
            tap(
                (event: HttpEvent<any>) => {
                    if(event instanceof HttpResponse){
                        this._loadSvc.toggle(false);
                    }
                },
                (error: any) => {
                    this._loadSvc.toggle(false);
                }
            )
        )
    }

}