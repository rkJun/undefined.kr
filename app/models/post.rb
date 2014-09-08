class Post < ActiveRecord::Base
  acts_as_taggable
  belongs_to :bulletin
  belongs_to :user
  has_many :comments, dependent: :destroy

  validates :title, presence: true
  validates :content, presence: true
  validates :user_id, presence: true

  validates_length_of :title, :minimum => 10
  validates_length_of :title, :minimum => 10
end
