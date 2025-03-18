import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { auth, db } from "./firebase.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

const provider = new GoogleAuthProvider();

// Registrasi dengan Email & Password
document.querySelector("#registerForm")?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("Cpassword").value;

  if (password !== confirmPassword) {
    alert("Konfirmasi password tidak cocok!");
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      createdAt: new Date()
    });

    alert("Registrasi berhasil!");
    window.location.href = "login.html";
  } catch (error) {
    alert(error.message);
  }
});

// Login dengan Email & Password
document.querySelector("#loginForm")?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Login berhasil!");
    window.location.href = "index.html";
  } catch (error) {
    alert("Login gagal: " + error.message);
  }
});

// Registrasi dengan Google
document.getElementById("googleLoginBtn")?.addEventListener("click", async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      createdAt: new Date()
    }, { merge: true });

    alert("Login berhasil dengan Google!");
    window.location.href = "index.html";
  } catch (error) {
    alert(error.message);
  }
});

// Login dengan Google
document.getElementById("LgoogleLoginBtn")?.addEventListener("click", async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    alert("Login berhasil dengan Google!");
    window.location.href = "index.html";
  } catch (error) {
    alert("Login gagal: " + error.message);
  }
});



document.addEventListener("DOMContentLoaded", () => {
  const loginButton = document.getElementById("loginButton");
  const userDropdown = document.getElementById("userDropdown");
  const userNameDisplay = document.getElementById("userName");
  const logoutButton = document.getElementById("logoutButton");

  console.log("Checking authentication state...");

  onAuthStateChanged(auth, (user) => {
    console.log("User state changed:", user);
    if (user) {
      loginButton.style.display = "none";
      userDropdown.style.display = "block";
      userNameDisplay.textContent = user.displayName || "Pengguna"; // Gunakan displayName atau default "Pengguna"
    } else {
      loginButton.style.display = "block";
      userDropdown.style.display = "none";
    }
  });

  // Logout event
  logoutButton?.addEventListener("click", async () => {
    await signOut(auth);
    alert("Anda telah logout.");
    window.location.href = "index.html";
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const loginButton = document.getElementById("loginButton");
  const userDropdown = document.getElementById("userDropdown");
  const userNameDisplay = document.getElementById("userName");
  const logoutButton = document.getElementById("logoutButton");
  const mobileLoginButton = document.getElementById("mobileLoginButton"); // Tambahan untuk mobile

  console.log("Checking authentication state...");

  onAuthStateChanged(auth, (user) => {
    console.log("User state changed:", user);
    if (user) {
      loginButton.style.display = "none";
      userDropdown.style.display = "block";
      userNameDisplay.textContent = user.displayName || "Pengguna";
      if (mobileLoginButton) {
        mobileLoginButton.textContent = user.displayName || "Pengguna"; // Ubah teks di mobile
      }
    } else {
      loginButton.style.display = "block";
      userDropdown.style.display = "none";
      if (mobileLoginButton) {
        mobileLoginButton.textContent = "Masuk"; // Kembalikan ke "Masuk" jika logout
      }
    }
  });

  // Logout event
  logoutButton?.addEventListener("click", async () => {
    await signOut(auth);
    alert("Anda telah logout.");
    window.location.href = "index.html";
  });
});




// Fungsi untuk menampilkan modal notifikasi
function showNotification(message, isSuccess = true) {
  const modalTitle = document.getElementById("notificationTitle");
  const modalMessage = document.getElementById("notificationMessage");

  modalTitle.textContent = isSuccess ? "Sukses!" : "Gagal!";
  modalTitle.style.color = isSuccess ? "green" : "red";
  modalMessage.textContent = message;

  // Tampilkan modal
  const modal = new bootstrap.Modal(document.getElementById("notificationModal"));
  modal.show();
}

// Event listener untuk login dengan email & password
document.querySelector("#loginForm")?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    showNotification("Login berhasil! Anda akan diarahkan ke halaman utama.", true);
    setTimeout(() => {
      window.location.href = "index.html";
    }, 2000);
  } catch (error) {
    showNotification("Login gagal: " + error.message, false);
  }
});

// Login dengan Google
document.getElementById("LgoogleLoginBtn")?.addEventListener("click", async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    showNotification("Login berhasil dengan Google! Anda akan diarahkan ke halaman utama.", true);
    setTimeout(() => {
      window.location.href = "index.html";
    }, 2000);
  } catch (error) {
    showNotification("Login gagal: " + error.message, false);
  }
});

// Logout
document.getElementById("logoutButton")?.addEventListener("click", async () => {
  await signOut(auth);
  showNotification("Anda telah logout.", true);
  setTimeout(() => {
    window.location.href = "index.html";
  }, 2000);
});
