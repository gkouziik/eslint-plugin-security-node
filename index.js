/**
 * @fileoverview Create a security plugin for educational reasons
 * @author gkouziik
 */
'use strict'

module.exports = {
  rules: {
    'detect-absence-of-name-option-in-exrpress-session': require('./lib/rules/detect-absence-of-name-option-in-exrpress-session'),
    'detect-buffer-unsafe-allocation': require('./lib/rules/detect-buffer-unsafe-allocation'),
    'detect-child-process': require('./lib/rules/detect-child-process'),
    'detect-crlf': require('./lib/rules/detect-crlf'),
    'detect-dangerous-redirects': require('./lib/rules/detect-dangerous-redirects'),
    'detect-eval-with-expr': require('./lib/rules/detect-eval-with-expr'),
    'detect-html-injection': require('./lib/rules/detect-html-injection'),
    'detect-improper-exception-handling': require('./lib/rules/detect-improper-exception-handling'),
    'detect-insecure-randomness': require('./lib/rules/detect-insecure-randomness'),
    'detect-non-literal-require-calls': require('./lib/rules/detect-non-literal-require-calls'),
    'detect-nosql-injection': require('./lib/rules/detect-nosql-injection'),
    'detect-option-multiplestatements-in-mysql': require('./lib/rules/detect-option-multiplestatements-in-mysql'),
    'detect-option-rejectunauthorized-in-nodejs-httpsrequest': require('./lib/rules/detect-option-rejectunauthorized-in-nodejs-httpsrequest'),
    'detect-option-unsafe-in-serialize-javascript-npm-package': require('./lib/rules/detect-option-unsafe-in-serialize-javascript-npm-package'),
    'detect-possible-timing-attacks': require('./lib/rules/detect-possible-timing-attacks'),
    'detect-runinthiscontext-method-in-nodes-vm': require('./lib/rules/detect-runinthiscontext-method-in-nodes-vm'),
    'detect-security-missconfiguration-cookie': require('./lib/rules/detect-security-missconfiguration-cookie'),
    'detect-sql-injection': require('./lib/rules/detect-sql-injection'),
    'detect-unhandled-event-errors': require('./lib/rules/detect-unhandled-event-errors'),
    'detect-unhandled-async-errors': require('./lib/rules/detect-unhandled-async-errors'),
    'disable-ssl-across-node-server': require('./lib/rules/disable-ssl-across-node-server'),
    'non-literal-reg-expr': require('./lib/rules/non-literal-reg-expr')
  },
  rulesConfig: {
    'detect-absence-of-name-option-in-exrpress-session': 0,
    'detect-buffer-unsafe-allocation': 0,
    'detect-child-process': 0,
    'detect-crlf': 0,
    'detect-dangerous-redirects': 0,
    'detect-eval-with-expr': 0,
    'detect-html-injection': 0,
    'detect-improper-exception-handling': 0,
    'detect-insecure-randomness': 0,
    'detect-non-literal-require-calls': 0,
    'detect-nosql-injection': 0,
    'detect-option-multiplestatements-in-mysql': 0,
    'detect-option-rejectunauthorized-in-nodejs-httpsrequest': 0,
    'detect-option-unsafe-in-serialize-javascript-npm-package': 0,
    'detect-possible-timing-attacks': 0,
    'detect-runinthiscontext-method-in-nodes-vm': 0,
    'detect-security-missconfiguration-cookie': 0,
    'detect-sql-injection': 0,
    'detect-unhandled-async-errors': 0,
    'detect-unhandled-event-errors': 0,
    'disable-ssl-across-node-server': 0,
    'non-literal-reg-expr': 0
  },
  configs: {
    recommended: {
      plugins: [
        'security-node'
      ],
      rules: {
        'security-node/detect-absence-of-name-option-in-exrpress-session': 'warn',
        'security-node/detect-buffer-unsafe-allocation': 'warn',
        'security-node/detect-child-process': 'warn',
        'security-node/detect-crlf': 'warn',
        'security-node/detect-dangerous-redirects': 'warn',
        'security-node/detect-eval-with-expr': 'warn',
        'security-node/detect-html-injection': 'warn',
        'security-node/detect-improper-exception-handling': 'warn',
        'security-node/detect-insecure-randomness': 'warn',
        'security-node/detect-non-literal-require-calls': 'warn',
        'security-node/detect-nosql-injection': 'warn',
        'security-node/detect-option-multiplestatements-in-mysql': 'warn',
        'security-node/detect-option-rejectunauthorized-in-nodejs-httpsrequest': 'warn',
        'security-node/detect-option-unsafe-in-serialize-javascript-npm-package': 'warn',
        'security-node/detect-possible-timing-attacks': 'warn',
        'security-node/detect-runinthiscontext-method-in-nodes-vm': 'warn',
        'security-node/detect-security-missconfiguration-cookie': 'warn',
        'security-node/detect-sql-injection': 'warn',
        'security-node/detect-unhandled-async-errors': 'warn',
        'security-node/detect-unhandled-event-errors': 'warn',
        'security-node/disable-ssl-across-node-server': 'warn',
        'security-node/non-literal-reg-expr': 'warn'
      }
    }
  }
}
