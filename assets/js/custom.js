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

    // --------------------------------------------------------
    // AMBIL DATA DINAMIS DARI DATABASE VIA API (JSON)
    // --------------------------------------------------------
    fetch('api_data.php')
        .then(response => response.json())
        .then(data => {
            
            // 1. Render Kartu Kekerasan
            const containerKekerasan = document.getElementById('container-kekerasan');
            if (containerKekerasan) {
                containerKekerasan.innerHTML = data.kekerasan.map(item => `
                    <div class="col reveal is-visible">
                        <article class="violence-card">
                            <div class="violence-icon"><i class="bi ${item.icon}" aria-hidden="true"></i></div>
                            <h3>${item.judul}</h3>
                            <p>${item.deskripsi}</p>
                        </article>
                    </div>
                `).join('');
            }

            // 2. Render Kartu Alur
            const containerAlur = document.getElementById('container-alur');
            if (containerAlur) {
                containerAlur.innerHTML = data.alur.map(item => `
                    <div class="col-md-6 reveal is-visible">
                        <article class="process-card">
                            <div class="process-number">${item.nomor}</div>
                            <div>
                                <h3>${item.judul}</h3>
                                <p>${item.deskripsi}</p>
                            </div>
                        </article>
                    </div>
                `).join('');
            }

            // 3. Render Grafik Chart.js
            const chartCanvas = document.getElementById('grafikKekerasan');
            if (chartCanvas && typeof window.Chart !== 'undefined') {
                const labels = data.chart.labels.length > 0 ? data.chart.labels : ['Belum ada data'];
                const chartData = data.chart.data.length > 0 ? data.chart.data : [0];

                new window.Chart(chartCanvas, {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Jumlah Laporan',
                            data: chartData,
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
                            tooltip: { callbacks: { label: context => ` ${context.parsed.y} Kasus` } }
                        },
                        scales: {
                            x: { grid: { display: false }, ticks: { color: '#62718a', font: { family: 'Plus Jakarta Sans', size: 11 } } },
                            y: { beginAtZero: true, suggestedMax: 20, ticks: { precision: 0, stepSize: 5, color: '#62718a' }, grid: { color: 'rgba(98, 113, 138, .13)' } }
                        }
                    }
                });
            }
        })
        .catch(error => console.error('Gagal memuat data:', error));

    // Form Pengaduan Dinamis menggunakan Fetch API
    const reportForm = document.getElementById('reportForm');
    const formStatus = document.getElementById('formStatus');

    if (reportForm && formStatus) {
        // Tambahkan 'async' di sini karena kita menggunakan await (Fetch API)
        reportForm.addEventListener('submit', async event => {
            event.preventDefault();

            // Cek validasi HTML bawaan (atribut required)
            if (!reportForm.checkValidity()) {
                reportForm.classList.add('was-validated');
                const firstInvalid = reportForm.querySelector(':invalid');
                if (firstInvalid) firstInvalid.focus();
                formStatus.className = 'form-status alert alert-warning mt-3 show';
                formStatus.textContent = 'Silakan lengkapi kategori dan ringkasan kejadian.';
                return;
            }

            // Ubah tampilan status menjadi 'Sedang mengirim...'
            formStatus.className = 'form-status alert alert-primary mt-3 show';
            formStatus.textContent = 'Mengirim laporan...';

            // Siapkan data dari form
            const formData = new FormData(reportForm);

            try {
                // Kirim data ke proses_lapor.php (file backend PHP)
                const response = await fetch('proses_lapor.php', {
                    method: 'POST',
                    body: formData
                });

                const result = await response.text();

                // Jika sukses menyimpan ke database
                formStatus.className = 'form-status alert alert-success mt-3 show';
                formStatus.textContent = 'Laporan berhasil disubmit dan tersimpan di database!';

                // Reset form kembali kosong
                reportForm.reset();
                reportForm.classList.remove('was-validated');

                // Segarkan (reload) halaman setelah 2 detik agar grafik memuat data baru secara otomatis
                setTimeout(() => {
                    location.reload();
                }, 2000);

            } catch (error) {
                // Jika terjadi error pada jaringan atau XAMPP bermasalah
                formStatus.className = 'form-status alert alert-danger mt-3 show';
                formStatus.textContent = 'Gagal menyimpan laporan. Pastikan XAMPP (Apache & MySQL) menyala.';
            }
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