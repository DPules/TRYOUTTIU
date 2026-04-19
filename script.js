const API_URL =
  "https://script.google.com/macros/s/AKfycbzVpFAXVJcwi3oWvYYAE2wMHommRKpCXjI9WHykSKc_qInY2_8SGSE1jUlZymwocUkC6g/exec";
const perHalaman = 1;
let waktu = 3600;

let halaman = 0;
let timer;
let waktuHabis = false;
let sudahSubmit = false;
let jawaban = {};

const soal = [
  // 🔵 SOAL TIU (20 SOAL)

  {
    t: "Sinonim dari kata 'Integritas' adalah…",
    p: ["Kejujuran", "Keberanian", "Kepintaran", "Kekuatan"],
    j: 0,
    e: "Integritas berkaitan dengan kejujuran dan konsistensi nilai.",
    lvl: "easy",
  },
  {
    t: "Antonim dari kata 'Optimis' adalah…",
    p: ["Pesimis", "Semangat", "Yakin", "Percaya"],
    j: 0,
    e: "Optimis berlawanan dengan pesimis.",
    lvl: "easy",
  },
  {
    t: "Jika 3x + 6 = 18, maka nilai x adalah…",
    p: ["2", "3", "4", "6"],
    j: 2,
    e: "3x = 12 → x = 4.",
    lvl: "easy",
  },
  {
    t: "Deret angka: 2, 4, 8, 16, …",
    p: ["18", "24", "32", "30"],
    j: 2,
    e: "Pola ×2 → 32.",
    lvl: "easy",
  },
  {
    t: "Semua anggota tim disiplin. Andi adalah anggota tim. Maka…",
    p: [
      "Andi tidak disiplin",
      "Andi mungkin disiplin",
      "Andi pasti disiplin",
      "Tidak bisa disimpulkan",
    ],
    j: 2,
    e: "Silogisme: semua anggota disiplin → Andi disiplin.",
    lvl: "medium",
  },
  {
    t: "Jika hari ini Senin, maka 10 hari lagi adalah…",
    p: ["Rabu", "Kamis", "Jumat", "Sabtu"],
    j: 0,
    e: "10 mod 7 = 3 → Senin + 3 = Rabu.",
    lvl: "medium",
  },
  {
    t: "Analogi: Buku : Membaca = Pisau : …",
    p: ["Menulis", "Memotong", "Makan", "Menggambar"],
    j: 1,
    e: "Pisau digunakan untuk memotong.",
    lvl: "easy",
  },
  {
    t: "Jika 5 orang menyelesaikan pekerjaan dalam 10 hari, maka 10 orang dalam…",
    p: ["5 hari", "10 hari", "20 hari", "2 hari"],
    j: 0,
    e: "Berbanding terbalik → 5 hari.",
    lvl: "medium",
  },
  {
    t: "Deret angka: 3, 6, 11, 18, …",
    p: ["25", "27", "29", "30"],
    j: 1,
    e: "Pola +3, +5, +7 → +9 = 27.",
    lvl: "medium",
  },
  {
    t: "Sinonim dari kata 'Efisien' adalah…",
    p: ["Cepat", "Tepat guna", "Kuat", "Besar"],
    j: 1,
    e: "Efisien berarti tepat guna.",
    lvl: "medium",
  },
  {
    t: "Jika semua A adalah B dan sebagian B adalah C, maka…",
    p: [
      "Semua A adalah C",
      "Sebagian A adalah C",
      "Tidak dapat disimpulkan",
      "Semua C adalah A",
    ],
    j: 2,
    e: "Tidak cukup informasi hubungan A dan C.",
    lvl: "hard",
  },
  {
    t: "Jika 2x = 8 dan y = x + 3, maka nilai y adalah…",
    p: ["5", "6", "7", "8"],
    j: 2,
    e: "x = 4 → y = 7.",
    lvl: "easy",
  },
  {
    t: "Semua siswa rajin belajar. Budi tidak rajin belajar. Maka…",
    p: [
      "Budi siswa",
      "Budi bukan siswa",
      "Budi rajin",
      "Tidak dapat disimpulkan",
    ],
    j: 1,
    e: "Jika tidak rajin → bukan siswa.",
    lvl: "medium",
  },
  {
    t: "Deret: 1, 1, 2, 3, 5, …",
    p: ["6", "7", "8", "9"],
    j: 2,
    e: "Fibonacci → 8.",
    lvl: "medium",
  },
  {
    t: "Antonim dari 'Kompleks' adalah…",
    p: ["Rumit", "Sederhana", "Sulit", "Besar"],
    j: 1,
    e: "Kompleks berlawanan dengan sederhana.",
    lvl: "easy",
  },
  {
    t: "Jika harga 1 buku Rp5.000, maka harga 12 buku adalah…",
    p: ["50.000", "60.000", "65.000", "70.000"],
    j: 1,
    e: "12 × 5.000 = 60.000.",
    lvl: "easy",
  },
  {
    t: "Semua P adalah Q. Semua Q adalah R. Maka…",
    p: [
      "Semua P adalah R",
      "Sebagian P adalah R",
      "Tidak ada hubungan",
      "Semua R adalah P",
    ],
    j: 0,
    e: "P ⊂ Q ⊂ R → semua P adalah R.",
    lvl: "medium",
  },
  {
    t: "Deret angka: 7, 14, 28, 56, …",
    p: ["84", "96", "112", "120"],
    j: 2,
    e: "Pola ×2 → 112.",
    lvl: "easy",
  },
  {
    t: "Jika A lebih tinggi dari B dan B lebih tinggi dari C, maka…",
    p: [
      "C lebih tinggi dari A",
      "A lebih tinggi dari C",
      "B paling tinggi",
      "Tidak bisa ditentukan",
    ],
    j: 1,
    e: "A > B > C.",
    lvl: "easy",
  },
  {
    t: "Harga buku Rp20.000 diskon 25%, harga setelah diskon adalah…",
    p: ["10.000", "12.000", "15.000", "18.000"],
    j: 2,
    e: "Diskon 5.000 → 15.000.",
    lvl: "medium",
  },
  {
    t: "Jika 1/2 + 1/4 = …",
    p: ["1/6", "2/6", "3/4", "4/6"],
    j: 2,
    e: "2/4 + 1/4 = 3/4.",
    lvl: "easy",
  },
  {
    t: "3, 9, 27, 81, …",
    p: ["162", "243", "256", "300"],
    j: 1,
    e: "Pola ×3 → 243.",
    lvl: "easy",
  },
  {
    t: "Jika x = 4, maka 2x² = …",
    p: ["16", "24", "32", "36"],
    j: 2,
    e: "2 × 16 = 32.",
    lvl: "easy",
  },
  {
    t: "Sebuah persegi dengan sisi 8 cm memiliki luas…",
    p: ["16", "32", "64", "128"],
    j: 2,
    e: "8² = 64.",
    lvl: "easy",
  },
  {
    t: "Jika 7 orang makan 7 roti dalam 7 menit, maka 1 orang makan 1 roti dalam…",
    p: ["1 menit", "7 menit", "49 menit", "14 menit"],
    j: 1,
    e: "Tetap 7 menit.",
    lvl: "medium",
  },
  {
    t: "2, 5, 10, 17, …",
    p: ["24", "26", "28", "30"],
    j: 1,
    e: "Pola +3, +5, +7 → +9 = 26.",
    lvl: "medium",
  },
  {
    t: "Jika 15% dari 200 adalah…",
    p: ["20", "25", "30", "35"],
    j: 2,
    e: "0.15 × 200 = 30.",
    lvl: "easy",
  },
  {
    t: "Jika x + 3 = 10, maka x² = …",
    p: ["36", "49", "64", "81"],
    j: 1,
    e: "x = 7 → 49.",
    lvl: "medium",
  },
  {
    t: "Jika 4 jam = 240 menit, maka 2,5 jam = …",
    p: ["120", "130", "150", "180"],
    j: 2,
    e: "2.5 × 60 = 150.",
    lvl: "easy",
  },
  {
    t: "3² + 4² = …",
    p: ["12", "16", "25", "49"],
    j: 2,
    e: "9 + 16 = 25.",
    lvl: "easy",
  },
  {
    t: "Jika 1 lusin = 12, maka 3 lusin = …",
    p: ["24", "30", "36", "48"],
    j: 2,
    e: "3 × 12 = 36.",
    lvl: "easy",
  },
  {
    t: "Jika 4x - 8 = 16, maka nilai x adalah…",
    p: ["4", "5", "6", "7"],
    j: 2,
    e: "4x = 24 → x = 6.",
    lvl: "easy",
  },
  {
    t: "Deret angka: 1, 4, 9, 16, …",
    p: ["20", "24", "25", "30"],
    j: 2,
    e: "Pola kuadrat → 5² = 25.",
    lvl: "easy",
  },
  {
    t: "Jika 8 orang menyelesaikan pekerjaan dalam 6 hari, maka 4 orang menyelesaikan dalam…",
    p: ["8 hari", "10 hari", "12 hari", "14 hari"],
    j: 2,
    e: "Berbanding terbalik → 12 hari.",
    lvl: "medium",
  },
  {
    t: "Antonim dari kata 'Transparan' adalah…",
    p: ["Jelas", "Terbuka", "Tertutup", "Nyata"],
    j: 2,
    e: "Transparan berlawanan dengan tertutup.",
    lvl: "easy",
  },
  {
    t: "Jika 3/5 dari suatu bilangan adalah 30, maka bilangan tersebut adalah…",
    p: ["40", "45", "50", "60"],
    j: 2,
    e: "x × 3/5 = 30 → x = 50.",
    lvl: "medium",
  },
  {
    t: "Deret angka: 10, 8, 6, 4, …",
    p: ["3", "2", "1", "0"],
    j: 1,
    e: "Pola -2 → 2.",
    lvl: "easy",
  },
  {
    t: "Jika semua bunga harum dan mawar adalah bunga, maka…",
    p: [
      "Mawar tidak harum",
      "Mawar harum",
      "Sebagian mawar harum",
      "Tidak dapat disimpulkan",
    ],
    j: 1,
    e: "Silogisme: mawar termasuk bunga → harum.",
    lvl: "easy",
  },
  {
    t: "5! (faktorial) bernilai…",
    p: ["60", "100", "120", "150"],
    j: 2,
    e: "5! = 5×4×3×2×1 = 120.",
    lvl: "medium",
  },
  {
    t: "Jika harga naik 10% dari Rp100.000, maka harga baru adalah…",
    p: ["105.000", "110.000", "115.000", "120.000"],
    j: 1,
    e: "10% dari 100.000 = 10.000 → 110.000.",
    lvl: "easy",
  },
  {
    t: "Deret angka: 2, 6, 7, 21, 22, …",
    p: ["44", "66", "23", "11"],
    j: 1,
    e: "Pola ×3, +1 → 66.",
    lvl: "hard",
  },
  {
    t: "Jika x² = 49, maka nilai x adalah…",
    p: ["7", "±7", "14", "−7"],
    j: 1,
    e: "Akar dari 49 adalah ±7.",
    lvl: "medium",
  },
  {
    t: "Semua dokter pintar. Sebagian orang pintar kaya. Maka…",
    p: [
      "Semua dokter kaya",
      "Sebagian dokter kaya",
      "Dokter tidak kaya",
      "Tidak dapat disimpulkan",
    ],
    j: 3,
    e: "Tidak cukup informasi hubungan dokter dan kaya.",
    lvl: "hard",
  },
  {
    t: "Jika 9x = 3^(x+1), maka nilai x adalah…",
    p: ["1", "2", "3", "4"],
    j: 1,
    e: "9x = 3²x → 3²x = 3^(x+1) → x = 2.",
    lvl: "hard",
  },
  {
    t: "Rata-rata dari 4, 6, 8, 10 adalah…",
    p: ["6", "7", "8", "9"],
    j: 1,
    e: "(4+6+8+10)/4 = 7.",
    lvl: "easy",
  },
  {
    t: "Jika sebuah lingkaran memiliki jari-jari 7 cm, maka diameternya adalah…",
    p: ["7", "10", "14", "21"],
    j: 2,
    e: "Diameter = 2 × r = 14.",
    lvl: "easy",
  },
  {
    t: "Deret huruf: A, C, F, J, …",
    p: ["M", "N", "O", "P"],
    j: 2,
    e: "Pola +2, +3, +4 → +5 = O.",
    lvl: "hard",
  },
  {
    t: "Jika 6 orang dapat membuat 12 meja dalam 4 hari, maka 3 orang membuat 6 meja dalam…",
    p: ["2 hari", "4 hari", "6 hari", "8 hari"],
    j: 1,
    e: "Perbandingan setara → tetap 4 hari.",
    lvl: "hard",
  },
  {
    t: "Antonim dari kata 'Abstrak' adalah…",
    p: ["Nyata", "Samar", "Kabur", "Halus"],
    j: 0,
    e: "Abstrak berlawanan dengan nyata.",
    lvl: "medium",
  },
  {
    t: "Jika 25% dari suatu angka adalah 50, maka angka tersebut adalah…",
    p: ["100", "150", "200", "250"],
    j: 2,
    e: "x × 0.25 = 50 → x = 200.",
    lvl: "easy",
  },
];

