window.addEventListener('load', function(){
    const el = $('#app');
    
    // Compiler les templates
    const temperatureTemplate = Handlebars.compile($('#temperature-template').html());
    
    // Déclaration router
    const router = new Router({
        mode: 'history',
    });
    
    // Que doit on faire lorsque on a la route racine ?
    router.add('/', function(){
        let html = temperatureTemplate();
        el.html(html);	
    });
    
    // Naviguer sur l'url courante
    router.navigateTo(window.location.pathname);
    
});