### Team Resourceful Site

##### Setup

Have typescript installed, if not run `npm install -g typescript` or `npm install typescript`

`npm install`
`npm run start`

Note: If you already have something running on port 5342, you can change the port in `src/index.ts`

##### Attribution

This project uses lucide icons by https://lucide.dev


##### How this works

We have the main site in the public folder which contains all assets and static pages then we have blogs which contains
markdown and template files for the information to create static pages on run time. The blogs folder is where you can
add your own blogs and they will be added to the site. The site is built using a custom static site generator which
uses the blogs folder to create the static pages.