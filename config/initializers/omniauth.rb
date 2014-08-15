Rails.application.config.middleware.use OmniAuth::Builder do
  # provider :facebook, ENV['FACEBOOK_KEY'], ENV['FACEBOOK_SECRET']
  provider :facebook, ENV['FACEBOOK_KEY_DEV'], ENV['FACEBOOK_SECRET_DEV'],
  :image_size => 'large'
end