class FblogsController < ApplicationController
  before_filter :authenticate_user!, :only => [:index, :show]
  before_action :set_fblog, only: [:show, :edit, :update, :destroy]

  # GET /fblogs
  # GET /fblogs.json
  def index
    # @fblogs = Fblog.all

    searchFblog = params[:fblog]

    if searchFblog    
      message = searchFblog["message"]
      author = searchFblog["author"]
      comment = searchFblog["comment"]
      comment_author = searchFblog["comment_author"]
    end

    @fblogs = Fblog.index(message, author, comment, comment_author)
    @fblog = Fblog.new
  end

  # GET /fblogs/1
  # GET /fblogs/1.json
  def show
  end
  
  private
    # Use callbacks to share common setup or constraints between actions.
    def set_fblog
      @fblog = Fblog.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def fblog_params
      params.require(:fblog).permit(:id)
    end
end
