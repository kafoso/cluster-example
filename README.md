# cluster-example
Example usage of the Node.js module 'cluster' with restarting workers and logging.

**Notice**

If the worker id (and pid) doesn't change (i.e. you continuously hit the same worker), it's likely due to the built-in load balancing in `cluster`. For additional information, please see: http://stackoverflow.com/a/19369300

In this example, however, it will change eventually due to the periodic killing of workers.

# Credits

* https://nodejs.org/api/cluster.html
* http://schier.co/blog/2013/01/06/restarting-workers-in-a-nodejs-cluster.html
* http://rowanmanning.com/posts/node-cluster-and-express/
