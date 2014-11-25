require 'simple-rss'
require 'open-uri'

class AppsController < ApplicationController
  def index
  	countries = [ 'kr', 'us', 'jp', 'uk', 'cn', 'hk' ]
  	feed_types = [ 'topmacapps', 'topfreemacapps', 'toppaidmacapps' ]
  	limit = 100

  	url_prefix = 'https://itunes.apple.com/'
  	date = Time.new.strftime("%Y-%m-%d")

  	country = "kr"

  	# https://itunes.apple.com/kr/rss/topfreemacapps/limit=10/xml
  	url = "#{url_prefix}/#{country}/rss/#{feed_types[1]}/limit=#{limit}/xml"

  	@rss = SimpleRSS.parse open(url)
  end
end
