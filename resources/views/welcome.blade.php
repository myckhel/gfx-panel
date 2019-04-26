<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
  <head>
    <meta charset="utf-8">
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, shrink-to-fit=no"    />
    <link rel="stylesheet" href="/assets/fonts/simple-line-icons/css/simple-line-icons.css">
    <link rel="stylesheet" href="/assets/fonts/iconsmind/style.css">
    <title>{{config('app.name')}}</title>

    <style>
    .loading {
        display: inline-block;
        width: 30px;
        height: 30px;
        border: 2px solid rgba(100,100,100,.2 );
        border-radius: 50%;
        border-top-color: rgba(100,100,100,.7 );
        animation: spin 1s ease-in-out infinite;
        -webkit-animation: spin 1s ease-in-out infinite;
        left: calc(50% - 15px);
        top: calc(50% - 15px);
        position: fixed;
        z-index: 1;
        }

        @keyframes spin {
        to { -webkit-transform: rotate(360deg); }
        }
        @-webkit-keyframes spin {
        to { -webkit-transform: rotate(360deg); }
        }


    </style>
  </head>

  <body>
    <noscript>
        You need to enable JavaScript to run this app.
    </noscript>
    <script>
        var theme = "light.purple";
        if (typeof Storage !== "undefined") {
            if (localStorage.getItem("themeColor")) {
                theme = localStorage.getItem("themeColor");
            }
        }
        if(theme.indexOf("dark") != -1) {
            document.documentElement.style.background = "#1b191b";
        }
    </script>
    <div id="root">
        <div class="loading"></div>
    </div>
    <!--
      This HTML file is a template.
      If you open it directly in the browser, you will see an empty page.

      You can add webfonts, meta tags, or analytics to this file.
      The build step will place the bundled scripts into the <body> tag.

      To begin the development, run `npm start` or `yarn start`.
      To create a production bundle, use `npm run build` or `yarn build`.
    -->
    <script src="{{ asset('js/app.js') }}"></script>
  </body>

</html>
