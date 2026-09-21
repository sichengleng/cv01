const sidePanel = document.getElementById('side-panel');
const backdrop = document.getElementById('backdrop');
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');
const scheduleButtons = document.querySelectorAll('[data-open-panel]');
const panelClose = document.getElementById('panel-close');
const workModal = document.getElementById('work-modal');
const workModalClose = document.getElementById('work-modal-close');
const workModalArt = document.getElementById('work-modal-art');
const workModalCode = document.getElementById('work-modal-code');
const workModalArtTitle = document.getElementById('work-modal-art-title');
const workModalMeta = document.getElementById('work-modal-meta');
const workModalTitle = document.getElementById('work-modal-title');
const workModalDescription = document.getElementById('work-modal-description');
const workModalTags = document.getElementById('work-modal-tags');
const languageToggle = document.getElementById('language-toggle');

const works = Object.fromEntries(Array.from({ length: 6 }, (_, index) => {
  const number = String(index + 1).padStart(2, '0');
  const id = `slot-${number}`;
  return [id, {
    code: `${number} / OPEN SLOT`, artTitle: 'YOUR WORK HERE', meta: 'PROJECT PREVIEW · READY',
    title: '待上传作品',
    description: '这里将展示你的新作品。上传图片后，可以补充项目背景、创作过程、使用工具和最终成果。',
    tags: ['待添加类型', '待添加年份', '待添加工具'], color: 'empty'
  }];
}));

