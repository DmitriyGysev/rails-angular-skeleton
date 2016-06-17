Rails.application.routes.draw do
  devise_for :users
  root to: 'application#angular'
  get '*path' => 'application#angular'
end
