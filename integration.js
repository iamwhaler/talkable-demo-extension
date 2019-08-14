(function () {
    alert('Inserted');
    var _TALKABLE_DEMO_CONFIG = {
        "site_slug": "maxim",            // real site_slug, i.e. for toms-v2 it should be toms
        "version": "4.2.3",              // integration version
        "without_integration_library": false // optional, false by default
    };

    var div = document.createElement('div');
    div.id = "talkable-offer";





    var script = document.createElement('script');
    script.src = `https://d2jjzw81hqbuqv.cloudfront.net/integration/clients/${_TALKABLE_DEMO_CONFIG.site_slug}.min.js`;
    script.type = 'text/javascript';

    var api_calls = document.createElement('script');
    api_calls.type = 'text/javascript';
    api_calls.innerHTML = `
 window._talkableq = window._talkableq || [];
  _talkableq.unshift(['init', { site_id: '${_TALKABLE_DEMO_CONFIG.site_slug}' }]);

  window._talkableq.push(['authenticate_customer', {
    email: '', // Optional, pass when available. Example: 'customer@example.com'
    first_name: '', // Optional, pass when available. Example: 'John'
    last_name: '' // Optional, pass when available. Example: 'Smith'
  }]);

  window._talkableq.push(['register_affiliate', {}]);
`;


    document.body.appendChild(div);
    document.body.appendChild(script);
    document.body.appendChild(api_calls);
})();