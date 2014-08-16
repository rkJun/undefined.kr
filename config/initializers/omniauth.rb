Rails.application.config.middleware.use OmniAuth::Builder do
  provider :facebook, ENV['FACEBOOK_KEY'], ENV['FACEBOOK_SECRET'], :image_size => 'large'
  provider :github, ENV['GITHUB_KEY'], ENV['GITHUB_SECRET'], scope: "user:email, user:follow"
  provider :twitter, ENV['TWITTER_KEY'], ENV['TWITTER_SECRET']
end

