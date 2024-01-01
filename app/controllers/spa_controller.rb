class SpaController < ApplicationController
  def index
    render(
      inline: '<div id="root"></div>',
      layout: 'application'
    )
  end
end
