const projects = [
  { id: "01", title: "增长地图", category: "strategy", categoryName: "策略 · 业务规划", color: "orange", mark: "增长", description: "为新业务建立从市场洞察到执行节奏的完整地图，帮助团队在不确定的市场里找到优先级。", tags: ["市场分析", "战略规划", "工作坊"] },
  { id: "02", title: "效率实验室", category: "operation", categoryName: "运营 · 流程优化", color: "sage", mark: "效率", description: "重新梳理跨部门交付流程，减少重复沟通与等待环节，让项目从启动到交付的节奏更清晰。", tags: ["流程设计", "项目管理", "效率提升 20%"] },
  { id: "03", title: "数字仪表盘", category: "data", categoryName: "数据 · 决策支持", color: "cream", mark: "洞察", description: "把分散的业务信息整理成一套团队都能读懂的指标系统，让每一次复盘都更接近事实。", tags: ["Excel", "SQL", "数据可视化"] },
  { id: "04", title: "团队共识计划", category: "strategy", categoryName: "策略 · 组织协作", color: "charcoal", mark: "共识", description: "设计一套轻量的团队协作机制，让目标、角色和反馈被看见，也让好的想法更快被验证。", tags: ["组织协作", "沟通机制", "用户研究"] }
];

const projectGrid = document.querySelector("#project-grid");
const dialog = document.querySelector("#project-dialog");
const dialogContent = document.querySelector("#dialog-content");

function renderProjects(filter = "all") {
  const visibleProjects = projects.filter((project) => filter === "all" || project.category === filter);
  projectGrid.classList.add("is-switching");
  projectGrid.innerHTML = visibleProjects.map((project) => `
    <article class="project-card" data-project-id="${project.id}" tabindex="0" role="button" aria-label="查看${project.title}项目详情">
      <div class="project-image ${project.color}">
        <span class="project-index">${project.id}</span>
        <span class="project-image-mark">${project.mark}</span>
      </div>
      <div class="project-meta"><div><h3>${project.title}</h3><p>${project.categoryName}</p></div><span class="project-arrow">↗</span></div>
    </article>
  `).join("");
  projectGrid.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("click", () => openProject(card.dataset.projectId));
    card.addEventListener("keydown", (event) => { if (event.key === "Enter" || event.key === " ") openProject(card.dataset.projectId); });
    card.addEventListener("pointermove", (event) => {
      const bounds = card.getBoundingClientRect();
      const rotateY = ((event.clientX - bounds.left) / bounds.width - .5) * 6;
      const rotateX = ((event.clientY - bounds.top) / bounds.height - .5) * -6;
      card.style.setProperty("--card-rx", `${rotateX}deg`);
      card.style.setProperty("--card-ry", `${rotateY}deg`);
    });
    card.addEventListener("pointerleave", () => { card.style.setProperty("--card-rx", "0deg"); card.style.setProperty("--card-ry", "0deg"); });
  });
  requestAnimationFrame(() => projectGrid.classList.remove("is-switching"));
}

function openProject(projectId) {
  const project = projects.find((item) => item.id === projectId);
  if (!project) return;
  dialogContent.innerHTML = `<p class="dialog-kicker">${project.id} / ${project.categoryName}</p><h2 class="dialog-title">${project.title}</h2><p class="dialog-content">${project.description}</p><div class="dialog-tags">${project.tags.map((tag) => `<span>${tag}</span>`).join("")}</div>`;
  dialog.showModal();
}

document.querySelectorAll(".filter-button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector(".filter-button.is-active").classList.remove("is-active");
    button.classList.add("is-active");
    renderProjects(button.dataset.filter);
  });
});

document.querySelectorAll("[data-count]").forEach((counter) => {
  const target = Number(counter.dataset.count);
  const suffix = counter.dataset.suffix;
  let hasCounted = false;
  const countObserver = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting || hasCounted) return;
    hasCounted = true;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / 900, 1);
      counter.textContent = `${Math.round((1 - Math.pow(1 - progress, 3)) * target)}${suffix}`;
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    countObserver.disconnect();
  }, { threshold: .7 });
  countObserver.observe(counter);
});

document.querySelector("#dialog-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });

const themeToggle = document.querySelector("#theme-toggle");
function updateThemeToggle() {
  const isDark = document.body.classList.contains("dark");
  themeToggle.setAttribute("aria-label", isDark ? "切换浅色模式" : "切换深色模式");
  themeToggle.setAttribute("title", isDark ? "切换浅色模式" : "切换深色模式");
  themeToggle.setAttribute("aria-pressed", isDark);
}
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  localStorage.setItem("portfolio-theme", isDark ? "dark" : "light");
  updateThemeToggle();
});
if (localStorage.getItem("portfolio-theme") === "dark") document.body.classList.add("dark");
updateThemeToggle();

const menuToggle = document.querySelector("#menu-toggle");
const navLinks = document.querySelector("#nav-links");
function closeMenu() {
  navLinks.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "打开导航");
}
menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", isOpen);
  menuToggle.setAttribute("aria-label", isOpen ? "关闭导航" : "打开导航");
});
navLinks.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeMenu(); });

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("visible"); revealObserver.unobserve(entry.target); } });
}, { threshold: .14 });
document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

window.addEventListener("pointermove", (event) => {
  document.body.style.setProperty("--mouse-x", `${event.clientX}px`);
  document.body.style.setProperty("--mouse-y", `${event.clientY}px`);
  const heroVisual = document.querySelector(".hero-visual");
  if (heroVisual && window.matchMedia("(min-width: 721px)").matches) {
    heroVisual.style.setProperty("--parallax-x", ((event.clientX / window.innerWidth - .5) * 8).toFixed(2));
    heroVisual.style.setProperty("--parallax-y", ((event.clientY / window.innerHeight - .5) * 8).toFixed(2));
  }
});
renderProjects();