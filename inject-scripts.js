var _TALKABLE_DEMO_CONFIG = {
  "site_slug": "extension-demo",            // real site_slug, i.e. for toms-v2 it should be toms
  "version": "4.2.3",              // integration version
  "without_integration_library": false // optional, false by default
};

document.addEventListener('DOMContentLoaded', function () {

  var check_buttons = document.querySelectorAll('.integrate');
  var site_id = document.getElementById('site-id');


  if (site_id) site_id.addEventListener('input', function(e) { _TALKABLE_DEMO_CONFIG.site_slug = e.target.value });


  window.addEventListener('click', function(event) {
    console.log(event.target);
  });

  check_buttons.forEach(function (item) {
    item.addEventListener('click', function (event) {

      chrome.tabs.executeScript({ file: 'library.js' });
      chrome.tabs.executeScript({ code: `
          if (!window.talkable_script) {
            window.talkable_script = document.createElement('script');
            window.talkable_script.src = "https://d2jjzw81hqbuqv.cloudfront.net/integration/talkable-4.2.min.js";
            window.talkable_script.type = 'text/javascript';
            document.body.appendChild(window.talkable_script);
          }
          
          var api_calls = document.createElement('script');
          api_calls.type = 'text/javascript';
          api_calls.innerHTML = \`
           window.talkablePlacementsConfig = { placements: ["true"] };
           window._talkableq = window._talkableq || [];
            _talkableq.unshift(["init", { site_id: "${_TALKABLE_DEMO_CONFIG.site_slug}", debug: true }]);

            switch("${event.target.id}") {
              case "post-purchase": 
                window._talkableq.push(["register_purchase", {
                  purchase: {
                    order_number: "${new Date()}",
                    subtotal: "${10}"
                  },
                  customer: {
                    email: "customer@sample.com" // Customer email address who issued a purchase. Example: "customer@example.com"
                  }
                }]);
                break;
              case "invite": 
                alert("please select container");
                document.body.addEventListener("click", function(e) {
                  if(e.target) {
                    var div = document.createElement('div');
                    div.id = "talkable-offer";
                    div.style = "margin: 2.5% 0"
                    e.target.appendChild(div);
                    window._talkableq.push(["register_affiliate", { campaign_tags: ["invite"]}]);
                  }
                });
                
                break;
              default: 
                window._talkableq.push(["register_affiliate", { campaign_tags: ["${event.target.id}"]}]);
            }
          \`;
                  
          document.body.appendChild(api_calls);
        `
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
