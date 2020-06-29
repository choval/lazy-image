/**
 * LazyImage
 */
var LazyImage = {
    // Vars
    threshold: 200,
    viewport_top: 0,
    viewport_bottom: 0,
    // Hook
    hook: function () {
        if (typeof $ != 'undefined') {
            $(document).on('scroll', LazyImage.run);
            LazyImage.run();
            return;
        }
        setTimeout(LazyImage.hook, 100);
    },
    // Unhook
    unhook: function () {
        $(document).off('scroll', LazyImage.run);
    },
    // Run
    run: function () {
        LazyImage.viewport_top = window.scrollY;
        LazyImage.viewport_bottom = window.scrollY + window.innerHeight;
        $('img[data-lazy-src],img[data-lazy-srcset],img[data-lazy-sizes],[data-lazy-background-image],[data-lazy-class]')
            .each(function() {
                var $obj = $(this);
                LazyImage.checkElement($obj);
            });
    },
    initializeElement: function($obj) {
        $obj.data('initialized', true);
        var origSrc = $obj.attr('src');
        $obj.data('lazy-src-original', origSrc);
        var origBackgroundImage = $obj.css('background-image');
        if (origBackgroundImage) {
            $obj.data('lazy-background-image-original', origBackgroundImage);
        }
        var origSrcset = $obj.attr('srcset');
        if (origSrcset) {
            $obj.data('lazy-srcset-original', origSrcset); 
        }
        var origSizes = $obj.attr('sizes');
        if (origSizes) {
            $obj.data('lazy-sizes-original', origSizes); 
        }
    },
    checkElement: function($obj) {
        var visible = LazyImage.isVisible($obj);
        var marked = $obj.data('lazy-marked');
        var lazySrc = $obj.data('lazy-src') || false;
        var lazySrcset = $obj.data('lazy-srcset') || false;
        var lazySizes = $obj.data('lazy-sizes') || false;
        var lazyBackgroundImage = $obj.data('lazy-background-image') || false;
        var lazyClass = $obj.data('lazy-class') || false;
        var initialized = $obj.data('initialized') || false;
        if (!initialized) {
            LazyImage.initializeElement($obj);
        }
        if (visible) {
            if (marked) {
                return;
            }
            $obj.data('lazy-marked', true);
            if (lazySrc) {
                $obj.attr('src', lazySrc);
            }
            if (lazySrcset) {
                $obj.attr('srcset', lazySrcset);
            }
            if (lazySizes) {
                $obj.attr('sizes', lazySizes);
            }
            if (lazyBackgroundImage) {
                $obj.css('background-image', 'url("'+lazyBackgroundImage+'")');
            }
            if (lazyClass) {
                $obj.addClass(lazyClass);
            }
            return;
        }
        if (!marked) {
            return;
        }
        $obj.data('lazy-marked', false);
        if (lazySrc) {
            $obj.attr('src', $obj.data('lazy-src-original')||'');
        }
        if (lazySrcset) {
            $obj.attr('srcset', $obj.data('lazy-srcset-original')||'');
        }
        if (lazySizes) {
            $obj.attr('sizes', $obj.data('lazy-sizes-original')||'');
        }
        if (lazyBackgroundImage) {
            $obj.css('background-image', $obj.data('lazy-background-image-original')||'none');
        }
        if (lazyClass) {
            $obj.removeClass(lazyClass);
        }
    },
    // Return if an object is visible
    isVisible: function($elem) {
        var elem_height = $elem.height();
        var elem_top = $elem.offset().top;
        var threshold = $elem.data('lazy-threshold') || LazyImage.threshold || 200;
        var compare_top = elem_top - threshold;
        var compare_bottom = elem_top + elem_height + threshold;
        return ((compare_top <= LazyImage.viewport_bottom) &&
            (compare_bottom >= LazyImage.viewport_top));
    },
};
(function() {
    LazyImage.hook();
})();

