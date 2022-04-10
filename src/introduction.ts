import { delimeterMsg, logF, logToHTML } from "./utils";

function aboutNginx() {
  logToHTML(`
    Nginx is a web server. It can be used as a reverse proxy or for routing.

    - Its model uses concurrency to handle requests, therefore is is faster than Apache, that is limited to number of threads and connections.
    - it is serving static files faster because it does not invoke code then serving static files.
    - Nginx interprets requests as a URI lications, thereas Apache interprets them as a filesystem locations, e.g. /images vs /c/program files/app/images
    `);
}

export default function introduction() {
  delimeterMsg('INTRODUCTION');
  logF(aboutNginx);
}