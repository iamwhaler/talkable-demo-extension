var _TALKABLE_DEMO_CONFIG = {
  "site_slug": "extension-demo",            // real site_slug, i.e. for toms-v2 it should be toms
  "version": "4.2.3",              // integration version
  "without_integration_library": false // optional, false by default
};

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('image').value = localStorage.getItem('tkbl_image');
  document.getElementById('primary-color').value = localStorage.getItem('tkbl_color');

  var check_buttons = document.querySelectorAll('.integrate');

  check_buttons.forEach(function (item) {
    item.addEventListener('click', function (event) {
      var image_url = document.getElementById('image').value;
      localStorage.setItem('tkbl_image', image_url);

      if (image_url == "") image_url = "https://d2jjzw81hqbuqv.cloudfront.net/static_assets/files/329013/original/tkbl_default_advocate-signup-share-background.jpg";
      var primary_color = document.getElementById('primary-color').value;
      localStorage.setItem('tkbl_color', primary_color);

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
                    email: "customer@sample.com", // Customer email address who issued a purchase. Example: "customer@example.com"
                    custom_properties: {
                       primary_color: '${primary_color}',
                       image_url: '${image_url}',
                    }
                  }
                }]);
                break;
                
              case "dashboard":  
              case "invite": 
                alert("please select container");
                
                function addBorder(e) {
                  e.target.style = "border: 3px solid #f76a40";
                }
                
                function removeBorder(e) {
                  e.target.style = "border: 0px";
                }
                
                document.body.addEventListener("mouseover", addBorder, false);
                document.body.addEventListener("mouseout", removeBorder, false);
                
                document.body.addEventListener("click", function insertStandalone(e) {
                  if (e.target) {
                    var div = document.createElement('div');
                    div.id = "talkable-offer";
                    div.style = "margin: 2.5% 0"
                    e.target.appendChild(div);
                    window._talkableq.push(["register_affiliate", { 
                      campaign_tags: ["${event.target.id}"],
                      custom_properties: {
                        primary_color: '${primary_color}',
                        image_url: '${image_url}',
                      }
                    }]);
                    
                    removeBorder(e);
                    document.body.removeEventListener("mouseover", addBorder, false);
                    document.body.removeEventListener("mouseout", removeBorder, false);
                    document.body.removeEventListener("click", insertStandalone, false);
                  }   
                }, false);
                
                break;
              default: 
                window._talkableq.push(["register_affiliate", { 
                  campaign_tags: ["${event.target.id}"], 
                  custom_properties: {
                    primary_color: '${primary_color}',
                    image_url: '${image_url}',
                  }
                }]);
            }
          \`;
                  
          document.body.appendChild(api_calls);
        `
      });
    });
  })
});
