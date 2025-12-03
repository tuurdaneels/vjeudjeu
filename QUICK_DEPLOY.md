# Quick Deploy Guide - Bestaande Droplet met PM2

## Snelle Setup (5 minuten)

### Stap 1: Maak directory op je Droplet
```bash
ssh root@jouw-droplet-ip
mkdir -p /var/www/vjeudjeu
```

### Stap 2: Build en upload lokaal
```bash
# Op je lokale machine
cd vjeudjeu-clone-project
npm run build
scp -r dist/* root@jouw-droplet-ip:/var/www/vjeudjeu/
```

### Stap 3: Setup Nginx (Aanbevolen - geen PM2 nodig)
```bash
# Op je Droplet
sudo nano /etc/nginx/sites-available/vjeudjeu
```

Plak deze config (pas domain aan):
```nginx
server {
    listen 80;
    server_name vjeudjeu.be www.vjeudjeu.be;
    root /var/www/vjeudjeu;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(jpg|jpeg|png|gif|ico|css|js|mp4|webm|woff|woff2|ttf|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

Activeer:
```bash
sudo ln -s /etc/nginx/sites-available/vjeudjeu /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### Stap 4: SSL (optioneel maar aanbevolen)
```bash
sudo certbot --nginx -d vjeudjeu.be -d www.vjeudjeu.be
```

---

## Als je toch PM2 wilt gebruiken:

### Stap 1: Installeer serve
```bash
ssh root@jouw-droplet-ip
npm install -g serve
```

### Stap 2: Upload ecosystem.config.js
```bash
# Op je lokale machine
scp ecosystem.config.js root@jouw-droplet-ip:/var/www/vjeudjeu/
```

### Stap 3: Start met PM2
```bash
# Op je Droplet
cd /var/www/vjeudjeu
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### Stap 4: Nginx als reverse proxy
```bash
sudo nano /etc/nginx/sites-available/vjeudjeu
```

```nginx
server {
    listen 80;
    server_name vjeudjeu.be www.vjeudjeu.be;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

---

## Updates uitvoeren

Gebruik het deploy script:
```bash
# Pas DROPLET_IP aan in deploy.sh
chmod +x deploy.sh
./deploy.sh
```

Of handmatig:
```bash
npm run build
scp -r dist/* root@jouw-droplet-ip:/var/www/vjeudjeu/
ssh root@jouw-droplet-ip "sudo systemctl reload nginx"
```

---

## Belangrijk voor React Router

Zorg dat je Nginx config deze regel heeft:
```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

Dit zorgt ervoor dat client-side routing werkt!

