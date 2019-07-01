const cluster = require('cluster');
const os = require('os');
const createLogger = require('./lib/create-logger');
const runServer = require('./app');

const logger = createLogger(
  'master', [
    {
      level: 'info',
      stream: process.stdout
    },
    {
      level: 'error',
      path: `/var/tmp/runtime-error.log`
    }
  ]
);

if (cluster.isMaster) {
  const cpuCount = os.cpus().length;
  for (let j = 0; j < cpuCount.length; j++) {
    cluster.fork();
  }

  cluster.on('exit', worker => {
    logger.info('Worker %s died', worker.id);
    logger.info('Starting a new worker...');
    cluster.fork();
  });
} else {
  runServer();
}
