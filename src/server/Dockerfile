FROM node:20-slim

# Define diretório base da aplicação no container
WORKDIR /usr/src/app

# Copia package.json e package-lock.json da pasta server
COPY package*.json ./

# Instala apenas dependências de produção
RUN npm install --production

# Copia TODOS os arquivos do servidor dentro do contexto do build
COPY . .

# Expõe porta do servidor
EXPOSE 3000

# Executa o app.js no caminho correto
CMD ["node", "src/server/src/app.js"]
