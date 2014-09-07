class UsersController < ApplicationController

  before_filter :authenticate_user!
  before_filter :user_signed_in?, only: [:edit, :update, :destroy]
  before_filter :correct_user?, :except => [:index, :show]
  before_action :set_user, only: [:show, :edit, :update, :destroy]

  def index
    @users = User.all
  end

  def show
    # @user = User.find(params[:id])
  end

  # def create
  #   User.create(user_params)
  # end

  def update
    respond_to do |format|
      if @user.update(user_params)
        format.html { redirect_to @user, notice: 'user was successfully updated.' }
        format.json { render :show, status: :ok, location: @user }
      else
        format.html { render :edit }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  def user_params
    params.require(:user).permit(:nickname, :bio)
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      if params[:id]
        @user = User.friendly.find(params[:id])
      else
        @user = current_user
      end
    end

end
