Cara membuka project NEATS ERP yang sudah ada di GitHub, langkahnya seperti ini.

1. Clone repository

Buka CMD atau PowerShell, lalu masuk ke folder tempat Anda ingin menyimpan project, misalnya:

cd C:\Users\Noedo

Kemudian jalankan:

git clone https://github.com/USERNAME/NAMA-REPOSITORY.git

Ganti USERNAME/NAMA-REPOSITORY dengan URL repository Anda. Cloning akan membuat salinan project ke komputer Anda.

2. Masuk ke folder project

Contoh:

cd neatserp

atau

cd neatsbeam

sesuai nama folder hasil clone.

3. Install dependency
   composer install
   npm install
4. Buat file .env
   copy .env.example .env
5. Generate application key
   php artisan key:generate
6. Atur database

Edit file .env:

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=neatsbeam
DB_USERNAME=root
DB_PASSWORD=

7. Jalankan migration
   php artisan migrate

   Jika ada data awal (seed):

   php artisan db:seed
8. Jalankan aplikasi

   Terminal pertama:

   php artisan serve

   Terminal kedua:

   npm run dev

Lalu buka:

http://127.0.0.1:8000
