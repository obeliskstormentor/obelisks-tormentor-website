# Panduan Ruang Dengar Privat — langkah demi langkah

Semua perintah dijalankan di folder `website/future`.

Buka terminal, lalu:

```bash
cd "C:\Users\AXIOO\Documents\CLAUDE CODE\obelisk-tormentor\website\future"
```

---

## BAGIAN 1 — Persiapan (sekali seumur hidup)

### Langkah 1. Hubungkan ke akun Cloudflare

```bash
npm run cf:login
```

Browser akan terbuka dan meminta izin. Klik **Allow**.

*Kalau berhasil:* terminal menulis `Successfully logged in`.

---

### Langkah 2. Buat tempat penyimpanan lagu

```bash
npx wrangler r2 bucket create obelisk-private-audio
```

Ini membuat "gudang" privat di Cloudflare untuk menyimpan lagu.

*Kalau Cloudflare meminta mengaktifkan R2 dulu:* ikuti tautan yang muncul,
aktifkan R2 di dashboard, lalu ulangi perintahnya. R2 punya kuota gratis yang
jauh lebih dari cukup untuk beberapa lagu.

**Jangan aktifkan public access pada bucket ini.** Seluruh sistem bergantung
pada bucket ini tetap tertutup.

---

### Langkah 3. Buat daftar undangan

```bash
npx wrangler kv namespace create INVITES
```

Ini membuat "buku tamu" tempat menyimpan kode undangan.

Terminal akan mencetak sesuatu seperti:

```
{ "binding": "INVITES", "id": "a1b2c3d4e5f6..." }
```

**Salin deretan `id` itu.** Kita butuh di langkah berikutnya.

---

### Langkah 4. Tempelkan id tersebut

Buka berkas `wrangler.jsonc`. Cari baris:

```jsonc
"id": "REPLACE_WITH_KV_NAMESPACE_ID"
```

Ganti tulisan `REPLACE_WITH_KV_NAMESPACE_ID` dengan id dari Langkah 3.

> Kalau tidak mau mengedit sendiri, kirim saja id-nya ke Claude — biar dia yang
> menempelkan.

---

### Langkah 5. Buat kunci pengaman sesi

```bash
npm run cf:secret
```

Terminal akan meminta sebuah teks rahasia. Ketik saja teks acak yang panjang,
misalnya 40 karakter campuran huruf dan angka. **Tidak perlu diingat** — kunci
ini hanya dipakai mesin untuk menandatangani sesi pendengar.

---

## BAGIAN 2 — Menguji sebelum dipublikasikan

### Langkah 6. Jalankan di komputer sendiri dulu

```bash
npm run build
npm run cf:dev
```

Buka alamat yang tercetak di terminal, lalu tambahkan `/listening` di
belakangnya.

Kamu akan melihat halaman **The Chamber** dengan kolom kode.

Belum ada kode yang aktif, jadi kode apa pun akan ditolak. Itu normal — yang
dites di sini adalah halamannya muncul dan tidak error.

Tekan `Ctrl + C` untuk menghentikannya.

---

## BAGIAN 3 — Memasukkan lagu

### Langkah 7. Perkecil kualitas lagunya

```bash
ffmpeg -i "D:\lagu\master.wav" -c:a libmp3lame -b:a 128k -map_metadata -1 "artifact-ii-01.mp3"
```

Ganti `D:\lagu\master.wav` dengan lokasi file aslimu.

Kenapa dikecilkan: master aslimu tidak pernah naik ke internet. Kalau suatu
hari bocor, yang tersebar hanya versi 128 kbps, bukan kualitas rilis.
`-map_metadata -1` menghapus judul dan nama artis dari dalam file.

---

### Langkah 8. Unggah ke gudang privat

```bash
npx wrangler r2 object put obelisk-private-audio/unreleased/artifact-ii-01.mp3 --file=artifact-ii-01.mp3 --remote
```

Bagian `unreleased/artifact-ii-01.mp3` adalah nama simpanannya. Ingat nama ini
— dipakai saat membuat undangan.

Ulangi untuk tiap lagu, dengan nama berbeda (`-02`, `-03`, dan seterusnya).

---

## BAGIAN 4 — Menerbitkan

### Langkah 9. Naikkan ke internet

```bash
git add -A
git commit -m "Add private listening room"
git push origin main
```

Cloudflare otomatis membangun dan menerbitkan dalam 1–3 menit.

> **Penting:** pastikan Langkah 4 sudah dilakukan sebelum push. Kalau id KV
> masih bertuliskan `REPLACE_WITH_KV_NAMESPACE_ID`, penerbitan akan gagal.
> Situsmu yang sekarang tetap aman dan tidak ikut rusak — versi lama tetap
> tayang sampai versi baru berhasil.

---

## BAGIAN 5 — Mengundang orang

### Langkah 10. Buat kode undangan

```bash
node ..\..\tools\mint_invite.mjs "Nama Orangnya" 14 unreleased/artifact-ii-01.mp3
```

Angka `14` adalah masa berlaku dalam hari.

Script mencetak kode (misalnya `8J9R-KACD`) dan sebuah perintah panjang.
**Belum ada yang tersimpan sampai kamu menjalankan perintah itu.**

---

### Langkah 11. Aktifkan kodenya

Salin dan jalankan perintah `npx wrangler kv key put ...` yang tadi tercetak.

Sekarang kode itu hidup.

---

### Langkah 12. Kirim ke orangnya

Kirim dua hal:

1. Tautan: `https://obelisks-tormentor-website.workers.dev/listening`
2. Kodenya: misalnya `8J9R-KACD`

Sebaiknya lewat dua jalur berbeda — misalnya tautan lewat email, kode lewat
WhatsApp. Kalau satu jalur bocor, isinya belum cukup untuk masuk.

---

## BAGIAN 6 — Mengawasi

### Melihat siapa yang sudah mendengarkan

```bash
npx wrangler kv key get --binding=INVITES --remote "invite:8J9R-KACD"
```

Akan muncul `hits` (berapa kali dibuka) dan `lastSeen` (kapan terakhir).

### Mencabut akses seseorang

```bash
npx wrangler kv key delete --binding=INVITES --remote "invite:8J9R-KACD"
```

Berlaku seketika.

### Mengusir semua orang sekaligus

Jalankan ulang Langkah 5 dengan teks rahasia yang baru. Semua sesi yang sedang
berjalan langsung putus.

---

## Yang perlu diingat

Sistem ini **tidak bisa** mencegah orang merekam suara dari speaker atau
layarnya sendiri. Tidak ada sistem mana pun yang bisa.

Yang dia lakukan: menjauhkan berkas dari internet terbuka dan mesin pencari,
dan membuat setiap kebocoran bisa ditelusuri ke **satu kode undangan**.

Karena itu jangan pernah memakai satu kode untuk banyak orang — kebocoran jadi
tidak bisa dilacak. Satu orang, satu kode.
