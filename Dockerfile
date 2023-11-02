# Gunakan image Node.js LTS sebagai base image
ARG NODE_VERSION=14
FROM node:${NODE_VERSION}-slim as base

# Set the working directory dalam container
WORKDIR /app

# Salin package.json dan package-lock.json terlebih dahulu
COPY package*.json ./

# Install dependensi dengan npm
RUN npm install

# Salin seluruh kode aplikasi Anda ke dalam container
COPY . .

# Expose port yang akan digunakan oleh aplikasi Express (sesuai dengan konfigurasi aplikasi Anda)
EXPOSE 9000

# Perintah untuk menjalankan aplikasi saat container dijalankan
CMD ["npm", "start"]
