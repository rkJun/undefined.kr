class Fblog
  include Mongoid::Document
  field :id, type: String
  field :message, type: String
  field :caption, type: String  
  field :privacy
  field :type
  field :created_time, type: String
  field :updated_time, type: String
  field :from, type: Hash
  field :to, type: Hash
  field :application, type: Hash
  field :actions
  field :likes
  field :comments

# likes.data id,name
# comments.data  id, from(id,name), message, can_remove, created_time, like_countm user_likes

  def self.index(message, author, comment, comment_author)

    if message
      Fblog.where({message: /.*#{message}.*/}).limit(10).sort(created_time: -1)
    else
      Fblog.all.limit(10).sort(created_time: -1)
    end
  end

end
