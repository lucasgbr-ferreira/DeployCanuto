FROM node:20-slim

# Dependências necessárias para pacotes nativos
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential python3 make g++ \
  && rm -rf /var/lib/apt/lists/*

# Diretório da aplicação
WORKDIR /usr/src/app

# Copiar apenas package.json e package-lock.json
COPY package*.json ./

# Instalar dependências
RUN npm ci --production

# Copiar TODO o servidor
COPY . .

# Expor porta usada pelo backend
EXPOSE 3000

# Comando de inicialização (CORRIGIDO)
CMD ["node", "/usr/src/app/src/app.js"]
