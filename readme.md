# Time Management

This is an example of using Laravel and AngularJS to create a time management app with user polices and roles. The app has 3 roles: Admin role, team manager role, and a regular user role. It uses JWT as an authentication mechanism. 

## Requirements

* PHP >= 5.6.0
* OpenSSL PHP Extension
* PDO PHP Extension
* Mbstring PHP Extension
* Tokenizer PHP Extension
* composer

## Configuration

You will need .env file in root directory with the following parameters:

```term
APP_ENV=local
APP_DEBUG=true
APP_KEY=YOUR_RANDOM_KEY
APP_URL=http://localhost

DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=time-management
DB_USERNAME=root
DB_PASSWORD=root

CACHE_DRIVER=file
SESSION_DRIVER=file
QUEUE_DRIVER=sync

REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

MAIL_DRIVER=smtp
MAIL_HOST=mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
```

## Installing

In root directory, run the following commands to install decencies and to migrate database schema:

```term
$ composer install
$ php artisan migrate
```

## Demo

Demo is available at https://tmmg.herokuapp.com


