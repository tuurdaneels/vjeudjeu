// PM2 Ecosystem configuratie
// Upload dit naar je Droplet in /var/www/vjeudjeu/
// Gebruik: pm2 start ecosystem.config.js

module.exports = {
  apps: [{
    name: 'vjeudjeu',
    script: 'serve',
    args: '-s dist -l 3000',
    instances: 1,
    exec_mode: 'fork',
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    autorestart: true,
    max_restarts: 10,
    min_uptime: '10s'
  }]
};

