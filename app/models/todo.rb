class Todo < ApplicationRecord
  def to_props
    {
      id: id,
      title: title,
      description: description,
      completed: completed,
      created_at: created_at
    }
  end
end
