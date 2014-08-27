class User < ActiveRecord::Base
# Include default devise modules. Others available are:
# :token_authenticatable, :confirmable,
# :lockable, :timeoutable and :omniauthable
devise :database_authenticatable, :registerable,
       :recoverable, :rememberable, :trackable, :validatable, :omniauthable

  has_many :posts, dependent: :destroy
  has_many :comments, dependent: :destroy

  ROLE = {admin: "admin", member: "member"}

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
