function cookieOperate() {
    function set(name, value, time) {
        let expires = "";
        if (typeof value === "object") {
            value = JSON.stringify(value)
        }
        if (time) {
        let date = new Date();
        date.setTime(date.getTime() + time);
        expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + value + expires + "; path=/";
    }

    function get(name) {
        let nameEQ = name + "=";
        let ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    function remove(name) {
        set(name, '', -1)
    }

    return {
        set: set,
        get: get,
        remove: remove
    }
}

export let cookie = cookieOperate()