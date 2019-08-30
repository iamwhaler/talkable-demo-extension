var _TALKABLE_DEMO_CONFIG = {
  "site_slug": "extension-demo",            // real site_slug, i.e. for toms-v2 it should be toms
  "version": "4.2.3",              // integration version
  "without_integration_library": false // optional, false by default
};

document.addEventListener('DOMContentLoaded', function () {

  var campaign_tag;

  var check_buttons = document.querySelectorAll('.integrate');

  var site_id = document.getElementById('site-id');
  var campaign_tag_element = document.getElementById('campaign-tag');


  if (site_id) site_id.addEventListener('input', function(e) { _TALKABLE_DEMO_CONFIG.site_slug = e.target.value });
  //if (campaign_tag_element) campaign_tag_element.document.getElementById('campaign-tag').addEventListener('input', function(e) { campaign_tag = e.target.value });


  document.body.addEventListener('click', function(event) {
    console.log(event.target);
  });

  check_buttons.forEach(function (item) {
    item.addEventListener('click', function (event) {
      campaign_tag = event.target.id;

      chrome.tabs.executeScript({
        file: 'library.js'
      }, function() {
        chrome.tabs.executeScript({
          code: `
          var _TALKABLE_DEMO_CONFIG = {
            "site_slug": "${_TALKABLE_DEMO_CONFIG.site_slug}",            // real site_slug, i.e. for toms-v2 it should be toms
            "version": "4.2.3",              // integration version
            "without_integration_library": false // optional, false by default
          };
          
          var div = document.createElement('div');
          div.id = "talkable-offer";
          div.style = "margin: 2.5% 0"
          
          var script = document.createElement('script');
          script.src = \`https://d2jjzw81hqbuqv.cloudfront.net/integration/clients/${_TALKABLE_DEMO_CONFIG.site_slug}.min.js\`;
          script.type = 'text/javascript';
          
          var api_calls = document.createElement('script');
          api_calls.type = 'text/javascript';
          api_calls.innerHTML = \`
           window._talkableq = window._talkableq || [];
            _talkableq.unshift(['init', { site_id: '${_TALKABLE_DEMO_CONFIG.site_slug}' }]);
          
            window._talkableq.push(['authenticate_customer', {
              email: '', // Optional, pass when available. Example: 'customer@example.com'
              first_name: '', // Optional, pass when available. Example: 'John'
              last_name: '' // Optional, pass when available. Example: 'Smith'
            }]);
            ${event.target.id == "post-purchase" ? 
              `window._talkableq.push(['register_purchase', {
                  purchase: {
                    order_number: 'tkbl_generated_${new Date()}',
                    subtotal: '${42}'
                  },
                  customer: {
                    email: 'customer@sample.com' // Customer email address who issued a purchase. Example: 'customer@example.com'
                  }
              }]);`
              : `window._talkableq.push(['register_affiliate', { campaign_tags: ['${campaign_tag}']}]);`}\`
          
          
          document.body.appendChild(div);
          document.body.appendChild(script);
          document.body.appendChild(api_calls);`
        });
      });

      // chrome.tabs.executeScript({
      //   file: 'integration.js'
      // });



      // chrome.tabs.query({currentWindow: true, active: true}, function (tab) {
      //     var new_url = tab[0].url + '?campaign_tags=' + event.target.id;
      //     chrome.tabs.update({url: new_url});
      // });

    });
  })


});
