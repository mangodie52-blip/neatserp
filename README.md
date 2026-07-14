CARA INSTALL PROJECT NEATS DI PC ATAU LAPTOP


1. Install kebutuhan dulu di PC baru

Pastikan ada:

✅ PHP 8.2
✅ Composer
✅ Node.js + npm
✅ MySQL (atau XAMPP)
✅ Git

Cek di command Promp:

php -v
composer -V
node -v
npm -v
git --version

2. Clone project dari GitHub

Buka Git Bash (MinGW64):
Masuk ke folder kerja:
cd C:/Users/NAMA
Clone:
git clone https://github.com/mangodie52-blip/neatserp.git
Masuk folder:
cd neatserp

3. Install library Laravel
Jalankan:
composer install

Ini akan membuat folder:
vendor/

4. Install library React
Jalankan:
npm install
Ini membuat:
node_modules/

5. Buat file .env

Karena .env tidak masuk GitHub (dan memang harus begitu), buat dari contoh:
cp .env.example .env
Windows Git Bash juga bisa.

6. Atur database

Buat database baru di MySQL/phpMyAdmin:
Contoh:

neatserp

Lalu edit:

.env
Bagian ini:

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=neatserp
DB_USERNAME=root
DB_PASSWORD=

Sesuaikan password MySQL PC tersebut.

7. Generate key Laravel
php artisan key:generate

8. Buat tabel database

Karena kita pakai migration:
php artisan migrate
Nanti tabel:
users
materials
products
boms
dll
otomatis muncul.

9. Jalankan aplikasi

Terminal 1:
php artisan serve
Hasil:
http://127.0.0.1:8000

Terminal 2:
npm run dev

10. Login
Buka:
http://127.0.0.1:8000
