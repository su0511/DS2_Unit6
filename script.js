let zIndexCounter = 100;

    function openWindow(id) {
      const win = document.getElementById(id + "-window");
      win.style.display = "block";
      win.style.zIndex = ++zIndexCounter;
      showStage(id, 1);
      lazyLoadMedia(id);
    }

    function lazyLoadMedia(id) {
        let win = document.getElementById(id + "-window");
      
        win.querySelectorAll("img.lazy-img").forEach(img => {
          if (!img.src) {
            img.src = img.dataset.src;
          }
        });
      
        win.querySelectorAll("video.lazy-video").forEach(video => {
          if (!video.src) {
            const source = document.createElement("source");
            source.src = video.dataset.src;
            source.type = "video/mp4";
            video.appendChild(source);
            video.load();
          }
        });
      }
      
      function closeWindow(id) {
        const win = document.getElementById(id + "-window"); 
        if (win) win.style.display = "none";
    }
      

    function showStage(id, num) {
      for (let i = 1; i <= 4; i++) {
        const stageId = `${id}-stage-${i}`;
        const stageElement = document.getElementById(stageId);
        const buttonElement = document.querySelector(`#${id}-window .stage-buttons button:nth-child(${i})`);

        if (stageElement) {
          stageElement.classList.remove("active");

          const mediaElements = stageElement.querySelectorAll("audio, video");
          mediaElements.forEach(media => {
            media.pause();
            media.currentTime = 0;
          });
        }

        if (buttonElement) buttonElement.classList.remove("active");
      }

      const newStage = document.getElementById(`${id}-stage-${num}`);
      if (newStage) newStage.classList.add("active");

      const newButton = document.querySelector(`#${id}-window .stage-buttons button:nth-child(${num})`);
      if (newButton) newButton.classList.add("active");
    }
    function saveComment(id) {
        const textarea = document.querySelector(`#${id}-window textarea`);
        const comment = textarea.value.trim();
        if (comment) {
          const key = `${id.toLowerCase()}-comments`; 
          const existing = JSON.parse(localStorage.getItem(key) || "[]");
          existing.push(comment);
          localStorage.setItem(key, JSON.stringify(existing));
          textarea.value = "";
          alert("Your memory has been saved locally ✨");
        }
      }
      
      
      function openMemoryWall() {
        const list = document.getElementById("memoryList");
        list.innerHTML = "";
      
        const allKeys = Object.keys(localStorage).filter(k => k.endsWith("-comments"));
      
        if (allKeys.length === 0) {
          const li = document.createElement("li");
          li.textContent = "No memories saved yet.";
          list.appendChild(li);
        } else {
          allKeys.forEach(key => {
            const title = key.replace("-comments", "");
            const items = JSON.parse(localStorage.getItem(key) || "[]");
            const sectionTitle = document.createElement("li");
            sectionTitle.innerHTML = `<b>${title.toUpperCase()}:</b>`;
            list.appendChild(sectionTitle);
            items.forEach(mem => {
              const li = document.createElement("li");
              li.textContent = `- ${mem}`;
              list.appendChild(li);
            });
          });
        }
      
        const win = document.getElementById("memory-wall");
        win.style.display = "block";
        win.style.zIndex = ++zIndexCounter;
      }
      
      
    window.onload = function() {
      document.getElementById("welcome-popup").style.display = "block";
    };

    function closeWelcomePopup() {
      document.getElementById("welcome-popup").style.display = "none";
    }

    let dragTarget = null;
    let offsetX = 0;
    let offsetY = 0;

    document.addEventListener("mousedown", function (e) {
      if (e.target.closest(".title-bar")) {
        dragTarget = e.target.closest(".window");
        const rect = dragTarget.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
      }
    });

    document.addEventListener("mousemove", function (e) {
      if (dragTarget) {
        dragTarget.style.left = `${e.clientX - offsetX}px`;
        dragTarget.style.top = `${e.clientY - offsetY}px`;
      }
    });

    document.addEventListener("mouseup", function () {
      dragTarget = null;
    });
    
    document.body.classList.add("loading"); // 页面一开始添加 loading 样式

    window.addEventListener("load", function () {
    document.body.classList.remove("loading"); // 页面加载完去掉
    });

    function openWindow(id) {
        document.body.classList.add("loading");
        setTimeout(() => {
          const win = document.getElementById(id + "-window");
          win.style.display = "block";
          win.style.zIndex = ++zIndexCounter;
          showStage(id, 1);
          lazyLoadMedia(id);
          document.body.classList.remove("loading");
        }, 300); 
      }
      
   

      localStorage.clear()

