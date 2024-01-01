class TodosController < ApplicationController
  def index
    render json: Todo.all.map(&:to_props)
  end

  def create
    if validate_payload(permitted_payload)
      head :bad_request
      return
    end

    new_todo = Todo.create!(@permitted_payload)

    render json: new_todo
  end

  def update
    if validate_payload(permitted_payload)
      head :bad_request
      return
    end

    todo.update!(@permitted_payload)

    render json: todo
  end

  def destroy
    todo.destroy!

    render json: todo
  end

  private

  def todo
    @todo ||= Todo.find(params[:id])
  end

  def validate_payload(payload)
    payload[:title].empty? || payload[:description].empty?
  end

  def permitted_payload
    @permitted_payload ||= params.permit(:title, :description, :completed)
  end
end
