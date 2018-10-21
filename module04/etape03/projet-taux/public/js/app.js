window.addEventListener('load', function(){
  const el = $('#app');

  // Compile Handlebar Templates
  const errorTemplate = Handlebars.compile($('#error-template').html());
  const coursTemplate = Handlebars.compile($('#cours-template').html());
  const conversionTemplate = Handlebars.compile($('#conversion-template').html());
  const historiqueTemplate = Handlebars.compile($('#historique-template').html());

  const html = coursTemplate();
  el.html(html);
});