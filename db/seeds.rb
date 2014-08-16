# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# 디폴트 게시판 생성
Bulletin.create! title: 'notice'
Bulletin.create! title: 'news'
Bulletin.create! title: 'knowledge', post_type: 'blog'
Bulletin.create! title: 'devlife', post_type: 'blog'
Bulletin.create! title: 'untitled', post_type: 'blog'
