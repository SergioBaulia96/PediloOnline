document.addEventListener('DOMContentLoaded', function() {
    var sidebar = document.getElementById('sidebarMenu');
    var menuToggle = document.getElementById('menuToggle');
    var mainContent = document.querySelector('.main-content');
    var navbar = document.querySelector('.navbar'); // Selecciona la navbar
    
    // Mostrar el menú al cargar la página
    sidebar.classList.add('open');

    // Evento para mostrar/ocultar el menú lateral
    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('closed');
        sidebar.classList.toggle('open');
        menuToggle.classList.toggle('closed');
        mainContent.classList.toggle('expanded');
        navbar.classList.toggle('expanded'); // Expande la navbar
    });
});


