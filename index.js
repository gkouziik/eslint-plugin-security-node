/**
 * @fileoverview Create a security plugin for educational reasons
 * @author gkouziik
 */
'use strict'

module.exports = {
  rules: {
    'detect-absence-of-name-option-in-exrpress-session': require('./rules/detect-absence-of-name-option-in-exrpress-session'),
    'detect-buffer-unsafe-allocation': require('./rules/detect-buffer-unsafe-allocation'),
    'detect-child-process': require('./rules/detect-child-process'),
    'detect-crlf': require('./rules/detect-crlf'),
    'detect-dangerous-redirects': require('./rules/detect-dangerous-redirects'),
    'detect-eval-with-expr': require('./rules/detect-eval-with-expr'),
    'detect-helmet-without-nocache': require('./rules/detect-helmet-without-nocache'),
    'detect-html-injection': require('./rules/detect-html-injection'),
    'detect-insecure-randomness': require('./rules/detect-insecure-randomness'),
    'detect-non-literal-require-calls': require('./rules/detect-non-literal-require-calls'),
    'detect-nosql-injection': require('./rules/detect-nosql-injection'),
    'detect-option-multiplestatements-in-mysql': require('./rules/detect-option-multiplestatements-in-mysql'),
    'detect-option-rejectunauthorized-in-nodejs-httpsrequest': require('./rules/detect-option-rejectunauthorized-in-nodejs-httpsrequest'),
    'detect-option-unsafe-in-serialize-javascript-npm-package': require('./rules/detect-option-unsafe-in-serialize-javascript-npm-package'),
    'detect-possible-timing-attacks': require('./rules/detect-possible-timing-attacks'),
    'detect-runinthiscontext-method-in-nodes-vm': require('./rules/detect-runinthiscontext-method-in-nodes-vm'),
    'detect-security-missconfiguration-cookie': require('./rules/detect-security-missconfiguration-cookie'),
    'detect-sql-injection': require('./rules/detect-sql-injection'),
    'disable-ssl-across-node-server': require('./rules/disable-ssl-across-node-server'),
    'non-literal-reg-expr': require('./rules/non-literal-reg-expr')
  },
  rulesConfig: {
    'detect-absence-of-name-option-in-exrpress-session': 0,
    'detect-buffer-unsafe-allocation': 0,
    'detect-child-process': 0,
    'detect-crlf': 0,
    'detect-dangerous-redirects': 0,
    'detect-eval-with-expr': 0,
    'detect-helmet-without-nocache': 0,
    'detect-html-injection': 0,
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
        'security-node/detect-helmet-without-nocache': 'warn',
        'security-node/detect-html-injection': 'warn',
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
        'security-node/disable-ssl-across-node-server': 'warn',
        'security-node/non-literal-reg-expr': 'warn'
      }
    }
  }
}
