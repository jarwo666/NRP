// Enhanced interactivity for Nasional Roleplay website

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for internal links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add loading animation for Discord button
    const discordButton = document.querySelector('.discord-button');
    if (discordButton) {
        discordButton.addEventListener('click', function(e) {
            // Add loading state
            const originalText = this.innerHTML;
            this.innerHTML = '<span class="discord-icon">⏳</span> Menghubungkan...';
            this.style.pointerEvents = 'none';

            // Reset after 3 seconds (in case of connection issues)
            setTimeout(() => {
                this.innerHTML = originalText;
                this.style.pointerEvents = 'auto';
            }, 3000);
        });
    }

    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe team members for staggered animation
    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach((member, index) => {
        // Initial state
        member.style.opacity = '0';
        member.style.transform = 'translateY(20px)';
        member.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;

        observer.observe(member);
    });

    // Add parallax effect to header
    let ticking = false;

    function updateParallax() {
        const scrolled = window.pageYOffset;
        const header = document.querySelector('.header');

        if (header) {
            const rate = scrolled * -0.5;
            header.style.transform = `translateY(${rate}px)`;
        }

        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick);

    // Add mobile menu toggle (for future mobile menu implementation)
    function createMobileMenu() {
        const header = document.querySelector('.header');
        const mobileMenuButton = document.createElement('button');
        mobileMenuButton.className = 'mobile-menu-button';
        mobileMenuButton.innerHTML = '☰';
        mobileMenuButton.setAttribute('aria-label', 'Toggle mobile menu');
        mobileMenuButton.style.display = 'none';

        if (header) {
            header.appendChild(mobileMenuButton);
        }

        // Show mobile menu button on small screens
        function checkScreenSize() {
            if (window.innerWidth <= 768) {
                mobileMenuButton.style.display = 'block';
            } else {
                mobileMenuButton.style.display = 'none';
            }
        }

        window.addEventListener('resize', checkScreenSize);
        checkScreenSize();
    }

    // Initialize mobile menu
    createMobileMenu();

    // Add keyboard navigation improvements
    document.addEventListener('keydown', function(e) {
        // Skip to main content with Alt+M
        if (e.altKey && e.key === 'm') {
            e.preventDefault();
            const mainContent = document.querySelector('.main-content');
            if (mainContent) {
                mainContent.focus();
                mainContent.scrollIntoView({ behavior: 'smooth' });
            }
        }

        // Focus Discord button with Alt+D
        if (e.altKey && e.key === 'd') {
            e.preventDefault();
            if (discordButton) {
                discordButton.focus();
            }
        }
    });

    // Add performance monitoring
    function measurePerformance() {
        if ('performance' in window) {
            window.addEventListener('load', function() {
                setTimeout(function() {
                    const perfData = performance.getEntriesByType('navigation')[0];
                    if (perfData && perfData.loadEventEnd - perfData.loadEventStart > 3000) {
                        console.log('Website load time is slower than optimal');
                    }
                }, 0);
            });
        }
    }

    measurePerformance();

    // Add service worker registration for offline support (optional)
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            // Uncomment the following lines if you want to add offline support
            /*
            navigator.serviceWorker.register('/sw.js')
                .then(function(registration) {
                    console.log('ServiceWorker registration successful');
                })
                .catch(function(error) {
                    console.log('ServiceWorker registration failed');
                });
            */
        });
    }

    // Community Features Initialization
        initCommunityFeatures();
    
        console.log('Nasional Roleplay website initialized successfully! 🇮🇩');
    });
    
    // Community Features
    function initCommunityFeatures() {
        initRoleplayFeed();
        initParticleSystem();
        initMagicButton();
        initDeveloperAnimations();
        initSoundSystem();
    }

