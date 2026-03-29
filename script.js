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
  {
    t: "Semua A adalah B. Sebagian B adalah C. Maka...",
    p: [
      "Semua A adalah C",
      "Sebagian A adalah C",
      "Tidak dapat disimpulkan",
      "Semua C adalah A",
    ],
    j: 2,
    e: "A ⊂ B, B ∩ C ≠ ∅, belum tentu A termasuk bagian B yang C.",
  },
  {
    t: "Deret: 2, 6, 7, 21, 22, 66, ...",
    p: ["67", "68", "69", "70"],
    j: 0,
    e: "Pola ×3, +1 berulang.",
  },
  {
    t: "Jika semua X adalah Y dan tidak ada Y yang Z, maka...",
    p: [
      "Semua X adalah Z",
      "Sebagian X adalah Z",
      "Tidak ada X yang Z",
      "Semua Z adalah X",
    ],
    j: 2,
    e: "X ⊂ Y dan Y tidak beririsan Z.",
  },
  {
    t: "Deret: 1, 4, 10, 22, 46, ...",
    p: ["70", "82", "94", "96"],
    j: 2,
    e: "Pola ×2+2.",
  },
  {
    t: "3 pekerja 6 hari, 6 pekerja = ...",
    p: ["2", "3", "4", "6"],
    j: 1,
    e: "Perbandingan terbalik.",
  },
  {
    t: "Semua burung bersayap. Sebagian bersayap tidak terbang.",
    p: [
      "Semua burung terbang",
      "Sebagian burung tidak terbang",
      "Tidak dapat disimpulkan",
      "Semua tak terbang bukan burung",
    ],
    j: 2,
    e: "Tidak pasti burung termasuk subset itu.",
  },
  {
    t: "A, C, F, J, O, ...",
    p: ["T", "U", "V", "W"],
    j: 1,
    e: "+2,+3,+4,+5,+6",
  },
  {
    t: "Semua P ⊂ Q ⊂ R, maka...",
    p: [
      "Semua P adalah R",
      "Sebagian R adalah P",
      "Semua R adalah P",
      "Tidak dapat disimpulkan",
    ],
    j: 0,
    e: "Transitif.",
  },
  {
    t: "5,10,20,35,55,...",
    p: ["70", "80", "85", "90"],
    j: 1,
    e: "Selisih naik 5.",
  },
  {
    t: "2x+3=11, y=3x-2",
    p: ["8", "10", "12", "14"],
    j: 1,
    e: "x=4 → y=10.",
  },
  {
    t: "Deret: 4, 12, 36, 108, ...",
    p: ["216", "324", "432", "540"],
    j: 1,
    e: "×3 terus → 108×3 = 324",
  },
  {
    t: "Jika semua A adalah B dan semua B adalah C, maka...",
    p: [
      "Semua A adalah C",
      "Sebagian A adalah C",
      "Tidak pasti",
      "Semua C adalah A",
    ],
    j: 0,
    e: "Transitif: A ⊂ B ⊂ C",
  },
  {
    t: "Deret: 5, 7, 11, 17, 25, ...",
    p: ["33", "35", "37", "39"],
    j: 1,
    e: "Selisih +2,+4,+6,+8,+10",
  },
  {
    t: "Jika p → q dan q → r, maka...",
    p: ["p → r", "r → p", "p ↔ r", "Tidak pasti"],
    j: 0,
    e: "Transitif logika",
  },
  {
    t: "2, 3, 6, 7, 14, 15, ...",
    p: ["28", "30", "32", "34"],
    j: 0,
    e: "×2 lalu +1 berulang",
  },
  {
    t: "Jika semua siswa rajin, dan Andi siswa, maka...",
    p: ["Andi rajin", "Andi tidak rajin", "Tidak pasti", "Semua rajin Andi"],
    j: 0,
    e: "Silogisme",
  },
  {
    t: "Deret: 100, 90, 72, 54, ...",
    p: ["36", "40", "42", "44"],
    j: 0,
    e: "-10, -18, -18, -18",
  },
  {
    t: "Umur Ani 2x Budi, jumlah 30",
    p: ["10 & 20", "12 & 18", "15 & 15", "20 & 10"],
    j: 0,
    e: "Budi=10, Ani=20",
  },
  {
    t: "Jika tidak hujan maka kering. Hujan terjadi, maka...",
    p: ["Kering", "Tidak kering", "Mungkin", "Tidak pasti"],
    j: 1,
    e: "Hujan → tidak kering",
  },
  {
    t: "3, 9, 8, 24, 23, ...",
    p: ["46", "69", "70", "72"],
    j: 1,
    e: "×3 lalu -1",
  },

  {
    t: "Deret: 2, 4, 8, 16, 32, ...",
    p: ["48", "56", "64", "72"],
    j: 2,
    e: "×2",
  },
  {
    t: "Jika semua P adalah Q, sebagian Q adalah R",
    p: ["Semua P R", "Sebagian P R", "Tidak pasti", "Semua R P"],
    j: 2,
    e: "Tidak cukup info",
  },
  {
    t: "7 orang 3 hari, 1 orang = ...",
    p: ["21", "18", "15", "10"],
    j: 0,
    e: "7×3=21",
  },
  {
    t: "Deret: 1, 3, 6, 10, 15, ...",
    p: ["20", "21", "22", "23"],
    j: 1,
    e: "+2,+3,+4,+5,+6",
  },
  {
    t: "Jika A benar maka B benar. B salah.",
    p: ["A benar", "A salah", "A mungkin", "Tidak pasti"],
    j: 1,
    e: "Kontrapositif",
  },
  {
    t: "Huruf: A, D, H, M, S, ...",
    p: ["X", "Y", "Z", "W"],
    j: 1,
    e: "+3,+4,+5,+6,+7",
  },
  {
    t: "5, 15, 45, ...",
    p: ["90", "135", "150", "180"],
    j: 1,
    e: "×3",
  },
  {
    t: "Deret: 9, 8, 6, 3, -1, ...",
    p: ["-6", "-7", "-8", "-9"],
    j: 1,
    e: "-1,-2,-3,-4,-5",
  },
  {
    t: "Jika semua bunga harum",
    p: ["Harum bunga", "Semua harum bunga", "Tidak pasti", "Bunga tidak harum"],
    j: 0,
    e: "Silogisme",
  },
  {
    t: "10×(5+5)",
    p: ["50", "80", "100", "120"],
    j: 2,
    e: "10×10",
  },

  {
    t: "144 ÷ 12",
    p: ["10", "11", "12", "13"],
    j: 2,
    e: "12",
  },
  {
    t: "Deret: 2, 6, 12, 20, ...",
    p: ["28", "30", "32", "34"],
    j: 1,
    e: "+4,+6,+8,+10",
  },
  {
    t: "Jika rajin → pintar, pintar",
    p: ["Rajin", "Tidak rajin", "Mungkin", "Tidak pasti"],
    j: 2,
    e: "Tidak bisa dibalik",
  },
  {
    t: "4² + 3²",
    p: ["25", "24", "23", "22"],
    j: 0,
    e: "16+9",
  },
  {
    t: "8, 24, 12, 36, 18, ...",
    p: ["54", "48", "42", "60"],
    j: 0,
    e: "×3 lalu ÷2",
  },
  {
    t: "Jika semua kucing mamalia",
    p: [
      "Mamalia kucing",
      "Semua mamalia kucing",
      "Tidak pasti",
      "Kucing mamalia",
    ],
    j: 3,
    e: "Definisi",
  },
  {
    t: "1, 2, 4, 7, 11, ...",
    p: ["15", "16", "17", "18"],
    j: 1,
    e: "+1,+2,+3,+4,+5",
  },
  {
    t: "6×7+8",
    p: ["50", "52", "54", "56"],
    j: 1,
    e: "42+8",
  },
  {
    t: "Deret: 3, 6, 18, 72, ...",
    p: ["144", "216", "288", "360"],
    j: 1,
    e: "×2,×3,×4,×5",
  },
  {
    t: "Jika semua A adalah B, dan B bukan C",
    p: ["A bukan C", "A adalah C", "Sebagian A C", "Tidak pasti"],
    j: 0,
    e: "Logika himpunan",
  },

  {
    t: "5! (faktorial)",
    p: ["100", "110", "120", "130"],
    j: 2,
    e: "5×4×3×2×1",
  },
  {
    t: "Deret: 2, 3, 5, 9, 17, ...",
    p: ["25", "33", "31", "29"],
    j: 1,
    e: "×2-1",
  },
  {
    t: "Jika hujan maka banjir, tidak banjir",
    p: ["Hujan", "Tidak hujan", "Mungkin", "Tidak pasti"],
    j: 1,
    e: "Modus tollens",
  },
  {
    t: "1 lusin = ...",
    p: ["10", "11", "12", "13"],
    j: 2,
    e: "12",
  },
  {
    t: "3² + 4²",
    p: ["20", "24", "25", "26"],
    j: 2,
    e: "9+16",
  },
  {
    t: "Deret: 0, 2, 6, 12, 20, ...",
    p: ["28", "30", "32", "34"],
    j: 1,
    e: "+2,+4,+6,+8,+10",
  },
  {
    t: "Jika semua merah warna",
    p: ["Merah warna", "Warna merah", "Tidak pasti", "Merah bukan warna"],
    j: 0,
    e: "Klasifikasi",
  },
  {
    t: "9×9",
    p: ["72", "80", "81", "90"],
    j: 2,
    e: "81",
  },
  {
    t: "Deret: 5, 10, 20, 40, ...",
    p: ["60", "70", "80", "90"],
    j: 2,
    e: "×2",
  },
  {
    t: "Jika semua siswa belajar",
    p: ["Belajar siswa", "Semua belajar siswa", "Tidak pasti", "Siswa belajar"],
    j: 3,
    e: "Makna langsung",
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
