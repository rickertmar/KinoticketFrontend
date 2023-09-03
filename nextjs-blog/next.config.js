module.exports = {
    output: "standalone",
        async rewrites() {
          return [
            {
              source: '/api/:path*',
              destination: 'http://kinoticket.azurewebsites.net/:path*',
            },
          ];
        },
}