var cluster = require('cluster');
var sprintf = require('sprintf-js').sprintf;

if (cluster.isMaster) {
  var cpuCount = require('os').cpus().length;
  console.log("Starting server. CPU count: %s", cpuCount);
  for (var i = 0; i < cpuCount; i++) {
    cluster.fork(); // Fork workers; one per CPU
  }
  cluster.on('exit', function(deadWorker, code, signal) {
    var worker = cluster.fork(); // Restart the worker
    var getWorkerOutput = function(w){
      return sprintf("[id: %s] [pid: %s]", w.id, w.process.pid);
    };
    console.log("Worker died: %s [code: %s] [signal: %s]. New worker started: %s.",
      getWorkerOutput(deadWorker), code, signal, getWorkerOutput(worker));
  });
  setInterval(function(){
    var workersKeys = Object.keys(cluster.workers);
    var randomWorker = Math.floor(Math.random() * workersKeys.length);
    cluster.workers[workersKeys[randomWorker]].kill();
  }, 1000); // Kill a random worker every so often to verify the server keeps running
} else {
  require("./server/bootstrap.js")(cluster.worker);
}
