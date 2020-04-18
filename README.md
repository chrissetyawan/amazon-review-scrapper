Simple Amazon Review Scrapper based on ASIN value

I create 2 backend version :

1. Node.js (using puppeteer library for scrapping)

```

configure database config on \app\config\env.js

$ npm install
$ npm run start

```

2. Laravel 7 (using simple_html_dom library for scrapping)

```

copy .env.example to .env and adjust your database config on .env file

$ composer install
$ php artisan key:generate
$ php artisan migrate --seed
$ sudo chmod 777 storage/ -R            # if using linux
$ php artisan serve

```

note : 
- Only 1 backend can be run in same time because using same port 8000
- Both backend have same API response structure and content 


Vue.js Frontend: 

```

$ npm install
$ npm run serve

Open Browser with Url: http://localhost:4200/

```

![Screenshoot](simple-scrapper.png)


Todo : 
- Responsive Layout
- Store to DB when scrapping finished
- Using real pagination component and pulled from DB
- Queue / Asynchronous Task
- Cron job
