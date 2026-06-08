// Inicialização do Supabase
// ATENÇÃO: Substitua os valores abaixo pelas suas credenciais do projeto no Supabase (Settings -> API)
const SUPABASE_URL = 'https://yabqimecuuafugaxlttj.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlhYnFpbWVjdXVhZnVnYXhsdHRqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Njc3MjMxOSwiZXhwIjoyMDkyMzQ4MzE5fQ.GLKssb8-k0bJ1leCG_17inHmfXa8YU6OgTpxu_niiVM';
let supabase = null;
if (window.supabase && typeof window.supabase.createClient === 'function') {
    try {
        supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    } catch (e) {
        console.error('Erro ao inicializar Supabase:', e);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // 1. Fade-in animation on scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });

    // 2. Countdown Timer (ambos sincronizados)
    let hours = 23;
    let minutes = 59;
    let seconds = 56;

    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    const uHoursEl = document.getElementById('u-hours');
    const uMinutesEl = document.getElementById('u-minutes');
    const uSecondsEl = document.getElementById('u-seconds');

    function updateTimer() {
        if (seconds > 0) {
            seconds--;
        } else {
            if (minutes > 0) {
                minutes--;
                seconds = 59;
            } else {
                if (hours > 0) {
                    hours--;
                    minutes = 59;
                    seconds = 59;
                } else {
                    return;
                }
            }
        }

        const h = hours.toString().padStart(2, '0');
        const m = minutes.toString().padStart(2, '0');
        const s = seconds.toString().padStart(2, '0');

        if (hoursEl) hoursEl.textContent = h;
        if (minutesEl) minutesEl.textContent = m;
        if (secondsEl) secondsEl.textContent = s;

        if (uHoursEl) uHoursEl.textContent = h;
        if (uMinutesEl) uMinutesEl.textContent = m;
        if (uSecondsEl) uSecondsEl.textContent = s;
    }

    setInterval(updateTimer, 1000);

    // 3. Social Proof - Simular pessoas comprando (roda no badge do hero)
    const pulseBadge = document.querySelector('.pulse-badge');
    const messages = [
        '🔴 AO VIVO • 3 pessoas comprando agora',
        '🔴 AO VIVO • Maria de SP acabou de comprar',
        '🔴 AO VIVO • 5 pessoas vendo esta oferta',
        '🔴 AO VIVO • João do RJ acabou de comprar',
        '🔴 AO VIVO • 7 pessoas comprando agora',
        '🔴 AO VIVO • Ana de MG se inscreveu',
        '🔴 AO VIVO • 4 pessoas vendo esta oferta'
    ];
    let msgIndex = 0;

    if (pulseBadge) {
        pulseBadge.style.transition = 'opacity 0.3s ease';
        setInterval(() => {
            msgIndex = (msgIndex + 1) % messages.length;
            pulseBadge.style.opacity = '0';
            setTimeout(() => {
                pulseBadge.textContent = messages[msgIndex];
                pulseBadge.style.opacity = '1';
            }, 300);
        }, 4500);
    }

    // 4. Vagas restantes - diminuir gradualmente pra gerar urgência
    const urgencyNumber = document.querySelector('.urgency-number');
    if (urgencyNumber) {
        let vagas = 27;
        setInterval(() => {
            if (vagas > 10 && Math.random() > 0.7) {
                vagas--;
                urgencyNumber.textContent = vagas;
            }
        }, 15000);
    }

    // 5. Smooth scroll para anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 6. FAQ Toggle (mantido do original)
    window.toggleFAQ = function(button) {
        const faqItem = button.parentElement;

        document.querySelectorAll('.faq-item').forEach(item => {
            if (item !== faqItem) {
                item.classList.remove('active');
            }
        });

        faqItem.classList.toggle('active');
    };

    // 7. Scroll reveal para as novas seções (bonus, compare, etc)
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.bonus-card, .compare-card, .auth-highlight, .problem-chip').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        revealObserver.observe(el);
    });

    // 8. Notificações Flutuantes (Social Proof)
    const toast = document.getElementById('social-proof-toast');
    const toastAvatar = document.getElementById('toast-avatar');
    const toastTitle = document.getElementById('toast-title');
    const toastDesc = document.getElementById('toast-desc');

    if (toast && toastAvatar && toastTitle && toastDesc) {
        const notifications = [
            {
                icon: '🎉',
                title: 'Nova inscrição! ⚡',
                desc: 'Mariana S. (SP) acabou de adquirir o Protocolo 8S.',
                isLive: false
            },
            {
                icon: '🔴',
                title: 'Ao Vivo agora',
                desc: '12 pessoas estão analisando a oferta neste minuto.',
                isLive: true
            },
            {
                icon: '🔥',
                title: 'Vaga Garantida! 🚀',
                desc: 'Lucas M. (RJ) comprou via PIX e garantiu o desconto.',
                isLive: false
            },
            {
                icon: '🩺',
                title: 'Futuro Aprovado!',
                desc: 'Beatriz F. (MG) entrou para a turma de Medicina.',
                isLive: false
            },
            {
                icon: '⚡',
                title: 'Acesso imediato',
                desc: 'Felipe T. (RS) acabou de receber os materiais no e-mail.',
                isLive: false
            },
            {
                icon: '🔴',
                title: 'Alta Demanda',
                desc: '5 pessoas estão finalizando a inscrição no checkout.',
                isLive: true
            },
            {
                icon: '🎉',
                title: 'Nova inscrição! ⚡',
                desc: 'Gabi R. (BA) aproveitou o bônus de Redação Nota 900+.',
                isLive: false
            },
            {
                icon: '🎯',
                title: 'Foco no ENEM',
                desc: 'Pedro H. (PR) iniciou sua preparação com o Cronograma 8S.',
                isLive: false
            }
        ];

        let notifIndex = 0;

        function showNotification() {
            const item = notifications[notifIndex];
            
            // Atualiza conteúdo
            toastAvatar.textContent = item.icon;
            toastTitle.textContent = item.title;
            toastDesc.textContent = item.desc;
            
            // Adiciona ou remove badge de live
            let badge = toastAvatar.querySelector('.social-proof-toast-badge');
            if (!badge) {
                badge = document.createElement('span');
                badge.className = 'social-proof-toast-badge';
                toastAvatar.appendChild(badge);
            }
            
            if (item.isLive) {
                badge.className = 'social-proof-toast-badge live';
            } else {
                badge.className = 'social-proof-toast-badge';
            }

            // Mostra o toast
            toast.classList.add('show');

            // Esconde após 5 segundos
            setTimeout(() => {
                toast.classList.remove('show');
                
                // Prepara a próxima notificação com um intervalo randômico de 6 a 12 segundos
                notifIndex = (notifIndex + 1) % notifications.length;
                const nextDelay = Math.floor(Math.random() * 6000) + 6000;
                setTimeout(showNotification, nextDelay);
            }, 5000);
        }

        // Primeira notificação aparece após 4 segundos da página carregar
        setTimeout(showNotification, 4000);
    }

    // 9. Carrossel de Prévia do Produto (com autoplay e setas de navegação)
    const track = document.getElementById('previewTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (track && prevBtn && nextBtn) {
        let autoScrollInterval;
        const cardWidth = 320;
        const gap = 16;
        const scrollAmount = cardWidth + gap; // 336px
        
        function scrollCarousel(direction) {
            // Desativa temporariamente o scroll-snap para evitar conflitos na animação
            track.style.scrollSnapType = 'none';
            
            const maxScrollLeft = track.scrollWidth - track.clientWidth;
            let targetScroll = track.scrollLeft;

            if (direction === 'next') {
                if (track.scrollLeft >= maxScrollLeft - 15) {
                    targetScroll = 0; // Volta para o início
                } else {
                    targetScroll = track.scrollLeft + scrollAmount;
                }
            } else if (direction === 'prev') {
                if (track.scrollLeft <= 15) {
                    targetScroll = maxScrollLeft; // Vai para o final
                } else {
                    targetScroll = track.scrollLeft - scrollAmount;
                }
            }

            track.scrollTo({
                left: targetScroll,
                behavior: 'smooth'
            });

            // Reativa scroll-snap depois que a animação termina (500ms é seguro)
            setTimeout(() => {
                track.style.scrollSnapType = 'x mandatory';
            }, 500);
        }

        function startAutoScroll() {
            autoScrollInterval = setInterval(() => {
                scrollCarousel('next');
            }, 3000);
        }

        function stopAutoScroll() {
            clearInterval(autoScrollInterval);
        }

        function resetAutoScroll() {
            stopAutoScroll();
            startAutoScroll();
        }

        // Eventos dos botões
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            scrollCarousel('prev');
            resetAutoScroll();
        });

        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            scrollCarousel('next');
            resetAutoScroll();
        });

        // Pausar autoplay quando o usuário passar o mouse ou tocar
        track.addEventListener('mouseenter', stopAutoScroll);
        track.addEventListener('mouseleave', startAutoScroll);
        track.addEventListener('touchstart', stopAutoScroll);
        track.addEventListener('touchend', startAutoScroll);

        // Iniciar autoplay
        startAutoScroll();
    }

});
