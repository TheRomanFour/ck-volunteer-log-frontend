import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType, HttpHeaders } from '@angular/common/http';

@Injectable()
export class Juice {

    //private token: string;
    private language: string = "";
    private endpoint: string = "";

    constructor(
        private http: HttpClient
    ) {
        console.log('JuicEcommerce', 'Loaded');
    }

    loadConfiguration(path: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.get(path).subscribe(data => {
                resolve(data);
            }, error => {
                resolve(null);
            });
        });
    }

    /** Set EndPoint external */
    setEndPoint(uri: string) {
        this.endpoint = uri;
    }

    getEndPoint() {
        return this.endpoint;
    }

    getToken(): string {
        try {
            const token = localStorage.getItem('juice-token');
            if (!token)
                return "";

            return JSON.parse(token);
        } catch (exception) {
            this.removeToken();
            return "";
        }
    }

    isLoggedIn(): boolean {
        const token = this.getToken();
        return !!token;
    }

    setToken(token: string) {
        localStorage.setItem('juice-token', JSON.stringify(token));
    }

    clear() {
        localStorage.clear();
    }

    removeToken() {
        localStorage.removeItem('juice-token');
        return true;
    }

    setLanguage(language: string) {
        if (language.length === 2) {
            language = language + '-' + language.toUpperCase();
        }
        this.language = language;
        localStorage.setItem('lang', language);
    }

    getLanguage() {
        if (this.language) {
            return this.language;
        } else if (localStorage.getItem('lang')) {
            return localStorage.getItem('lang');
        } else {
            return null;
        }
    }

    // ---- Authentication ------------------------

    /**
     * Initialize connection to JuicEcommerce API.
     * If successful the session token will be exchanged and stored
     * in local storage.
     *
     * Returns {Promise<boolean>}
     */
    init(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            /*this.requestToken().then(success => {
                resolve(true);
            });*/
            resolve(true);
        });
    }

    private requestToken(): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            const token = this.getToken();

            if (typeof token === 'undefined' || token == null) {
                return resolve(false);

            } else {
                let headers = new HttpHeaders();
                headers = headers.append('juice-language', this.language);
                headers = headers.append('juice-token', token);
                this.http.get(this.endpoint + '/user/auth/validate-token', {
                    headers: headers,
                    observe: 'response'
                }).subscribe((response: any) => {
                    const newToken = response.headers.get('juice-token');
                    this.setToken(newToken);

                    resolve(true);
                }, error => {
                    if (error.status == 403) window.location.reload();
                    this.removeToken();

                });
            }
        });
    }

    /**
     * Sending e-mail and password to API for user authentication
     *
     * @param strategy
     * @param data
     * @returns {Promise<any>}
     */
    login(strategy: string, data: { email?: string, password?: string, code?: string, redirectUri?: string, legalAgreement?: boolean }) {
        return new Promise((resolve, reject) => {
            const body = {
                strategy: strategy,
                email: data.email || null,
                password: data.password || null,
                code: data.code || null,
                redirectUri: data.redirectUri || null,
                legalAgreement: data.legalAgreement || null,
            };
            let headers = new HttpHeaders();
            headers = headers.append('juice-language', this.language);

            this.http.post(this.endpoint + '/user/auth/login', body, {
                headers: headers,
                observe: 'response'
            }).subscribe(response => {
                const newToken = response.headers.get('juice-token');
                if (newToken) this.setToken(newToken);

                resolve(response.body);
            }, error => {
                if (error.status == 403) window.location.reload();
                reject(error);
            });
        });
    }

    /**
     * Register new user
     * @param body
     */
    register(body: any) {
        return new Promise((resolve, reject) => {

            let headers = new HttpHeaders();
            headers = headers.append('juice-language', this.language);

            this.http.post(this.endpoint + '/user/auth/register', body, {
                headers: headers,
                observe: 'response'
            }).subscribe(data => {
                const newToken = data.headers.get('juice-token');
                if (newToken) {
                    this.setToken(newToken);
                }
                resolve(data.body);
            }, error => {
                if (error.status == 403) window.location.reload();
                resolve(error);
            });
        });
    }

    /**
     * Universal function for sending data using POST method
     *
     * @param {string} url
     * @param body
     * @returns {Promise<any>}
     */
    post(url: string, body: any): Promise<any> {
        return new Promise((resolve, reject) => {

            let headers = new HttpHeaders();
            headers = headers.append('juice-token', this.getToken());
            headers = headers.append('juice-language', this.language);

            this.http.post(this.endpoint + url, body, {
                headers: headers,
                observe: 'response'
            }).subscribe(data => {
                const newToken = data.headers.get('juice-token');
                if (newToken) {
                    this.setToken(newToken);
                }
                resolve(data.body);
            }, err => {
                if (err.status === 403) window.location.reload();
                reject(err);
            });
        });
    }

    /**
     * Universal function for sending data using PUT method
     *
     * @param {string} url
     * @param body
     * @returns {Promise<any>}
     */
    put(url: string, body: any): Promise<any> {
        return new Promise((resolve, reject) => {

            let headers = new HttpHeaders();
            headers = headers.append('juice-token', this.getToken());
            headers = headers.append('juice-language', this.language);

            this.http.put(this.endpoint + url, body, {
                headers: headers,
                observe: 'response'
            }).subscribe(data => {
                const newToken = data.headers.get('juice-token');
                if (newToken) {
                    this.setToken(newToken);
                }
                resolve(data.body);
            }, error => {
                if (error.status === 403) window.location.reload();
                reject(error);
            });

        });
    }

    /**
     * Sending request for some resource specified in params
     *
     * @param {string} url
     * @returns {Promise<any>}
     */

    get(url: string): Promise<any> {
        return new Promise((resolve, reject) => {

            let headers = new HttpHeaders();
            headers = headers.append('juice-token', this.getToken());
            headers = headers.append('juice-language', this.language);

            this.http.get(this.endpoint + url, {
                headers: headers,
                observe: 'response'
            }).subscribe(data => {
                const newToken = data.headers.get('juice-token');
                if (newToken) {
                    this.setToken(newToken);
                }
                resolve(data.body);
            }, error => {
                if (error.status === 403) window.location.reload();
                if (error.status === 0) {
                    this.removeToken();
                    window.location.reload();
                }
                reject(error);
            });
        });
    }

    /**
     * Deletes resource specified in params
     *
     * @param url
     * @param params
     * @returns {Promise<any>}
     */
    delete(url: string, params?: any): Promise<any> {
        return new Promise((resolve, reject) => {

            let _params = '';
            for (const key in params) {
                _params += '/' + params[key];
            }

            let headers = new HttpHeaders();
            headers = headers.append('juice-token', this.getToken());

            this.http.delete(this.endpoint + url + _params, {
                headers: headers,
                observe: 'response'
            }).subscribe(data => {
                const newToken = data.headers.get('juice-token');
                if (newToken) {
                    this.setToken(newToken);
                }
                resolve(data);
            }, error => {
                if (error.status === 403) window.location.reload();
                reject(error);
            });
        });
    }

    upload(url: string, payload: any, body?: any): Promise<any> {
        return new Promise((resolve, reject) => {

            let headers = new HttpHeaders();
            headers = headers.append('juice-token', this.getToken());
            headers.set('content-type', 'multipart/form-data');
            headers.set('Content-Length', payload.length);

            let formData: FormData = new FormData();
            formData.append('file', payload);

            if (body) {
                formData.append('body', JSON.stringify(body));
            }

            this.http.post(this.endpoint + url, formData, {
                headers: headers,
                observe: 'events',
                reportProgress: true
            }).subscribe((event: HttpEvent<any>) => {
                if (event.type === HttpEventType.ResponseHeader) {
                    let newToken = event.headers.get('juice-token');
                    if (newToken) {
                        this.setToken(newToken);
                    }
                }

                if (event.type === HttpEventType.Response) {
                    resolve(event.body);
                }

            }, error => {
                if (error.status == 403) window.location.reload();
                reject(error);
            });
        });
    }

    getBlob(url: string, body: any): Promise<any> {
        return new Promise((resolve, reject) => {

            let headers = new HttpHeaders();
            headers = headers.append('juice-token', this.getToken());

            this.http.post(this.endpoint + url, body, {
                headers: headers,
                observe: 'events',
                responseType: 'blob',
                reportProgress: true
            }).subscribe((event: HttpEvent<any>) => {

                if (event.type === HttpEventType.ResponseHeader) {
                    const newToken = event.headers.get('juice-token');
                    if (newToken) {
                        this.setToken(newToken);
                    }
                }

                if (event.type === HttpEventType.Response) {
                    resolve(event.body);
                }

            }, err => {
                if (err.status == 403) window.location.reload();
                reject(err);
            });
        });
    }

    getNoHeaders(url: string): Promise<any> {
        return new Promise((resolve, reject) => {

            let headers = new HttpHeaders();
            headers = headers.append('juice-language', this.language);

            this.http.get(this.endpoint + url, {
                headers: headers,
                observe: 'response'
            }).subscribe(data => {
                resolve(data.body);
            }, error => {
                reject(error);
            });
        });
    }

    postNoHeaders(url: string, body: any): Promise<any> {
        return new Promise((resolve, reject) => {

            let headers = new HttpHeaders();
            headers = headers.append('juice-language', this.language);

            this.http.post(this.endpoint + url, body, {
                headers: headers,
                observe: 'response'
            }).subscribe(data => {
                resolve(data.body);
            }, err => {
                reject(err);
            });
        });
    }

    putNoHeaders(url: string, body: any): Promise<any> {
        return new Promise((resolve, reject) => {

            let headers = new HttpHeaders();
            headers = headers.append('juice-language', this.language);

            this.http.put(this.endpoint + url, body, {
                headers: headers,
                observe: 'response'
            }).subscribe(data => {
                resolve(data.body);
            }, error => {
                reject(error);
            });

        });
    }

    deleteNoHeaders(url: string): Promise<any> {
        return new Promise((resolve, reject) => {

            let headers = new HttpHeaders();
            headers = headers.append('juice-language', this.language);

            this.http.delete(this.endpoint + url, {
                headers: headers,
                observe: 'response'
            }).subscribe(data => {
                resolve(data.body);
            }, error => {
                reject(error);
            });

        });
    }

    getBlobNoHeaders(url: string, body: any): Promise<any> {
        return new Promise((resolve, reject) => {

            this.http.post(this.endpoint + url, body, {
                observe: 'events',
                responseType: 'blob',
                reportProgress: true
            }).subscribe((event: HttpEvent<any>) => {
                if (event.type === HttpEventType.Response) {
                    resolve(event.body);
                }

            }, err => {
                if (err.status == 403) window.location.reload();
                reject(err);
            });
        });
    }


}
