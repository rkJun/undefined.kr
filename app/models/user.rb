class User < ActiveRecord::Base
  extend FriendlyId
  # friendly_id :nickname, :use_slug => true

# Include default devise modules. Others available are:
# :token_authenticatable, :confirmable,
# :lockable, :timeoutable and :omniauthable
devise :database_authenticatable, :registerable,
       :recoverable, :rememberable, :trackable, :validatable, 
       :omniauthable, :omniauth_providers => [:facebook, :github]

  has_many :posts, dependent: :destroy
  has_many :comments, dependent: :destroy


  ROLE = {admin: "admin", 
          organizer: "organizer",
          vip: "vip",
          member: "member", 
          newbie: "newbie" }

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
         user.name = auth['info']['name'] || ""
         user.email = auth['info']['email'] || ""
         user.nickname = auth['info']['nickname'] || ""
         user.image = auth['info']['image'] || ""
      end
    end
  end
end