// Roleplay Feed & Developer Features
function initRoleplayFeed() {
    const roleplayFeed = document.getElementById('roleplayFeed');

    const roleplayActivities = [
        {
            type: 'government',
            icon: '🏛️',
            content: '<strong>Rapat Parlemen</strong> sedang membahas anggaran kota untuk tahun depan',
            category: 'Government'
        },
        {
            type: 'police',
            icon: '🚔',
            content: '<strong>Operasi Zebra</strong> sedang berlangsung di persimpangan utama kota',
            category: 'Police'
        },
        {
            type: 'business',
            icon: '💼',
            content: '<strong>Grand Opening</strong> dealer mobil baru dengan sistem kredit inovatif',
            category: 'Business'
        },
        {
            type: 'medical',
            icon: '🏥',
            content: '<strong>Kasus Darurat</strong> - Tim medis merespon kecelakaan beruntun di highway',
            category: 'Medical'
        },
        {
            type: 'government',
            icon: '🏛️',
            content: '<strong>Pemilihan Walikota</strong> memasuki tahap akhir dengan 3 kandidat terkuat',
            category: 'Government'
        },
        {
            type: 'business',
            icon: '💼',
            content: '<strong>Business Meeting</strong> antara perusahaan teknologi dan investor asing',
            category: 'Business'
        }
    ];

    function updateRoleplayFeed() {
        if (!roleplayFeed) return;

        // Add new roleplay activity occasionally
        if (Math.random() < 0.4) {
            const newActivities = [
                {
                    type: 'police',
                    icon: '🚔',
                    content: '<strong>Penangkapan</strong> - Satuan narkoba berhasil menggerebek sindikat besar',
                    category: 'Police'
                },
                {
                    type: 'medical',
                    icon: '🏥',
                    content: '<strong>Operasi Bedah</strong> - Tim dokter melakukan operasi darurat pada pasien kritis',
                    category: 'Medical'
                },
                {
                    type: 'business',
                    icon: '💼',
                    content: '<strong>Deal Bisnis</strong> - Kesepakatan merger perusahaan senilai miliaran dollar',
                    category: 'Business'
                },
                {
                    type: 'government',
                    icon: '🏛️',
                    content: '<strong>Sidang DPR</strong> - Pembahasan undang-undang baru tentang ekonomi kota',
                    category: 'Government'
                }
            ];

            const randomActivity = newActivities[Math.floor(Math.random() * newActivities.length)];
            roleplayActivities.unshift(randomActivity);

            // Keep only last 6 activities
            if (roleplayActivities.length > 6) {
                roleplayActivities.pop();
            }

            renderRoleplayFeed();
        }
    }

    function renderRoleplayFeed() {
        if (!roleplayFeed) return;

        roleplayFeed.innerHTML = '';

        roleplayActivities.forEach((activity, index) => {
            setTimeout(() => {
                const feedElement = document.createElement('div');
                feedElement.className = 'feed-item';
                feedElement.style.opacity = '0';
                feedElement.style.transform = 'translateX(-20px)';

                feedElement.innerHTML = `
                    <div class="feed-type ${activity.type}">${activity.icon} ${activity.category}</div>
                    <div class="feed-content">${activity.content}</div>
                `;

                roleplayFeed.appendChild(feedElement);

                // Animate in
                setTimeout(() => {
                    feedElement.style.transition = 'all 0.5s ease';
                    feedElement.style.opacity = '1';
                    feedElement.style.transform = 'translateX(0)';
                }, 50);

            }, index * 150);
        });
    }

    // Initial render
    renderRoleplayFeed();

    // Update every 8 seconds
    setInterval(updateRoleplayFeed, 8000);
}

