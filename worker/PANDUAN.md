# Panduan Ruang Dengar Privat

Halaman: `/listen/album-ii` — tidak tertaut dari mana pun di situs.

**Aturan yang jadi alasan seluruh sistem ini ada: lagu belum rilis tidak pernah
masuk folder `public/`.** Semua isi `public/` disalin ke `dist/` dan disajikan ke
siapa saja yang tahu URL-nya, tertaut atau tidak. Lagu privat disimpan di KV dan
hanya sampai ke browser lewat Worker, setelah kode diperiksa.

Semua perintah dijalankan di folder `website/future`. Setiap perintah di bawah
sudah menyertakan `cd`, jadi aman dijalankan dari terminal mana pun.

---

## BAGIAN 1 — Persiapan (sekali seumur hidup)

### Langkah 1. Hubungkan ke akun Cloudflare

```bash
cd "C:\Users\AXIOO\Documents\CLAUDE CODE\obelisk-tormentor\website\future" && npx wrangler login
```

Browser terbuka, klik **Allow**.

### Langkah 2. Buat penyimpanan

```bash
cd "C:\Users\AXIOO\Documents\CLAUDE CODE\obelisk-tormentor\website\future" && npx wrangler kv namespace create INVITES
```

Terminal mencetak sebuah `id`. Tempelkan ke `wrangler.jsonc`, menggantikan nilai
`id` yang ada di blok `kv_namespaces`.

> Terminal sering memotong id karena lebar layar. Kalau ragu, jalankan
> `npx wrangler kv namespace list` untuk melihatnya utuh.

Satu namespace ini menyimpan dua hal: daftar undangan, dan lagunya sendiri
(dengan awalan `audio:`).

### Langkah 3. Buat kunci pengaman sesi

```bash
cd "C:\Users\AXIOO\Documents\CLAUDE CODE\obelisk-tormentor\website\future" && npx wrangler secret put SESSION_SECRET
```

Ketik teks acak panjang saat diminta, lalu Enter. **Tidak perlu diingat** — hanya
dipakai mesin untuk menandatangani sesi pendengar.

---

## BAGIAN 2 — Memasukkan lagu

### Langkah 4. Perkecil kualitasnya

```bash
ffmpeg -i "D:\lagu\master.wav" -c:a libmp3lame -b:a 128k -map_metadata -1 "new-fragment.mp3"
```

Master aslimu tidak pernah naik ke internet. Kalau suatu hari bocor, yang
tersebar hanya versi 128 kbps. `-map_metadata -1` menghapus judul dan nama
artis dari dalam berkas.

**Judul yang tampil di halaman diambil dari nama berkas ini.** `new-fragment.mp3`
akan tampil sebagai **NEW FRAGMENT**.

Batas satu berkas di KV adalah 25 MB — lagu 128 kbps selama 10 menit pun masih
jauh di bawahnya.

### Langkah 5. Unggah

```bash
cd "C:\Users\AXIOO\Documents\CLAUDE CODE\obelisk-tormentor\website\future" && npx wrangler kv key put --binding=INVITES --remote "audio:unreleased/new-fragment.mp3" --path=".cache/private-audio/new-fragment.mp3"
```

Bagian `unreleased/new-fragment.mp3` adalah nama simpanannya — ingat ini, dipakai
saat membuat undangan. Awalan `audio:` wajib.

---

## BAGIAN 3 — Menerbitkan

```bash
cd "C:\Users\AXIOO\Documents\CLAUDE CODE\obelisk-tormentor\website\future" && git add -A && git commit -m "Enable listening room" && git push origin main
```

Cloudflare membangun dan menerbitkan dalam 1–3 menit.

---

## BAGIAN 4 — Mengundang

### Langkah 6. Buat kode

```bash
cd "C:\Users\AXIOO\Documents\CLAUDE CODE\obelisk-tormentor" && node tools/mint_invite.mjs "Nama Orangnya" 14 unreleased/new-fragment.mp3
```

Angka `14` adalah masa berlaku dalam hari. Script mencetak sebuah tautan siap
kirim dan satu perintah aktivasi. **Belum ada yang tersimpan** sampai kamu
menjalankan perintah aktivasi itu.

### Langkah 7. Aktifkan, lalu kirim

Jalankan perintah `npx wrangler kv key put ...` yang tadi tercetak, lalu kirim
tautannya:

```
https://obelisks-tormentor-website.workers.dev/listen/album-ii?k=XXXX-XXXX
```

Penerima cukup klik — tidak ada yang perlu diketik. Kodenya langsung dihapus
dari address bar begitu halaman terbuka.

---

## BAGIAN 5 — Mengawasi

```bash
# siapa yang sudah mendengarkan, berapa kali, kapan terakhir
npx wrangler kv key get --binding=INVITES --remote "invite:XXXX-XXXX"

# cabut akses seseorang, berlaku seketika
npx wrangler kv key delete --binding=INVITES --remote "invite:XXXX-XXXX"
```

Untuk mengusir semua orang sekaligus, jalankan ulang Langkah 3 dengan teks
rahasia baru — semua sesi yang sedang berjalan langsung putus.

---

## Menguji tanpa menerbitkan

```bash
cd "C:\Users\AXIOO\Documents\CLAUDE CODE\obelisk-tormentor\website\future" && npm run test:worker
```

Menjalankan 32 pemeriksaan terhadap Worker: kode salah, kode kedaluwarsa, audio
tanpa sesi, cookie palsu, lagu yang bukan jatahnya, potongan range, serangan
tebak kode, dan situs publik tetap hidup saat binding belum ada.

---

## Kalau suatu hari ingin pakai R2

R2 lebih baik untuk berkas besar, tapi mengaktifkannya menuntut metode
pembayaran terdaftar walau kuotanya gratis. Kalau nanti diaktifkan, cukup buka
blok `r2_buckets` di `wrangler.jsonc`. Worker otomatis memilih R2, dan lagu yang
sudah terlanjur di KV tetap jalan.

---

## Yang perlu diingat

Sistem ini **tidak bisa** mencegah orang merekam suara dari speaker atau
layarnya sendiri. Tidak ada sistem mana pun yang bisa.

Yang dia lakukan: menjauhkan berkas dari internet terbuka dan mesin pencari, dan
membuat setiap kebocoran bisa ditelusuri ke **satu kode undangan**.

Karena itu jangan pernah memakai satu kode untuk banyak orang — kebocoran jadi
tidak bisa dilacak. Satu orang, satu kode.
