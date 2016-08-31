class User < ApplicationRecord
  extend FriendlyId
  friendly_id :slug_candidates, use: :slugged
  before_save :default_values

  def slug_candidates
    [
      :nickname,
      [:nickname, :uid],
      [:nickname, :uid, :name]
    ]
  end

  def default_values
    self.provider ||= 'local'
    self.uid ||=SecureRandom.hex(3)

    if self.nickname.nil?
      if User.where(nickname: email.split('@')[0].downcase).empty?
        self.nickname = email.split('@')[0]
    else
        self.nickname = email.gsub! '.', '-'
      end
    end

    self.slug = self.nickname

  end

  # Include default devise modules. Others available are:
  # :token_authenticatable,
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable, :confirmable,
         :recoverable, :rememberable, :trackable, :validatable, 
         :omniauthable, :omniauth_providers => [:facebook, :github]

  has_many :posts, dependent: :destroy
  has_many :comments, dependent: :destroy

  validates :nickname, uniqueness: true
  # validates :name, presence: true

  validates_length_of :nickname, :maximum => 30
  validates_length_of :bio, :maximum => 100

  def self.find_for_omniauth(auth)

    if auth.info.email
      user = User.where(email: auth.info.email).first
    else
      user = User.where(prodiver: auth.provider, uid: auth.uid).first
    end
  
    unless user
      user = User.create(name:     auth.info.name,
                         provider: auth.provider,
                         uid:      auth.uid,
                         email:    auth.info.email,
                         nickname: auth.info.nickname,
                         image:    auth.info.image,
                         # token:    auth.credentials.token,
                         password: Devise.friendly_token[0, 20])
    end
    user
  end

  def self.create_with_omniauth(auth)
    create! do |user|
      user.provider = auth['provider']
      user.uid = auth['uid']
      if auth['info']
         user.name = auth['info']['name']
         user.email = auth['info']['email']
         user.nickname = auth['info']['nickname']
         user.image = auth['info']['image']
      end
    end
  end
  
end
