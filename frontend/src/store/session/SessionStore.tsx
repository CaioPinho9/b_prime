import { v4 as uuid } from 'uuid';
import Cookies from 'universal-cookie';

class SessionStore {
    cookies = new Cookies();
    cookieName = "session-id";

    getCookie() {
        return this.cookies.get(this.cookieName);
    }

    setCookie(value: string) {
        this.cookies.set(this.cookieName, value, { path: '/' });
    }

    createSession() {
        if (this.getCookie() != null) {
            return;
        }
        const uuid_string = uuid()
        this.setCookie(uuid_string)
    }
};

export default SessionStore