const languageContent = {
  zh: {
    brand: '冷思成 / WORKS', nav: ['作品', '经历', '关于我', '技能', '联系'], contact: '联系我', menu: '菜单',
    eyebrow: 'ART TECHNOLOGY / VISUAL DESIGN / RESEARCH', heroLines: ['冷思成，', '设计连接', '文化与商业。'],
    intro: '艺术科技与商业理学硕士在读。用视觉设计、文化研究和数据叙事，把复杂问题转化为清晰、可感知的体验。', viewWorks: '查看作品 →',
    openWork: '作品位 · 可替换为你的新项目 ↗', pointLabel: '00 / Point of view', pointTitle: '我关心视觉如何让一个地方、一段故事或一种复杂的关系，被重新看见。', pointText: '作品集会持续更新。这里不急着填满，而是为每个项目留下足够的呼吸、尺度和叙事空间。',
    focus: 'CURRENTLY EXPLORING', focusItems: ['文化记忆', '互动叙事', '视觉系统', '真实材料'], workLabel: '01 / Selected works', workTitle: '留一些空间给新作品。',
    aboutLabel: '02 / About & tools', aboutTitle: '工具是语言，判断力才是语法。', contactLabel: '03 / Contact', contactTitle: '一起把想法做成\n看得见的现场。',
    formName: '姓名', formMessage: '留言', sendMessage: '发送留言', email: '发送邮件', leaveMessage: '留言给我', footer: '冷思成 / PORTFOLIO 2026', location: '贵阳 · 香港',
    educationLabel: '01 / Education', educationTitle: '学习，让视野保持流动。', experienceLabel: '02 / Experience', experienceTitle: '在商业现场，练习把复杂说清楚。',
    school: ['岭南大学 · 艺术科技与商业理学硕士', '香港', '武汉理工大学 × 威尔士圣大卫大学 · 平面设计学士', '湖北武汉 · 2:1 荣誉学位'], experienceRoles: ['机构部门 · 实习生', '设计实习生 · 湖北武汉', '设计师 / 执行策划 · 贵州贵阳'],
    skills: ['Illustrator', 'Photoshop', 'After Effects', 'Blender', 'C4D', 'PPT', 'Word', 'TouchDesigner', 'InDesign'], metrics: ['年设计实践', '设计奖项', '市场落地项目'], marquee: ['艺术科技', '品牌视觉', '文化创意', '数据叙事', 'IP 设计'], now: 'NOW / 2026', route: '贵阳 → 香港', availability: 'OPEN TO WORK', discipline: 'DESIGN / RESEARCH', modalKicker: 'SELECTED WORK / CASE STUDY',
    experienceBullets: [['参与约 2 亿元上市公司债券发行项目，协助尽调材料、财务数据分析及路演内容制作。', '独立完成上证、标普 500、日经指数近 20 年走势对比，将结论可视化为一页路演材料。', '优化 3 场路演视觉材料；2 周内掌握债券定价、信用评级等基础术语。'], ['与市场部门协作，根据用户调研反馈调整设计方案。', '协助完成 logo、海报、宣传册等视觉物料设计。'], ['参与黔金丝猴 IP 文创规划案，负责角色、三视图及 VI 标准设计。', '参与政务礼品、旅游纪念品、食品包装、潮流服饰及办公潮玩设计。', '针对游客、情侣、亲子等人群完成产品细分，其中一款产品投入市场。']]
  },
  en: {
    brand: 'C.S. LENG / WORKS', nav: ['Works', 'Experience', 'About', 'Skills', 'Contact'], contact: 'Contact me', menu: 'Menu',
    eyebrow: 'ART TECHNOLOGY / VISUAL DESIGN / RESEARCH', heroLines: ['C.S. Leng,', 'connecting', 'culture & commerce.'],
    intro: 'MSc Art Technology & Business candidate. I use visual design, cultural research and data storytelling to turn complex questions into clear, tangible experiences.', viewWorks: 'View works →',
    openWork: 'Open slot · ready for your next project ↗', pointLabel: '00 / Point of view', pointTitle: 'I care about how visual language helps a place, a story or a complex relationship become visible again.', pointText: 'This portfolio will keep evolving. It does not need to be full yet; every project deserves room for rhythm, scale and narrative.',
    focus: 'CURRENTLY EXPLORING', focusItems: ['Cultural memory', 'Interactive stories', 'Visual systems', 'Real materials'], workLabel: '01 / Selected works', workTitle: 'Leave room for what comes next.',
    aboutLabel: '02 / About & tools', aboutTitle: 'Tools are the language. Judgement is the grammar.', contactLabel: '03 / Contact', contactTitle: 'Let’s turn an idea into\na visible place.',
    formName: 'Name', formMessage: 'Message', sendMessage: 'Send message', email: 'Send email', leaveMessage: 'Leave a message', footer: 'C.S. LENG / PORTFOLIO 2026', location: 'GUIYANG · HONG KONG',
    educationLabel: '01 / Education', educationTitle: 'Learning keeps the view in motion.', experienceLabel: '02 / Experience', experienceTitle: 'Practising clarity in real-world contexts.',
    school: ['Lingnan University · MSc Art Technology & Business', 'Hong Kong', 'Wuhan University of Technology × UWTSD · BA Graphic Design', 'Wuhan, China · 2:1 Honours'], experienceRoles: ['Institutional Department · Intern', 'Design Intern · Wuhan, China', 'Designer / Project Planner · Guiyang, China'],
    skills: ['Illustrator', 'Photoshop', 'After Effects', 'Blender', 'C4D', 'PPT', 'Word', 'TouchDesigner', 'InDesign'], metrics: ['Years in design', 'Design awards', 'Market-ready project'], marquee: ['Art technology', 'Visual identity', 'Cultural work', 'Data stories', 'IP design'], now: 'NOW / 2026', route: 'GUIYANG → HONG KONG', availability: 'OPEN TO WORK', discipline: 'DESIGN / RESEARCH', modalKicker: 'SELECTED WORK / CASE STUDY',
    experienceBullets: [['Contributed to a RMB 200M listed-company bond issue across due diligence, financial analysis and roadshow design.', 'Compared 20 years of SSE, S&P 500 and Nikkei data and turned the findings into a one-page visual narrative.', 'Refined visual materials for three roadshows and learned core bond-pricing and credit-rating terms within two weeks.'], ['Worked with the marketing team to adapt visual concepts to user research and business goals.', 'Supported logo, poster and brochure design.'], ['Contributed to a cultural IP system for the snub-nosed monkey, from character studies and turnarounds to VI standards.', 'Designed cultural products across gifts, souvenirs, food packaging, apparel and toys.', 'Segmented products for visitors, couples and families; one product reached market.']]
  }
};

let currentLanguage = localStorage.getItem('portfolio-language') || 'zh';

function setText(selector, text) {
  const element = document.querySelector(selector);
  if (element) element.textContent = text;
}

function setTextList(selector, values) {
  document.querySelectorAll(selector).forEach((element, index) => {
    if (values[index] !== undefined) element.textContent = values[index];
  });
}

