/* ============================================
   Afrah Sanaa - Archive of Discoveries
   Interactive Engine
   ============================================ */
(function () {
  'use strict';

  // ============================================
  // PARTICLES (Hero)
  // ============================================
  function initParticles() {
    const c = document.getElementById('particleCanvas');
    if (!c) return;
    const ctx = c.getContext('2d');
    let w, h, pts, id;

    function resize() {
      const rect = c.parentElement.getBoundingClientRect();
      w = c.width = rect.width;
      h = c.height = rect.height;
    }

    function create() {
      const n = Math.min(30, (w * h) / 25000 | 0);
      pts = [];
      for (let i = 0; i < n; i++) {
        pts.push({
          x: Math.random() * w, y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.08,
          vy: (Math.random() - 0.5) * 0.08,
          r: Math.random() * 2 + 0.3,
          a: Math.random() * 0.2 + 0.03,
          ph: Math.random() * 6.28
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark' ||
        (!document.documentElement.getAttribute('data-theme') && window.matchMedia('(prefers-color-scheme:dark)').matches);
      const color = isDark ? '200,169,106' : '39,76,119';

      for (const p of pts) {
        p.x += p.vx; p.y += p.vy; p.ph += 0.006;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        const pa = p.a * (0.5 + 0.5 * Math.sin(p.ph));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 6.28);
        ctx.fillStyle = `rgba(${color}, ${pa})`;
        ctx.fill();
      }
      id = requestAnimationFrame(draw);
    }

    resize(); create(); draw();
    window.addEventListener('resize', () => { resize(); create(); });
  }

  // ============================================
  // NAVIGATION
  // ============================================
  function initNav() {
    const nav = document.querySelector('.nav');
    const menuBtn = document.getElementById('menuBtn');
    const menu = document.getElementById('navMenu');

    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });

    if (menuBtn && menu) {
      menuBtn.addEventListener('click', () => {
        const open = menuBtn.classList.toggle('open');
        menu.hidden = !open;
        menuBtn.setAttribute('aria-expanded', open);
      });

      menu.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
          menuBtn.classList.remove('open');
          menu.hidden = true;
          menuBtn.setAttribute('aria-expanded', 'false');
        });
      });
    }
  }

  // ============================================
  // LANGUAGE TOGGLE
  // ============================================
  function initLanguage() {
    const btn = document.getElementById('langBtn');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const html = document.documentElement;
      html.lang = html.lang === 'en' ? 'fr' : 'en';
    });
  }

  // ============================================
  // THEME TOGGLE (Dark/Light)
  // ============================================
  function initTheme() {
    const btn = document.getElementById('themeBtn');
    if (!btn) return;

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const stored = localStorage.getItem('afrah_theme');
    let theme = stored || (prefersDark ? 'dark' : 'light');

    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }

    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem('afrah_theme', next); } catch {}
    });
  }

  // ============================================
  // BOOK MODAL (Project Details)
  // ============================================
  function initBookModal() {
    const modal = document.getElementById('bookModal');
    const overlay = modal.querySelector('.bm-overlay');
    const close = modal.querySelector('.bm-close');
    const page = document.getElementById('bmPage');
    const pageRight = document.getElementById('bmPageRight');

    const DATA = {
      hr: {
        ref: 'ARCH-001',
        github: 'https://github.com/afrahsanaa/hr-analytics-project',
        meta: [
          { label: 'Classification', valueEn: 'Featured Project', valueFr: 'Projet Principal' },
          { label: 'Organization', valueEn: 'Personal Project', valueFr: 'Projet Personnel' },
          { label: 'Duration', valueEn: '2026', valueFr: '2026' },
          { label: 'Status', valueEn: 'Completed', valueFr: 'Terminé' },
          { label: 'Repository', valueEn: 'Public', valueFr: 'Public' }
        ],
        metrics: [
          { value: '2M', labelEn: 'Employees', labelFr: 'Employés' },
          { value: '7', labelEn: 'Dimensions', labelFr: 'Dimensions' },
          { value: '1', labelEn: 'Fact Table', labelFr: 'Table de Faits' },
          { value: '30+', labelEn: 'DAX Measures', labelFr: 'Mesures DAX' },
          { value: '5', labelEn: 'Dashboard Pages', labelFr: 'Pages Dashboard' }
        ],
        en: {
          title: 'HR Analytics Data Warehouse',
          overview: 'A complete analytics ecosystem built on PostgreSQL with a star schema design, processing over 2 million employee records. The ETL pipeline ingests raw HR data from multiple sources, transforms it through cleaning and enrichment stages, and loads it into a dimensional model purpose-built for workforce analytics.',
          items: [
            'PostgreSQL data warehouse with star schema (1 fact table, 7 dimensions)',
            'Automated ETL pipeline for data ingestion, cleaning and transformation',
            '30+ DAX measures for workforce KPIs, turnover analysis and compensation modelling',
            'Multi-page Power BI executive dashboard with drill-through and bookmarks',
            'Business recommendations derived from data patterns - not just charts'
          ],
          note: null
        },
        fr: {
          title: "Entrepôt de Données RH",
          overview: "Un écosystème analytique complet construit sur PostgreSQL avec un schéma en étoile, traitant plus de 2 millions de fiches employés. Le pipeline ETL ingère les données RH brutes de multiples sources, les transforme et les charge dans un modèle dimensionnel conçu pour l'analyse des ressources humaines.",
          items: [
            "Entrepôt PostgreSQL en schéma en étoile (1 table de faits, 7 dimensions)",
            "Pipeline ETL automatisé pour l'ingestion et la transformation",
            "30+ mesures DAX pour KPI RH, turnover et modélisation des rémunérations",
            "Tableau de bord Power BI multi-pages avec drill-through et bookmarks",
            "Recommandations métier issues des données - pas seulement des graphiques"
          ],
          note: null
        },
        tags: ['PostgreSQL', 'Power BI', 'DAX', 'SQL', 'ETL', 'Star Schema']
      },
      oil: {
        ref: 'ARCH-002',
        meta: [
          { label: 'Classification', valueEn: 'Professional Internship', valueFr: 'Stage Professionnel' },
          { label: 'Organization', valueEn: 'Sonatrach', valueFr: 'Sonatrach' },
          { label: 'Duration', valueEn: '6 Months', valueFr: '6 Mois' },
          { label: 'Status', valueEn: 'Completed', valueFr: 'Terminé' },
          { label: 'Repository', valueEn: 'Private', valueFr: 'Privé' }
        ],
        metrics: [
          { value: 'RF', labelEn: 'Random Forest', labelFr: 'Random Forest' },
          { value: 'Python', labelEn: 'Core Language', labelFr: 'Langage Principal' },
          { value: 'MDB', labelEn: 'MongoDB', labelFr: 'MongoDB' },
          { value: 'React', labelEn: 'Dashboard Frontend', labelFr: 'Frontend Dashboard' },
          { value: 'Flask', labelEn: 'API Backend', labelFr: 'Backend API' }
        ],
        en: {
          title: 'Predictive Oil Drilling Analytics',
          overview: 'Developed during a Data Science internship at Sonatrach - the largest oil and gas company in Africa. This predictive analytics platform ingests drilling data from multiple sources to train Random Forest models that forecast operational outcomes, helping reduce downtime and optimize drilling parameters.',
          items: [
            'Random Forest predictive models trained on industrial drilling data',
            'Python pipeline for data processing, feature engineering and visualization',
            'MongoDB for time-series storage of drilling sensor data',
            'React + Flask web dashboard for interactive exploration',
            'Heatmap visualizations of drilling patterns across well sites'
          ],
          note: 'Developed during a professional internship at Sonatrach. Source code is confidential.'
        },
        fr: {
          title: "Analytique Prédictive de Forage Pétrolier",
          overview: "Développé lors d'un stage en Data Science à Sonatrach - la plus grande compagnie pétrolière et gazière d'Afrique. Cette plateforme d'analyse prédictive ingère des données de forage provenant de multiples sources pour entraîner des modèles Random Forest qui prévoient les résultats opérationnels.",
          items: [
            "Modèles prédictifs Random Forest sur données de forage industrielles",
            "Pipeline Python pour traitement, feature engineering et visualisation",
            "MongoDB pour le stockage temporel des données de capteurs",
            "Dashboard web React + Flask pour exploration interactive",
            "Heatmaps des motifs de forage sur plusieurs sites"
          ],
          note: "Développé lors d'un stage professionnel à Sonatrach. Code source confidentiel."
        },
        tags: ['Python', 'MongoDB', 'React', 'Flask', 'Random Forest']
      },
      professional: {
        ref: 'ARCH-003+',
        meta: [
          { label: 'Classification', valueEn: 'Professional Experience', valueFr: 'Expérience Professionnelle' },
          { label: 'Organization', valueEn: 'Bomare Company', valueFr: 'Bomare Company' },
          { label: 'Duration', valueEn: '2023–2025', valueFr: '2023–2025' },
          { label: 'Status', valueEn: 'Completed', valueFr: 'Terminé' },
          { label: 'Repository', valueEn: 'Private', valueFr: 'Privé' }
        ],
        metrics: [
          { value: '+5', labelEn: 'Internal Platforms (selected)', labelFr: 'Plateformes Internes (sélection)' },
          { value: 'Node.js', labelEn: 'Backend Runtime', labelFr: 'Runtime Backend' },
          { value: 'MySQL', labelEn: 'Relational DB', labelFr: 'BD Relationnelle' },
          { value: 'REST', labelEn: 'API Architecture', labelFr: 'Architecture API' },
          { value: 'RT', labelEn: 'Real-time Features', labelFr: 'Temps Réel' }
        ],
        en: {
          title: 'Professional Projects Collection',
          overview: 'More than five internal platforms built end-to-end during my time at Bomare Company. The selection below highlights the most representative ones. Each project solved a real operational problem - from fleet tracking to employee evaluations - using custom architecture, relational databases and real-time features.',
          items: [
            'Vehicle Tracking Platform: Real-time GPS fleet monitoring with Leaflet maps and Socket.IO',
            'Employee Evaluation Platform: Role-based performance management with dashboards and reporting',
            'Video Game Competition Platform: Tournament registrations, scheduling, real-time scoring and admin dashboard',
            'RMA Management Platform: End-to-end warranty return workflow with multi-level approval pipeline and reporting',
            'School Management Application: Student management, schedules, examinations, role-based access and admin dashboards'
          ],
          note: 'Developed professionally at Bomare Company. Source code is confidential.'
        },
        fr: {
          title: "Collection de Projets Professionnels",
          overview: "Plus de cinq plateformes internes construites de bout en bout chez Bomare Company. La sélection ci-dessous met en avant les plus représentatives. Chaque projet a résolu un problème opérationnel réel - du suivi de flotte aux évaluations des employés - avec une architecture sur mesure, des bases de données relationnelles et des fonctionnalités temps réel.",
          items: [
            "Plateforme de Géolocalisation : Suivi GPS temps réel avec Leaflet et Socket.IO",
            "Plateforme RMA : Gestion des retours avec flux d'approbation multi-niveaux et reporting",
            "Plateforme d'Évaluation : Gestion de performance avec tableaux de bord et rapports",
            "Plateforme de Compétition Jeux Vidéo : Inscriptions, planning, score en temps réel et dashboard admin",
            "Application Scolaire : Gestion des étudiants, emplois du temps, examens et accès par rôles"
          ],
          note: "Développé professionnellement chez Bomare Company. Code source confidentiel."
        },
        tags: ['Node.js', 'MySQL', 'MongoDB', 'Socket.IO', 'HTMX', 'Express', 'REST']
      },
      blockchain: {
        ref: 'ARCH-008',
        github: 'https://github.com/afrahsanaa/BlockChainApp',
        meta: [
          { label: 'Classification', valueEn: 'Academic Project', valueFr: 'Projet Académique' },
          { label: 'Organization', valueEn: 'University', valueFr: 'Université' },
          { label: 'Duration', valueEn: '2022', valueFr: '2022' },
          { label: 'Status', valueEn: 'Completed', valueFr: 'Terminé' },
          { label: 'Repository', valueEn: 'Public', valueFr: 'Public' }
        ],
        metrics: [
          { value: 'Java', labelEn: 'Core Language', labelFr: 'Langage Principal' },
          { value: 'JavaFX', labelEn: 'Desktop UI', labelFr: 'Interface Desktop' },
          { value: 'JSON', labelEn: 'Data Persistence', labelFr: 'Persistance' },
          { value: 'P2P', labelEn: 'Network Model', labelFr: 'Modèle Réseau' },
          { value: 'Custom', labelEn: 'Blockchain Engine', labelFr: 'Moteur Blockchain' }
        ],
        en: {
          title: 'Blockchain Bus Stations Management',
          overview: 'An academic open-source project implementing a custom blockchain for managing bus station transactions and scheduling. Built from scratch in Java with JavaFX for the desktop interface and JSON for lightweight persistence. Demonstrates distributed ledger concepts applied to a real-world transportation scenario.',
          items: [
            'Custom blockchain implementation with proof-of-work consensus',
            'Distributed peer-to-peer ledger for transaction management',
            'Bus station scheduling, validation and route tracking',
            'JavaFX desktop interface for node administration',
            'JSON-based data persistence between sessions'
          ],
          note: null
        },
        fr: {
          title: "Gestion de Gares Routières Blockchain",
          overview: "Un projet académique open-source implémentant une blockchain personnalisée pour la gestion des transactions et de la planification des gares routières. Construit de zéro en Java avec JavaFX pour l'interface desktop et JSON pour la persistance des données.",
          items: [
            "Implémentation blockchain personnalisée avec preuve de travail",
            "Registre pair-à-pair distribué pour la gestion des transactions",
            "Planification, validation et suivi des itinéraires de gares",
            "Interface desktop JavaFX pour l'administration des nœuds",
            "Persistance JSON entre les sessions"
          ],
          note: null
        },
        tags: ['Java', 'JavaFX', 'Blockchain', 'P2P', 'JSON', 'Cryptography']
      }
    };

    function renderMeta(meta, isFr) {
      return meta.map(m =>
        `<div class="bp-meta-item"><span class="bp-meta-label">${m.label}:</span><span class="bp-meta-value">${isFr ? m.valueFr : m.valueEn}</span></div>`
      ).join('');
    }

    function renderMetrics(metrics) {
      return metrics.map(m =>
        `<div class="bp-metric"><span class="bp-metric-value">${m.value}</span><span class="bp-metric-label">${m.labelEn}</span></div>`
      ).join('');
    }

    function openModal(id) {
      const d = DATA[id];
      if (!d) return;
      const isFr = document.documentElement.lang === 'fr';
      const data = isFr ? d.fr : d.en;

      // Left page
      let leftHtml = `
        <div class="bp-meta">${renderMeta(d.meta, isFr)}</div>
        <span class="bp-ref">${d.ref}</span>
        <h3 class="bp-title">${data.title}</h3>
        <div class="bp-section">
          <p class="bp-body">${data.overview}</p>
        </div>
        <div class="bp-section">
          <span class="bp-section-title">${isFr ? 'Points Clés' : 'Key Highlights'}</span>
          <ul class="bp-list">${data.items.map(i => `<li>${i}</li>`).join('')}</ul>
        </div>
        <div class="bp-section">
          <span class="bp-section-title">${isFr ? 'Technologies' : 'Stack'}</span>
          <div class="bp-tags">${d.tags.map(t => `<span class="btag">${t}</span>`).join('')}</div>
        </div>
        ${d.github ? `<div class="bp-section"><a href="${d.github}" target="_blank" rel="noopener noreferrer" class="bp-github">${isFr ? 'Voir sur GitHub' : 'View on GitHub'} →</a></div>` : ''}
        ${data.note ? `<div class="bp-section"><p class="bp-note">${data.note}</p></div>` : ''}
      `;
      page.innerHTML = leftHtml;

      // Right page
      let rightHtml = `
        <div class="bp-section">
          <span class="bp-section-title">${isFr ? 'Métriques du Projet' : 'Project Metrics'}</span>
          <div class="bp-metrics">${renderMetrics(d.metrics)}</div>
        </div>
      `;
      pageRight.innerHTML = rightHtml;

      modal.hidden = false;
      requestAnimationFrame(() => { modal.classList.add('open'); });
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      modal.classList.remove('open');
      setTimeout(() => { modal.hidden = true; document.body.style.overflow = ''; }, 400);
    }

    document.querySelectorAll('.book').forEach(book => {
      book.addEventListener('click', () => {
        openModal(book.dataset.project);
      });
    });

    overlay.addEventListener('click', closeModal);
    close.addEventListener('click', closeModal);

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && !modal.hidden) closeModal();
    });
  }

  // ============================================
  // SCROLL REVEAL
  // ============================================
  function initReveal() {
    const els = document.querySelectorAll('.reveal, .jstep, .book, .tool-artifact, .flow-item');
    if (!els.length) return;
    const obs = new IntersectionObserver(entries => {
      for (const e of entries) {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
      }
    }, { threshold: 0.08, rootMargin: '0px 0px -40px' });
    els.forEach(el => obs.observe(el));
  }

  // ============================================
  // JOURNEY STEPS ANIMATION
  // ============================================
  function initJourneySteps() {
    const steps = document.querySelectorAll('.jstep');
    if (!steps.length) return;
    const obs = new IntersectionObserver(entries => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.style.opacity = '1';
          e.target.style.transform = 'translateY(0)';
          obs.unobserve(e.target);
        }
      }
    }, { threshold: 0.15 });

    steps.forEach((s, i) => {
      s.style.opacity = '0';
      s.style.transform = 'translateY(16px)';
      s.style.transition = `opacity 0.5s ease ${i * 0.1}s, transform 0.5s ease ${i * 0.1}s`;
      obs.observe(s);
    });
  }

  // ============================================
  // TOOLTIP TITLE UPDATES
  // ============================================
  function initMicro() {
    const gh = document.querySelector('.clink[aria-label="GitHub"]');
    if (gh) gh.title = document.documentElement.lang === 'fr'
      ? "Là où je me dispute parfois avec Git."
      : 'Where I occasionally argue with Git.';

    document.getElementById('langBtn')?.addEventListener('click', () => {
      if (gh) gh.title = document.documentElement.lang === 'fr'
        ? "Là où je me dispute parfois avec Git."
        : 'Where I occasionally argue with Git.';
    });
  }

  // ============================================
  // INIT
  // ============================================
  function init() {
    initParticles();
    initNav();
    initLanguage();
    initTheme();
    initBookModal();
    initReveal();
    initJourneySteps();
    initMicro();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
