window.addEventListener('load', function() {
    const el = $('#app');
    
    // Compiler les templates
    const temperatureTemplate = Handlebars.compile($('#temperature-template').html());
    
    
    const html = temperatureTemplate();
	el.html(html);
    
});