const figures = document.querySelectorAll("#gallery figure");
figures.forEach((figure) => {
  figure.addEventListener("mouseover", () => {
    const caption = figure.querySelector("figcaption");
    caption.style.opacity = "1";
  });
  figure.addEventListener("mouseout", () => {
    const caption = figure.querySelector("figcaption");
    caption.style.opacity = "0";
  });
});

const toggleButton = document.querySelector("#theme-toggle");
   const body = document.querySelector("body");
   toggleButton.addEventListener("click", () => {
       body.classList.toggle("dark-theme");
       const isDark = body.classList.contains("dark-theme");
       toggleButton.textContent = isDark ? "Light Theme" : "Dark Theme";
   });


   async function loadProjects() {
       const response = await fetch("projects.json");
       const projects = await response.json();
       const projectList = document.querySelector("#projects .grid");
       projects.forEach(data => {
           const item = document.createElement("article");
           item.classList.add("project");
           item.dataset.category = data.category; // Store category
           item.innerHTML = `
               <h3>${data.title}</h3>
               <p>${data.description}</p>
               <span class="category">${data.category}</span>
           `;
           projectList.appendChild(item);
       });
       setupFilters(projects);
   }
   function setupFilters(projects) {
       const buttons = document.querySelectorAll(".filter-controls button");
       buttons.forEach(button => {
           button.addEventListener("click", () => {
               const filter = button.dataset.filter;
               const projectItems = document.querySelectorAll(".project");
               projectItems.forEach(item => {
                   if (filter === "all" || item.dataset.category === filter) {
                       item.classList.remove("hidden");
                   } else {
                       item.classList.add("hidden");
                   }
               });
           });
       });
   }
   loadProjects();
