module.exports = {
    output: "standalone",
        async rewrites() {
          return{ beforeFiles: [
            {
              source: '/api/:path*',
              destination: 'http://kinoticket.azurewebsites.net/:path*',
            },
          ]
          }
        },
}