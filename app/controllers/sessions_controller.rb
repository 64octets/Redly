class SessionsController < ApplicationController
  def new
  end

  def create
    @user = User.find_by_credentials(params[:user])

    if @user
      sign_in!(@user)
      redirect_to root_url
    else
      @user ||= User.new()
      @user.user_name = params[:user][:user_name]
      flash.now[:errors] = ["Invalid email or password."]
      render :new
    end
  end

  def destroy
    sign_out!
    redirect_to users_url
  end
end