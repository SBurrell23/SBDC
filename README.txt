stevenburrell.com

Static site, no build step. Open index.html or serve the folder:
  python -m http.server 8123

Layout:
  index.html       all four tab views
  css/theme.css    terminal theme (black/green)
  js/projects.js   project catalog rendered on the Home tab
  js/app.js        tabs, matrix rain, typing effect
  CNAME            custom domain

Pushing to master deploys via .github/workflows/deploy.yml
