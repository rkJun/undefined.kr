require 'simple-rss'
require 'open-uri'

class AppsController < ApplicationController
  def index
  	countries = [ 'kr', 'us', 'jp'] #, 'uk', 'cn', 'hk' ]
  	# feed_types = [ 'topmacapps', 'topfreemacapps', 'toppaidmacapps' ]
  	feed_types = [ 'topfreeapplications', 'toppaidapplications']
    limit = 100

  	url_prefix = 'https://itunes.apple.com/'
  	date = Time.new.strftime("%Y-%m-%d")

  	country = "kr"

    # Korea free top ios all
    #https://itunes.apple.com/kr/rss/topfreeapplications/limit=100/xml
    # Japan Paid top ios all
    # https://itunes.apple.com/jp/rss/topfreeapplications/limit=100/xml


  	# https://itunes.apple.com/kr/rss/topfreemacapps/limit=10/xml
  	# url = "#{url_prefix}#{country}/rss/#{feed_types[1]}/limit=#{limit}/xml"

    url_free_kr = 'https://itunes.apple.com/kr/rss/topfreeapplications/limit=100/xml'
    url_free_jp = 'https://itunes.apple.com/jp/rss/topfreeapplications/limit=100/xml'
    url_free_us = 'https://itunes.apple.com/us/rss/topfreeapplications/limit=100/xml'

    @rss_free_kr = SimpleRSS.parse open(url_free_kr)
    @rss_free_jp = SimpleRSS.parse open(url_free_jp)
    @rss_free_us = SimpleRSS.parse open(url_free_us)
  end
end

