class CommentsController < ApplicationController
  before_filter :authenticate_user!, :only => [:create, :update, :destroy]
  before_action :set_post
  before_action :set_comment, only: :destroy

  def create
    @comment = @post.comments.new(comment_params)
    @comment.user = current_user
    @comment.save
  end

  def destroy
    if current_user == @comment.user
      @comment.destroy
    end
  end

  private

  def set_post
    @post = Post.find(params[:post_id])
  end

  def set_comment
    @comment = @post.comments.find(params[:id])
  end

  def comment_params
    params.require(:comment).permit(:body)
  end
end