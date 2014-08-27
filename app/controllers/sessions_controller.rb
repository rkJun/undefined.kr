class SessionsController < ApplicationController

  def new
    # redirect_to '/auth/facebook'
  end

  def create
    if @user.persisted?
      flash[:notice] = I18n.t "devise.omniauth_callbacks.success", :kind => auth['provider']
      sign_in_and_redirect @user, :event => :authentication
    else
      session["devise.auth_data"] = request.env["omniauth.auth"]
      redirect_to new_user_registration_url
    end

    # auth = request.env["omniauth.auth"]        
    # user = User.where(:provider => auth['provider'],
    #                   :uid => auth['uid'].to_s).first || User.create_with_omniauth(auth)
    
    # reset_session
    # session[:user_id] = user.id
    # redirect_to root_url, :notice => 'Signed in!'
  end

  def destroy
    reset_session
    redirect_to root_url, :notice => 'Signed out!'
  end

  def failure
    redirect_to root_url, :alert => "Authentication error: #{params[:message].humanize}"
  end

end
