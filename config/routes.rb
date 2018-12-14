Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api, defaults: {format: :json} do
    resources :users, only: [:show, :create]
    resource :session, only: [:create, :destroy]
    resources :songs, only: [:index, :show]
    resources :albums, only: [:index, :show]
    resources :artists, only: [:index, :show]
    resources :playlists
  end
  root to: "static_pages#root"
end
