# Here i will add the errors we faced while using some package in our project

## React Google Autocomplete Input Package & Capacitor Google Maps Package

- while using these two packages i (ahsan) found that these errors are introduced in the project
  - GET https://maps.googleapis.com/maps/api/mapsjs/gen_204?csp_test=true net::ERR_BLOCKED_BY_CLIENT
  - You have included the Google Maps JavaScript API multiple times on this page. This may cause unexpected errors.
  - GET https://maps.googleapis.com/maps/api/js/QuotaService.RecordEvent?1shttp%3A%2F%2Flocalhost%3A8100%2Ftesting%2Fgoogle-map%2Fmap1&3sAIzaSyDwyUVs6HRjSc1Vx2KpTp-6lzrOwZqfD_U&7si2dfb8&10e1&11b0&callback=_xdc_._x84pdv&key=AIzaSyDwyUVs6HRjSc1Vx2KpTp-6lzrOwZqfD_U&token=107390 net::ERR_BLOCKED_BY_CLIENT
  - common.js:52 GET https://maps.googleapis.com/maps/api/js/QuotaService.RecordEvent?1shttp%3A%2F%2Flocalhost%3A8100%2Ftesting%2Fgoogle-map%2Fmap1&3sAIzaSyDwyUVs6HRjSc1Vx2KpTp-6lzrOwZqfD_U&7si2p39v&10e1&11b0&callback=_xdc_._gwt2lr&key=AIzaSyDwyUVs6HRjSc1Vx2KpTp-6lzrOwZqfD_U&token=104159 net::ERR_BLOCKED_BY_CLIENT
