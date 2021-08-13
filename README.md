# Next.js Static i18n

A demo for Next.js i8n export support.

## Installation

```shell
$ npm install
```

## Build and export

```shell
$ npm run build && npm run export
```

And checkout the `out` folder.

## For production

You can use `navigator.languages` in `index.tsx` to to implement client-side redirection. However, for a better browsing experience, you should enable internationalized routing for the hosting server.

**eg. Nginx**

```nginx
map $http_accept_language $lang {
    default zh;
    ~*^en en;
}

server {
  root  /usr/share/nginx/i18n;
  index index.html;
  
  location = / {
    return 302 /$lang/;
  }

  location ~^/zh {
    try_files $uri $uri/ /zh/index.html;
  }

  location ~^/en {
    try_files $uri $uri/ /en/index.html;
  }

# Other Configurations...
}
```

