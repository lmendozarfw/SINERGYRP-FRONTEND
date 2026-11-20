import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "../../../nucleo/servicios/api.servicio";
import { LocalStorageService } from "../../../nucleo/servicios/storage.servicio";
import { ILoginRequest, ILoginResponse, IMeResponse } from "../modelos/auth";

@Injectable({ providedIn: 'root' })
export class AuthService {
    private api = inject(ApiService);
    private storageService = inject(LocalStorageService);

    login(request: ILoginRequest): Observable<ILoginResponse> {

        return this.api.post<ILoginRequest, ILoginResponse>(
            'Auth/Login',
            request
        );
    }

    me(): Observable<IMeResponse> {
        return this.api.get<IMeResponse>('auth/Me');
    }

    getToken(): string | null {
        return this.storageService.get<string>("access_token");
    }

    logout() {
        this.storageService.remove('user');
        this.storageService.remove('access_token');
        this.storageService.remove('permissions');
    }
}
