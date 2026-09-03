let şəxsiMəlumatlar = {};
let melumatlar = {};
let orijinalMəlumatlar = {};
async function məlumatlarıYüklə() {
  document.body.innerHTML += '<div id="loading">Yüklənir...</div>';
  try {
    const response = await fetch('data.json');
    if (!response.ok) throw new Error('Network error');
    const data = await response.json();
    şəxsiMəlumatlar = JSON.parse(localStorage.getItem('şəxsiMəlumatlar')) || data.şəxsiMəlumatlar;
    melumatlar = JSON.parse(localStorage.getItem('cvMəlumatları')) || data.məlumatlar;
    orijinalMəlumatlar = {
      şəxsiMəlumatlar: JSON.parse(JSON.stringify(şəxsiMəlumatlar)),
      melumatlar: JSON.parse(JSON.stringify(melumatlar))
    };
  } catch (error) {
    console.error('Xəta:', error);
    const simulatedJsonResponse = {
      "şəxsiMəlumatlar": {
        "ad": "Murad Islamzada",
        "email": "muradislamzada@gmail.com",
        "doğumTarixi": "2000-01-01",
        "təsvir": "Mənim haqqımda qısa məlumat",
        "ünvan": "-",
        "telefon": "-"
      },
      "məlumatlar": {
        "Təhsil": [
          "Azərbaycan Texniki Universiteti - İnformasiya Təhlükəsizliyi (1-ci kurs, 2024 - Davam edir)"
        ],
        "Bacarıqlar": [
          "✔Proqramlaşdırma dilləri (Python, C++, Java və s.)",
          "✔Frontend Texnologiyaları (HTML, CSS və s.)",
          "✔Ofis Proqramları (MS Word, MS Excel, MS PowerPoint)"
        ],
        "İş Təcrübəsi": ["Praktikaya Gediləcək"],
        "Haqqımda": [
          "Mən dəqiq, çevik və komanda ilə işləməyə həvəsli biriyəm. Verilən tapşırıqların öhdəsindən yüksək səviyyədə gəlmək üçün daim çalışıram. İşləyəcəyim vəzifə üçün bütün bacarıq və keyfiyyətlərimi səmərəli şəkildə istifadə etməyə və bu işə həvəslə yanaşmağa hazıram. Həmçinin, yeni təcrübə imkanlarını dəyərləndirməyə və biliklərimi genişləndirməyə maraqlıyam."
        ],
        "Şəxsi Keyfiyyətlər": [
          "✔Yüksək iş etikası",
          "✔Problemlərin səmərəli həlli",
          "✔Analitik düşünmək",
          "✔Təqdimat bacarıqları",
          "✔Yüksək ünsiyyət bacarığı",
          "✔Stressə davamlı",
          "✔Kollektiv ilə işləmə"
        ],
        "Hobbi və Maraqlar": [
          "İdman ilə məşğul olmaq, futbol oynamaq, inkişaf üçün əlavə biliklər əldə etməyə çalışmaq."
        ],
        "Dillər": [
          "English - A2",
          "Türk - Çox yaxşı",
          "Azərbaycan - Çox yaxşı"
        ]
      }
    };
    const yerliŞəxsiMəlumatlar = JSON.parse(localStorage.getItem('şəxsiMəlumatlar') || 'null');
    const yerliCvMəlumatları = JSON.parse(localStorage.getItem('cvMəlumatları') || 'null');
    if (yerliŞəxsiMəlumatlar && yerliCvMəlumatları) {
      şəxsiMəlumatlar = yerliŞəxsiMəlumatlar;
      melumatlar = yerliCvMəlumatları;
    } else {
      şəxsiMəlumatlar = simulatedJsonResponse.şəxsiMəlumatlar;
      melumatlar = simulatedJsonResponse.məlumatlar;
    }
    orijinalMəlumatlar = {
      şəxsiMəlumatlar: JSON.parse(JSON.stringify(şəxsiMəlumatlar)),
      melumatlar: JSON.parse(JSON.stringify(melumatlar))
    };
  } finally {
    const loadingElement = document.getElementById('loading');
    if (loadingElement) {
      loadingElement.remove();
    }
  }
}
function localStorageYaddaSaxla() {
  localStorage.setItem('şəxsiMəlumatlar', JSON.stringify(şəxsiMəlumatlar));
  localStorage.setItem('cvMəlumatları', JSON.stringify(melumatlar));
}
function adDoğrulaması(ad) {
  if (ad.trim() === "") {
    return "Ad boş ola bilməz";
  }
  if (ad.length < 3) {
    return "Ad ən azı 3 simvol olmalıdır";
  }
  return "";
}
function emailDoğrulaması(email) {
  email = email.trim();
  if (email === "") {
    return "Email boş ola bilməz";
  }
  if (!email.includes("@") || !email.includes(".")) {
    return "Düzgün email formatı daxil edin";
  }
  return "";
}
function tarixDoğrulaması(tarix) {
  if (tarix.trim() === "") {
    return "Tarix seçilməlidir";
  }
  const seçilənTarix = new Date(tarix);
  const bugün = new Date();
  if (seçilənTarix > bugün) {
    return "Doğum tarixi gələcəkdə ola bilməz";
  }
  return "";
}
function təsvirDoğrulaması(təsvir) {
  if (təsvir.trim() === "") {
    return "Təsvir boş ola bilməz";
  }
  if (təsvir.length > 200) {
    return "Təsvir 200 simvoldan çox ola bilməz";
  }
  return "";
}
function formaMəlumatlarınıDoldur() {
  document.getElementById('ad').value = şəxsiMəlumatlar.ad || '';
  document.getElementById('email').value = şəxsiMəlumatlar.email || '';
  document.getElementById('doğum-tarixi').value = şəxsiMəlumatlar.doğumTarixi || '';
  document.getElementById('təsvir').value = şəxsiMəlumatlar.təsvir || '';
  document.getElementById('ünvan').value = şəxsiMəlumatlar.ünvan || '';
  document.getElementById('telefon').value = şəxsiMəlumatlar.telefon || '';
  const təsvirSahəsi = document.getElementById('təsvir');
  if (təsvirSahəsi) {
    document.getElementById('təsvirSay').textContent = `${təsvirSahəsi.value.length}/200`;
  }
  document.getElementById('profil-ad').textContent = şəxsiMəlumatlar.ad;
  məlumatlarıGörüntülə();
}
function məlumatlarıGörüntülə() {
  document.getElementById('doğum-tarixi-göstər').textContent = şəxsiMəlumatlar.doğumTarixi || '';
  document.getElementById('telefon-göstər').textContent = şəxsiMəlumatlar.telefon || '';
  document.getElementById('email-göstər').textContent = şəxsiMəlumatlar.email || '';
  document.getElementById('ünvan-göstər').textContent = şəxsiMəlumatlar.ünvan || '';
}
function bölmələriYüklə() {
  const bolmeler = document.getElementsByClassName("bolme");
  for (let i = 0; i < bolmeler.length; i++) {
    const bolme = bolmeler[i];
    const h2 = bolme.getElementsByTagName("h2")[0];
    const basliq = h2.textContent;
    const icerik = bolme.getElementsByClassName("icerik")[0];
    if (melumatlar[basliq]) {
      icerikYenilə(icerik, melumatlar[basliq], basliq);
    }
  }
}
function icerikYenilə(icerik, məlumatSiyahısı, basliq) {
  icerik.innerHTML = "";
  if (məlumatSiyahısı.length > 0) {
    if (basliq === "Bacarıqlar" || basliq === "Şəxsi Keyfiyyətlər") {
      const ul = document.createElement("ul");
      for (let j = 0; j < məlumatSiyahısı.length; j++) {
        const li = document.createElement("li");
        li.textContent = məlumatSiyahısı[j];
        li.dataset.index = j;
        li.dataset.section = basliq;
        ul.appendChild(li);
      }
      icerik.appendChild(ul);
    } else {
      for (let j = 0; j < məlumatSiyahısı.length; j++) {
        const p = document.createElement("p");
        p.textContent = məlumatSiyahısı[j];
        p.dataset.index = j;
        p.dataset.section = basliq;
        icerik.appendChild(p);
      }
    }
  }
}
function əlavəEtməFunksiyalarınıTətbiqEt() {
  const əlavəEtDüymələri = document.querySelectorAll('.elave-et');
  əlavəEtDüymələri.forEach(düymə => {
    düymə.addEventListener('click', function() {
      const bölməAdı = this.dataset.section;
      const yeniMəlumatGirişi = this.parentElement.querySelector('.yeni-məlumat');
      const yeniMəlumat = yeniMəlumatGirişi.value.trim();
      if (yeniMəlumat !== "") {
        if (!melumatlar[bölməAdı]) {
          melumatlar[bölməAdı] = [];
        }
        melumatlar[bölməAdı].push(yeniMəlumat);
        const icərikElementi = document.querySelector(`#${bölməAdı.toLowerCase().replace(/\s+/g, '-')}-bolme .icerik`);
        icerikYenilə(icərikElementi, melumatlar[bölməAdı], bölməAdı);
        yeniMəlumatGirişi.value = "";
        localStorageYaddaSaxla();
      }
    });
  });
}
let aktivRedaktəBölməsi = null;
let aktivRedaktəSahəsi = null;
function modalıAç(title, content) {
  const modal = document.getElementById('redaktə-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  modalTitle.textContent = title;
  modalBody.innerHTML = content;
  modal.style.display = 'block';
  const closeButton = modal.querySelector('.close');
  closeButton.onclick = function() {
    modal.style.display = 'none';
  };
  window.onclick = function(event) {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  };
}
function dilləriRedaktəEt() {
  const dilListi = document.getElementById('dillər-list');
  const dillər = [];
  Array.from(dilListi.querySelectorAll('li')).forEach(li => {
    dillər.push(li.textContent);
  });
  let htmlContent = '';
  dillər.forEach((dil, index) => {
    htmlContent += `
      <div class="redaktə-element">
        <input type="text" value="${dil}" data-index="${index}" class="dil-input">
      </div>
    `;
  });
  htmlContent += `
    <div class="redaktə-element">
      <button id="yeni-dil-əlavə-et" class="elave-et">Yeni Dil Əlavə Et</button>
    </div>
  `;
  modalıAç('Dilləri Redaktə Et', htmlContent);
  aktivRedaktəBölməsi = 'dillər';
  document.getElementById('yeni-dil-əlavə-et').addEventListener('click', function() {
    const inputs = document.querySelectorAll('.dil-input');
    const lastInput = inputs[inputs.length - 1];
    const newIndex = parseInt(lastInput.dataset.index) + 1;
    const newInputDiv = document.createElement('div');
    newInputDiv.className = 'redaktə-element';
    newInputDiv.innerHTML = `<input type="text" value="" data-index="${newIndex}" class="dil-input">`;
    const buttonDiv = document.getElementById('yeni-dil-əlavə-et').parentElement;
    buttonDiv.parentElement.insertBefore(newInputDiv, buttonDiv);
  });
}
function şəxsiSahəniRedaktəEt(sahə) {
  let htmlContent = '';
  let label = '';
  let value = '';
  switch(sahə) {
    case 'doğumTarixi':
      label = 'Doğum Tarixi';
      value = şəxsiMəlumatlar.doğumTarixi || '';
      htmlContent = `
        <div class="redaktə-element">
          <label for="modal-doğum-tarixi">${label}:</label>
          <input type="date" id="modal-doğum-tarixi" value="${value}">
        </div>
      `;
      break;
    case 'telefon':
      label = 'Əlaqə';
      value = şəxsiMəlumatlar.telefon || '';
      htmlContent = `
        <div class="redaktə-element">
          <label for="modal-telefon">${label}:</label>
          <input type="tel" id="modal-telefon" value="${value}">
        </div>
      `;
      break;
    case 'email':
      label = 'Email';
      value = şəxsiMəlumatlar.email || '';
      htmlContent = `
        <div class="redaktə-element">
          <label for="modal-email">${label}:</label>
          <input type="email" id="modal-email" value="${value}">
        </div>
      `;
      break;
    case 'ünvan':
      label = 'Ünvan';
      value = şəxsiMəlumatlar.ünvan || '';
      htmlContent = `
        <div class="redaktə-element">
          <label for="modal-ünvan">${label}:</label>
          <input type="text" id="modal-ünvan" value="${value}">
        </div>
      `;
      break;
  }
  modalıAç(`${label} Redaktə Et`, htmlContent);
  aktivRedaktəSahəsi = sahə;
}
function bölməniRedaktəEt(bölməAdı) {
  const bölməMəlumatları = melumatlar[bölməAdı] || [];
  let htmlContent = '';
  if (bölməAdı === "Bacarıqlar" || bölməAdı === "Şəxsi Keyfiyyətlər") {
    bölməMəlumatları.forEach((məlumat, index) => {
      htmlContent += `
        <div class="redaktə-element">
          <input type="text" value="${məlumat}" data-index="${index}" class="bölmə-input">
        </div>
      `;
    });
  } else {
    bölməMəlumatları.forEach((məlumat, index) => {
      htmlContent += `
        <div class="redaktə-element">
          <textarea data-index="${index}" class="bölmə-input">${məlumat}</textarea>
        </div>
      `;
    });
  }
  htmlContent += `
    <div class="redaktə-element">
      <button id="yeni-məlumat-əlavə-et" class="elave-et">Yeni Məlumat Əlavə Et</button>
    </div>
  `;
  modalıAç(`${bölməAdı} Bölməsini Redaktə Et`, htmlContent);
  aktivRedaktəBölməsi = bölməAdı;
  document.getElementById('yeni-məlumat-əlavə-et').addEventListener('click', function() {
    const inputs = document.querySelectorAll('.bölmə-input');
    const lastInput = inputs[inputs.length - 1];
    const newIndex = parseInt(lastInput.dataset.index) + 1;
    const newInputDiv = document.createElement('div');
    newInputDiv.className = 'redaktə-element';
    if (bölməAdı === "Bacarıqlar" || bölməAdı === "Şəxsi Keyfiyyətlər") {
      newInputDiv.innerHTML = `<input type="text" value="" data-index="${newIndex}" class="bölmə-input">`;
    } else {
      newInputDiv.innerHTML = `<textarea data-index="${newIndex}" class="bölmə-input"></textarea>`;
    }
    const buttonDiv = document.getElementById('yeni-məlumat-əlavə-et').parentElement;
    buttonDiv.parentElement.insertBefore(newInputDiv, buttonDiv);
  });
}
function hamısınıSıfırla() {
  if (confirm("Bütün məlumatları ilkin vəziyyətə qaytarmaq istəyirsiniz?")) {
    şəxsiMəlumatlar = JSON.parse(JSON.stringify(orijinalMəlumatlar.şəxsiMəlumatlar));
    melumatlar = JSON.parse(JSON.stringify(orijinalMəlumatlar.melumatlar));
    localStorageYaddaSaxla();
    formaMəlumatlarınıDoldur();
    bölmələriYüklə();
    alert("Bütün məlumatlar ilkin vəziyyətə qaytarıldı!");
  }
}
function bölməToggle() {
  const bölməBaşlıqları = document.querySelectorAll('.bolme h2');
  bölməBaşlıqları.forEach(başlıq => {
    başlıq.style.cursor = 'pointer';
    başlıq.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      const bölmə = this.closest('.bolme');
      const icərik = bölmə.querySelector('.icerik');
      const əlavəFormu = bölmə.querySelector('.əlavə-formu');
      if (icərik && əlavəFormu) {
        if (icərik.style.display === 'none') {
          icərik.style.display = 'block';
          əlavəFormu.style.display = 'flex';
          this.classList.remove('collapsed');
        } else {
          icərik.style.display = 'none';
          əlavəFormu.style.display = 'none';
          this.classList.add('collapsed');
        }
      }
    });
  });
}
function eventListenerleriTətbiqEt() {
  document.getElementById('modal-save').addEventListener('click', function() {
    if (aktivRedaktəBölməsi === 'dillər') {
      const yeniDillər = [];
      document.querySelectorAll('.dil-input').forEach(input => {
        if (input.value.trim()) yeniDillər.push(input.value.trim());
      });
      melumatlar['Dillər'] = yeniDillər;
      localStorage.setItem('cvMəlumatları', JSON.stringify(melumatlar));
      
      const dilListi = document.getElementById('dillər-list');
      if (dilListi) {
        dilListi.innerHTML = yeniDillər.map(dil => `<li>${dil}</li>`).join('');
      }
    } else if (aktivRedaktəSahəsi) {
      switch(aktivRedaktəSahəsi) {
        case 'doğumTarixi':
          şəxsiMəlumatlar.doğumTarixi = document.getElementById('modal-doğum-tarixi').value;
          document.getElementById('doğum-tarixi-göstər').textContent = şəxsiMəlumatlar.doğumTarixi;
          break;
        case 'telefon':
          şəxsiMəlumatlar.telefon = document.getElementById('modal-telefon').value;
          document.getElementById('telefon-göstər').textContent = şəxsiMəlumatlar.telefon;
          break;
        case 'email':
          şəxsiMəlumatlar.email = document.getElementById('modal-email').value;
          document.getElementById('email-göstər').textContent = şəxsiMəlumatlar.email;
          break;
        case 'ünvan':
          şəxsiMəlumatlar.ünvan = document.getElementById('modal-ünvan').value;
          document.getElementById('ünvan-göstər').textContent = şəxsiMəlumatlar.ünvan;
          break;
      }
      localStorageYaddaSaxla();
      formaMəlumatlarınıDoldur();
    } else if (aktivRedaktəBölməsi) {
      const məlumatGirişləri = document.querySelectorAll('.bölmə-input');
      const yeniMəlumatlar = [];
      məlumatGirişləri.forEach(input => {
        if (input.value.trim() !== '') {
          yeniMəlumatlar.push(input.value.trim());
        }
      });
      melumatlar[aktivRedaktəBölməsi] = yeniMəlumatlar;
      const icərikElementi = document.querySelector(`#${aktivRedaktəBölməsi.toLowerCase().replace(/\s+/g, '-')}-bolme .icerik`);
      if (icərikElementi) {
        icerikYenilə(icərikElementi, yeniMəlumatlar, aktivRedaktəBölməsi);
      }
      localStorageYaddaSaxla();
    }
    document.getElementById('redaktə-modal').style.display = 'none';
    aktivRedaktəBölməsi = null;
    aktivRedaktəSahəsi = null;
  });
  document.querySelectorAll('.düzəliş-et').forEach(düymə => {
    düymə.addEventListener('click', function() {
      const dataSection = this.dataset.section;
      const dataField = this.dataset.field;
      if (dataField) {
        şəxsiSahəniRedaktəEt(dataField);
      } else if (dataSection === 'dillər') {
        dilləriRedaktəEt();
      } else if (dataSection) {
        bölməniRedaktəEt(dataSection);
      }
    });
  });
  const resetBtn = document.getElementById('hamısını-sıfırla');
  if (resetBtn) {
    resetBtn.addEventListener('click', hamısınıSıfırla);
  }
}
window.onload = async function () {
  await məlumatlarıYüklə();
  formaMəlumatlarınıDoldur();
  bölmələriYüklə();
  const təsvirSahəsi = document.getElementById('təsvir');
  if (təsvirSahəsi) {
    təsvirSahəsi.addEventListener('input', function() {
      document.getElementById('təsvirSay').textContent = `${this.value.length}/200`;
    });
  }
  const şəxsiForm = document.getElementById('şəxsi-form');
  if (şəxsiForm) {
    şəxsiForm.addEventListener('submit', function(e) {
      e.preventDefault();
      let formDoğrudur = true;
      const ad = document.getElementById('ad').value;
      const adXətası = adDoğrulaması(ad);
      document.getElementById('adError').textContent = adXətası;
      if (adXətası) {
        document.getElementById('ad').classList.add('invalid-input');
        formDoğrudur = false;
      } else {
        document.getElementById('ad').classList.remove('invalid-input');
      }
      const email = document.getElementById('email').value;
      const emailXətası = emailDoğrulaması(email);
      document.getElementById('emailError').textContent = emailXətası;
      if (emailXətası) {
        document.getElementById('email').classList.add('invalid-input');
        formDoğrudur = false;
      } else {
        document.getElementById('email').classList.remove('invalid-input');
      }
      const tarix = document.getElementById('doğum-tarixi').value;
      const tarixXətası = tarixDoğrulaması(tarix);
      document.getElementById('tarixError').textContent = tarixXətası;
      if (tarixXətası) {
        document.getElementById('doğum-tarixi').classList.add('invalid-input');
        formDoğrudur = false;
      } else {
        document.getElementById('doğum-tarixi').classList.remove('invalid-input');
      }
      const təsvir = document.getElementById('təsvir').value;
      const təsvirXətası = təsvirDoğrulaması(təsvir);
      document.getElementById('təsvirError').textContent = təsvirXətası;
      if (təsvirXətası) {
        document.getElementById('təsvir').classList.add('invalid-input');
        formDoğrudur = false;
      } else {
        document.getElementById('təsvir').classList.remove('invalid-input');
      }
      if (formDoğrudur) {
        şəxsiMəlumatlar.ad = ad;
        şəxsiMəlumatlar.email = email;
        şəxsiMəlumatlar.doğumTarixi = tarix;
        şəxsiMəlumatlar.təsvir = təsvir;
        şəxsiMəlumatlar.ünvan = document.getElementById('ünvan').value;
        şəxsiMəlumatlar.telefon = document.getElementById('telefon').value;
        document.getElementById('profil-ad').textContent = ad;
        localStorageYaddaSaxla();
        məlumatlarıGörüntülə();
        alert("Məlumatlar uğurla yadda saxlanıldı!");
      }
    });
  }
  eventListenerleriTətbiqEt();
  əlavəEtməFunksiyalarınıTətbiqEt();
  setTimeout(() => {
    bölməToggle();
  }, 1000);
};