function initDeveloperAnimations() {
    // Add click effects to developer cards
    const developerCards = document.querySelectorAll('.developer-card');
    developerCards.forEach(card => {
        card.addEventListener('click', function() {
            // Play sound
            playSound('magic');

            // Create sparkle effect around avatar
            const avatar = this.querySelector('.dev-avatar');
            if (avatar) {
                avatar.style.animation = 'magicSparkle 1.5s ease-in-out';
                setTimeout(() => {
                    avatar.style.animation = 'float 3s ease-in-out infinite';
                }, 1500);
            }

            // Create particles
            if (window.createParticles) {
                const rect = this.getBoundingClientRect();
                window.createParticles(rect.left + rect.width / 2, rect.top + rect.height / 2, 12);
            }
        });
    });

    // Add hover effects to city locations
    const cityLocations = document.querySelectorAll('.city-location');
    cityLocations.forEach(location => {
        location.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
            this.style.boxShadow = '0 10px 30px rgba(229, 62, 62, 0.2)';
        });

        location.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
    });

    // Add click effects to tech features
    const techFeatures = document.querySelectorAll('.tech-feature');
    techFeatures.forEach(feature => {
        feature.addEventListener('click', function() {
            playSound('click');

            // Pulse animation
            this.style.animation = 'pulse 0.8s ease-in-out';
            setTimeout(() => {
                this.style.animation = '';
            }, 800);
        });
    });

    // Add ripple effect for feed items
    const feedItems = document.querySelectorAll('.feed-item');
    feedItems.forEach(item => {
        item.addEventListener('click', function() {
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                background: rgba(229, 62, 62, 0.3);
                border-radius: 50%;
                width: 20px;
                height: 20px;
                animation: ripple 0.6s ease-out;
                pointer-events: none;
                right: 10px;
                top: 50%;
                transform: translateY(-50%);
            `;

            this.style.position = 'relative';
            this.appendChild(ripple);

            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
        });
    });
}

// Particle System
function initParticleSystem() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId = null;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function createParticle(x, y, isAchievement = false) {
        const colors = isAchievement ?
            ['#ffd700', '#ffed4e', '#ffa502', '#ff6b6b'] :
            ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe'];

        return {
            x: x || Math.random() * canvas.width,
            y: y || Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            size: Math.random() * 3 + 1,
            color: colors[Math.floor(Math.random() * colors.length)],
            alpha: 1,
            decay: Math.random() * 0.02 + 0.005,
            life: 1
        };
    }

    function updateParticles() {
        particles = particles.filter(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.alpha -= particle.decay;
            particle.life -= particle.decay;

            // Bounce off edges
            if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

            return particle.alpha > 0;
        });
    }

    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            ctx.save();
            ctx.globalAlpha = particle.alpha;
            ctx.fillStyle = particle.color;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        });
    }

    function animate() {
        updateParticles();
        drawParticles();

        // Add random particles occasionally
        if (Math.random() < 0.1) {
            particles.push(createParticle());
        }

        animationId = requestAnimationFrame(animate);
    }

    function startParticleSystem() {
        if (animationId) return;
        resizeCanvas();
        animate();
    }

    function stopParticleSystem() {
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }
    }

    // Handle visibility change
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopParticleSystem();
        } else {
            startParticleSystem();
        }
    });

    window.addEventListener('resize', resizeCanvas);

    // Start the particle system
    startParticleSystem();

    // Expose function to create particles from other functions
    window.createParticles = (x, y, count = 10) => {
        for (let i = 0; i < count; i++) {
            particles.push(createParticle(x, y, true));
        }
    };

    window.createAchievementParticles = () => {
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        for (let i = 0; i < 20; i++) {
            particles.push(createParticle(centerX, centerY, true));
        }
    };
}

// Magic Button Effects
function initMagicButton() {
    const magicButton = document.getElementById('magicButton');
    if (!magicButton) return;

    magicButton.addEventListener('click', function() {
        // Play sound
        playSound('magic');

        // Create particles
        if (window.createParticles) {
            window.createParticles(this.offsetLeft + this.offsetWidth / 2, this.offsetTop + this.offsetHeight / 2, 15);
        }

        // Random magic effects
        const effects = [
            createKonamiCode,
            createMatrixRain,
            createTypingEffect,
            createColorShift,
            createBounceEffect
        ];

        const randomEffect = effects[Math.floor(Math.random() * effects.length)];
        randomEffect();
    });
}

// Sound System
function initSoundSystem() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

    window.playSound = (type) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        const sounds = {
            click: { freq: 800, duration: 100, type: 'sine' },
            magic: { freq: 523, duration: 300, type: 'triangle' },
            achievement: { freq: 659, duration: 200, type: 'sine' }
        };

        const sound = sounds[type] || sounds.click;

        oscillator.frequency.setValueAtTime(sound.freq, audioContext.currentTime);
        oscillator.type = sound.type;

        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + sound.duration / 1000);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + sound.duration / 1000);
    };

    // Resume audio context on user interaction
    document.addEventListener('click', () => {
        if (audioContext.state === 'suspended') {
            audioContext.resume();
        }
    }, { once: true });
}

// Easter Eggs
function initEasterEggs() {
    let konamiSequence = [];
    const konamiCode = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];

    document.addEventListener('keydown', (e) => {
        konamiSequence.push(e.code);
        if (konamiSequence.length > konamiCode.length) {
            konamiSequence.shift();
        }

        if (konamiSequence.join('') === konamiCode.join('')) {
            createKonamiCode();
            konamiSequence = [];
        }
    });
}

// Magic Effects
function createKonamiCode() {
    const body = document.body;
    body.style.animation = 'rainbow 2s linear infinite';

    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);

    setTimeout(() => {
        body.style.animation = '';
        document.head.removeChild(style);
    }, 4000);

    playSound('magic');
    if (window.createParticles) {
        window.createParticles(window.innerWidth / 2, window.innerHeight / 2, 50);
    }
}

function createMatrixRain() {
    const matrix = document.createElement('div');
    matrix.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0, 255, 0, 0.1); pointer-events: none; z-index: 9999;
        font-family: monospace; font-size: 14px; color: #0f0;
        overflow: hidden;
    `;

    document.body.appendChild(matrix);

    let drops = [];
    for (let i = 0; i < 50; i++) {
        drops.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            speed: Math.random() * 5 + 2
        });
    }

    const interval = setInterval(() => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#0f0';
        drops.forEach(drop => {
            ctx.font = '14px monospace';
            ctx.fillText('01', drop.x, drop.y);
            drop.y += drop.speed;
            if (drop.y > canvas.height) drop.y = 0;
        });

        matrix.style.backgroundImage = `url(${canvas.toDataURL()})`;
    }, 50);

    setTimeout(() => {
        clearInterval(interval);
        document.body.removeChild(matrix);
    }, 3000);
}

function createTypingEffect() {
    const originalTexts = ['Nasional Roleplay Indonesia', 'SA:MP Community', 'Voice Only Roleplay'];
    const elements = document.querySelectorAll('h1, h2, h3');

    elements.forEach(element => {
        const originalText = element.textContent;
        element.textContent = '';

        let i = 0;
        const timer = setInterval(() => {
            if (i < originalText.length) {
                element.textContent += originalText.charAt(i);
                i++;
            } else {
                clearInterval(timer);
            }
        }, 100);
    });
}

function createColorShift() {
    const elements = document.querySelectorAll('*');
    elements.forEach(element => {
        const originalColor = window.getComputedStyle(element).color;
        element.style.color = `hsl(${Math.random() * 360}, 70%, 50%)`;
        setTimeout(() => {
            element.style.color = originalColor;
        }, 2000);
    });
}

function createBounceEffect() {
    const elements = document.querySelectorAll('.team-member, .discord-button, .magic-button');
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.style.animation = 'bounce 0.6s ease-in-out';
        }, index * 100);
    });

    setTimeout(() => {
        elements.forEach(element => {
            element.style.animation = '';
        });
    }, 3000);
}