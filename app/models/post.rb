class Post < ActiveRecord::Base
  acts_as_taggable
  belongs_to :bulletin
  has_many :comments, dependent: :destroy
end
