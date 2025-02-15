// Sayfa yüklendiğinde görevleri localStorage'dan yükle
document.addEventListener("DOMContentLoaded", function () {
    loadTasks();
  });
  
  // Görevleri localStorage'dan yükleme fonksiyonu
  function loadTasks() {
    var storedTasks = JSON.parse(localStorage.getItem("tasks"));
  
    // Eğer localStorage'da herhangi bir görev varsa
    if (storedTasks) {
      // Listeyi temizle, eski öğeler eklenmesin
      document.getElementById("list").innerHTML = '';
  
      // Geçerli görevleri listeye ekle
      storedTasks.forEach(function (task) {
        var li = document.createElement("li");
        li.textContent = task;
  
        // Silme butonunu ekle
        var span = document.createElement("SPAN");
        var txt = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(txt);
        li.appendChild(span);
  
        // Silme işlevini yükle
        span.onclick = function () {
          var div = this.parentElement;
          div.style.display = "none"; // Öğeyi gizle
          
          // Silinen öğeyi localStorage'dan kaldır
          removeTaskFromLocalStorage(task);
  
          // Silindikten sonra localStorage'ı güncelle
          saveTasks();
        };
  
        // Listeye öğeyi ekle
        document.getElementById("list").appendChild(li);
      });
    }
  }
  
  // Silinen öğeyi localStorage'dan kaldırma fonksiyonu
  function removeTaskFromLocalStorage(taskToRemove) {
    var storedTasks = JSON.parse(localStorage.getItem("tasks"));
    // Silinen öğeyi diziden çıkar
    var updatedTasks = storedTasks.filter(function(task) {
      return task !== taskToRemove;
    });
    // Güncellenmiş listeyi localStorage'a kaydet
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  }
  
  // Görevleri localStorage'a kaydeden fonksiyon
  function saveTasks() {
    var tasks = [];
    var listItems = document.querySelectorAll("#list li"); // Tüm liste öğelerini al
    listItems.forEach(function (item) {
      // Sadece "display: none" olmayan öğeleri al
      if (item.style.display !== "none") {
        tasks.push(item.textContent.replace("\u00D7", "").trim()); // Çarpı işaretini temizle
      }
    });
    localStorage.setItem("tasks", JSON.stringify(tasks)); // Güncellenmiş listeyi localStorage'a kaydet
  }
  
  // Görev ekleme işlemi
  function newElement() {
    var li = document.createElement("li");
    var inputValue = document.getElementById("task").value;
    var t = document.createTextNode(inputValue);
    li.appendChild(t);
  
    // Eğer input boş ise, error toast'ını göster
    if (inputValue === "" || inputValue.replace(/^\s+|\s+$/g, "").length == 0) {
      $(".error").toast("show");
    } else {
      $(".success").toast("show");
      document.getElementById("list").appendChild(li);
      saveTasks(); // Yeni görev eklendikten sonra localStorage'a kaydet
    }
  
    document.getElementById("task").value = ""; // Input alanını temizle
  
    // Yeni öğeye çarpı işareti ekle
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7"); // Çarpı işareti
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);
  
    // Silme işlevini bağla
    span.onclick = function () {
      var div = this.parentElement;
      div.style.display = "none"; // Öğeyi gizle
  
      // Silindikten sonra, localStorage'ı güncelle
      saveTasks();
    };
  }
  
  // Listeye tıklanarak görev tamamlandığında "checked" sınıfı eklenmesi
  var list = document.querySelector("ul");
  list.addEventListener(
    "click",
    function (ev) {
      if (ev.target.tagName === "LI") {
        ev.target.classList.toggle("checked");
        // "checked" durumu değiştiğinde localStorage'a kaydet
        saveTasks();
      }
    },
    false
  );
  