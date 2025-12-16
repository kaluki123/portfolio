// Theme toggle
(function () {
  const root = document.documentElement;
  const toggle = document.querySelector('.theme-toggle');
  const icon = document.querySelector('.theme-icon');

  const saved = localStorage.getItem('theme');
  if (saved) {
    root.setAttribute('data-theme', saved);
  } else {
    root.setAttribute('data-theme', 'light');
  }

  const updateIcon = () => {
    const current = root.getAttribute('data-theme');
    icon.textContent = current === 'dark' ? '◐' : '◑';
  };

  updateIcon();

  toggle.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateIcon();
  });
})();

// Mobile nav
(function () {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav-links');

  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('open');
  });

  nav.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
})();

// Content population from content/site-content.js (global SITE_CONTENT)
(function () {
  if (!window.SITE_CONTENT) return;
  const c = window.SITE_CONTENT;

  // Hero
  document.title = c.meta.title || document.title;
  const heroName = document.getElementById('hero-name');
  const heroTagline = document.getElementById('hero-tagline');
  const heroSubtitle = document.getElementById('hero-subtitle');
  const heroLocation = document.getElementById('hero-location');
  const heroRole = document.getElementById('hero-role');
  const footerText = document.getElementById('footer-text');
  const photo = document.getElementById('hero-photo');
  const cvButton = document.getElementById('cv-button');

  if (heroName) heroName.textContent = c.hero.name;
  if (heroTagline) heroTagline.textContent = c.hero.tagline;
  if (heroSubtitle) heroSubtitle.textContent = c.hero.subtitle;
  if (heroLocation) heroLocation.textContent = c.hero.location;
  if (heroRole) heroRole.textContent = c.hero.role;
  if (footerText) footerText.textContent = c.footer;
  if (photo && c.hero.photo) photo.src = c.hero.photo;
  if (cvButton && c.hero.cvUrl) cvButton.href = c.hero.cvUrl;

  // About
  const aboutBio = document.getElementById('about-bio');
  const aboutGoals = document.getElementById('about-goals');
  const aboutEducation = document.getElementById('about-education');

  if (aboutBio) aboutBio.textContent = c.about.bio;
  if (aboutGoals) aboutGoals.textContent = c.about.goals;
  if (aboutEducation) {
    aboutEducation.innerHTML = '';
    c.about.education.forEach((item) => {
      const li = document.createElement('li');
      li.innerHTML = `<strong>${item.title}</strong><br/><span>${item.institution}</span><br/><span>${item.years}</span>`;
      aboutEducation.appendChild(li);
    });
  }

  // Skills
  const skillsList = document.getElementById('skills-list');
  if (skillsList) {
    skillsList.innerHTML = '';
    c.skills.forEach((skill) => {
      const card = document.createElement('div');
      card.className = 'skill-card';
      card.innerHTML = `
        <h3>${skill.name}</h3>
        <div class="skill-level">${skill.level}</div>
        <div class="skill-notes">${skill.notes || ''}</div>
      `;
      skillsList.appendChild(card);
    });
  }

  // Projects
  const projectsList = document.getElementById('projects-list');
  if (projectsList) {
    projectsList.innerHTML = '';
    c.projects.forEach((p) => {
      const card = document.createElement('article');
      card.className = 'project-card';
      const tags =
        p.tags && p.tags.length
          ? `<div class="project-tags">${p.tags
              .map((t) => `<span class="tag">${t}</span>`)
              .join('')}</div>`
          : '';
      const links = [];
      if (p.link) links.push(`<a href="${p.link}" target="_blank" rel="noreferrer">View project</a>`);
      if (p.github)
        links.push(`<a href="${p.github}" target="_blank" rel="noreferrer">Source code</a>`);
      card.innerHTML = `
        <h3>${p.title}</h3>
        <div class="project-meta">${p.context}</div>
        <div class="project-desc">${p.description}</div>
        ${tags}
        <div class="project-links">${links.join('')}</div>
      `;
      projectsList.appendChild(card);
    });
  }

  // Experience
  const experienceList = document.getElementById('experience-list');
  if (experienceList) {
    experienceList.innerHTML = '';
    c.experience.forEach((ex) => {
      const item = document.createElement('article');
      item.className = 'experience-item';
      item.innerHTML = `
        <div class="experience-header">
          <div>
            <h3>${ex.role}</h3>
            <div class="experience-org">${ex.org}</div>
          </div>
          <div class="experience-duration">${ex.period}</div>
        </div>
        <div class="experience-body">${ex.summary}</div>
        ${
          ex.reference
            ? `<div class="experience-ref">Reference: ${ex.reference.name} (${ex.reference.role}) — ${ex.reference.contact}</div>`
            : ''
        }
      `;
      experienceList.appendChild(item);
    });
  }

  // Blog
  const blogList = document.getElementById('blog-list');
  if (blogList) {
    blogList.innerHTML = '';
    if (!c.blog || !c.blog.length) {
      blogList.innerHTML =
        '<p style="margin:0;color:var(--muted);font-size:0.9rem;">Blog posts coming soon. I am currently preparing beginner-friendly guides.</p>';
    } else {
      c.blog.forEach((post) => {
        const card = document.createElement('article');
        card.className = 'blog-card';
        card.innerHTML = `
          <h3>${post.title}</h3>
          <div class="blog-meta">${post.date} · ${post.level}</div>
          <div class="blog-excerpt">${post.excerpt}</div>
          ${
            post.url
              ? `<a href="${post.url}" target="_blank" rel="noreferrer">Read more</a>`
              : ''
          }
        `;
        blogList.appendChild(card);
      });
    }
  }

  // Contact links
  const contactLinks = document.getElementById('contact-links');
  if (contactLinks) {
    contactLinks.innerHTML = '';
    c.contact.links.forEach((link) => {
      const li = document.createElement('li');
      li.innerHTML = `<strong>${link.label}:</strong> <a href="${link.href}" target="_blank" rel="noreferrer">${link.text}</a>`;
      contactLinks.appendChild(li);
    });
  }
})();


