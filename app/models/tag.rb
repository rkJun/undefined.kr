class Tag < ActiveRecord::Base
  extend FriendlyId
  friendly_id :name

  has_and_belongs_to_many :posts, dependent: :destroy
end
