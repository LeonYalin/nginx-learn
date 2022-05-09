import { delimeterMsg, logF, logToHTML } from "./utils";

function aboutNginx() {
  logToHTML(`
    Nginx is a web server. It can be used as a reverse proxy or for routing.

    - Its model uses concurrency to handle requests, therefore is is faster than Apache, that is limited to number of threads and connections.
    - it is serving static files faster because it does not invoke code then serving static files.
    - Nginx interprets requests as a URI lications, thereas Apache interprets them as a filesystem locations, e.g. /images vs /c/program files/app/images
    `);
}

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

function nginxCommands() {
  logToHTML(`
    We can use the following commands to control nginx:
    - use "nginx -s stop/start/restart/reload" to control the nginx master node
    
    To add a systemd service file, use the following:
    ===
      [Unit]
      Description=The NGINX HTTP and reverse proxy server
      After=syslog.target network-online.target remote-fs.target nss-lookup.target
      Wants=network-online.target

      [Service]
      Type=forking
      PIDFile=/var/run/nginx.pid
      ExecStartPre=/usr/sbin/nginx -t
      ExecStart=/usr/sbin/nginx
      ExecReload=/usr/sbin/nginx -s reload
      ExecStop=/bin/kill -s QUIT $MAINPID
      PrivateTmp=true

      [Install]
      WantedBy=multi-user.target
    ===

    After we configured the systemd service, we can use it to control nginx process
    - use "systemctl start/stop/restart/status nginx"
    - use "systemctl enable nginx" to run the nginx service on system startup
    - use "nginx -t" to check if the configuration is valid 
    `);
}

export default function installations() {
  delimeterMsg('INSTALLATIONS');
  logF(aboutNginx);
  logF(runningNginxLocally);
  logF(nginxCommands);
}