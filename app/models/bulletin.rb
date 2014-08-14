class Bulletin < ActiveRecord::Base
  extend FriendlyId
  friendly_id :title
  
  has_many :posts, dependent: :destroy
end