function mulaiUjian() {
  if (!nama.value || !sekolah.value || !daerah.value)
    return alert("Lengkapi data!");

  localStorage.setItem("nama", nama.value);
  localStorage.setItem("gender", gender.value);
  localStorage.setItem("sekolah", sekolah.value);
  localStorage.setItem("tinggibadan", tinggibadan.value);
  localStorage.setItem("beratbadan", beratbadan.value);
  localStorage.setItem("daerah", daerah.value);

  document.querySelector(".info").classList.add("hidden");
  document.querySelector(".timer").classList.remove("hidden");
  document.querySelector(".progress-box").classList.remove("hidden");
  navSoal.classList.remove("hidden");
  quizForm.classList.remove("hidden");

  mulaiTimer();
  tampilkan();
}

function mulaiTimer() {
  timer = setInterval(() => {
    waktu--;
    time.textContent = `${Math.floor(waktu / 60)}:${String(waktu % 60).padStart(2, "0")}`;
    if (waktu <= 0) {
      waktuHabis = true;
      clearInterval(timer);
      alert("Waktu habis, jawaban dikirim otomatis.");
      kirim();
    }
  }, 1000);
}

function tampilkan() {
  window.scrollTo(0, 0);
  soalContainer.innerHTML = "";
  const start = halaman * perHalaman;

  soal.slice(start, start + perHalaman).forEach((x, i) => {
    const idx = start + i;
    soalContainer.innerHTML += `
    <div class="question">
      <p>${idx + 1}. ${x.t}</p>
      ${x.p
        .map(
          (a, j) => `
        <label>
          <input type="radio" name="q${idx}" value="${j}"
            ${jawaban[idx] === j ? "checked" : ""}>
          ${a}
        </label>`,
        )
        .join("")}
    </div>`;
  });

  nextBtn.textContent =
    start + perHalaman >= soal.length ? "Selesai" : "Berikutnya ➡";

  autoSave();
  updateProgress();
  buatNavigasi();
}

