/* eslint-disable no-continue,no-restricted-syntax,no-unused-expressions */
require('./bootstrap');

const yargs = require('yargs');
const { validateArgv } = require('../validators/argv_validator');
const { handleSyncEvent } = require('../handlers/event_handler');

yargs
  .command({
    command: 'sync',
    desc: 'Pulls data from the given source and sends it to the SQS.',
    builder: (yargsBuilder) => yargsBuilder,
    handler: (argv) => {
      handleSyncEvent(argv);
    }
  })
  .option('source', {
    alias: 's',
    demandOption: true,
    describe: 'Source value'
  })
  .option('type', {
    alias: 't',
    demandOption: true,
    describe: 'Type value'
  })
  .check(validateArgv)
  .demandCommand()
  .help()
  .argv;
