module.exports = {
    output: "standalone",
        async rewrites() {
          return [
            {
              source: '/api/:path*',
              //destination: 'http://kinoticket.azurewebsites.net/:path*',
              destination: 'http://localhost:8080/:path*'
            },
          ];
        },
}