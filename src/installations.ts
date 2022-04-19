import { delimeterMsg, logF, logToHTML } from "./utils";

function runningNginxLocally() {
  logToHTML(`
    We can install Nginx in a couple of ways:

    - via the package manager, e.g. "apt install nginx"
    - build from sources.

    To build an nginx app from sources we need to do the following:
    - download the source (.tar) from the nginx.org website and unzip it
    - install required dependencies: C compiler and other stuff
    - run the ./configure script. It should pass successfully.
    - configure script is used to configure source before compiling. We can add custom flags and modules.
    - compile the source code using "make" and install using "make install"
    - check the install succeeded using "nginx -V" command, or the "ps aux | grep nginx" command.
    - check the Dockerfile for details.
    `);
}

export default function installations() {
  delimeterMsg('INSTALLATIONS');
  logF(runningNginxLocally);
}