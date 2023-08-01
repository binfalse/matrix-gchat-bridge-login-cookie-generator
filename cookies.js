class LoginCookie {
    compass = undefined;
    ssid = undefined;
    sid = undefined;
    osid = undefined;
    hsid = undefined;

    registerCookie(cookie) {
        switch (cookie.name.toLowerCase()) {
            case "compass":
                this.compass = cookie.value;
                break;
            case "ssid":
                this.ssid = cookie.value;
                break;
            case "sid":
                this.sid = cookie.value;
                break;
            case "osid":
                this.osid = cookie.value;
                break;
            case "hsid":
                this.hsid = cookie.value;
                break;
        }
    }

    isValid() {
        return this.compass?.length > 0 &&
            this.ssid?.length > 0 &&
            this.sid?.length > 0 &&
            this.osid?.length > 0 &&
            this.hsid?.length > 0
    }

    getCookie() {
        return `login-cookie {
    "compass": "${this.compass}",
    "ssid": "${this.ssid}",
    "sid": "${this.sid}",
    "osid": "${this.osid}",
    "hsid": "${this.hsid}"
}`
    }
}

function getAllCookies() {
    if (typeof browser === "undefined") {console.log('trying chrome...')
        return chrome.cookies.getAll({url: "https://chat.google.com"})
    } else {
        return browser.cookies.getAll({url: "https://chat.google.com"});
    }
}

function createCopyButton(loginCookieArea) {

    let button = document.createElement("button");
    button.appendChild(document.createTextNode('copy'));

    button.onclick = function () {
        navigator.clipboard.writeText(loginCookieArea.value).then(
            () => {
                console.log('clipboard successfully set');
            },
            () => {
                console.error('clipboard write failed');
            }
        );
        return false;
    };

    return button
}


function setupPopup() {
    getAllCookies().then((cookies) => {
        // console.log('cookies:', cookies)
        let panel = document.getElementById('panel');
        panel.innerHTML = '';

        const loginCookie = new LoginCookie();

        if (cookies.length > 0) {
            for (let cookie of cookies) {
                // console.log(cookie.name + ": " + cookie.value)
                loginCookie.registerCookie(cookie);
            }
        }

        if (loginCookie.isValid()) {
            let loginCookieArea = document.createElement('textarea');
            loginCookieArea.value = loginCookie.getCookie();
            let button = createCopyButton(loginCookieArea);
            panel.appendChild(loginCookieArea)
            panel.appendChild(button)
        } else {
            let errorParagraph = document.createElement('p');
            errorParagraph.appendChild(document.createTextNode("Could not find corresponding cookies"))
            panel.appendChild(errorParagraph)
        }
    });
}

setupPopup();