# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# 디폴트 게시판 생성
# Bulletin.create! title: 'notice', description: '공지사항'
# Bulletin.create! title: 'news', description: '새소식'
# Bulletin.create! title: 'knowledge', description: '기술공유', post_type: 'blog'
# Bulletin.create! title: 'devlife', description: '개발자의 삶', post_type: 'blog'
# Bulletin.create! title: 'untitled', description: '잡담', post_type: 'blog'
# Bulletin.create! title: 'selfintro', description: '자기소개'


User.create! provider: 'facebook', uid: '999999999', name: 'FirstName LastName',
             email: 'email@address.com', nickname: '빵줘맨', image: 'http://undefined.kr/favicon.ico', password: '12341234',
             confirmed_at: DateTime.now


users = User.order(:created_at).take(6)
50.times do
  title   = Faker::Lorem.sentence(3)
  content = Faker::Lorem.sentence(5)
  users.each { |user| user.posts.create!(title: title, content: content,  tag_list: ['tag1','태그2']) }
end