function applyLanguage(language) {
  currentLanguage = language;
  const content = languageContent[language];
  document.documentElement.lang = language === 'en' ? 'en' : 'zh-CN';
  setText('.brand-core', content.brand);
  setTextList('.nav-item > span:first-child', content.nav);
  setText('#schedule-call', content.contact);
  setText('#menu-toggle', content.menu);
  setText('.hero-copy .eyebrow', content.eyebrow);
  setText('.signal-group span:last-child', content.now);
  setText('.video-controls .mini-btn:first-child', content.route);
  setText('.video-controls .mini-btn:last-child', content.availability);
  setText('.timeline-meta span:first-child', content.discipline);
  setText('.panel-kicker', language === 'en' ? 'CONTACT / C.S. LENG' : '联系 / 冷思成');
  setText('.work-modal .panel-kicker', content.modalKicker);
  setTextList('.split-heading .line > span', content.heroLines);
  setText('.hero-intro', content.intro);
  setText('.secondary-link', content.viewWorks);
  setText('.section-note', content.openWork);
  setText('.manifesto-label .eyebrow', content.pointLabel);
  setText('.manifesto-copy h2', content.pointTitle);
  setText('.manifesto-copy p', content.pointText);
  setText('.focus-strip > span', content.focus);
  setTextList('.focus-strip > b', content.focusItems);
  setText('.projects-section .section-top .eyebrow', content.workLabel);
  setText('.projects-section .section-top h2', content.workTitle);
  setText('#education .section-top .eyebrow', content.educationLabel);
  setText('#education .section-top h2', content.educationTitle);
  setText('#experience .section-top .eyebrow', content.experienceLabel);
  setText('#experience .section-top h2', content.experienceTitle);
  setTextList('.resume-row h3', [content.school[0], content.school[2]]);
  setTextList('.resume-row p', [content.school[1], content.school[3]]);
  setTextList('.timeline-main .role', content.experienceRoles);
  setTextList('.skill-cloud span', content.skills);
  setTextList('.hero-metrics span', content.metrics);
  setTextList('.marquee-track span', [...content.marquee, ...content.marquee]);
  document.querySelectorAll('.timeline-main ul').forEach((list, index) => setTextList(`#experience .timeline-item:nth-child(${index + 1}) li`, content.experienceBullets[index] || []));
  setText('.skills-section .eyebrow', content.aboutLabel);
  setText('.about-copy h2', content.aboutTitle);
  setText('.contact-section .eyebrow', content.contactLabel);
  setText('.contact-shell h2', content.contactTitle);
  setText('[data-i18n="formName"]', content.formName);
  setText('[data-i18n="formMessage"]', content.formMessage);
  setText('[data-i18n="sendMessage"]', content.sendMessage);
  setText('.contact-actions .primary-button', content.email);
  setText('.contact-actions .secondary-button', content.leaveMessage);
  setText('.footer-line span:first-child', content.footer);
  setText('.footer-line span:nth-child(2)', content.location);
  document.querySelectorAll('[data-placeholder-en]').forEach((element) => {
    element.placeholder = language === 'en' ? element.dataset.placeholderEn : element.dataset.placeholderZh;
  });
  document.querySelectorAll('.project-slot').forEach((slot, index) => {
    const number = String(index + 1).padStart(2, '0');
    const type = language === 'en' ? ['Visual / brand / poster', 'IP / packaging / culture', 'Motion / film / interaction', 'Research / data visualisation', 'Graphic / editorial / type', 'Free theme / experiment'][index] : ['视觉设计 / 品牌 / 海报', 'IP 设计 / 包装 / 文创', '动态设计 / 影像 / 互动', '研究项目 / 数据可视化', '平面设计 / 出版 / 字体', '自由主题 / 实验性作品'][index];
    setText(`.project-slot:nth-child(${index + 1}) .project-number`, `${number} / OPEN SLOT`);
    setText(`.project-slot:nth-child(${index + 1}) h3`, language === 'en' ? 'Work coming soon' : '待上传作品');
    setText(`.project-slot:nth-child(${index + 1}) p`, type);
    setTextList(`.project-slot:nth-child(${index + 1}) .project-result`, [language === 'en' ? 'Replace with an image\nand short project note' : '替换为作品图片\n和项目简介']);
    setText(`.project-slot:nth-child(${index + 1}) .project-arrow`, language === 'en' ? 'Reserved slot ↗' : '预留入口 ↗');
  });
  document.querySelectorAll('[data-language-option]').forEach((option) => option.classList.toggle('is-active', option.dataset.languageOption === language));
  languageToggle.setAttribute('aria-label', language === 'en' ? '切换到普通话' : 'Switch to English');
  localStorage.setItem('portfolio-language', language);
  if (workModal.classList.contains('is-open')) openWork(workModal.dataset.workId || 'slot-01', false);
}

function openPanel() {
  sidePanel.classList.add('is-open');
  backdrop.classList.add('is-visible');
}

function closePanel() {
  sidePanel.classList.remove('is-open');
  backdrop.classList.remove('is-visible');
}

