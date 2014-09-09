require 'test_helper'

class FblogsControllerTest < ActionController::TestCase
  setup do
    @fblog = fblogs(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:fblogs)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create fblog" do
    assert_difference('Fblog.count') do
      post :create, fblog: { title: @fblog.title }
    end

    assert_redirected_to fblog_path(assigns(:fblog))
  end

  test "should show fblog" do
    get :show, id: @fblog
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @fblog
    assert_response :success
  end

  test "should update fblog" do
    patch :update, id: @fblog, fblog: { title: @fblog.title }
    assert_redirected_to fblog_path(assigns(:fblog))
  end

  test "should destroy fblog" do
    assert_difference('Fblog.count', -1) do
      delete :destroy, id: @fblog
    end

    assert_redirected_to fblogs_path
  end
end
