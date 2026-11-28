# Penggunaan

Contoh yang dapat dipasang untuk membuat ekstensi Cognis dengan data dan antarmuka sendiri.

## Prasyarat

Administrator harus memasang dan mengaktifkan modul. Masuk sebelum membuka halaman contoh.

## Contoh

Buka /showcase, masukkan label item, lalu kirim formulir. Buka kembali daftar untuk melihat item tersimpan.

- Buka `/showcase` setelah modul diaktifkan untuk memakai UI page composer yang dilokalkan.
- Jalankan `cognisctl modules:module-template:list` untuk memakai API terautentikasi yang sama melalui CLI.
- Gunakan `module-template:listItems` melalui `ctx`, bukan dengan mengimpor internal modul.
- Perluas alur `module-template:listItems` melalui tahap bernama yang dapat dilepas.
- Nonaktifkan lalu aktifkan kembali modul untuk memverifikasi registrasi tercakup dapat diulang.

## Hasil yang Diharapkan

Item tampil dalam daftar modul; perintah terautentikasi dan tampilan peramban membaca item tersimpan yang sama.

## Pemecahan Masalah

Jika halaman contoh tidak tersedia, minta administrator memeriksa aktivasi modul serta layanan basis data dan autentikasi yang dibutuhkan.
