// Arquivo JavaScript para implementar o script de inclusão do schema.json nas páginas
document.addEventListener('DOMContentLoaded', function() {
    // Criar elemento script para o JSON-LD
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    
    // Carregar o conteúdo do schema.json
    fetch('/schema.json')
        .then(response => response.json())
        .then(data => {
            script.textContent = JSON.stringify(data);
            document.head.appendChild(script);
        })
        .catch(error => console.error('Erro ao carregar schema.json:', error));
});

// Funções para melhorar a experiência do usuário
document.addEventListener('DOMContentLoaded', function() {
    // Animação suave para links de âncora
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Contador de estatísticas para a seção de mercado
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');
    if (statNumbers.length > 0) {
        const observerOptions = {
            threshold: 0.5
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const countTo = parseInt(element.getAttribute('data-count'));
                    let count = 0;
                    const duration = 2000; // 2 segundos
                    const interval = duration / countTo;
                    
                    const counter = setInterval(() => {
                        count++;
                        element.textContent = count;
                        
                        if (count >= countTo) {
                            clearInterval(counter);
                        }
                    }, interval);
                    
                    observer.unobserve(element);
                }
            });
        }, observerOptions);
        
        statNumbers.forEach(stat => {
            observer.observe(stat);
        });
    }

    // Toggle para perguntas frequentes
    const faqItems = document.querySelectorAll('.faq-question');
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            item.addEventListener('click', function() {
                const parent = this.parentElement;
                parent.classList.toggle('active');
                
                const answer = this.nextElementSibling;
                if (parent.classList.contains('active')) {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                } else {
                    answer.style.maxHeight = '0px';
                }
            });
        });
    }

    // Validação de formulários
    const forms = document.querySelectorAll('form');
    if (forms.length > 0) {
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                let isValid = true;
                const requiredFields = form.querySelectorAll('[required]');
                
                requiredFields.forEach(field => {
                    if (!field.value.trim()) {
                        isValid = false;
                        field.classList.add('is-invalid');
                    } else {
                        field.classList.remove('is-invalid');
                    }
                    
                    // Validação específica para email
                    if (field.type === 'email' && field.value.trim()) {
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (!emailRegex.test(field.value.trim())) {
                            isValid = false;
                            field.classList.add('is-invalid');
                        }
                    }
                    
                    // Validação específica para telefone
                    if (field.type === 'tel' && field.value.trim()) {
                        const phoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
                        if (!phoneRegex.test(field.value.trim())) {
                            isValid = false;
                            field.classList.add('is-invalid');
                        }
                    }
                });
                
                if (!isValid) {
                    e.preventDefault();
                    alert('Por favor, preencha todos os campos obrigatórios corretamente.');
                }
            });
        });
    }

    // Adicionar classe ativa ao link de navegação atual
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

   // 7. Menu mobile toggle E fechar ao clicar no link
   const mobileToggle = document.querySelector('.mobile-toggle');
   const navMenu = document.querySelector('.nav-menu');
   const allNavLinks = document.querySelectorAll('.nav-menu .nav-link'); // Seleciona todos os links dentro do menu

   if (mobileToggle && navMenu) {
       mobileToggle.addEventListener('click', function() {
           navMenu.classList.toggle('active');
           this.classList.toggle('active'); // Para mudar o ícone do botão (hambúrguer/X)
       });

       // Adiciona o evento de clique para cada link do menu para fechar o menu
       if (allNavLinks.length > 0) {
           allNavLinks.forEach(link => {
               link.addEventListener('click', function() {
                   // Verifica se o menu mobile está ativo antes de tentar fechar
                   if (navMenu.classList.contains('active')) {
                       navMenu.classList.remove('active');
                       mobileToggle.classList.remove('active'); // Garante que o ícone do botão também volte ao normal
                   }
                   // A lógica de scroll suave para âncoras já está no item 2.
                   // Se o link não for uma âncora (ex: link para outra página), o comportamento padrão ocorrerá.
               });
           });
       }
   }


});

