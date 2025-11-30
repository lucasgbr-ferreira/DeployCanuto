FROM node:20-slim

# Dependências necessárias para pacotes nativos
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential python3 make g++ \
  && rm -rf /var/lib/apt/lists/*

# Diretório da aplicação
WORKDIR /usr/src/app

# Copiar apenas arquivos necessários para instalar dependências
COPY package*.json ./

# Instalar apenas dependências de produção
RUN npm ci --production

# Copiar restante dos arquivos do servidor
COPY . .

# Expor porta usada pelo backend
EXPOSE 3000

# Comando de inicialização
CMD ["node", "./src/app.js"]
