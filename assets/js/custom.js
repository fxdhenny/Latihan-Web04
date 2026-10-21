'use strict';

// Navigasi: tandai section yang sedang terlihat dan rapikan menu di layar kecil.
document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('mainNavbar');
    const navCollapse = document.getElementById('navbarContent');
    const menuLinks = [...document.querySelectorAll('.navbar-nav .nav-link[href^="#"]')];
    const sections = menuLinks
        .map(link => document.querySelector(link.getAttribute('href')))
        .filter(Boolean);

    const setActiveLink = (sectionId) => {
        menuLinks.forEach(link => {
            const isActive = link.getAttribute('href') === `#${sectionId}`;
            link.classList.toggle('active', isActive);
            if (isActive) link.setAttribute('aria-current', 'location');
            else link.removeAttribute('aria-current');
        });
    };


    // Navigasi dengan smooth scroll dan active state.
    const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
    );

    menuLinks.forEach(link => {
        link.addEventListener('click', event => {
            const targetSelector = link.getAttribute('href');
            const targetSection = document.querySelector(targetSelector);

            if (!targetSection) return;

            // Cegah anchor bawaan browser agar tidak terjadi dua perpindahan.
            event.preventDefault();

            // Perbarui menu aktif.
            setActiveLink(targetSection.id);

            // Perbarui hash URL tanpa memicu navigasi anchor kedua.
            if (window.location.hash !== targetSelector) {
                history.pushState(null, '', targetSelector);
            }

            // Scroll setelah menu mobile selesai ditutup.
            const scrollToTarget = () => {
                targetSection.scrollIntoView({
                    behavior: prefersReducedMotion.matches
                        ? 'auto'
                        : 'smooth',
                    block: 'start'
                });
            };

            if (
                navCollapse &&
                navCollapse.classList.contains('show') &&
                window.bootstrap
            ) {
                navCollapse.addEventListener(
                    'hidden.bs.collapse',
                    scrollToTarget,
                    { once: true }
                );

                window.bootstrap.Collapse
                    .getOrCreateInstance(navCollapse)
                    .hide();
            } else {
                // Pada desktop, langsung mulai smooth scroll.
                scrollToTarget();
            }
        });
    });


    const updateNavbar = () => {
        if (navbar) navbar.classList.toggle('nav-scrolled', window.scrollY > 8);
    };
    updateNavbar();
    window.addEventListener('scroll', updateNavbar, { passive: true });

    // Scroll spy custom agar state menu juga mengikuti scroll manual.
    if ('IntersectionObserver' in window && sections.length) {
        const sectionObserver = new IntersectionObserver((entries) => {
            const visible = entries
                .filter(entry => entry.isIntersecting)
                .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
            if (visible) setActiveLink(visible.target.id);
        }, {
            rootMargin: '-22% 0px -58% 0px',
            threshold: [0, 0.15, 0.35, 0.6]
        });
        sections.forEach(section => sectionObserver.observe(section));
    }

    // Grafik: nilai berikut hanya data simulasi, bukan statistik aktual.
    const chartCanvas = document.getElementById('grafikKekerasan');
    if (chartCanvas && typeof window.Chart !== 'undefined') {
        new window.Chart(chartCanvas, {
            type: 'bar',
            data: {
                labels: ['Seksual', 'Fisik', 'Perundungan', 'Diskriminasi', 'Psikis'],
                datasets: [{
                    label: 'Jumlah ilustratif',
                    data: [12, 5, 18, 3, 9],
                    backgroundColor: [
                        'rgba(23, 105, 224, .78)',
                        'rgba(20, 184, 166, .78)',
                        'rgba(245, 158, 11, .78)',
                        'rgba(139, 92, 246, .78)',
                        'rgba(217, 54, 79, .72)'
                    ],
                    borderRadius: 7,
                    borderSkipped: false,
                    maxBarThickness: 48
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: context => ` ${context.parsed.y} (ilustrasi)`
                        }
                    }
                },
                scales: {
                    x: {
                        grid: { display: false },
                        ticks: { color: '#62718a', maxRotation: 0, minRotation: 0, font: { family: 'Plus Jakarta Sans', size: 11 } }
                    },
                    y: {
                        beginAtZero: true,
                        suggestedMax: 20,
                        ticks: { precision: 0, stepSize: 5, color: '#62718a' },
                        grid: { color: 'rgba(98, 113, 138, .13)' }
                    }
                }
            }
        });
    } else if (chartCanvas) {
        chartCanvas.insertAdjacentHTML('afterend', '<p class="text-secondary small mt-3">Grafik tidak dapat dimuat. Periksa koneksi ke pustaka Chart.js.</p>');
    }

    // Form ini sengaja tidak mengirim atau menyimpan data karena belum ada backend.
    const reportForm = document.getElementById('reportForm');
    const formStatus = document.getElementById('formStatus');
    if (reportForm && formStatus) {
        reportForm.addEventListener('submit', event => {
            event.preventDefault();

            if (!reportForm.checkValidity()) {
                reportForm.classList.add('was-validated');
                const firstInvalid = reportForm.querySelector(':invalid');
                if (firstInvalid) firstInvalid.focus();
                formStatus.className = 'form-status alert alert-warning mt-3 show';
                formStatus.textContent = 'Lengkapi kategori dan ringkasan untuk menguji validasi tampilan. Data tetap tidak dikirim atau disimpan.';
                return;
            }

            formStatus.className = 'form-status alert alert-info mt-3 show';
            formStatus.textContent = 'Simulasi berhasil: tampilan formulir bekerja, tetapi tidak ada data yang dikirim atau disimpan. Untuk laporan nyata, gunakan kanal resmi yang telah diverifikasi.';
        });
    }

    // Scroll reveal dengan progressive enhancement: konten tidak disembunyikan jika JS/observer gagal.
    const revealItems = document.querySelectorAll('.reveal');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduceMotion && 'IntersectionObserver' in window && revealItems.length) {
        document.documentElement.classList.add('reveal-ready');
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -25px 0px' });

        revealItems.forEach(item => revealObserver.observe(item));
    }
});