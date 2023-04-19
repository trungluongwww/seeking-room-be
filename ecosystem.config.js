module.exports = {
  apps: [
    {
      name: "API", // application name
      script: "npx ts-node index.ts", // script path to pm2 start
      instances: 1, // number process of application
      watch: ".",
      watch_delay: 1000,
      ignore_watch: ["node_modules", "external_node/node_modules"],
      max_memory_restart: "3G", // restart if it exceeds the amount of memory specified
    },
  ],
};