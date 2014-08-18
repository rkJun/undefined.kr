class Post < ActiveRecord::Base
  acts_as_taggable
  belongs_to :bulletin
  belongs_to :user
  has_many :comments, dependent: :destroy
end
