Rails.application.routes.draw do

  get 'apps/index'

  devise_for :users,
             :path => '',
             controllers: {
                 omniauth_callbacks: "users/omniauth_callbacks"
             },
             path_names: { sign_in: 'login',
                           sign_out: 'logout',
                           password: 'secret',
                           confirmation: 'verification',
                           unlock: 'unblock',
                           registration: 'register',
                           sign_up: 'signup'
             }

  # resources :users, only: [:index, :create, :new, :edit, :update, :destroy]
  resources :users, path: "/"

  # get '/:id' => 'users#show', as: 'user_show'
  # match "/users/:id" => redirect("%{id}")


  # patch '/users/:id'  => 'users#update', as: 'user'
  # put '/users/:id'    => 'users#update', as: 'user'
  # delete '/users/:id' => 'users#destroy', as: 'user'
  # get  '/users' => 'users#index', as: 'users'
  # post '/users' => 'users#create', as: 'users'
  # get '/users/new' => 'users#new', as: 'new_user'
  # get '/users/:id/edit' => 'users#edit', as: 'edit_user'

  # get '/:user_id/posts/:id' => 'posts#show'



  resources :users, path: "/" do
    resources :posts do #, except: [:show]
      resources :comments, only: [:create, :destroy, :edit]
    end
  end

  # resources :posts do
  #   resources :comments, only: [:create, :destroy, :edit]
  # end

  # authenticated :user do
  #  root to: "users#index", as: :authenticated_root, via: :get
  # end

  # unauthenticated do
  #   root 'welcome#index'
  # end

  # root 'welcome#index'


#  get '/auth/:provider/callback' => 'sessions#create'
#  get '/signin' => 'sessions#new', :as => :signin
#  get '/signout' => 'sessions#destroy', :as => :signout
#  get '/auth/failure' => 'sessions#failure'

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
