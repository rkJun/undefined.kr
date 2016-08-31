source 'https://rubygems.org'


# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 5.0.0'
# Use puma as the app server
gem 'puma', '~> 3.0'
# Use SCSS for stylesheets
gem 'sass-rails', '~> 5.0'
# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'
# Use CoffeeScript for .coffee assets and views
gem 'coffee-rails', '~> 4.2'
# See https://github.com/rails/execjs#readme for more supported runtimes
# gem 'therubyracer', platforms: :ruby

# Use jquery as the JavaScript library
gem 'jquery-rails'
# Turbolinks makes following links in your web application faster. Read more: https://github.com/rails/turbolinks
gem 'turbolinks', '~> 5'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.5'
# Use ActiveModel has_secure_password
gem 'bcrypt', '~> 3.1.7'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development

group :development, :test do
  gem 'sqlite3'
  # Test Data
  gem 'faker'
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platform: :mri
end

group :development do
  # Awesome console output
  gem 'awesome_print'
  # Access an IRB console on exception pages or by using <%= console %> anywhere in the code.
  gem 'web-console'
  gem 'listen', '~> 3.0.5'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
end

group :production do
  # Use postgresql as the database for Active Record
  gem 'pg'
end

# Added Gems

# Authentication
gem 'devise', '~> 4.2.0'
gem 'devise-i18n'
gem 'omniauth-facebook'
gem 'omniauth-github'
gem 'omniauth-twitter'

# i18n
gem 'rails-i18n', '~> 5.0.0'

# underscore
gem 'underscore-rails'

# json
gem 'httparty'

# environment
gem 'dotenv-rails', groups: [:development, :test, :production]


# Need checking gem if it use
# Front-end framework
gem 'bootstrap-sass', '~> 3.3.4'
# gem 'will_paginate', '~> 3.0.6'
# gem 'will_paginate-bootstrap'
gem 'simple_form'
gem 'friendly_id'
gem 'acts-as-taggable-on'
gem 'redcarpet'
gem 'enum_help'
gem 'pagedown-bootstrap-rails'
gem 'simple-rss'
# =

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]

ruby '2.3.1'