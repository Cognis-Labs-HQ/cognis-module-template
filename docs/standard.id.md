# Templat Modul Eksternal Cognis

Templat modul eksternal Cognis adalah implementasi referensi yang dapat dipasang untuk kontrak API, UI, CLI, persistensi, kapabilitas, alur, lokalisasi, pengujian, dan pengemasan.

## Contoh Penggunaan

- Buka `/showcase` setelah mengaktifkan modul untuk menggunakan antarmuka browser yang dilokalkan.
- Jalankan `cognisctl module-template:list` untuk menggunakan API terautentikasi yang sama melalui CLI.
- Gunakan `showcase:listItems` melalui `ctx` untuk mencantumkan item tanpa mengimpor internal modul.
- Perluas alur `showcase-items` untuk memperkaya hasil melalui tahap integrasi bernama yang dapat dihapus.

## Spesifikasi Teknis

Templat ini menunjukkan batasan yang harus dipertahankan oleh setiap modul eksternal Cognis mandiri.

### Kontrak Integrasi

- `bootstrap.js` adalah satu-satunya entrypoint integrasi platform.
- `ctx` menyediakan rute, registrasi UI, kapabilitas, alur, autentikasi, pencatatan, dan akses persistensi.
- Impor runtime tetap relatif terhadap repositori dan tidak pernah mengakses internal Cognis atau komponen lain.
- Registrasi tercakup harus dapat dihapus saat modul dinonaktifkan atau dicopot.

### Keamanan

- Rute API melakukan autentikasi dan otorisasi sebelum menjalankan logika bisnis.
- Data permintaan dibatasi, divalidasi, dan dinormalisasi pada batas HTTP.
- Kesalahan publik tidak mengungkapkan detail implementasi internal.
- Kegagalan dicatat dengan metadata terstruktur yang aman.

### Proses Rilis

- Selaraskan versi `manifest.json`, `package.json`, dan `package-lock.json`, serta pertahankan UUID modul.
- Jalankan `npm install`, `npm test`, `npm run lint`, `npm run manifest:hashes`, `npm run check:manifest`, dan `git diff --check` sebelum melakukan commit rilis.
- Buat ulang `manifest.files` setelah perubahan terakhir pada berkas distribusi agar setiap jalur relatif repositori dan hash SHA-256 tetap dapat diverifikasi.
