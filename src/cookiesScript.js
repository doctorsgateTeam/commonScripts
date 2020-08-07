// Made with milk and cookies by Nicholas Ruggeri and Gianmarco Simone
// https://github.com/nicholasruggeri/cookies-enabler
// https://github.com/nicholasruggeri
// https://github.com/gsimone
window.COOKIES_ENABLER = window.COOKIES_ENABLER || (function () {
    'use strict'
    /**
     * S
     */
    var defaults = {
            scriptClass: 'ce-script',
            iframeClass: 'ce-iframe',
            acceptClass: 'ce-accept',
            disableClass: 'ce-disable',
            dismissClass: 'ce-dismiss',
            bannerClass: 'ce-banner',
            moreClass: 'ce-more',
            moreLinkClass: 'ce-more-link',
            hasCancelButton: true,
            textHTML: 'Auf unserer Webseite kommen verschiedene Cookies zum Einsatz: technische, zu Marketing-Zwecken und solche zu Analyse-Zwecken; Sie können unsere Webseite grundsätzlich auch ohne das Setzen von Cookies besuchen. Hiervon ausgenommen sind die technisch notwendigen Cookies. Sie können die aktuellen Einstellungen jederzeit durch Klicken auf Datenschutz & Cookie-Richtlinien (unten rechts) einsehen und ändern. Ihnen steht jederzeit ein Widerrufsrecht zu. Weitere Informationen finden Sie unter "Mehr", unserer Datenschutzerklärung sowie unter "Cookies". Durch Klicken auf "Akzeptieren" erklären Sie sich einverstanden, dass wir die vorgenannten Cookies zu Marketing- und zu Analyse-Zwecken setzen.',
            enableText: 'Akzeptieren',
            disableText: 'Disable Cookies',
            moreText: 'Mehr',
            linkMore: '#',
            eventScroll: false,
            scrollOffset: 200,
            clickOutside: false,
            cookieName: 'ce-cookie',
            cookieDuration: '365',
            wildcardDomain: false,
            iframesPlaceholder: true,
            textIframe: 'To view this content you need to',
            iframesPlaceholderClass: 'ce-iframe-placeholder',
            onEnable: null,
            onDismiss: '',
            onDisable: '',
            onAppear: '',
            hasBannerShow: false,
            textBannerShow: 'Datenschutz & Cookie-Richtlinien',
            styles: {
                bgColor: '#fff',
                textColorAccept: '#fff',
                bgColorAccept: 'red',
                bgColor: '#fff',
                bgColorHover: '#666',
                textColorHover: '#fff',
                textColor: '#232323',
                padding: '1em',
                fontSize: '1em',
                textColorLink: '#232323',
                textColorLinkHover: 'red',
                fontSizeLink: '1em'
            },
            class: {
                accept: '',
                    iframe: '',
                    disable: '',
                    more: ''
            },
            trackID: '',
            version: 0
        },
        opts = {cookieName: 'ce-cookie'}, domElmts, start_Y;


        const startGoogleTrack = () => {
            switch (defaults.version) {
                case 1:
                        var script = document.createElement('script');
                        script.src = `https://www.googletagmanager.com/gtag/js?id=${defaults.trackID}`;
                        script.async = true;
                        document.getElementsByTagName('head')[0].appendChild(script);
                        var script2 = document.createElement('script');
                        script2.innerHTML = `script.async = true;
                        window.dataLayer = window.dataLayer || [];
                        function gtag() {
                            dataLayer.push(arguments);
                        }
                        gtag('js', new Date());
                        gtag('config', ${defaults.trackID}, {
                            'anonymize_ip': true,
                        });`;
                        document.getElementsByTagName('head')[0].appendChild(script2);
                    break;
                default:
                    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                    })(window,document,'script','dataLayer', defaults.trackID);
                    break;
            }
        }

        const trackGoogle = (trackID, version) => {
            if(cookie.get() != 'Y') {
                // disable
                window[`ga-disable-${trackID}`] = true;
                 var cookies = document.cookie.split(";");
                for (var i = 0; i < cookies.length; i++) {
                    var cookieTemp = cookies[i];
                    var eqPos = cookieTemp.indexOf("=");
                    var name = eqPos > -1 ? cookieTemp.substr(0, eqPos) : cookieTemp;
                    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
                }
            }
            // enable
            defaults = _extend({}, defaults, {trackID: trackID, onEnable: startGoogleTrack, version: version});
        }
    function _extend() {
        var i, key;
        for (i = 1; i < arguments.length; i++)
            for (key in arguments[i])
                if (arguments[i].hasOwnProperty(key))
                    arguments[0][key] = arguments[i][key];
        return arguments[0];
    }
    function _debounce(func, wait, immediate) {
        var timeout;
        return function () {
            var context = this,
                args = arguments;
            var later = function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }
    function _getClosestParentWithClass(el, parentClass) {
        do {
            if (_hasClass(el, parentClass)) {
                return el;
            }
        } while (el = el.parentNode);
        return null;
    }
    function _hasClass(el, cls) {
        return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
    }
    const bannerHTML = (options) => {
        return document.getElementById('ce-banner-html') !== null ?

              document.getElementById('ce-banner-html').innerHTML :


              `<p> ${options.textHTML}</p>
              <p style="text-align: center;">
              <a href="#" rel="noopener" aria-label="Accept cookies" class="ce-accept ${options.class.accept}">${options.enableText}</a>${options.hasCancelButton ? `<a aria-label="Reject cookies" href="#" class="ce-disable ${options.class.disable}">${options.disableText}</a>` : ''}<a href="${options.linkMore}" rel="noopener" aria-label="Privacy policy information" class="ce-more-link ${options.class.more}">${options.moreText}</a>
              </p>`
      }

      const bannerShowHTML = (options) => {
          return options.hasBannerShow ? `<div class="${options.moreClass}"><span id="cookie_hdr_showagain">${options.textBannerShow}</span></div>` : '';
      }


      const iframesPlaceholderHTML = (options) => {
        return document.getElementById('ce-iframePlaceholder-html') !== null ?

        document.getElementById('ce-iframePlaceholder-html').innerHTML :

        `<p class="${options.class.accept}">${options.textIframe}</p>`
        // <a href="#" class="ce-accept">${options.enableText}</a>
      }
    var handleScroll = function () {
        if (Math.abs(window.pageYOffset - start_Y) > opts.scrollOffset) enableCookies();
    };
    var bindUI = function () {
        domElmts = {
            accept: document.getElementsByClassName(opts.acceptClass),
            disable: document.getElementsByClassName(opts.disableClass),
            banner: document.getElementsByClassName(opts.bannerClass),
            dismiss: document.getElementsByClassName(opts.dismissClass),
            more: document.getElementsByClassName(opts.moreClass)
        }
        var i,
            accept = domElmts.accept,
            accept_l = accept.length,
            disable = domElmts.disable,
            disable_l = disable.length,
            dismiss = domElmts.dismiss,
            dismiss_l = dismiss.length,
            more = domElmts.more,
            more_l = more.length;
        if (opts.eventScroll) {
            window.addEventListener('load', function () {
                start_Y = window.pageYOffset;
                window.addEventListener('scroll', handleScroll);
            });
        }
        if (opts.clickOutside) {
            document.addEventListener("click", function (e) {
                var element = e.target;
                if (
                    _getClosestParentWithClass(element, opts.iframesPlaceholderClass) ||
                    _getClosestParentWithClass(element, opts.disableClass) ||
                    _getClosestParentWithClass(element, opts.bannerClass) ||
                    _getClosestParentWithClass(element, opts.dismissClass) ||
                    _getClosestParentWithClass(element, opts.disableClass)
                ) {
                    return false;
                }
                enableCookies();
            });
        }
        for (i = 0; i < accept_l; i++) {
            accept[i].addEventListener("click", function (ev) {
                ev.preventDefault();
                enableCookies(ev);
            });
        }
        for (i = 0; i < disable_l; i++) {
            disable[i].addEventListener("click", function (ev) {
                ev.preventDefault();
                disableCookies(ev);
            });
        }
        for (i = 0; i < dismiss_l; i++) {
            dismiss[i].addEventListener("click", function (ev) {
                ev.preventDefault();
                banner.dismiss();
            });
        }
        for (i = 0; i < more_l; i++) {
            more[i].addEventListener("click", function (ev) {
                ev.preventDefault();
                banner.appear();
            });
        }
    };
    /**
     *
     */
    var init = function (options) {
        opts = _extend({}, defaults, options);
        initStyles(opts);

        if (cookie.get() == 'Y') {
            if (typeof opts.onEnable === "function") opts.onEnable();
            banner.createInverse();
            scripts.get();
            iframes.get();
        } else if (cookie.get() == 'N') {
            if (typeof opts.onDisable === "function") opts.onDisable();
            banner.create();
            iframes.hide();
            bindUI();
        } else {
            banner.create();
            iframes.hide();
            bindUI();
        }
    };
    const initStyles = (options) => {
        var style = document.createElement('style');
        style.innerHTML = `:root{--main-bg-color: ${options.styles.bgColor};--main-text-color-accept: ${options.styles.textColorAccept};--main-bg-color-accept: ${options.styles.bgColorAccept};--main-bg-color-hover: ${options.styles.bgColorHover};--main-text-color-hover: ${options.styles.textColorHover};--main-text-color: ${options.styles.textColor};--main-padding: ${options.styles.padding};--main-font-size: ${options.styles.fontSize};--main-text-color-link: ${options.styles.textColorLink};--main-text-color-link-hover: ${options.styles.textColorLinkHover};--main-font-size-link: ${options.styles.fontSizeLink};}.ce-banner{position:fixed;bottom:0;left:0;right:0;background-color:var(--main-bg-color);padding:var(--main-padding);color:var(--main-text-color);font-size:var(--main-font-size);z-index:99999999999;-webkit-box-shadow:0 -4px 5px 0 rgba(0,0,0,.28);-moz-box-shadow:0 -4px 5px 0 rgba(0,0,0,.28);box-shadow:0 -4px 5px 0 rgba(0,0,0,.28)}.ce-banner p{color:var(--main-text-color);font-size:var(--main-font-size)}a.ce-more-link{color:var(--main-text-color-link);font-size:var(--main-font-size-link)}a.ce-more-link:hover{color:var(--main-text-color-link-hover)}.ce-accept,.ce-disable,.ce-dismiss{background-color:#333;color:#fff;text-decoration:none;padding:.6em 1em;display:inline-block;margin:0 .5em}.ce-disable{background-color:#aaa}.ce-accept:hover,.ce-disable:hover,.ce-dismiss:hover{background-color:var(--main-bg-color-hover);color:var(--main-text-color-hover)}.ce-accept{background-color:var(--main-bg-color-accept);color:var(--main-text-color-accept)}.ce-dismiss{position:absolute;font-size:.8em;right:1em;top:1em;background-color:#ccc;color:#333}.ce-iframe-placeholder{padding:1em;background-color:#eee;margin:1em 0;height:250px;background-image:url(data:image/svg;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgNTEyIDUxMiIgaGVpZ2h0PSI1MTIiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiB3aWR0aD0iNTEyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxnPjxwYXRoIGQ9Im01MDcuNjMzIDI0NS40MmMtMi44MTQtMi44MjktNi42NDItNC40Mi0xMC42MzMtNC40Mi0xMi40MiAwLTIzLjcxMi02Ljg2MS0yOS40NjgtMTcuOTA1LTIuMTAxLTQuMDMxLTUuOTE3LTYuODkyLTEwLjM3NS03Ljc3OS00LjQ1OS0uODg2LTkuMDc4LjI5Ni0xMi41NjMgMy4yMTYtOS41NDYgOC0yMi42MDYgMTAuMDE3LTM0LjA4MyA1LjI2Ni0xMS40NzktNC43NTYtMTkuMjg0LTE1LjQxNS0yMC4zNzEtMjcuODE1LS4zOTYtNC41MjktMi44MjYtOC42MzQtNi42MDYtMTEuMTYxcy04LjUtMy4yMDUtMTIuODM5LTEuODM4Yy0xMS44ODEgMy43MzgtMjQuNzE3LjYwNS0zMy41LTguMTc4cy0xMS45MTctMjEuNjItOC4xOC0zMy41MDFjMS4zNjQtNC4zMzYuNjg4LTkuMDU3LTEuODM3LTEyLjgzNi0yLjUyNi0zLjc3OS02LjYyOS02LjIwOS0xMS4xNTctNi42MDgtMTIuNDA1LTEuMDkxLTIzLjA2My04Ljg5OC0yNy44MTYtMjAuMzc4LTQuNzU2LTExLjQ3My0yLjczOS0yNC41MyA1LjI2My0zNC4wNzYgMi45Mi0zLjQ4NCA0LjEwMy04LjEwNCAzLjIxNi0xMi41NjMtLjg4OC00LjQ1OC0zLjc0OS04LjI3NC03Ljc4MS0xMC4zNzUtMTAuODA4LTUuNjMxLTE3LjY2MS0xNi42NjYtMTcuODk2LTI4LjgwOWwtLjAwOC0uNzk1Yy0uMDczLTguMjMxLTYuNzY4LTE0Ljg2NS0xNC45OTktMTQuODY1LTMzLjM3MyAwLTY3LjIyMSAxMC45NTYtOTMuNTM5IDMwLjE2OC0zMi4xOTUgNS4wMjUtNjMuODc4IDIxLjIxMy04Ny40NzkgNDQuODEzcy0zOS43OSA1NS4yNzktNDQuODE3IDg3LjQ3OGMtMTkuMjEyIDI2LjMyNC0zMC4xNjUgNjAuMTcxLTMwLjE2NSA5My41NDFzMTAuOTUzIDY3LjIxNyAzMC4xNjUgOTMuNTQyYzUuMDI3IDMyLjE5OCAyMS4yMTcgNjMuODc4IDQ0LjgxNyA4Ny40NzggMjMuNiAyMy41OTkgNTUuMjgyIDM5Ljc4NyA4Ny40NzkgNDQuODEzIDI2LjMxOCAxOS4yMTIgNjAuMTY2IDMwLjE2NyA5My41MzkgMzAuMTY3czY3LjIyMS0xMC45NTYgOTMuNTM5LTMwLjE2OGMzMi4xOTYtNS4wMjUgNjMuODc5LTIxLjIxNCA4Ny40NzktNDQuODEzIDIzLjYwMS0yMy42IDM5Ljc5LTU1LjI3OSA0NC44MTctODcuNDc3IDE0Ljk0LTIwLjQ3NCAyOS45NjEtNTIuOTM2IDMwLjE2NS05My40NjcuMDItMy45OTEtMS41NTItNy44MjUtNC4zNjctMTAuNjU1em0tNTEuOTY0IDg5LjAwN2MtMS42NDMgMi4xMi0yLjY4NyA0LjY0MS0zLjAyNCA3LjMwMS0zLjQzOCAyNy4xMDQtMTYuODY1IDU0LjEwNC0zNi44NCA3NC4wNzhzLTQ2Ljk3NiAzMy40LTc0LjA3OSAzNi44MzZjLTIuNjYxLjMzNy01LjE4NCAxLjM4Mi03LjMwNCAzLjAyNS0yMS41OTIgMTYuNzM1LTUwLjE3NiAyNi4zMzMtNzguNDIyIDI2LjMzM3MtNTYuODMtOS41OTgtNzguNDIyLTI2LjMzM2MtMi4xMi0xLjY0My00LjY0My0yLjY4OC03LjMwNC0zLjAyNS0yNy4xMDQtMy40MzYtNTQuMTA0LTE2Ljg2Mi03NC4wNzktMzYuODM2LTE5Ljk3NS0xOS45NzMtMzMuNDAyLTQ2Ljk3NC0zNi44NC03NC4wNzgtLjMzOC0yLjY1OS0xLjM4MS01LjE4LTMuMDIzLTcuMjk5LTE2LjczNC0yMS42LTI2LjMzMi01MC4xODYtMjYuMzMyLTc4LjQyOXM5LjU5OC01Ni44MjkgMjYuMzMyLTc4LjQyOWMxLjY0My0yLjExOSAyLjY4Ni00LjY0IDMuMDIzLTcuMjk5IDMuNDM4LTI3LjEwNCAxNi44NjUtNTQuMTA0IDM2Ljg0LTc0LjA3OCAxOS45NzYtMTkuOTc1IDQ2Ljk3Ny0zMy40MDEgNzQuMDc5LTM2LjgzNiAyLjY2MS0uMzM3IDUuMTg0LTEuMzgyIDcuMzA0LTMuMDI1IDE4LjI3MS0xNC4xNjEgNDEuNTQ3LTIzLjIxMiA2NS4zOS0yNS42NjEgMy4wNjQgMTEuOTg2IDkuNTk0IDIyLjgxIDE4Ljc0NyAzMS4xMTktNy41MzUgMTUuOTA4LTguMTY4IDM0LjQyNS0xLjIyNyA1MS4xNzMgNi45MzcgMTYuNzUxIDIwLjQ3MyAyOS4zOTUgMzcuMDQzIDM1LjMxNy0uODY4IDE3LjU3NSA1LjYzMiAzNC45MTggMTguNDUgNDcuNzM3IDEyLjgyMSAxMi44MiAzMC4xNjcgMTkuMzIzIDQ3LjczNiAxOC40NSA1LjkxOCAxNi41NjYgMTguNTYgMzAuMTAzIDM1LjMxMyAzNy4wNDUgMTYuNzUgNi45MzYgMzUuMjYzIDYuMzA0IDUxLjE2OS0xLjIyNSA4LjMxNCA5LjE4MSAxOS4xMyAxNS42OTggMzEuMTI5IDE4Ljc1My0yLjQ1NCAyMy44MzItMTEuNTI4IDQ3LjE1My0yNS42NTkgNjUuMzg2eiIvPjxwYXRoIGQ9Im0xMzIuOTI3IDE0OC45OTQtMTYuMDY3IDE2LjA2NmMtNS44NTggNS44NTgtNS44NTggMTUuMzU1IDAgMjEuMjEzIDUuODU2IDUuODU3IDE1LjM1NSA1Ljg1OSAyMS4yMTMgMGwxNi4wNjYtMTYuMDY2YzUuODU4LTUuODU4IDUuODU4LTE1LjM1NSAwLTIxLjIxMy01Ljg1Ny01Ljg1OS0xNS4zNTUtNS44NTktMjEuMjEyIDB6Ii8+PHBhdGggZD0ibTM4OS45OTMgMzA5LjY2LTE2LjA2NiAxNi4wNjdjLTUuODU4IDUuODU4LTUuODU4IDE1LjM1NSAwIDIxLjIxMyA1Ljg1NiA1Ljg1NiAxNS4zNTUgNS44NTkgMjEuMjEzIDBsMTYuMDY2LTE2LjA2N2M1Ljg1OC01Ljg1OCA1Ljg1OC0xNS4zNTUgMC0yMS4yMTMtNS44NTctNS44NTgtMTUuMzU1LTUuODU4LTIxLjIxMyAweiIvPjxwYXRoIGQ9Im0yOTMuNTk0IDM4MS45Ni0xNi4wNjYgMTYuMDY3Yy01Ljg1OCA1Ljg1OC01Ljg1OCAxNS4zNTUgMCAyMS4yMTMgNS44NTYgNS44NTYgMTUuMzU1IDUuODU5IDIxLjIxMyAwbDE2LjA2Ni0xNi4wNjdjNS44NTgtNS44NTggNS44NTgtMTUuMzU1IDAtMjEuMjEzcy0xNS4zNTYtNS44NTgtMjEuMjEzIDB6Ii8+PHBhdGggZD0ibTE5Ny4xOTMgMjYxLjQ2MS0xNi4wNjYgMTYuMDY2Yy01Ljg1OCA1Ljg1OC01Ljg1OCAxNS4zNTUgMCAyMS4yMTMgNS44NTYgNS44NTcgMTUuMzU1IDUuODU5IDIxLjIxMyAwbDE2LjA2Ni0xNi4wNjZjNS44NTgtNS44NTggNS44NTgtMTUuMzU1IDAtMjEuMjEzLTUuODU3LTUuODU5LTE1LjM1NS01Ljg1OS0yMS4yMTMgMHoiLz48cGF0aCBkPSJtMjAyLjM0IDM3My45MjdjLTUuODU3LTUuODU3LTE1LjM1NS01Ljg1OC0yMS4yMTMgMHMtNS44NTggMTUuMzU1IDAgMjEuMjEzbDE2LjA2NiAxNi4wNjdjNS44NTYgNS44NTcgMTUuMzUzIDUuODU5IDIxLjIxMyAwIDUuODU4LTUuODU4IDUuODU4LTE1LjM1NSAwLTIxLjIxM3oiLz48cGF0aCBkPSJtMTA1LjkzOSAyNzcuNTI2Yy01Ljg1Ny01Ljg1Ny0xNS4zNTUtNS44NTgtMjEuMjEzIDBzLTUuODU4IDE1LjM1NSAwIDIxLjIxM2wxNi4wNjcgMTYuMDY3YzUuODU2IDUuODU2IDE1LjM1NSA1Ljg1OSAyMS4yMTMgMCA1Ljg1OC01Ljg1OCA1Ljg1OC0xNS4zNTUgMC0yMS4yMTN6Ii8+PHBhdGggZD0ibTI5OC43NCAyNzcuNTI3Yy01Ljg1Ny01Ljg1OC0xNS4zNTUtNS44NTctMjEuMjEzIDAtNS44NTggNS44NTgtNS44NTggMTUuMzU1IDAgMjEuMjEzbDE2LjA2NiAxNi4wNjdjNS44NTYgNS44NTcgMTUuMzUzIDUuODU5IDIxLjIxMyAwIDUuODU4LTUuODU4IDUuODU4LTE1LjM1NSAwLTIxLjIxM3oiLz48cGF0aCBkPSJtMjM0LjQ3MyAxNjUuMDZjLTUuODU3LTUuODU3LTE1LjM1NS01Ljg1OC0yMS4yMTMgMHMtNS44NTggMTUuMzU1IDAgMjEuMjEzbDE2LjA2NyAxNi4wNjdjNS44NTYgNS44NTYgMTUuMzU1IDUuODU5IDIxLjIxMyAwIDUuODU4LTUuODU4IDUuODU4LTE1LjM1NSAwLTIxLjIxM3oiLz48L2c+PC9zdmc+);background-position:center;background-repeat:no-repeat}.ce-iframe-placeholder p{margin:0;position:relative;bottom:-160px}iframe{width:100%}@keyframes example{0%{transform:translateY(0);display:block}100%{transform:translateY(calc(650px - 1/4 * 1vw));display:none}}@keyframes example2{0%{transform:translateY(calc(650px - 1/4 * 1vw));display:none}100%{transform:translateY(0);display:block}}.ce-more{font-size:var(--main-font-size);margin:0;padding:5px 10px;text-align:center;z-index:9999;cursor:pointer;box-shadow:0 -4px 5px 0 rgba(0,0,0,.28);background-color:var(--main-bg-color);color:var(--main-text-color);position:fixed;font-family:inherit;width:auto;bottom:0;right:100px;display:block}.gray-block-screen{position:fixed;top:0;bottom:0;left:0;right:0;opacity:0.25;color:gray;opacity:0.25;background-color:#505050;z-index:9999;}.gray-block-screen{position:fixed;top:0;bottom:0;left:0;right:0;opacity:0.25;color:gray;opacity:0.25;background-color:#505050;z-index:9999;}`;
        document.getElementsByTagName('head')[0].appendChild(style);
    }
    var enableCookies = _debounce(function (event) {
        if (typeof event != "undefined" && event.type === 'click') {
            event.preventDefault();
        }
        if (cookie.get() != 'Y') {
            cookie.set();
            scripts.get();
            iframes.get();
            iframes.removePlaceholders();
            banner.dismiss();
            window.removeEventListener('scroll', handleScroll);
            window[`ga-disable-${defaults.trackID}`] = false;
            if (typeof opts.onEnable === "function") opts.onEnable();
        }

    }, 250, false);
    var disableCookies = function (event) {
        if (typeof event != "undefined" && event.type === 'click') {
            event.preventDefault();
        }
        if (cookie.get() != 'N') {
            cookie.set('N');
            banner.dismiss();
            window.removeEventListener('scroll', handleScroll);
            if (typeof opts.onDisable === "function") opts.onDisable();
        }
    }
    var banner = (function () {
        function create() {
            var el = '<div class="gray-block-screen"></div><div class="' + opts.bannerClass + '">' +
                bannerHTML(opts) +
                '</div>';
            var el2 = bannerShowHTML(opts);
            el = el + el2;
            document.body.insertAdjacentHTML('beforeend', el);
        }

        function createInverse() {

        var el = '<div style="display:none;" class="'+ opts.bannerClass +'">'
                + bannerHTML(opts)
                +'</div>';
        var el2 = bannerShowHTML(opts);

        el = el + el2;

        document.body.insertAdjacentHTML('beforeend', el);
      }

        function dismiss() {
            domElmts.banner[0].style.animationName = 'example';
            domElmts.banner[0].style.animationDuration = '3s';
            domElmts.banner[0].style.animationFillMode = 'forwards';
            if (domElmts.more[0]) {
                domElmts.more[0].style.animationName = 'example2';
                domElmts.more[0].style.animationDuration = '3s';
                domElmts.more[0].style.animationFillMode = 'forwards';
            }
            if(document.getElementsByClassName('gray-block-screen')[0]) document.getElementsByClassName('gray-block-screen')[0].style.display = "none";
            if (typeof opts.onDismiss === "function") opts.onDismiss();
        }
        function appear() {
            domElmts.banner[0].style.animationName = 'example2';
            domElmts.banner[0].style.animationDuration = '3s';
            domElmts.banner[0].style.animationFillMode = 'forwards';
            domElmts.banner[0].style.display = 'block';
            if (domElmts.more[0]) {
                domElmts.more[0].style.animationName = 'example';
                domElmts.more[0].style.animationDuration = '3s';
                domElmts.more[0].style.animationFillMode = 'forwards';
            }
            if (typeof opts.onAppear === "function") opts.onAppear();
        }
        return {
            create: create,
            dismiss: dismiss,
            appear: appear,
            createInverse: createInverse
        }
    })();
    var cookie = (function () {
        function set(val) {
            var value = typeof val !== "undefined" ? val : "Y",
                date, expires, host, domainParts, domain;
            if (opts.cookieDuration) {
                date = new Date();
                date.setTime(date.getTime() + (opts.cookieDuration * 24 * 60 * 60 * 1000));
                expires = "; expires=" + date.toGMTString();
            } else {
                expires = "";
            }
            host = location.hostname;
            // Means localhost or that the user does not want to enable cookies for all subdomains
            if (host.split('.') === 1 || !opts.wildcardDomain) {
                document.cookie = opts.cookieName + "=" + value + expires + "; path=/";
            } else {
                // We start by stying to set a cookie from a subdomain eg foo.bar.com -> .bar.com
                // If that does not work we try to set it for the top domain instead
                domainParts = host.split('.');
                domainParts.shift();
                domain = '.' + domainParts.join('.');
                document.cookie = opts.cookieName + "=" + value + expires + "; path=/; domain=" + domain;
                // Check if we managed to set the cookie, if not we where on a top-domain
                if (cookie.get() == null) {
                    domain = '.' + host;
                    document.cookie = opts.cookieName + "=" + value + expires + "; path=/; domain=" + domain;
                }
            }

        }
        function get() {
            var cookies = document.cookie.split(";"),
                l = cookies.length,
                i, x, y;
            for (i = 0; i < l; i++) {
                x = cookies[i].substr(0, cookies[i].indexOf("="));
                y = cookies[i].substr(cookies[i].indexOf("=") + 1);
                x = x.replace(/^\s+|\s+$/g, "");
                if (x == opts.cookieName) {
                    return unescape(y);
                }
            }
        }
        return {
            set: set,
            get: get
        }
    })();
    var iframes = (function () {
        function makePlaceholder(iframe) {
            var placeholderElement = document.createElement('div');
            placeholderElement.className = opts.iframesPlaceholderClass;
            placeholderElement.innerHTML = iframesPlaceholderHTML(opts);
            iframe.parentNode.insertBefore(placeholderElement, iframe);
        }
        function removePlaceholders() {
            var iframePlaceholders = document.getElementsByClassName(opts.iframesPlaceholderClass),
                n = iframePlaceholders.length,
                i;
            for (i = n - 1; i >= 0; i--) {
                iframePlaceholders[i].parentNode.removeChild(iframePlaceholders[i]);
            }
        }
        function hide() {
            var iframes = document.getElementsByClassName(opts.iframeClass),
                n = iframes.length,
                src, iframe, i;
            for (i = 0; i < n; i++) {
                iframe = iframes[i];
                iframe.style.display = 'none';
                if (opts.iframesPlaceholder) makePlaceholder(iframe);
            }
        }
        function get() {
            var iframes = document.getElementsByClassName(opts.iframeClass),
                n = iframes.length,
                src, iframe, i;
            for (i = 0; i < n; i++) {
                iframe = iframes[i];
                src = iframe.attributes['data-ce-src'].value;
                iframe.src = src;
                iframe.style.display = 'block';
            }
        }
        return {
            hide: hide,
            get: get,
            removePlaceholders: removePlaceholders
        }
    })();
    var scripts = (function () {
        function get() {
            var scripts = document.getElementsByClassName(opts.scriptClass),
                n = scripts.length,
                documentFragment = document.createDocumentFragment(),
                i, y, s, attrib, el;
            for (i = 0; i < n; i++) {
                if (scripts[i].hasAttribute('data-ce-src')) {
                    if (typeof postscribe !== "undefined") {
                        postscribe(scripts[i].parentNode, '<script src="' + scripts[i].getAttribute("data-ce-src") + '"></script>');
                    }
                } else {
                    s = document.createElement('script');
                    s.type = 'text/javascript';
                    for (y = 0; y < scripts[i].attributes.length; y++) {
                        attrib = scripts[i].attributes[y];
                        if (attrib.specified) {
                            if ((attrib.name != 'type') && (attrib.name != 'class')) {
                                s.setAttribute(attrib.name, attrib.value);
                            }
                        }
                    }
                    s.innerHTML = scripts[i].innerHTML;
                    documentFragment.appendChild(s);
                }
            }
            document.body.appendChild(documentFragment);
        }
        return {
            get: get
        }
    })();

    return {
        init: init,
        enableCookies: enableCookies,
        dismissBanner: banner.dismiss,
        trackGoogle: trackGoogle
    };
}());