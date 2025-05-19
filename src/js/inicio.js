/*========= EVENTO: DOMContentLoaded ========*/
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('header.menu nav ul li a');

    /*========= FUNÇÃO: updateActiveLink ========*/
    function updateActiveLink() {
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= (sectionTop - sectionHeight / 3) && window.scrollY < (sectionTop + sectionHeight - sectionHeight / 3)) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(currentSection)) {
                link.classList.add('active');
            }
        });
    }

    /*========= EVENTO: scroll (window) ========*/
    window.addEventListener('scroll', updateActiveLink);

    /*========= INICIALIZAÇÃO: updateActiveLink ========*/
    updateActiveLink(); // Para definir o link ativo na carga inicial da página
});
