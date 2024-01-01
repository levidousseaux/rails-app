Rails.application.routes.draw do
  resources :todos,  path: '/api/todos', only: [:index, :create, :update, :destroy]

  root 'spa#index'
  get '*path', to: 'spa#index'
end
