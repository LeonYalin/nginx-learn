import { delimeterMsg, logF, logToHTML } from "./utils";

function understandingNginxConfiguration() {
  logToHTML(`
    The basics of units of nginx configuration are: context and directives.

    - directives are key-value pairs that define a specific behavior for a context
    - context is a block in the configuration, containing directives for that context. Context can be nested and inherited.
    - the top context is called the main context and it is applied to the master process.
    - see nginx.conf for more details.
    - use "curl -I nginx-learn.com/style.css" to check a file mime type
    - see the "nginx.conf" for configuration options and explanations.

    `);
}

export default function installations() {
  delimeterMsg('INSTALLATIONS');
  logF(understandingNginxConfiguration);
}