(function (window, $, undefined) {
  if (!window.ui) {
    ui = $({});
    window.ui = ui;
  }
})(window, window.jQuery);

(function (window, ui, $, undefined) {

  let currentVersion;
  const $body = $('body');
  ui.returnDeviceTypeByWidth = function () {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (width >= 960) {
      $body.triggerHandler('desktopVersion');
      if (currentVersion != 'desktop') {
        currentVersion = 'desktop';
        $body.triggerHandler('changeVersion', 'desktop');
      }
      return currentVersion;
    } else {
      $body.triggerHandler('mobileVersion');
      if (currentVersion != 'mobile') {
        currentVersion = 'mobile';
        $body.triggerHandler('changeVersion', 'mobile');
      }
      return currentVersion;
    }
  };

  $body.attr('data-device', ui.returnDeviceTypeByWidth()).attr('data-dom', 'ready');

  $(window).resize(function () {
    $body.attr('data-device', ui.returnDeviceTypeByWidth());
  });

})(window, window.ui, window.jQuery);