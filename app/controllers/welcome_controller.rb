class WelcomeController < ApplicationController

  def index
      @posts = Post.order('updated_at DESC').limit(5)
      # @posts = Post.all
  end

end