function openWork(workId) {
  const work = works[workId];
  if (!work) return;
  workModal.dataset.workId = workId;
  workModalCode.textContent = work.code;
  workModalArtTitle.textContent = work.artTitle;
  workModalMeta.textContent = work.meta;
  workModalTitle.textContent = work.title;
  workModalDescription.textContent = work.description;
  workModalTags.innerHTML = work.tags.map((tag) => `<span>${tag}</span>`).join('');
  workModalArt.className = `modal-art modal-art-${work.color}`;
  workModal.classList.add('is-open');
  workModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  history.replaceState(null, '', `#work-${workId}`);
}

function closeWork() {
  if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
  workModal.classList.remove('is-open');
  workModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  if (window.location.hash.startsWith('#work-')) history.replaceState(null, '', window.location.pathname);
}

languageToggle.addEventListener('click', () => {
  applyLanguage(currentLanguage === 'en' ? 'zh' : 'en');
});

scheduleButtons.forEach((button) => {
  button.addEventListener('click', openPanel);
});

panelClose.addEventListener('click', closePanel);
backdrop.addEventListener('click', closePanel);
workModalClose.addEventListener('click', closeWork);

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closePanel();
    closeWork();
  }
});

document.querySelectorAll('[data-work]').forEach((card) => {
  card.addEventListener('click', () => openWork(card.dataset.work));
});

document.querySelectorAll('.project-slot').forEach((card) => {
  card.addEventListener('pointermove', (event) => {
    const bounds = card.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;
    card.style.setProperty('--spot-x', `${x}%`);
    card.style.setProperty('--spot-y', `${y}%`);
    card.style.transform = `perspective(700px) rotateX(${(50 - y) * 0.035}deg) rotateY(${(x - 50) * 0.035}deg) translateY(-5px)`;
  });
  card.addEventListener('pointerleave', () => {
    card.style.transform = '';
  });
});

const sectionLinks = [...document.querySelectorAll('.nav-item')];
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    sectionLinks.forEach((link) => link.classList.toggle('is-current', link.getAttribute('href') === `#${entry.target.id}`));
  });
}, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
document.querySelectorAll('main section[id]').forEach((section) => sectionObserver.observe(section));

const initialWork = window.location.hash.replace('#work-', '');
if (works[initialWork]) openWork(initialWork);

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('nav-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('nav-open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

let lastScrollY = 0;
window.addEventListener('scroll', () => {
  const currentY = window.scrollY;
  if (Math.abs(currentY - lastScrollY) > 18) {
    navLinks.classList.remove('nav-open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }
  lastScrollY = currentY;
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.18 });

document.querySelectorAll('.reveal-up').forEach((element) => {
  revealObserver.observe(element);
});

window.addEventListener('pointermove', (event) => {
  document.documentElement.style.setProperty('--mouse-x', `${event.clientX}px`);
  document.documentElement.style.setProperty('--mouse-y', `${event.clientY}px`);
  document.documentElement.style.setProperty('--ambient-x', `${(event.clientX / window.innerWidth - 0.5) * 22}px`);
  document.documentElement.style.setProperty('--ambient-y', `${(event.clientY / window.innerHeight - 0.5) * 18}px`);
});

const counters = document.querySelectorAll('[data-count]');
counters.forEach((counter) => {
  const target = Number(counter.dataset.count || 0);
  const suffix = counter.dataset.suffix || '';
  let hasAnimated = false;

  const observer = new IntersectionObserver((entries) => {
    if (!entries[0].isIntersecting || hasAnimated) return;
    hasAnimated = true;

    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / 1200, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      counter.textContent = `${Math.round(target * eased)}${suffix}`;
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
    observer.disconnect();
  }, { threshold: 0.7 });

  observer.observe(counter);
});

const navItems = document.querySelectorAll('.nav-item');
navItems.forEach((item) => {
  item.addEventListener('mouseenter', () => {
    item.querySelector('.nav-icon').style.transform = 'translate(2px, -2px)';
  });
  item.addEventListener('mouseleave', () => {
    item.querySelector('.nav-icon').style.transform = '';
  });
});

const panelForm = document.querySelector('.panel-form');
panelForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const button = panelForm.querySelector('button[type="submit"]');
  button.textContent = currentLanguage === 'en' ? 'Sent' : '已發送';
  button.disabled = true;
  setTimeout(() => {
    panelForm.reset();
    button.textContent = languageContent[currentLanguage].sendMessage;
    button.disabled = false;
    closePanel();
  }, 1200);
});

const scrollProgressBar = document.getElementById('scroll-progress-bar');
function updateScrollProgress() {
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;
  scrollProgressBar.style.width = `${Math.min(progress, 100)}%`;
}

window.addEventListener('scroll', updateScrollProgress, { passive: true });
window.addEventListener('resize', updateScrollProgress);
updateScrollProgress();

applyLanguage(currentLanguage);