function autoSave() {
  document.querySelectorAll("input[type=radio]").forEach((r) => {
    r.onchange = () => (jawaban[+r.name.replace("q", "")] = +r.value);
  });
}

function berikutnya() {
  if ((halaman + 1) * perHalaman >= soal.length) kirim();
  else {
    halaman++;
    tampilkan();
  }
}

function sebelumnya() {
  if (halaman > 0) {
    halaman--;
    tampilkan();
  }
}

function semuaTerjawab() {
  for (let i = 0; i < soal.length; i++) if (jawaban[i] === undefined) return i;
  return -1;
}

function kirim() {
  if (sudahSubmit) return;

  if (!waktuHabis) {
    const kosong = semuaTerjawab();
    if (kosong !== -1) {
      alert(`Soal ${kosong + 1} belum dijawab`);
      halaman = Math.floor(kosong / perHalaman);
      tampilkan();
      return;
    }

    if (!confirm("Yakin ingin mengakhiri ujian dan mengirim jawaban?")) return;
  }

  sudahSubmit = true;
  clearInterval(timer);
  nextBtn.disabled = true;
  nextBtn.textContent = "Mengirim...";

  let benar = 0;
  soal.forEach((s, i) => jawaban[i] === s.j && benar++);
  const nilai = Math.round((benar / soal.length) * 100);

  localStorage.setItem("nilai", nilai);
  localStorage.setItem("jawabanUser", JSON.stringify(jawaban));
  localStorage.setItem("bankSoal", JSON.stringify(soal));

  const fd = new FormData();
  fd.append("nama", localStorage.getItem("nama"));
  fd.append("gender", localStorage.getItem("gender"));
  fd.append("sekolah", localStorage.getItem("sekolah"));
  fd.append("tinggibadan", localStorage.getItem("tinggibadan"));
  fd.append("beratbadan", localStorage.getItem("beratbadan"));
  fd.append("daerah", localStorage.getItem("daerah"));
  fd.append("nilai", nilai);

  fetch(API_URL, { method: "POST", body: fd }).finally(
    () => (location.href = "hasil.html"),
  );
}

function updateProgress() {
  const j = Object.keys(jawaban).length;
  progressBar.style.width = `${(j / soal.length) * 100}%`;
  progressText.textContent = `${j} / ${soal.length}`;
}

function buatNavigasi() {
  navSoal.innerHTML = "";
  soal.forEach((_, i) => {
    const b = document.createElement("button");
    b.textContent = i + 1;
    if (jawaban[i] !== undefined) b.classList.add("answered");
    if (Math.floor(i / perHalaman) === halaman) b.classList.add("active");
    b.onclick = () => {
      halaman = Math.floor(i / perHalaman);
      tampilkan();
    };
    navSoal.appendChild(b);
  });
}
function lihatPembahasan() {
  window.location.href = "pembahasan.html";
}
