class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

    def configure_permitted_parameters
      devise_parameter_sanitizer.for(:sign_up) do |u|
        u.permit(:name, :nickname, :role, :slug, :email, 
          :password, :password_confirmation, :remember_me, :provider, :uid)
      end
      devise_parameter_sanitizer.for(:account_update) do |u|
        u.permit(:name, :nickname, :role, :slug, :email,
          :password, :password_confirmation, :current_password, :remember_me)
      end
    end

  # helper_method :current_user
  # helper_method :user_signed_in?

  helper_method :correct_user?

  private


    def correct_user?
      @user = User.friendly.find(params[:id])
      unless current_user == @user
        redirect_to root_url, :alert => "Access denied."
      end
    end

end
