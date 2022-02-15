import { isDevMode } from '@angular/core';
import { Juice } from "./Juice";

export function JuiceProviderFactory(juice: Juice) {

    juice.setLanguage(getLangFromLocalStorage());
    juice.setEndPoint('http://localhost:3000');

    return async () => {
        if (!isDevMode()) {
            const config: any = await juice.loadConfiguration('config.json');
            if (config.url === 'auto') {
                juice.setEndPoint(window.location.protocol + '//' + window.location.host);
            } else {
                juice.setEndPoint(config.url);
            }
        }

        return await juice.init().then(success => {
            console.log('Juicebox Initalized', success);
        });
    }
}

function getLangFromLocalStorage() {
    const FALLBACK_LANG = 'en_GB';
    let lang = null;

    try {
        lang = localStorage.getItem('lang');
    } catch (err) {
        return FALLBACK_LANG;
    }

    if (!lang) return FALLBACK_LANG;

    return lang;
}
