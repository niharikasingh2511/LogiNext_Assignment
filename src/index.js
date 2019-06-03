$(window).load(function() {
  var a = {};
  $.getJSON('JsonData.json', function(data) {
    a = data;
    $.each(a, function(idx, elem) {
      $('table#tbl TBODY').append('<tr><td>' + elem.postal_Code + '</td><td>' + elem.latitude + '</td><td>' + elem.longitude + '</td><td>' + elem.plant_Order + '</td></tr>');
    });
  });
  // tell the embed parent frame the height of the content
  if (window.parent && window.parent.parent) {
    window.parent.parent.postMessage(["resultsFrame", {
      height: document.body.getBoundingClientRect().height,
      slug: "s8fTA"
    }], "*")
  }


  // always overwrite window.name, in case users try to set it manually
  window.name = "result"

  $(function() {

    var search = $('.postal-search'),
      content = $('.postal-list'),
      matches = $(),
      index = 0;

    // Listen for the text input event
    search.on('input', function(e) {

      // Only search for strings 2 characters or more
      if (search.val().length >= 2) {
        // Use the highlight plugin
        content.highlight(search.val(), function(found) {
          found.parent().parent().css('background', 'yellow');
        });
      } else {
        content.highlightRestore();
      }

    });

  });

  (function($) {

    var termPattern;

    $.fn.highlight = function(term, callback) {

      return this.each(function() {

        var elem = $(this);

        if (!elem.data('highlight-original')) {

          // Save the original element content
          elem.data('highlight-original', elem.html());

        } else {

          // restore the original content
          elem.highlightRestore();

        }

        termPattern = new RegExp('(' + term + ')', 'ig');

        // Search the element's contents
        walk(elem);

        // Trigger the callback
        callback && callback(elem.find('.match'));

      });
    };

    $.fn.highlightRestore = function() {

      return this.each(function() {
        var elem = $(this);
        elem.html(elem.data('highlight-original'));
      });

    };

    function walk(elem) {

      elem.contents().each(function() {

        if (this.nodeType == 3) { // text node

          if (termPattern.test(this.nodeValue)) {
            $(this).replaceWith(this.nodeValue.replace(termPattern, '<span class="match">$1</span>'));
          }
        } else {
          walk($(this));
        }
      });
    }

  })(jQuery);

});