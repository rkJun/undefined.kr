class CreateTags < ActiveRecord::Migration
  def change
    create_table :tags do |t|
      t.string :name
      t.text :description
      t.string :url

      t.timestamps
    end
  end
end
